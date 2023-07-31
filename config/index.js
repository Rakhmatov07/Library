import 'dotenv/config';
const { env } = process;

export const config = {
    port: env.PORT,
    dbUrl: env.DB_URL,
    jwt_key: env.JWT_KEY
};

