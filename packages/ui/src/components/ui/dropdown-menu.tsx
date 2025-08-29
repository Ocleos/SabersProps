import * as DropdownMenuPrimitive from '@rn-primitives/dropdown-menu';
import { Check, ChevronDown, ChevronRight, ChevronUp } from 'lucide-react-native';
import * as React from 'react';
import { Platform, type StyleProp, StyleSheet, Text, type TextProps, View, type ViewStyle } from 'react-native';
import { FadeIn } from 'react-native-reanimated';
import { FullWindowOverlay as RNFullWindowOverlay } from 'react-native-screens';
import { Icon } from '~ui/components/ui/icon';
import { NativeOnlyAnimatedView } from '~ui/components/ui/native-only-animated-view';
import { TextClassContext } from '~ui/components/ui/text';
import { cn } from '~ui/lib/utils';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  iconClassName,
  ...props
}: DropdownMenuPrimitive.SubTriggerProps &
  React.RefAttributes<DropdownMenuPrimitive.SubTriggerRef> & {
    children?: React.ReactNode;
    iconClassName?: string;
    inset?: boolean;
  }) {
  const { open } = DropdownMenuPrimitive.useSubContext();
  const icon = Platform.OS === 'web' ? ChevronRight : open ? ChevronUp : ChevronDown;
  return (
    <TextClassContext.Provider
      value={cn('select-none text-sm group-active:text-accent-foreground', open && 'text-accent-foreground')}>
      <DropdownMenuPrimitive.SubTrigger
        className={cn(
          'group flex flex-row items-center rounded-sm px-2 py-2 active:bg-accent sm:py-1.5',
          Platform.select({
            web: 'cursor-default outline-none focus:bg-accent focus:text-accent-foreground [&_svg]:pointer-events-none',
          }),
          open && 'bg-accent',
          inset && 'pl-8',
        )}
        {...props}>
        {children}
        <Icon as={icon} className={cn('ml-auto size-4 shrink-0 text-foreground', iconClassName)} />
      </DropdownMenuPrimitive.SubTrigger>
    </TextClassContext.Provider>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: DropdownMenuPrimitive.SubContentProps & React.RefAttributes<DropdownMenuPrimitive.SubContentRef>) {
  return (
    <NativeOnlyAnimatedView entering={FadeIn}>
      <DropdownMenuPrimitive.SubContent
        className={cn(
          'overflow-hidden rounded-md border border-border bg-popover p-1 shadow-black/5 shadow-lg',
          Platform.select({
            web: 'data-[state=closed]:fade-out-0 fade-in-0 data-[state=closed]:zoom-out-95 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) animate-in data-[state=closed]:animate-out',
          }),
          className,
        )}
        {...props}
      />
    </NativeOnlyAnimatedView>
  );
}

const FullWindowOverlay = Platform.OS === 'ios' ? RNFullWindowOverlay : React.Fragment;

function DropdownMenuContent({
  className,
  overlayClassName,
  overlayStyle,
  portalHost,
  ...props
}: DropdownMenuPrimitive.ContentProps &
  React.RefAttributes<DropdownMenuPrimitive.ContentRef> & {
    overlayStyle?: StyleProp<ViewStyle>;
    overlayClassName?: string;
    portalHost?: string;
  }) {
  return (
    <DropdownMenuPrimitive.Portal hostName={portalHost}>
      <FullWindowOverlay>
        <DropdownMenuPrimitive.Overlay
          className={overlayClassName}
          style={Platform.select({
            native: overlayStyle
              ? StyleSheet.flatten([StyleSheet.absoluteFill, overlayStyle as typeof StyleSheet.absoluteFill])
              : StyleSheet.absoluteFill,
            web: overlayStyle ?? undefined,
          })}>
          <NativeOnlyAnimatedView entering={FadeIn}>
            <TextClassContext.Provider value='text-popover-foreground'>
              <DropdownMenuPrimitive.Content
                className={cn(
                  'min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 shadow-black/5 shadow-lg',
                  Platform.select({
                    web: cn(
                      'fade-in-0 zoom-in-95 z-50 max-h-(--radix-context-menu-content-available-height) origin-(--radix-context-menu-content-transform-origin) animate-in cursor-default',
                      props.side === 'bottom' && 'slide-in-from-top-2',
                      props.side === 'top' && 'slide-in-from-bottom-2',
                    ),
                  }),
                  className,
                )}
                {...props}
              />
            </TextClassContext.Provider>
          </NativeOnlyAnimatedView>
        </DropdownMenuPrimitive.Overlay>
      </FullWindowOverlay>
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant,
  ...props
}: DropdownMenuPrimitive.ItemProps &
  React.RefAttributes<DropdownMenuPrimitive.ItemRef> & {
    className?: string;
    inset?: boolean;
    variant?: 'default' | 'destructive';
  }) {
  return (
    <TextClassContext.Provider
      value={cn(
        'select-none text-popover-foreground text-sm group-active:text-popover-foreground',
        variant === 'destructive' && 'text-destructive group-active:text-destructive',
      )}>
      <DropdownMenuPrimitive.Item
        className={cn(
          'group relative flex flex-row items-center gap-2 rounded-sm px-2 py-2 active:bg-accent sm:py-1.5',
          Platform.select({
            web: cn(
              'cursor-default outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none',
              variant === 'destructive' && 'focus:bg-destructive/10 dark:focus:bg-destructive/20',
            ),
          }),
          variant === 'destructive' && 'active:bg-destructive/10 dark:active:bg-destructive/20',
          props.disabled && 'opacity-50',
          inset && 'pl-8',
          className,
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: DropdownMenuPrimitive.CheckboxItemProps &
  React.RefAttributes<DropdownMenuPrimitive.CheckboxItemRef> & {
    children?: React.ReactNode;
  }) {
  return (
    <TextClassContext.Provider value='text-sm text-popover-foreground select-none group-active:text-accent-foreground'>
      <DropdownMenuPrimitive.CheckboxItem
        className={cn(
          'group relative flex flex-row items-center gap-2 rounded-sm py-2 pr-2 pl-8 active:bg-accent sm:py-1.5',
          Platform.select({
            web: 'cursor-default outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none',
          }),
          props.disabled && 'opacity-50',
          className,
        )}
        {...props}>
        <View className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
          <DropdownMenuPrimitive.ItemIndicator>
            <Icon
              as={Check}
              className={cn('size-4 text-foreground', Platform.select({ web: 'pointer-events-none' }))}
            />
          </DropdownMenuPrimitive.ItemIndicator>
        </View>
        {children}
      </DropdownMenuPrimitive.CheckboxItem>
    </TextClassContext.Provider>
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: DropdownMenuPrimitive.RadioItemProps &
  React.RefAttributes<DropdownMenuPrimitive.RadioItemRef> & {
    children?: React.ReactNode;
  }) {
  return (
    <TextClassContext.Provider value='text-sm text-popover-foreground select-none group-active:text-accent-foreground'>
      <DropdownMenuPrimitive.RadioItem
        className={cn(
          'group relative flex flex-row items-center gap-2 rounded-sm py-2 pr-2 pl-8 active:bg-accent sm:py-1.5',
          Platform.select({
            web: 'cursor-default outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none',
          }),
          props.disabled && 'opacity-50',
          className,
        )}
        {...props}>
        <View className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
          <DropdownMenuPrimitive.ItemIndicator>
            <View className='h-2 w-2 rounded-full bg-foreground' />
          </DropdownMenuPrimitive.ItemIndicator>
        </View>
        {children}
      </DropdownMenuPrimitive.RadioItem>
    </TextClassContext.Provider>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: DropdownMenuPrimitive.LabelProps &
  React.RefAttributes<DropdownMenuPrimitive.LabelRef> & {
    className?: string;
    inset?: boolean;
  }) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn('px-2 py-2 font-medium text-foreground text-sm sm:py-1.5', inset && 'pl-8', className)}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuPrimitive.SeparatorProps & React.RefAttributes<DropdownMenuPrimitive.SeparatorRef>) {
  return <DropdownMenuPrimitive.Separator className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />;
}

function DropdownMenuShortcut({ className, ...props }: TextProps & React.RefAttributes<Text>) {
  return <Text className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)} {...props} />;
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
