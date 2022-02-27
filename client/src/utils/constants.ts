export const API_URL =
  process.env.NODE_ENV === 'production'
    ? `https://miniutube.vercel.app/api`
    : 'http://localhost:5000/api';
export const APP_NAME = 'MiniUTube';
