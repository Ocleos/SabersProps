import { HStack, ScrollView, Text } from '@gluestack-ui/themed';

const AurebeshTranslatorModal: React.FC = () => {
  const alphabetCode = Array.from(Array(26)).map((_, i) => i + 65);
  const alphabet = alphabetCode.map((x) => String.fromCharCode(x));

  return (
    <ScrollView flex={1}>
      {alphabet.map((character) => (
        <HStack flex={1} gap={'$4'} justifyContent='center' key={character}>
          <Text size='4xl' fontFamily='Aurebesh' textTransform='lowercase' w='$20' textAlign='center'>
            {character}
          </Text>
          <Text size='4xl' w='$20' textAlign='center' mt={'-$0.5'}>
            {character}
          </Text>
        </HStack>
      ))}
    </ScrollView>
  );
};

export default AurebeshTranslatorModal;
