import { keys, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import { View, type ViewProps } from 'react-native';
import BlasterIcon from '~src/assets/icons/blaster.icon';
import DeathTrooperIcon from '~src/assets/icons/deathTrooper.icon';
import LightsabersIcon from '~src/assets/icons/lightsabers.icon';
import { cn } from '~src/components/_ui/lib/utils';
import { type PropState, propStates } from '~src/models/propState.model';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { useColorScheme } from '~src/theme/useColorTheme.theme';
import { HStack, VStack } from '~ui/stack';
import { Text } from '~ui/text';
import type { Repartition } from '../../models/repartition.model';

interface IRepartitionTableProps {
  data: Repartition;
}

const Cell: React.FC<{ colorScheme?: string } & ViewProps> = ({ colorScheme, children }) => {
  const bgColor = colorScheme ? `bg-${colorScheme}-200` : '';

  return (
    <View className={cn(['w-1/5 items-center justify-center border border-border p-2', bgColor])}>{children}</View>
  );
};

const RepartitionTable: React.FC<IRepartitionTableProps> = ({ data }) => {
  const { t } = useTranslation(['common']);

  const { colorScheme } = useColorScheme();

  return (
    <VStack>
      <HStack>
        <Cell />

        <Cell>
          <LightsabersIcon color={colorsTheme.foreground[colorScheme]} />
        </Cell>

        <Cell>
          <BlasterIcon color={colorsTheme.foreground[colorScheme]} />
        </Cell>

        <Cell>
          <DeathTrooperIcon color={colorsTheme.foreground[colorScheme]} />
        </Cell>

        <Cell>
          <Text className='font-exo2Bold'>{t('common:COMMON.TOTAL')}</Text>
        </Cell>
      </HStack>

      {map(keys(data.states), (stateValue) => {
        const state: PropState = Number(stateValue);

        return (
          <HStack key={`state${state}`}>
            <Cell colorScheme={propStates[state].colorScheme}>
              <Text className={cn(['text-xs', `text-${propStates[state].colorScheme}-600`])}>
                {propStates[state].label}
              </Text>
            </Cell>

            {map(data.states[state].values, (value, index) => (
              <Cell key={`valueType${index}`}>
                <Text>{value}</Text>
              </Cell>
            ))}

            <Cell>
              <Text>{data.states[state].total}</Text>
            </Cell>
          </HStack>
        );
      })}

      <HStack>
        <Cell>
          <Text className='font-exo2Bold'>{t('common:COMMON.TOTAL')}</Text>
        </Cell>

        {map(data.types, (value, index) => (
          <Cell key={`totalType${index}`}>
            <Text>{value}</Text>
          </Cell>
        ))}

        <Cell>
          <Text>{data.total}</Text>
        </Cell>
      </HStack>
    </VStack>
  );
};

export default RepartitionTable;
