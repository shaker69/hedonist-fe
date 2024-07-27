import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const auth: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' }
      },
      authorize(credentials) {
        if (
          credentials?.username === process.env.SYSTEM_USER_USERNAME &&
          credentials?.password === process.env.SYSTEM_USER_PASSWORD
        ) {
          return { id: '1', name: process.env.SYSTEM_USER_USERNAME };
        }

        return null;
      }
    }),
  ]
};

export default auth;
