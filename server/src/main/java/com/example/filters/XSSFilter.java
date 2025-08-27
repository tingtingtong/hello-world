package com.example.filters;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.IOException;
import java.util.regex.Pattern;

/**
 * XSS Protection Filter to prevent cross-site scripting attacks
 * This filter sanitizes user input to remove potentially malicious content
 */
public class XSSFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // No initialization needed
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        chain.doFilter(new XSSRequestWrapper((HttpServletRequest) request), response);
    }

    @Override
    public void destroy() {
        // No cleanup needed
    }

    /**
     * Wrapper class to sanitize request parameters
     */
    private static class XSSRequestWrapper extends HttpServletRequestWrapper {

        public XSSRequestWrapper(HttpServletRequest request) {
            super(request);
        }

        @Override
        public String[] getParameterValues(String parameter) {
            String[] values = super.getParameterValues(parameter);
            if (values == null) {
                return null;
            }

            int count = values.length;
            String[] encodedValues = new String[count];
            for (int i = 0; i < count; i++) {
                encodedValues[i] = stripXSS(values[i]);
            }

            return encodedValues;
        }

        @Override
        public String getParameter(String parameter) {
            String value = super.getParameter(parameter);
            if (value == null) {
                return null;
            }
            return stripXSS(value);
        }

        @Override
        public String getHeader(String name) {
            String value = super.getHeader(name);
            if (value == null) {
                return null;
            }
            return stripXSS(value);
        }

        /**
         * Strip XSS from input string
         */
        private String stripXSS(String value) {
            if (value == null) {
                return null;
            }

            // Remove null bytes
            value = value.replaceAll("\0", "");

            // Remove script tags and their content
            value = value.replaceAll("(?i)<script[^>]*>.*?</script>", "");
            value = value.replaceAll("(?i)<script[^>]*>", "");
            value = value.replaceAll("(?i)</script>", "");

            // Remove other potentially dangerous tags
            value = value.replaceAll("(?i)<iframe[^>]*>.*?</iframe>", "");
            value = value.replaceAll("(?i)<object[^>]*>.*?</object>", "");
            value = value.replaceAll("(?i)<embed[^>]*>.*?</embed>", "");
            value = value.replaceAll("(?i)<applet[^>]*>.*?</applet>", "");

            // Remove dangerous attributes
            value = value.replaceAll("(?i)javascript:", "");
            value = value.replaceAll("(?i)vbscript:", "");
            value = value.replaceAll("(?i)onload", "");
            value = value.replaceAll("(?i)onerror", "");
            value = value.replaceAll("(?i)onclick", "");
            value = value.replaceAll("(?i)onmouseover", "");
            value = value.replaceAll("(?i)onfocus", "");
            value = value.replaceAll("(?i)onblur", "");

            // Remove dangerous CSS expressions
            value = value.replaceAll("(?i)expression\\s*\\(", "");
            value = value.replaceAll("(?i)url\\s*\\(", "");

            // Remove SQL injection patterns
            value = value.replaceAll("(?i)union\\s+select", "");
            value = value.replaceAll("(?i)drop\\s+table", "");
            value = value.replaceAll("(?i)delete\\s+from", "");
            value = value.replaceAll("(?i)insert\\s+into", "");
            value = value.replaceAll("(?i)update\\s+set", "");

            // Remove common XSS vectors
            value = value.replaceAll("(?i)<[^>]*>", "");
            value = value.replaceAll("(?i)&lt;", "");
            value = value.replaceAll("(?i)&gt;", "");

            // Remove multiple spaces and newlines
            value = value.replaceAll("\\s+", " ");
            value = value.replaceAll("\\n+", "");
            value = value.replaceAll("\\r+", "");

            return value.trim();
        }
    }
}