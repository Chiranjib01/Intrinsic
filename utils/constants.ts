export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.VERCEL_URL;
