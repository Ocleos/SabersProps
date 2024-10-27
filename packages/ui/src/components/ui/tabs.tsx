import * as TabsPrimitive from '@rn-primitives/tabs';
import * as React from 'react';
import { TextClassContext } from '~ui/components/ui/text';
import { cn } from '~ui/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<TabsPrimitive.ListRef, TabsPrimitive.ListProps>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'web:inline-flex h-10 native:h-12 w-full flex-row items-center justify-center rounded-md bg-muted p-1 native:px-1.5',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<TabsPrimitive.TriggerRef, TabsPrimitive.TriggerProps>(
  ({ className, ...props }, ref) => {
    const { value } = TabsPrimitive.useRootContext();
    return (
      <TextClassContext.Provider
        value={cn(
          'font-exo2Medium native:text-base text-muted-foreground text-sm web:transition-all',
          value === props.value && 'text-foreground',
        )}>
        <TabsPrimitive.Trigger
          ref={ref}
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
  },
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<TabsPrimitive.ContentRef, TabsPrimitive.ContentProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        'web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    />
  ),
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
