/** @jsxImportSource react */

import '../../styles/vaul.css';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@libs/shadcn/components/ui/drawer';
import { cn } from '@libs/shadcn/lib/utils';
import { useStore } from '@nanostores/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { HapticButton } from '../../components/button/HapticButton.react';
import { DrawerMain } from '../../components/drawer/DrawerMain.react';
import { auth as authClient, authStore } from '../../utils/auth';
import { windowSize } from '../../utils/window-size';

/**
 * @jsx
 */
export function LoginDrawer() {
  const { data: auth, hasLoaded: hasLoadedUser } = authStore.react.use();

  // デスクトップの場合は右方向に表示
  const isRightDirection = useStore(windowSize.store.breakpoint.sm);

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  async function loginGoogle() {
    try {
      setIsLoggingIn(true);

      const response = await authClient.signIn.social({
        provider: 'google',
        callbackURL: `${window.location.origin}`,
        // disableRedirect: true,
        // fetchOptions: {
        //   query: {
        //     access_type: 'offline',
        //     prompt: 'consent',
        //   },
        // },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (response.data.url) {
        window.location.href = response.data.url;
      }

      // ↓ ログイン失敗時にトーストを表示
    } catch {
      setIsLoggingIn(false);
      toast.error('ログインに失敗しました。');
    }
  }

  return (
    <Drawer
      open={hasLoadedUser && !auth}
      handleOnly
      shouldScaleBackground
      direction={isRightDirection ? 'right' : 'bottom'}
    >
      <DrawerContent
        className={cn(
          'bg-accent text-accent-foreground dark:bg-background [&>div:first-child]:hidden',
          isRightDirection ? 'vaul-rounded-right' : 'h-[100%] !max-h-[90svh]',
        )}
      >
        <DrawerHeader>
          <DrawerTitle className="text-center text-sm font-bold">
            ログイン
          </DrawerTitle>
        </DrawerHeader>

        <DrawerMain innerProps={{ className: 'm-auto justify-center' }}>
          <div className="flex flex-col items-center p-4">
            <h2 className="size-[240px] text-xl font-semibold md:size-[320px]">
              <img alt="Book Manager" src="/logo.png" className="size-full" />
            </h2>
          </div>

          <div className="p-4"></div>

          <div className="flex flex-col p-4">
            <HapticButton
              className="rounded-full"
              variant="outline"
              size="lg"
              disabled={isLoggingIn}
              onClick={loginGoogle}
            >
              <img alt="Google" src="/svg/google.svg" className="h-4 w-4" />
              <span>Google</span>
            </HapticButton>
          </div>

          <div className="px-4 py-8 md:pb-24"></div>
        </DrawerMain>
      </DrawerContent>
    </Drawer>
  );
}
