import AzureADProvider from "next-auth/providers/azure-ad";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const useSecureCookies = process.env.NEXTAUTH_URL.startsWith("https://");
const cookiePrefix = useSecureCookies ? "__Secure-" : "";
const secrets = JSON.parse(process.env.secrets);
// const hostName = Url(process.env.NEXTAUTH_URL).hostname;
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    AzureADProvider({
      clientId: secrets.azure.AZURE_AD_CLIENT_ID,
      clientSecret: secrets.azure.AZURE_AD_CLIENT_SECRET,
      tenantId: secrets.azure.AZURE_AD_TENANT_ID,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "None",
        path: "/",
        secure: true,
      },
    },
    callbackUrl: {
      name: `${cookiePrefix}-next-auth.callback-url`,
      options: {
        sameSite: "None",
        secure: true,
        path: "/",
      },
    },
    csrfToken: {
      name: `${cookiePrefix}-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        path: "/",
      },
    },
    pkceCodeVerifier: {
      name: `${cookiePrefix}-next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        path: "/",
        maxAge: 900,
        sameSite: "None",
        secure: true,
      },
    },
    state: {
      name: `${cookiePrefix}-next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: "None",
        path: "/",
        secure: true,
        maxAge: 900,
      },
    },
    nonce: {
      name: `${cookiePrefix}-next-auth.nonce`,
      options: {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        path: "/",
      },
    },
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn({ account, profile }) {
      console.log("Provider", account.provider);
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@example.com");
      } else if (account.provider === "discord") {
        return profile.email_verified && profile.email.endsWith("@example.com");
      } else if (account.provider === "github") {
        console.log(
          "Logged in using github",
          profile.email_verified,
          profile.email,
          account,
          profile,
        );
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};
export default NextAuth(authOptions);
