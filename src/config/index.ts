import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  port: process.env.port,
  database: process.env.DATABASE_URL,

  // jwt
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpires: process.env.JWT_EXPIRES as string,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET as string,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET as string,
  jwtRefreshExpires: process.env.JWT_REFRESH_EXPIRES as string,

  saltRound: process.env.SALT_ROUND,
  node_dev: process.env.NODE_ENV,
  cors_origin: process.env.CORS_ORIGIN,
};
export default config;
