import { colorsTheme, H3 } from '@sabersprops/ui';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import type { Module } from '~src/modules/home/models/module.model';

interface IHomeButtonProps {
  module: Module;
}

const HomeButton: React.FC<IHomeButtonProps> = ({ module }) => {
  const router = useRouter();

  return (
    <View className='w-1/2 p-2'>
      <View className='overflow-hidden rounded-xl'>
        <LinearGradient colors={[colorsTheme.primary[500], colorsTheme.primary[700]]}>
          <Pressable className='h-40 items-center justify-center gap-4 p-4' onPress={() => router.push(module.route)}>
            <module.icon color={colorsTheme.textForeground} size={48} />
            <H3 className='text-primary-foreground'>{module.title}</H3>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
};

export default HomeButton;
