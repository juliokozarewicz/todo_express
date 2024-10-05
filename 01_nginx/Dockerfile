FROM nginx:alpine

COPY nginx.conf.template /etc/nginx/nginx.conf.template

# Instala o gettext para envsubst
RUN apk add --no-cache gettext

# Copia o script de entrada e dá permissão de execução
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Define o script de entrada
ENTRYPOINT ["/entrypoint.sh"]