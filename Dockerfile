# Multi-stage build for optimized production image
FROM maven:3.9.9-openjdk-11-slim AS build

# Set working directory
WORKDIR /app

# Copy POM files first for better caching
COPY pom.xml .
COPY server/pom.xml server/
COPY webapp/pom.xml webapp/

# Download dependencies (this layer will be cached if POM files don't change)
RUN mvn dependency:go-offline -B

# Copy source code
COPY server/src server/src
COPY webapp/src webapp/src

# Build the application with optimizations
RUN mvn clean package -DskipTests -B && \
    ls -la webapp/target/

# Production stage with optimized Tomcat
FROM tomcat:10.1-jdk11-openjdk-slim

# Install optimization tools
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gzip \
    brotli && \
    rm -rf /var/lib/apt/lists/*

# Remove default webapps for security and size optimization
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy built application
COPY --from=build /app/webapp/target/*.war /usr/local/tomcat/webapps/ROOT.war

# Optimize Tomcat configuration
COPY docker/server.xml /usr/local/tomcat/conf/server.xml
COPY docker/tomcat-users.xml /usr/local/tomcat/conf/tomcat-users.xml

# Create optimized startup script
RUN echo '#!/bin/bash\n\
# Pre-compress static assets\n\
find /usr/local/tomcat/webapps -name "*.css" -exec gzip -9 -c {} > {}.gz \;\n\
find /usr/local/tomcat/webapps -name "*.js" -exec gzip -9 -c {} > {}.gz \;\n\
find /usr/local/tomcat/webapps -name "*.html" -exec gzip -9 -c {} > {}.gz \;\n\
# Start Tomcat with optimized JVM settings\n\
export CATALINA_OPTS="-Xms512m -Xmx1024m -XX:+UseG1GC -XX:+UseCompressedOops -Djava.security.egd=file:/dev/./urandom"\n\
exec catalina.sh run\n' > /usr/local/tomcat/bin/optimized-startup.sh && \
    chmod +x /usr/local/tomcat/bin/optimized-startup.sh

# Set proper permissions
RUN chown -R tomcat:tomcat /usr/local/tomcat

# Switch to non-root user for security
USER tomcat

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

# Expose port
EXPOSE 8080

# Use optimized startup script
CMD ["/usr/local/tomcat/bin/optimized-startup.sh"]
