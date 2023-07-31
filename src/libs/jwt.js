import Jwt from 'jsonwebtoken';
import { config } from '../../config/index.js';

export const signPayload = (payload) => Jwt.sign(payload, config.jwt_key);
export const verifyPayload = (payload) => Jwt.verify(payload, config.jwt_key);
