import { ListGroup } from 'heroui-native/list-group';
import { RadioGroup } from 'heroui-native/radio-group';
import { Switch } from 'heroui-native/switch';
import { Typography } from 'heroui-native/text';
import { LanguagesIcon, SunMoonIcon } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '~src/components/ui/icon.component';
import { VStack } from '~src/components/ui/stack.component';
import { changeLanguage } from '~src/i18n.config';
import { useColorScheme } from '~src/theme/useColorScheme.hooks';

const SettingsSection = () => {
  const { t } = useTranslation();

  const { isDarkScheme, toggleColorScheme } = useColorScheme();

  const [selectedLanguage, setSelectedLanguage] = useState('fr');

  const onLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    changeLanguage(value);
  };

  return (
    <VStack className='gap-2'>
      <Typography type='h6'>{t('profile:SETTINGS.TITLE')}</Typography>

      <ListGroup>
        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <Icon as={SunMoonIcon} />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>{t('profile:SETTINGS.DARK_THEME')}</ListGroup.ItemTitle>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix>
            <Switch isSelected={isDarkScheme} onSelectedChange={toggleColorScheme}>
              <Switch.Thumb />
            </Switch>
          </ListGroup.ItemSuffix>
        </ListGroup.Item>

        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <Icon as={LanguagesIcon} />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>{t('profile:SETTINGS.LANGUAGES.DESCRIPTION')}</ListGroup.ItemTitle>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix>
            <RadioGroup onValueChange={onLanguageChange} value={selectedLanguage}>
              <RadioGroup.Item value='fr'>{t('profile:SETTINGS.LANGUAGES.FRENCH')}</RadioGroup.Item>
              <RadioGroup.Item value='en'>{t('profile:SETTINGS.LANGUAGES.ENGLISH')}</RadioGroup.Item>
            </RadioGroup>
          </ListGroup.ItemSuffix>
        </ListGroup.Item>
      </ListGroup>
    </VStack>
  );
};

export default SettingsSection;
