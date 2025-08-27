package com.example.filters;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.concurrent.atomic.AtomicLong;
import java.util.logging.Logger;

/**
 * Performance Monitoring Filter to track request/response times
 * This filter helps identify performance bottlenecks and slow requests
 */
public class PerformanceMonitorFilter implements Filter {
    
    private static final Logger logger = Logger.getLogger(PerformanceMonitorFilter.class.getName());
    private static final AtomicLong requestCount = new AtomicLong(0);
    private static final AtomicLong totalResponseTime = new AtomicLong(0);
    private static final AtomicLong slowRequestCount = new AtomicLong(0);
    
    // Threshold for slow requests (in milliseconds)
    private static final long SLOW_REQUEST_THRESHOLD = 1000;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        logger.info("PerformanceMonitorFilter initialized");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        long startTime = System.currentTimeMillis();
        long requestId = requestCount.incrementAndGet();
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String requestURI = httpRequest.getRequestURI();
        String method = httpRequest.getMethod();
        String userAgent = httpRequest.getHeader("User-Agent");
        String remoteAddr = httpRequest.getRemoteAddr();
        
        // Log request start
        logger.info(String.format("Request #%d started: %s %s from %s", 
                requestId, method, requestURI, remoteAddr));
        
        try {
            // Process the request
            chain.doFilter(request, response);
            
            // Calculate response time
            long responseTime = System.currentTimeMillis() - startTime;
            totalResponseTime.addAndGet(responseTime);
            
            // Check if it's a slow request
            if (responseTime > SLOW_REQUEST_THRESHOLD) {
                slowRequestCount.incrementAndGet();
                logger.warning(String.format("Slow request #%d: %s %s took %dms", 
                        requestId, method, requestURI, responseTime));
            }
            
            // Log request completion
            logger.info(String.format("Request #%d completed: %s %s in %dms", 
                    requestId, method, requestURI, responseTime));
            
            // Add performance headers to response
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.setHeader("X-Request-ID", String.valueOf(requestId));
            httpResponse.setHeader("X-Response-Time", String.valueOf(responseTime));
            httpResponse.setHeader("X-Request-Count", String.valueOf(requestCount.get()));
            
            // Log performance metrics periodically
            if (requestId % 100 == 0) {
                logPerformanceMetrics();
            }
            
        } catch (Exception e) {
            long responseTime = System.currentTimeMillis() - startTime;
            logger.severe(String.format("Request #%d failed: %s %s after %dms - Error: %s", 
                    requestId, method, requestURI, responseTime, e.getMessage()));
            throw e;
        }
    }

    @Override
    public void destroy() {
        // Log final performance metrics
        logPerformanceMetrics();
        logger.info("PerformanceMonitorFilter destroyed");
    }
    
    /**
     * Log current performance metrics
     */
    private void logPerformanceMetrics() {
        long currentRequestCount = requestCount.get();
        long currentTotalResponseTime = totalResponseTime.get();
        long currentSlowRequestCount = slowRequestCount.get();
        
        if (currentRequestCount > 0) {
            double averageResponseTime = (double) currentTotalResponseTime / currentRequestCount;
            double slowRequestPercentage = (double) currentSlowRequestCount / currentRequestCount * 100;
            
            logger.info(String.format("Performance Metrics - Total Requests: %d, " +
                    "Average Response Time: %.2fms, Slow Requests: %d (%.2f%%)", 
                    currentRequestCount, averageResponseTime, currentSlowRequestCount, slowRequestPercentage));
        }
    }
    
    /**
     * Get current performance statistics
     */
    public static PerformanceStats getPerformanceStats() {
        return new PerformanceStats(
                requestCount.get(),
                totalResponseTime.get(),
                slowRequestCount.get()
        );
    }
    
    /**
     * Performance statistics data class
     */
    public static class PerformanceStats {
        private final long totalRequests;
        private final long totalResponseTime;
        private final long slowRequestCount;
        
        public PerformanceStats(long totalRequests, long totalResponseTime, long slowRequestCount) {
            this.totalRequests = totalRequests;
            this.totalResponseTime = totalResponseTime;
            this.slowRequestCount = slowRequestCount;
        }
        
        public long getTotalRequests() { return totalRequests; }
        public long getTotalResponseTime() { return totalResponseTime; }
        public long getSlowRequestCount() { return slowRequestCount; }
        
        public double getAverageResponseTime() {
            return totalRequests > 0 ? (double) totalResponseTime / totalRequests : 0.0;
        }
        
        public double getSlowRequestPercentage() {
            return totalRequests > 0 ? (double) slowRequestCount / totalRequests * 100 : 0.0;
        }
    }
}