package com.cdac.farmermarketplace.service;
import com.cdac.farmermarketplace.dto.request.ForgotPasswordRequest;
import com.cdac.farmermarketplace.dto.request.LoginRequest;
import com.cdac.farmermarketplace.dto.request.RefreshTokenRequest;
import com.cdac.farmermarketplace.dto.request.RegisterRequest;
import com.cdac.farmermarketplace.dto.response.LoginResponse;
import com.cdac.farmermarketplace.dto.request.VerifyOtpRequest;
import com.cdac.farmermarketplace.dto.request.ResetPasswordRequest;


public interface AuthService {

    void register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    LoginResponse refreshToken(RefreshTokenRequest request);
    
    void forgotPassword(ForgotPasswordRequest request);
    
    void verifyOtp(VerifyOtpRequest request);
    
    void resetPassword(ResetPasswordRequest request);
    
    
}
