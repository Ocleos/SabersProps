import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { H3 } from '~ui/typography';
import type { Module } from '../models/module.models';

interface IHomeButtonProps {
  module: Module;
}

const HomeButton: React.FC<IHomeButtonProps> = ({ module }) => {
  const router = useRouter();

  return (
    <View className='w-1/2 p-2'>
      <View className='overflow-hidden rounded-xl'>
        <LinearGradient colors={[colorsTheme.primary[500], colorsTheme.primary[700]]}>
          <Pressable onPress={() => router.push(module.route)} className='h-40 items-center justify-center gap-4 p-4'>
            <module.icon size={48} color={colorsTheme.textForeground} />
            <H3 className='text-primary-foreground'>{module.title}</H3>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
};

export default HomeButton;
