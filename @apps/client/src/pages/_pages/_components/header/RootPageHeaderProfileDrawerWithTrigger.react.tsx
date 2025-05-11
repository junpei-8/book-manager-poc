/** @jsxImportSource react */

import '../../../../styles/vaul.css';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@libs/shadcn/components/ui/avatar';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@libs/shadcn/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@libs/shadcn/components/ui/dropdown-menu';
import { Separator } from '@libs/shadcn/components/ui/separator';
import { cn } from '@libs/shadcn/lib/utils';
import { useStore } from '@nanostores/react';
import {
  BellIcon,
  BookIcon,
  LockIcon,
  LogOutIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
  SunMoonIcon,
} from 'lucide-react';
import { memo, useState } from 'react';
import { HapticButton } from '../../../../components/button/HapticButton.react';
import { DrawerMain } from '../../../../components/drawer/DrawerMain.react';
import { SkeletonOverlay } from '../../../../components/skeleton/SkeletonOverlay.react';
import { useHydration } from '../../../../hooks/hydrate';
import { auth as authClient, authStore } from '../../../../utils/auth';
import { windowSize } from '../../../../utils/window-size';

/**
 * @jsx
 */
export function RootPageHeaderProfileDrawerWithTrigger() {
  const hasHydrated = useHydration();

  // プロフィールドロワーの表示状態
  const [isOpen, setIsOpen] = useState(false);

  // ログインしているユーザー情報
  const { data: auth } = authStore.react.use();

  // プロフィールページが表示できる条件
  const canDisplay = !!auth;

  // デスクトップの場合は右方向に表示
  const isRightDirection = useStore(windowSize.store.breakpoint.sm);

  return (
    <Drawer
      open={canDisplay && isOpen}
      onOpenChange={setIsOpen}
      shouldScaleBackground
      direction={isRightDirection ? 'right' : 'bottom'}
    >
      <DrawerTrigger asChild>
        <HapticButton variant="ghost" className="h-10 w-10 rounded-full p-0">
          <UserAvatar
            className="h-full w-full shadow-lg"
            user={hasHydrated && auth ? auth.user : undefined}
          />
        </HapticButton>
      </DrawerTrigger>
      <DrawerContent
        className={cn(
          'bg-accent text-accent-foreground',
          isRightDirection ? 'vaul-rounded-right' : '!max-h-[90svh]',
        )}
      >
        {canDisplay ? (
          <DrawerMain>
            <div className="flex flex-col items-center p-4">
              <UserAvatar className="mb-2 h-20 w-20" user={auth?.user} />
              <DrawerTitle asChild>
                <h2 className="mb-1 text-2xl font-bold">{auth?.user.name}</h2>
              </DrawerTitle>
              <DrawerDescription className="text-sm text-muted-foreground">
                {auth?.user.email}
              </DrawerDescription>
            </div>

            <div className="flex flex-col items-center gap-4 p-4">
              <div className="w-full rounded-xl border bg-card text-card-foreground">
                <ThemeSettingButton />
                <Separator className="dark:bg-input" />
                <HapticButton
                  variant="ghost"
                  scalable={false}
                  className="relative w-full rounded-t-none rounded-b-xl"
                >
                  <BellIcon className="absolute left-4 size-4" />
                  <span>通知設定</span>
                </HapticButton>
              </div>

              <div className="w-full rounded-xl border bg-card text-card-foreground">
                <HapticButton
                  variant="ghost"
                  scalable={false}
                  className="relative w-full rounded-t-xl rounded-b-none"
                >
                  <BookIcon className="absolute left-4 size-4" />
                  <span>利用規約</span>
                </HapticButton>
                <Separator className="dark:bg-input" />
                <HapticButton
                  variant="ghost"
                  scalable={false}
                  className="relative w-full rounded-t-none rounded-b-xl"
                >
                  <LockIcon className="absolute left-4 size-4" />
                  <span>プライバシーポリシー</span>
                </HapticButton>
              </div>
            </div>

            <div className="mt-auto p-4">
              <Separator className="dark:bg-input" />
            </div>

            <div className="p-4">
              <HapticButton
                className="relative w-full"
                variant="destructive"
                onClick={() => {
                  authClient.signOut();
                }}
              >
                <LogOutIcon className="absolute left-4 size-4" />
                <span>ログアウト</span>
              </HapticButton>
            </div>
          </DrawerMain>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
}

/** @ignore */
const UserAvatar = memo(function UserAvatar({
  user,
  className,
}: {
  user?: { image?: string | null; name?: string | null };
  className?: string;
}) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const avatarClass = user
    ? cn('opacity-0', hasLoaded ? 'fade-in-animation' : null)
    : undefined;

  return (
    <Avatar className={cn('relative bg-accent', className)}>
      {user ? (
        <AvatarImage
          className={avatarClass}
          src={user.image || ''}
          alt={user.name || ''}
          onLoad={() => setHasLoaded(true)}
        />
      ) : null}
      {user ? ( //
        <AvatarFallback className={avatarClass} />
      ) : null}
      <SkeletonOverlay hidden={hasLoaded} />
    </Avatar>
  );
});

/** @ignore */
const ThemeSettingButton = memo(() => {
  const [theme, setTheme] = useState(window.__THEME__.setting.get());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <HapticButton
          variant="ghost"
          scalable={false}
          className="relative w-full rounded-t-xl rounded-b-none"
        >
          <SunMoonIcon className="absolute left-4 size-4" />
          <span>テーマを切り替える</span>
        </HapticButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuCheckboxItem
          checked={theme === 'light'}
          onCheckedChange={() => {
            setTheme('light');
            window.__THEME__.value.set('light');
          }}
        >
          <SunIcon className="size-4" />
          <span>ライト</span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === 'dark'}
          onCheckedChange={() => {
            setTheme('dark');
            window.__THEME__.value.set('dark');
          }}
        >
          <MoonIcon className="size-4" />
          <span>ダーク</span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === 'system'}
          onCheckedChange={() => {
            setTheme('system');
            window.__THEME__.value.set('system');
          }}
        >
          <MonitorIcon className="size-4" />
          <span>システム</span>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
