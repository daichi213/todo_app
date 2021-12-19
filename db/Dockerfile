FROM mysql:5.7
RUN apt-get update \
    && apt-get install -y locales \
    && locale-gen ja_JP.UTF-8 \
    && localedef -f UTF-8 -i ja_JP ja_JP \
    && echo "export LANG=ja_JP.UTF-8" >> ~/.bashrc
