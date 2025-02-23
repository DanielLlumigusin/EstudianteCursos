# Usamos la imagen oficial de OpenJDK 17 (ajusta según la versión de Java que necesites)
FROM openjdk:17-jdk-slim

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo JAR generado por Spring Boot y lo renombramos para simplificar
COPY target/curso-0.0.1-SNAPSHOT.jar curso.jar

# Exponemos el puerto correcto (8081 según tu configuración)
EXPOSE 8081

# Variables de entorno para la base de datos
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://postgres-cursos:5432/cursos
ENV SPRING_DATASOURCE_USERNAME=postgres
ENV SPRING_DATASOURCE_PASSWORD=P@SSWORD123

# Definimos opciones de la JVM
ENV LANG=C.UTF-8
ENV JAVA_OPTS=""

# Comando para ejecutar la aplicación con variables de entorno
CMD ["sh", "-c", "java $JAVA_OPTS -jar curso.jar"]
