# Usamos la imagen oficial de OpenJDK 17 (ajusta según la versión de Java que necesites)
FROM openjdk:17-jdk-slim

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo JAR generado por Spring Boot y lo renombramos para simplificar
COPY target/micro-estudiante-0.0.1-SNAPSHOT.jar micro-estudiante.jar

# Exponemos el puerto correcto (8080 según tu configuración)
EXPOSE 8080

# Variables de entorno para la base de datos
ENV SPRING_DATASOURCE_URL=jdbc:mysql://mysql-estudiantes:3307/estudiantes
ENV SPRING_DATASOURCE_USERNAME=root
ENV SPRING_DATASOURCE_PASSWORD=root

# Definimos opciones de la JVM
ENV LANG=C.UTF-8
ENV JAVA_OPTS=""

# Comando para ejecutar la aplicación con variables de entorno
CMD ["sh", "-c", "java $JAVA_OPTS -jar micro-estudiante.jar"]
