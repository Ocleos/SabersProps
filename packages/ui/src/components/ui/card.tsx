import type * as React from 'react';
import { Text, type TextProps, View, type ViewProps } from 'react-native';
import { TextClassContext } from '~ui/components/ui/text';
import { cn } from '~ui/lib/utils';

function Card({
  className,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return (
    <View
      className={cn('rounded-lg border border-border bg-card shadow-foreground/10 shadow-sm', className)}
      {...props}
    />
  );
}

function CardHeader({
  className,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return <View className={cn('flex flex-col space-y-1.5 p-4', className)} {...props} />;
}

function CardTitle({
  className,
  ...props
}: TextProps & {
  ref?: React.RefObject<Text>;
}) {
  return (
    <Text
      aria-level={3}
      className={cn('font-exo2SemiBold text-2xl text-card-foreground leading-none tracking-tight', className)}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: TextProps & {
  ref?: React.RefObject<Text>;
}) {
  return <Text className={cn('font-exo2 text-muted-foreground text-sm', className)} {...props} />;
}

function CardContent({
  className,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return (
    <TextClassContext.Provider value='text-card-foreground'>
      <View className={cn('p-4 pt-0', className)} {...props} />
    </TextClassContext.Provider>
  );
}

function CardFooter({
  className,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return <View className={cn('flex flex-row items-center p-4 pt-0', className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
