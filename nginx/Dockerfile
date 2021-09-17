FROM nginx:alpine

COPY ./default.conf /etc/nginx/conf.d/default.conf
ADD ./cert/localhost.pem /etc/certs/localhost.pem
ADD ./cert/localhost-key.pem /etc/certs/localhost-key.pem