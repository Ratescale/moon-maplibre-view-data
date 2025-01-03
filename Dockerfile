FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションコードをコピー
COPY app/server.js /app/

# ポート公開
EXPOSE 8080

# サーバーを起動
CMD ["npm", "start"]
