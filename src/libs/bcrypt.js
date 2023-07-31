import { hash, compare } from 'bcrypt';

export const hashPayload = async(payload) => await hash(payload, 10);
export const comparePayload = async(payload, encryptedPayload) => await compare(payload, encryptedPayload);
