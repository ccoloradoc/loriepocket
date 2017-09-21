FROM nginx
RUN rm -rf /etc/nginx/conf.d/* && apt-get update && apt-get -y install nano curl
COPY nginx.conf /etc/nginx/nginx.conf
COPY services/* /etc/nginx/conf.d/
EXPOSE 80
