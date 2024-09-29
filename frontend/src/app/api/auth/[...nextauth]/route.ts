import NextAuth, { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      async authorize(credentials: any, req: any) {
        const res = await fetch('http://localhost:1337/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const data = await res.json();
        if (res.ok && data.accessToken) {
          return Promise.resolve({
            ...data,
          });
        } else {
          console.log('data auth message', data.message);
          // return Promise.resolve(null);
          throw new Error(data.message);
        }
      },
    } as any),
  ],

  callbacks: {
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.userType = token.userType;
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.refreshToken = user.refreshToken;
        token.accessToken = user.accessToken;
        token.name = user.name;
        token.email = user.email;
        token.userId = user.userId;
        token.userType = user.userType;
        token.expiresIn = Date.now() + parseInt(user.expires_in) * 1000 - 2000;
      }
      if (Date.now() < token.expiresIn) {
        return token;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
};
// export const getServerAuthSession = async () =>
//   await getServerSession(authOptions);

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
