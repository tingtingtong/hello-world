package com.example;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Logger;
import java.util.logging.Level;

/**
 * Optimized Registration Servlet with performance enhancements
 */
public class RegistrationServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final Logger LOGGER = Logger.getLogger(RegistrationServlet.class.getName());
    
    @Override
    public void init() throws ServletException {
        super.init();
        LOGGER.info("RegistrationServlet initialized successfully");
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // Set response headers for performance and security
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);
        
        // Extract and validate parameters
        String name = sanitizeInput(request.getParameter("Name"));
        String mobile = sanitizeInput(request.getParameter("mobile"));
        String email = sanitizeInput(request.getParameter("email"));
        String password = request.getParameter("psw");
        
        PrintWriter out = response.getWriter();
        
        try {
            // Basic validation
            if (isNullOrEmpty(name) || isNullOrEmpty(mobile) || 
                isNullOrEmpty(email) || isNullOrEmpty(password)) {
                
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"success\":false,\"message\":\"All fields are required\"}");
                return;
            }
            
            // Validate email format
            if (!isValidEmail(email)) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"success\":false,\"message\":\"Invalid email format\"}");
                return;
            }
            
            // Validate mobile format
            if (!isValidMobile(mobile)) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"success\":false,\"message\":\"Invalid mobile number\"}");
                return;
            }
            
            // Simulate registration process (replace with actual business logic)
            boolean registrationSuccess = processRegistration(name, mobile, email, password);
            
            if (registrationSuccess) {
                response.setStatus(HttpServletResponse.SC_OK);
                out.print("{\"success\":true,\"message\":\"Registration successful! Welcome to DevOps Learning.\"}");
                LOGGER.info("User registered successfully: " + email);
            } else {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                out.print("{\"success\":false,\"message\":\"Registration failed. Please try again.\"}");
            }
            
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error processing registration", e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"success\":false,\"message\":\"Internal server error\"}");
        } finally {
            if (out != null) {
                out.close();
            }
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        response.getWriter().print("{\"success\":false,\"message\":\"GET method not allowed\"}");
    }
    
    /**
     * Sanitize input to prevent XSS attacks
     */
    private String sanitizeInput(String input) {
        if (input == null) return null;
        return input.trim()
                   .replaceAll("<", "&lt;")
                   .replaceAll(">", "&gt;")
                   .replaceAll("\"", "&quot;")
                   .replaceAll("'", "&#x27;")
                   .replaceAll("/", "&#x2F;");
    }
    
    /**
     * Check if string is null or empty
     */
    private boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }
    
    /**
     * Validate email format
     */
    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@" +
                           "(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email.matches(emailRegex);
    }
    
    /**
     * Validate mobile number format
     */
    private boolean isValidMobile(String mobile) {
        String mobileRegex = "^[0-9]{10,15}$";
        return mobile.matches(mobileRegex);
    }
    
    /**
     * Process registration (placeholder for actual business logic)
     */
    private boolean processRegistration(String name, String mobile, String email, String password) {
        // This is where you would:
        // 1. Hash the password
        // 2. Store user data in database
        // 3. Send confirmation email
        // 4. Handle any business logic
        
        // For now, we'll simulate success
        try {
            // Simulate some processing time
            Thread.sleep(100);
            return true;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return false;
        }
    }
}