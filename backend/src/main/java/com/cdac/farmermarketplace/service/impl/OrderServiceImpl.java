package com.cdac.farmermarketplace.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.farmermarketplace.dto.request.PlaceOrderRequest;
import com.cdac.farmermarketplace.dto.response.OrderItemResponse;
import com.cdac.farmermarketplace.dto.response.OrderResponse;
import com.cdac.farmermarketplace.entity.Cart;
import com.cdac.farmermarketplace.entity.CartItem;
import com.cdac.farmermarketplace.entity.Order;
import com.cdac.farmermarketplace.entity.OrderItem;
import com.cdac.farmermarketplace.enums.OrderStatus;
import com.cdac.farmermarketplace.enums.PaymentMethod;
import com.cdac.farmermarketplace.exception.BadRequestException;
import com.cdac.farmermarketplace.exception.ResourceNotFoundException;
import com.cdac.farmermarketplace.repository.CartItemRepository;
import com.cdac.farmermarketplace.repository.CartRepository;
import com.cdac.farmermarketplace.repository.OrderItemRepository;
import com.cdac.farmermarketplace.repository.OrderRepository;
import com.cdac.farmermarketplace.service.OrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Override
    public OrderResponse placeOrder(PlaceOrderRequest request) {

        Cart cart = cartRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getCartId());

        if (cartItems.isEmpty()) {
            throw new BadRequestException("Cart is empty");
        }

        BigDecimal subtotal = BigDecimal.ZERO;

        for (CartItem item : cartItems) {
            subtotal = subtotal.add(item.getTotalPrice());
        }

        BigDecimal tax = subtotal.multiply(BigDecimal.valueOf(0.18));
        BigDecimal totalAmount = subtotal.add(tax);

        Order order = new Order();

        order.setUserId(request.getUserId());
        order.setSubtotal(subtotal);
        order.setTax(tax);
        order.setTotalAmount(totalAmount);
        order.setShippingAddress(request.getShippingAddress());
        order.setPincode(request.getPincode());
        order.setMobile(request.getMobile());
        order.setStatus(OrderStatus.PENDING);
        order.setPaymentMethod(
                PaymentMethod.valueOf(request.getPaymentMethod().toUpperCase()));
        order.setOrderDate(LocalDateTime.now());

        order = orderRepository.save(order);

        List<OrderItemResponse> responseItems = new ArrayList<>();

        for (CartItem cartItem : cartItems) {

            OrderItem orderItem = new OrderItem();

            orderItem.setOrderId(order.getOrderId());
            orderItem.setProductId(cartItem.getProductId());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getPrice());
            orderItem.setTotalPrice(cartItem.getTotalPrice());

            orderItemRepository.save(orderItem);

            responseItems.add(
                    new OrderItemResponse(
                            orderItem.getProductId(),
                            orderItem.getQuantity(),
                            orderItem.getPrice(),
                            orderItem.getTotalPrice()));
        }

        cartItemRepository.deleteByCartId(cart.getCartId());

        return new OrderResponse(
                order.getOrderId(),
                order.getUserId(),
                order.getSubtotal(),
                order.getTax(),
                order.getTotalAmount(),
                order.getShippingAddress(),
                order.getPincode(),
                order.getMobile(),
                order.getStatus(),
                order.getPaymentMethod().name(),
                order.getOrderDate(),
                responseItems);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        List<OrderItem> items = orderItemRepository.findByOrderId(orderId);

        List<OrderItemResponse> responseItems = new ArrayList<>();

        for (OrderItem item : items) {

            responseItems.add(
                    new OrderItemResponse(
                            item.getProductId(),
                            item.getQuantity(),
                            item.getPrice(),
                            item.getTotalPrice()));
        }

        return new OrderResponse(
                order.getOrderId(),
                order.getUserId(),
                order.getSubtotal(),
                order.getTax(),
                order.getTotalAmount(),
                order.getShippingAddress(),
                order.getPincode(),
                order.getMobile(),
                order.getStatus(),
                order.getPaymentMethod().name(),
                order.getOrderDate(),
                responseItems);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersByUserId(Long userId) {

        List<Order> orders = orderRepository.findByUserId(userId);

        List<OrderResponse> responses = new ArrayList<>();

        for (Order order : orders) {

            List<OrderItem> items =
                    orderItemRepository.findByOrderId(order.getOrderId());

            List<OrderItemResponse> responseItems = new ArrayList<>();

            for (OrderItem item : items) {

                responseItems.add(
                        new OrderItemResponse(
                                item.getProductId(),
                                item.getQuantity(),
                                item.getPrice(),
                                item.getTotalPrice()));
            }

            responses.add(
                    new OrderResponse(
                            order.getOrderId(),
                            order.getUserId(),
                            order.getSubtotal(),
                            order.getTax(),
                            order.getTotalAmount(),
                            order.getShippingAddress(),
                            order.getPincode(),
                            order.getMobile(),
                            order.getStatus(),
                            order.getPaymentMethod().name(),
                            order.getOrderDate(),
                            responseItems));
        }

        return responses;
    }

    @Override
    public void cancelOrder(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new BadRequestException("Order is already cancelled");
        }

        if (order.getStatus() == OrderStatus.DELIVERED) {
            throw new BadRequestException("Delivered order cannot be cancelled");
        }

        order.setStatus(OrderStatus.CANCELLED);

        orderRepository.save(order);
    }
}