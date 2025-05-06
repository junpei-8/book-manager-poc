import { useStore } from '@nanostores/react';
import {
  PUBLIC_AUTH_API_BASE_PATH,
  PUBLIC_AUTH_API_BASE_URL,
} from 'astro:env/client';
import { createAuthClient as betterAuthClient } from 'better-auth/client';

/**
 * Auth client with Better Auth.
 */
export const auth = /*#__PURE__*/ betterAuthClient({
  baseURL: PUBLIC_AUTH_API_BASE_URL,
  basePath: PUBLIC_AUTH_API_BASE_PATH,
  fetchOptions: {
    credentials: 'include',
  },
}) as ReturnType<typeof betterAuthClient>;

/**
 * Auth store.
 */
export const authStore = /*#__PURE__*/ (() => {
  let current: ReturnType<(typeof auth.useSession)['get']>;
  let hasFetched = false;
  let hasLoaded = false;

  // Observe auth state changes
  auth.useSession.subscribe((auth) => {
    current = auth;

    if (!hasFetched && auth.isPending) {
      hasFetched = true;
      return;
    }

    if (!hasLoaded && hasFetched && !auth.isPending) {
      hasLoaded = true;
      return;
    }
  });

  return {
    current() {
      return current;
    },
    react: {
      use: function () {
        const store = useStore(auth.useSession);
        const isFetching = store.isPending;
        const isLoading = isFetching && !hasLoaded;
        return {
          data: store.data,
          error: store.error,
          isFetching,
          hasFetched,
          isLoading,
          hasLoaded,
        };
      },
    },
  };
})();
