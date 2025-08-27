package com.example.filters;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Filter to add appropriate cache control headers for static resources
 * This improves performance by reducing unnecessary server requests
 */
public class CacheControlFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // No initialization needed
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        String requestURI = httpRequest.getRequestURI();
        
        // Set cache headers based on file type
        if (requestURI.endsWith(".css") || requestURI.endsWith(".js")) {
            // CSS and JS files - cache for 1 year with versioning
            httpResponse.setHeader("Cache-Control", "public, max-age=31536000, immutable");
            httpResponse.setHeader("Expires", "Thu, 31 Dec 2024 23:59:59 GMT");
        } else if (requestURI.endsWith(".png") || requestURI.endsWith(".jpg") || 
                   requestURI.endsWith(".jpeg") || requestURI.endsWith(".gif") || 
                   requestURI.endsWith(".ico") || requestURI.endsWith(".svg")) {
            // Images - cache for 1 year
            httpResponse.setHeader("Cache-Control", "public, max-age=31536000, immutable");
            httpResponse.setHeader("Expires", "Thu, 31 Dec 2024 23:59:59 GMT");
        } else if (requestURI.endsWith(".woff") || requestURI.endsWith(".woff2") || 
                   requestURI.endsWith(".ttf") || requestURI.endsWith(".eot")) {
            // Fonts - cache for 1 year
            httpResponse.setHeader("Cache-Control", "public, max-age=31536000, immutable");
            httpResponse.setHeader("Expires", "Thu, 31 Dec 2024 23:59:59 GMT");
        } else if (requestURI.endsWith(".pdf") || requestURI.endsWith(".zip") || 
                   requestURI.endsWith(".doc") || requestURI.endsWith(".docx")) {
            // Documents - cache for 1 month
            httpResponse.setHeader("Cache-Control", "public, max-age=2592000");
            httpResponse.setHeader("Expires", "Thu, 30 Nov 2024 23:59:59 GMT");
        } else {
            // HTML and other dynamic content - no cache
            httpResponse.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            httpResponse.setHeader("Pragma", "no-cache");
            httpResponse.setHeader("Expires", "0");
        }
        
        // Add security headers
        httpResponse.setHeader("X-Content-Type-Options", "nosniff");
        httpResponse.setHeader("X-Frame-Options", "DENY");
        httpResponse.setHeader("X-XSS-Protection", "1; mode=block");
        
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        // No cleanup needed
    }
}