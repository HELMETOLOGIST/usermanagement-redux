import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://127.0.0.1:8000',
            changeOrigin: true,
        })
    );
};

// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');

// const app = express();

// app.use(
//   '/api',
//   createProxyMiddleware({
//     target: 'http://127.0.0.1:8000',
//     changeOrigin: true,
//   }),
// );

// app.listen(3000);