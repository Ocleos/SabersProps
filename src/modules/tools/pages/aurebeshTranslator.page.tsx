import { map } from 'lodash';
import type React from 'react';
import { HStack } from '~rnr/ui/stack';
import { Text } from '~rnr/ui/text';

const AurebeshTranslator: React.FC = () => {
  const alphabetCode = [...Array.from(Array(26)).map((_, i) => i + 65), ...Array.from(Array(10)).map((_, i) => i + 48)];
  const alphabet = alphabetCode.map((x) => String.fromCharCode(x));

  return map(alphabet, (character) => (
    <HStack className='justify-center gap-4' key={character}>
      <Text className='w-20 text-center font-aurebesh text-6xl lowercase'>{character}</Text>
      <Text className='w-20 text-center text-6xl'>{character}</Text>
    </HStack>
  ));
};

export default AurebeshTranslator;
