import { NuxtAuthHandler } from "#auth";

// Extend the Session and User types to include additional properties
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: User;
  }
  interface User {
    id?: string;
  }
}

export default NuxtAuthHandler({
  // your authentication configuration here!
  secret: useRuntimeConfig().authSecret,
  providers: [
    {
      id: "gakunin",
      name: "GakuNin RDM",
      type: "oauth",
      clientId: useRuntimeConfig().gakuninClientId,
      clientSecret: useRuntimeConfig().gakuninClientSecret,
      authorization: {
        url: "https://accounts.rdm.nii.ac.jp/oauth2/authorize",
        params: {
          client_id: useRuntimeConfig().gakuninClientId,
          scope: "osf.full_read osf.full_write",
          response_type: "code",
          redirect_uri: `${
            useRuntimeConfig().nextAuthUrl
          }/api/auth/callback/gakunin`,
        },
      },
      token: {
        url: "https://accounts.rdm.nii.ac.jp/oauth2/token",
        async request(context) {
          const body = new URLSearchParams({
            client_id: useRuntimeConfig().gakuninClientId,
            client_secret: useRuntimeConfig().gakuninClientSecret,
            code: context.params.code || "",
            grant_type: "authorization_code",
            redirect_uri: `${
              useRuntimeConfig().nextAuthUrl
            }/api/auth/callback/gakunin`,
          });

          const res = await fetch(
            "https://accounts.rdm.nii.ac.jp/oauth2/token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body,
            }
          );

          const json = await res.json();

          if (!res.ok) {
            throw new Error(`Token request failed: ${res.statusText}`);
          }

          return { tokens: json };
        },
      },
      userinfo: {
        url: "https://api.rdm.nii.ac.jp/v2/users/me/",
        async request(context) {
          const res = await fetch("https://api.rdm.nii.ac.jp/v2/users/me/", {
            headers: {
              Authorization: `Bearer ${context.tokens.access_token}`,
            },
          });

          const profile = await res.json();

          if (!res.ok) {
            throw new Error("Failed to fetch user profile");
          }

          return profile;
        },
      },
      profile(profile) {
        if (!profile.data || !profile.data.attributes) {
          throw new Error("Invalid user profile structure");
        }

        return {
          id: profile.data.id || "unknown",
          name: profile.data.attributes.full_name || "No Name",
          email: profile.data.attributes.email || "No Email",
        };
      },
    },
  ],
  callbacks: {
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = {
        ...session.user,
        id: token.id as string,
      };
      return session;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});
