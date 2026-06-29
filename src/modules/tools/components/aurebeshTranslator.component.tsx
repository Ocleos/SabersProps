import { Separator } from 'heroui-native/separator';
import { Typography } from 'heroui-native/text';
import { useTranslation } from 'react-i18next';
import AccordionWrapper from '~src/components/ui/accordionWrapper.component';
import { HStack, VStack } from '~src/components/ui/stack.component';

const AurebeshTranslator: React.FC = () => {
  // Generate an array of ASCII codes for uppercase letters (A-Z)
  const alphabetCode = Array.from(Array(26)).map((_, i) => i + 65);
  // Convert ASCII codes to characters
  const alphabet = alphabetCode.map((x) => String.fromCharCode(x));

  // Generate an array of ASCII codes for digits (0-9)
  const digitCodes = Array.from(Array(10)).map((_, i) => i + 48);
  // Convert ASCII codes to characters
  const digits = digitCodes.map((x) => String.fromCharCode(x));

  const { t } = useTranslation();

  const characterComponent = (character: string) => {
    return (
      <VStack key={character}>
        <Typography className='text-center font-aurebesh text-3xl lowercase'>{character}</Typography>
        <Typography className='text-center text-xl'>{character}</Typography>
      </VStack>
    );
  };

  return (
    <AccordionWrapper itemValue='aurebeshTranslator' title={t('tools:TOOLS.TRANSLATOR.TITLE')}>
      <VStack className='gap-4'>
        <HStack className='flex-wrap justify-evenly gap-4'>
          {alphabet.map((character: string) => characterComponent(character))}
        </HStack>

        <Separator />

        <HStack className='flex-wrap justify-evenly gap-4'>
          {digits.map((character: string) => characterComponent(character))}
        </HStack>
      </VStack>
    </AccordionWrapper>
  );
};

export default AurebeshTranslator;
