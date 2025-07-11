import * as TabsPrimitive from '@rn-primitives/tabs';
import type * as React from 'react';
import { TextClassContext } from '~ui/components/ui/text';
import { cn } from '~ui/lib/utils';

const Tabs = TabsPrimitive.Root;

function TabsList({
  className,
  ...props
}: TabsPrimitive.ListProps & {
  ref?: React.RefObject<TabsPrimitive.ListRef>;
}) {
  return (
    <TabsPrimitive.List
      className={cn(
        'web:inline-flex h-10 native:h-12 w-full flex-row items-center justify-center rounded-md bg-muted p-1 native:px-1.5',
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: TabsPrimitive.TriggerProps & {
  ref?: React.RefObject<TabsPrimitive.TriggerRef>;
}) {
  const { value } = TabsPrimitive.useRootContext();
  return (
    <TextClassContext.Provider
      value={cn(
        'font-exo2Medium native:text-base text-muted-foreground text-sm web:transition-all',
        value === props.value && 'text-foreground',
      )}>
      <TabsPrimitive.Trigger
        className={cn(
          'inline-flex flex-1 items-center justify-center web:whitespace-nowrap rounded-md px-3 py-1.5 font-exo2Medium text-sm shadow-none web:ring-offset-background web:transition-all web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
          props.disabled && 'web:pointer-events-none opacity-50',
          props.value === value && 'bg-card shadow-foreground/10 shadow-lg',
          className,
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function TabsContent({
  className,
  ...props
}: TabsPrimitive.ContentProps & {
  ref?: React.RefObject<TabsPrimitive.ContentRef>;
}) {
  return (
    <TabsPrimitive.Content
      className={cn(
        'web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
