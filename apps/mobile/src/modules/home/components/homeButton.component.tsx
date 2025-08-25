import { Text, THEME, useColorScheme } from '@sabersprops/ui';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import type { Module } from '~src/modules/home/models/module.model';

interface IHomeButtonProps {
  module: Module;
}

const HomeButton: React.FC<IHomeButtonProps> = ({ module }) => {
  const router = useRouter();

  const { colorScheme } = useColorScheme();

  return (
    <View className='w-1/2 p-2'>
      <View className='overflow-hidden rounded-xl'>
        <LinearGradient colors={[THEME.colors.primary[500], THEME.colors.primary[700]]}>
          <Pressable className='h-40 items-center justify-center gap-4 p-4' onPress={() => router.push(module.route)}>
            <module.icon color={THEME[colorScheme].primaryForeground} size={48} />
            <Text className='text-primary-foreground' variant='h3'>
              {module.title}
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
};

export default HomeButton;
