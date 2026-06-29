import { useThemeColor } from 'heroui-native/hooks';
import { Typography } from 'heroui-native/text';
import { cn } from 'heroui-native/utils';
import { useTranslation } from 'react-i18next';
import { View, type ViewProps } from 'react-native';
import BlasterIcon from '~src/assets/icons/blaster.icon';
import CostumeIcon from '~src/assets/icons/costume.icon';
import LightsabersIcon from '~src/assets/icons/lightsabers.icon';
import { HStack, VStack } from '~src/components/ui/stack.component';
import { type PropState, propStates } from '~src/modules/collection/types/propState.type';
import { PropType } from '~src/modules/collection/types/propType.type';
import type { Repartition } from '~src/modules/collection/types/repartition.type';

type RepartitionTableProps = {
  data: Repartition;
};

const Cell: React.FC<{ className?: string } & ViewProps> = ({ className, children }) => {
  return (
    <View className={cn(['w-1/5 items-center justify-center border border-border p-2', className])}>{children}</View>
  );
};

const RepartitionTable: React.FC<RepartitionTableProps> = ({ data }) => {
  const { t } = useTranslation();

  const [foregroundColor] = useThemeColor(['foreground']);

  return (
    <VStack>
      <HStack>
        <Cell />

        <Cell>
          <LightsabersIcon color={foregroundColor} height={24} width={24} />
        </Cell>

        <Cell>
          <BlasterIcon color={foregroundColor} height={24} width={24} />
        </Cell>

        <Cell>
          <CostumeIcon color={foregroundColor} height={24} width={24} />
        </Cell>

        <Cell>
          <Typography weight='bold'>{t('common:COMMON.TOTAL')}</Typography>
        </Cell>
      </HStack>

      {Object.keys(data.states).map((stateValue) => {
        const state: PropState = Number(stateValue);

        return (
          <HStack key={`state${state}`}>
            <Cell className={cn(propStates[state].colorScheme.bg, 'items-start')}>
              <Typography className={propStates[state].colorScheme.text} type='body-xs'>
                {propStates[state].label}
              </Typography>
            </Cell>

            {data.states[state].values.map((value, index) => (
              <Cell key={`valueType${PropType[index + 1]}`}>
                <Typography>{value}</Typography>
              </Cell>
            ))}

            <Cell>
              <Typography>{data.states[state].total}</Typography>
            </Cell>
          </HStack>
        );
      })}

      <HStack>
        <Cell>
          <Typography weight='bold'>{t('common:COMMON.TOTAL')}</Typography>
        </Cell>

        {data.types.map((value, index) => (
          <Cell key={`totalType${PropType[index + 1]}`}>
            <Typography>{value}</Typography>
          </Cell>
        ))}

        <Cell>
          <Typography>{data.total}</Typography>
        </Cell>
      </HStack>
    </VStack>
  );
};

export default RepartitionTable;
