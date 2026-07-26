package com.cdac.farmermarketplace.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cdac.farmermarketplace.dto.request.PlaceOrderRequest;
import com.cdac.farmermarketplace.dto.response.OrderResponse;
import com.cdac.farmermarketplace.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

	@Override
	public OrderResponse placeOrder(PlaceOrderRequest request) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<OrderResponse> getOrdersByUserId(Long userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public OrderResponse getOrderById(Long orderId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void cancelOrder(Long orderId) {
		// TODO Auto-generated method stub
		
	}

}