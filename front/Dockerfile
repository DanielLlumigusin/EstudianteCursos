# Usamos una imagen base de Nginx
FROM nginx:alpine

# Copiamos los archivos de tu proyecto al directorio que Nginx usa para servir archivos estáticos
COPY ./frontend /usr/share/nginx/html

# Exponemos el puerto 5500 en lugar del predeterminado 80
EXPOSE 5500
