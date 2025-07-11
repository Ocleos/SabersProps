import * as SelectPrimitive from '@rn-primitives/select';
import type * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Check } from '~ui/lib/icons/Check';
import { ChevronDown } from '~ui/lib/icons/ChevronDown';
import { ChevronUp } from '~ui/lib/icons/ChevronUp';
import { cn } from '~ui/lib/utils';

type Option = SelectPrimitive.Option;

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

function SelectTrigger({
  ref,
  className,
  children,
  ...props
}: SelectPrimitive.TriggerProps & {
  ref?: React.RefObject<SelectPrimitive.TriggerRef>;
  children?: React.ReactNode;
}) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'flex h-10 native:h-12 flex-row items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-muted-foreground text-sm web:ring-offset-background web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2 [&>span]:line-clamp-1',
        props.disabled && 'web:cursor-not-allowed opacity-50',
        className,
      )}
      ref={ref}
      {...props}>
      {children}
      <ChevronDown aria-hidden={true} className='text-foreground opacity-50' size={16} />
    </SelectPrimitive.Trigger>
  );
}

/**
 * Platform: WEB ONLY
 */
function SelectScrollUpButton({ className, ...props }: SelectPrimitive.ScrollUpButtonProps) {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn('flex web:cursor-default items-center justify-center py-1', className)}
      {...props}>
      <ChevronUp className='text-foreground' size={14} />
    </SelectPrimitive.ScrollUpButton>
  );
}

/**
 * Platform: WEB ONLY
 */
function SelectScrollDownButton({ className, ...props }: SelectPrimitive.ScrollDownButtonProps) {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn('flex web:cursor-default items-center justify-center py-1', className)}
      {...props}>
      <ChevronDown className='text-foreground' size={14} />
    </SelectPrimitive.ScrollDownButton>
  );
}

function SelectContent({
  className,
  children,
  position = 'popper',
  portalHost,
  ...props
}: SelectPrimitive.ContentProps & {
  ref?: React.RefObject<SelectPrimitive.ContentRef>;
  className?: string;
  portalHost?: string;
}) {
  const { open } = SelectPrimitive.useRootContext();

  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <SelectPrimitive.Overlay style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}>
        <Animated.View className='z-50' entering={FadeIn} exiting={FadeOut}>
          <SelectPrimitive.Content
            className={cn(
              'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] rounded-md border border-border bg-popover px-1 py-2 shadow-foreground/10 shadow-md',
              position === 'popper' &&
                'data-[side=left]:-translate-x-1 data-[side=top]:-translate-y-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1',
              open ? 'web:zoom-in-95 web:fade-in-0 web:animate-in' : 'web:zoom-out-95 web:fade-out-0 web:animate-out',
              className,
            )}
            position={position}
            {...props}>
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
              className={cn(
                'p-1',
                position === 'popper' &&
                  'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
              )}>
              {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
          </SelectPrimitive.Content>
        </Animated.View>
      </SelectPrimitive.Overlay>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.LabelProps & {
  ref?: React.RefObject<SelectPrimitive.LabelRef>;
}) {
  return (
    <SelectPrimitive.Label
      className={cn(
        'py-1.5 pr-2 native:pb-2 native:pl-10 pl-8 font-exo2Semibold native:text-base text-popover-foreground text-sm',
        className,
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.ItemProps & {
  ref?: React.RefObject<SelectPrimitive.ItemRef>;
}) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'web:group relative flex w-full web:cursor-default web:select-none flex-row items-center rounded-sm native:py-2 py-1.5 pr-2 native:pl-10 pl-8 web:outline-none web:hover:bg-accent/50 web:focus:bg-accent active:bg-accent',
        props.disabled && 'web:pointer-events-none opacity-50',
        className,
      )}
      {...props}>
      <View className='absolute left-2 native:left-3.5 flex h-3.5 w-3.5 items-center justify-center native:pt-px'>
        <SelectPrimitive.ItemIndicator>
          <Check className='text-popover-foreground' size={16} strokeWidth={3} />
        </SelectPrimitive.ItemIndicator>
      </View>
      <SelectPrimitive.ItemText className='native:text-base text-popover-foreground text-sm web:group-focus:text-accent-foreground' />
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.SeparatorProps & {
  ref?: React.RefObject<SelectPrimitive.SeparatorRef>;
}) {
  return <SelectPrimitive.Separator className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />;
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type Option,
};
