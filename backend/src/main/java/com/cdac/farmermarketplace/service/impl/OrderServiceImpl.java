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
import com.cdac.farmermarketplace.entity.User;
import com.cdac.farmermarketplace.enums.OrderStatus;
import com.cdac.farmermarketplace.enums.PaymentMethod;
import com.cdac.farmermarketplace.exception.BadRequestException;
import com.cdac.farmermarketplace.exception.ResourceNotFoundException;
import com.cdac.farmermarketplace.repository.CartItemRepository;
import com.cdac.farmermarketplace.repository.CartRepository;
import com.cdac.farmermarketplace.repository.OrderItemRepository;
import com.cdac.farmermarketplace.repository.OrderRepository;
import com.cdac.farmermarketplace.repository.UserRepository;
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
    private final UserRepository userRepository;

    @Override
    public OrderResponse placeOrder(
            PlaceOrderRequest request,
            Long userId
    ) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Cart not found"));

        List<CartItem> cartItems =
                cartItemRepository.findByCart(cart);

        if (cartItems.isEmpty()) {
            throw new BadRequestException("Cart is empty");
        }

        BigDecimal subtotal = BigDecimal.ZERO;

        for (CartItem item : cartItems) {
            subtotal = subtotal.add(item.getTotalPrice());
        }

        BigDecimal tax =
                subtotal.multiply(BigDecimal.valueOf(0.18));

        BigDecimal totalAmount =
                subtotal.add(tax);

        Order order = new Order();

        order.setUser(user);
        order.setSubtotal(subtotal);
        order.setTax(tax);
        order.setTotalAmount(totalAmount);

        order.setShippingAddress(
                request.getShippingAddress());

        order.setPincode(
                request.getPincode());

        order.setMobile(
                request.getMobile());

        order.setStatus(OrderStatus.PENDING);

        order.setPaymentMethod(
                PaymentMethod.valueOf(
                        request.getPaymentMethod().toUpperCase()
                )
        );

        order.setOrderDate(LocalDateTime.now());

        order = orderRepository.save(order);

        List<OrderItemResponse> responseItems =
                new ArrayList<>();

        for (CartItem cartItem : cartItems) {

            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(order);

            orderItem.setProduct(
                    cartItem.getProduct());

            orderItem.setQuantity(
                    cartItem.getQuantity());

            orderItem.setPrice(
                    cartItem.getPrice());

            orderItem.setTotalPrice(
                    cartItem.getTotalPrice());

            orderItemRepository.save(orderItem);

            responseItems.add(

                    new OrderItemResponse(

                            cartItem.getProduct().getId(),

                            cartItem.getQuantity(),

                            cartItem.getPrice(),

                            cartItem.getTotalPrice()

                    )

            );
        }

        /*
         * Clear cart ONLY for COD.
         * For online payments, cart will be cleared
         * after successful payment verification.
         */
        if (order.getPaymentMethod() == PaymentMethod.COD) {

            cartItemRepository.deleteByCart(cart);

        }

        return mapToResponse(
                order,
                responseItems
        );
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderById(
            Long orderId,
            Long userId
    ) {

        Order order =
                orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found"));

        if (!order.getUser().getId().equals(userId)) {
            throw new BadRequestException(
                    "You are not authorized to view this order");
        }

        List<OrderItem> items =
                orderItemRepository.findByOrder(order);

        List<OrderItemResponse> responseItems =
                new ArrayList<>();

        for (OrderItem item : items) {

            responseItems.add(

                    new OrderItemResponse(

                            item.getProduct().getId(),

                            item.getQuantity(),

                            item.getPrice(),

                            item.getTotalPrice()

                    )

            );

        }

        return mapToResponse(
                order,
                responseItems
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersByUserId(
            Long userId
    ) {

        User user =
                userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        List<Order> orders =
                orderRepository.findByUser(user);

        List<OrderResponse> responses =
                new ArrayList<>();

        for (Order order : orders) {

            List<OrderItem> items =
                    orderItemRepository.findByOrder(order);

            List<OrderItemResponse> responseItems =
                    new ArrayList<>();

            for (OrderItem item : items) {

                responseItems.add(

                        new OrderItemResponse(

                                item.getProduct().getId(),

                                item.getQuantity(),

                                item.getPrice(),

                                item.getTotalPrice()

                        )

                );

            }

            responses.add(

                    mapToResponse(
                            order,
                            responseItems
                    )

            );

        }

        return responses;
    }

    @Override
    public void cancelOrder(
            Long orderId,
            Long userId
    ) {

        Order order =
                orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found"));

        if (!order.getUser().getId().equals(userId)) {

            throw new BadRequestException(
                    "You are not authorized to cancel this order"
            );

        }

        if (order.getStatus() == OrderStatus.CANCELLED) {

            throw new BadRequestException(
                    "Order already cancelled"
            );

        }

        if (order.getStatus() == OrderStatus.DELIVERED) {

            throw new BadRequestException(
                    "Delivered order cannot be cancelled"
            );

        }

        order.setStatus(OrderStatus.CANCELLED);

        orderRepository.save(order);
    }

    private OrderResponse mapToResponse(
            Order order,
            List<OrderItemResponse> items
    ) {

        return new OrderResponse(

                order.getId(),
                order.getUser().getId(),
                order.getSubtotal(),
                order.getTax(),
                order.getTotalAmount(),
                order.getShippingAddress(),
                order.getPincode(),
                order.getMobile(),
                order.getStatus(),
                order.getPaymentMethod().name(),
                order.getOrderDate(),
                items

        );
    }

}