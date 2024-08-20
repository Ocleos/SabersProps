import { useTranslation } from 'react-i18next';
import { View, type ViewProps } from 'react-native';
import { cn } from '~rnr/lib/utils';
import { HStack, VStack } from '~rnr/ui/stack';
import { Text } from '~rnr/ui/text';
import BlasterIcon from '~src/assets/icons/blaster.icon';
import CostumeIcon from '~src/assets/icons/costume.icon';
import LightsabersIcon from '~src/assets/icons/lightsabers.icon';
import { type PropState, propStates } from '~src/models/propState.model';
import { PropType } from '~src/models/propType.model';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { useColorScheme } from '~src/theme/useColorTheme.theme';
import { DEFAULT_ICON_SIZE } from '~src/utils/icons.utils';
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
          <LightsabersIcon
            width={DEFAULT_ICON_SIZE}
            height={DEFAULT_ICON_SIZE}
            color={colorsTheme.foreground[colorScheme]}
          />
        </Cell>

        <Cell>
          <BlasterIcon
            width={DEFAULT_ICON_SIZE}
            height={DEFAULT_ICON_SIZE}
            color={colorsTheme.foreground[colorScheme]}
          />
        </Cell>

        <Cell>
          <CostumeIcon
            width={DEFAULT_ICON_SIZE}
            height={DEFAULT_ICON_SIZE}
            color={colorsTheme.foreground[colorScheme]}
          />
        </Cell>

        <Cell>
          <Text className='font-exo2Bold'>{t('common:COMMON.TOTAL')}</Text>
        </Cell>
      </HStack>

      {Object.keys(data.states).map((stateValue) => {
        const state: PropState = Number(stateValue);

        return (
          <HStack key={`state${state}`}>
            <Cell colorScheme={propStates[state].colorScheme}>
              <Text className={cn(['text-xs', `text-${propStates[state].colorScheme}-600`])}>
                {propStates[state].label}
              </Text>
            </Cell>

            {data.states[state].values.map((value, index) => (
              <Cell key={`valueType${PropType[index + 1]}`}>
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

        {data.types.map((value, index) => (
          <Cell key={`totalType${PropType[index + 1]}`}>
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
