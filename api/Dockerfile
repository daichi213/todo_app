FROM golang:1.16-alpine
# FROM golang:1.16-buster
COPY . /go/src/api/
WORKDIR /go/src/api/
# go.modとgo.sumファイルに必要なツールを記述してインポートする
RUN apk update \
  && apk add --no-cache git alpine-sdk gnupg \
  && go get github.com/gin-gonic/gin \
  && go get gorm.io/gorm \
  && go get github.com/go-sql-driver/mysql \
  && go get gorm.io/driver/mysql \
  && go install github.com/x-motemen/gore/cmd/gore@latest \
  # && go get github.com/go-delve/delve/cmd/dlv@v1.5.0 \
  && go get github.com/go-delve/delve/cmd/dlv@latest \
  && go get github.com/stretchr/testify \
  && go get github.com/DATA-DOG/go-sqlmock \
  && go get -u github.com/ory/dockertest/v3 \
  && go get -u github.com/ory/dockertest/docker \
  && go get github.com/rubenv/sql-migrate/...
RUN curl -L https://github.com/golang-migrate/migrate/releases/download/v4.11.0/migrate.linux-amd64.tar.gz | tar xvz \
    && mv migrate.linux-amd64 /usr/bin/migrate
ENV PATH $PATH:/usr/bin/migrate
