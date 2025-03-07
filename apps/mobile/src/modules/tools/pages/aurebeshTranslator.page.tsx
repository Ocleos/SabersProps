import { HStack, Text } from '@sabersprops/ui';

const AurebeshTranslator: React.FC = () => {
  const alphabetCode = [...Array.from(Array(26)).map((_, i) => i + 65), ...Array.from(Array(10)).map((_, i) => i + 48)];
  const alphabet = alphabetCode.map((x) => String.fromCharCode(x));

  return alphabet.map((character) => (
    <HStack className='justify-center gap-4' key={character}>
      <Text className='w-20 text-center font-aurebesh text-6xl lowercase'>{character}</Text>
      <Text className='w-20 text-center text-6xl'>{character}</Text>
    </HStack>
  ));
};

export default AurebeshTranslator;
