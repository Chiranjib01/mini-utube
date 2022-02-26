export const API_URL =
  process.env.NODE_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
    : 'http://localhost:5000/api';
export const APP_NAME = 'MiniUTube';
