import jwt, { VerifyErrors } from 'jsonwebtoken';

const SECRET: string = process.env.JWT_SECRET || 'secret';

export async function verifyToken(token: string): Promise<object | undefined> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (err: VerifyErrors | null, decoded: object | undefined) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
}
