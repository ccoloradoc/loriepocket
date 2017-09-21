FROM nginx
RUN rm -rf /etc/nginx/conf.d/* && apt-get update && apt-get -y install nano curl
COPY dist/ /www/data
COPY config/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
