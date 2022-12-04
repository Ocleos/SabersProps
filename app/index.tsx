import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {
  return (
    <View>
      <Text>First page</Text>
      <Link href="/stats">Stats</Link>
    </View>
  );
}
