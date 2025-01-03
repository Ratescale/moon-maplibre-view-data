FROM node:18-alpine

# pmtilesをインストール
RUN npm install -g @protomaps/pmtiles

# 作業ディレクトリを設定
WORKDIR /app

# サーバーファイルをコピー
COPY app/server.js /app/server.js

# ポート公開
EXPOSE 8080

# サーバーを起動
CMD ["node", "server.js"]
