FROM alpine

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
    echo "开始更新系统..." && \
    apk update && \
    apk upgrade && \
    apk add nginx vim git && \
    mkdir -p /run/nginx/
COPY ./config/default.conf /etc/nginx/conf.d/
COPY ./dist /usr/share/nginx/html/mobile

# 开放80端口
EXPOSE 8080

# 启动nginx命令
CMD ["nginx", "-g", "daemon off;"]
