FROM openjdk:8-jdk-alpine
RUN mkdir /portal
COPY ./target/**.jar ./portal
WORKDIR /portal
RUN ls
ENV JAVA_OPTS="-agentlib:jdwp=transport=dt_socket,address=8000,server=y,suspend=n"
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar demo-0.1.0-SNAPSHOT.jar" ]
