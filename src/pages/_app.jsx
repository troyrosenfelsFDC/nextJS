import { SessionProvider, useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: false });

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("azure-ad", null, { prompt: "none" });
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "unauthenticated") {
    return <div>You do not have access to this super secret content</div>;
  }

  return children;
}
