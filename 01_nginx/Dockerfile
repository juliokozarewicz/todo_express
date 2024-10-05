FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

RUN apk add --no-cache gettext

CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]