# [Choice] Node.js version: 22-bullseye / 20-bullseye / 18-bullseye など
ARG VARIANT=20-bullseye
FROM mcr.microsoft.com/devcontainers/javascript-node:0-${VARIANT}

# 必要ツール & 日本語ロケール & Git 補完
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        locales \
        bash-completion \
        git \
        python3 \
        python3-pip \
    && rm -rf /var/lib/apt/lists/*

# 日本語ロケールを有効化
RUN sed -i 's/# *ja_JP.UTF-8 UTF-8/ja_JP.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen ja_JP.UTF-8

ENV LANG=ja_JP.UTF-8 \
    LANGUAGE=ja_JP:ja \
    LC_ALL=ja_JP.UTF-8

# bash 補完を有効化（Git などの補完が効く）
RUN if [ -f /usr/share/bash-completion/bash_completion ]; then \
      echo ". /usr/share/bash-completion/bash_completion" >> /etc/bash.bashrc; \
    fi

# Codex CLI をインストール（npm グローバル）
# 公式手順: npm install -g @openai/codex :contentReference[oaicite:0]{index=0}
RUN npm install -g @openai/codex@latest

# Serena MCP をインストール（Python）
# 一般的なインストール例: pip install serena-mcp :contentReference[oaicite:1]{index=1}
# uv 用に curl も入れておく
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        locales \
        bash-completion \
        git \
        python3 \
        python3-pip \
        curl \
    && rm -rf /var/lib/apt/lists/*

# uv インストール（公式スクリプト）
RUN curl -LsSf https://astral.sh/uv/install.sh | sh && \
    ln -s /root/.local/bin/uv* /usr/local/bin/

# 作業ディレクトリ
WORKDIR /workspace
