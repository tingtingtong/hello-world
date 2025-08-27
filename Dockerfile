FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml /app/pom.xml
COPY server/pom.xml /app/server/pom.xml
COPY webapp/pom.xml /app/webapp/pom.xml
COPY server/src /app/server/src
COPY webapp/src /app/webapp/src
RUN mvn -B -q -DskipTests package

FROM tomcat:9.0-jdk17-temurin
# Enable production optimizations
ENV CATALINA_OPTS="-Xms128m -Xmx256m -XX:+UseG1GC -Djava.security.egd=file:/dev/./urandom"

# Copy optimized server.xml with compression and resource caching
COPY ./server.xml /usr/local/tomcat/conf/server.xml

# Deploy built WAR
COPY --from=build /app/webapp/target/webapp.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8080
CMD ["catalina.sh", "run"]
