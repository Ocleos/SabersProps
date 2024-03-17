import { Box, HStack, Heading, Icon, Text, VStack } from '@gluestack-ui/themed';
import { keys, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import type { ViewProps } from 'react-native';
import BlasterIcon from '~src/assets/icons/blaster.icon';
import DeathTrooperIcon from '~src/assets/icons/deathTrooper.icon';
import LightsabersIcon from '~src/assets/icons/lightsabers.icon';
import { type PropState, propStates } from '~src/models/propState.model';
import type { Repartition } from '../../models/repartition.model';

type RepartitionTableProps = {
  data: Repartition;
};

const Cell: React.FC<{ colorScheme?: string } & ViewProps> = ({ colorScheme, children }) => {
  return (
    <Box
      w={'$1/5'}
      borderWidth={'$1'}
      alignItems='center'
      justifyContent='center'
      p={'$2'}
      bg={colorScheme ? `$${colorScheme}200` : undefined}
      borderColor='$secondary500'>
      {children}
    </Box>
  );
};

const RepartitionTable: React.FC<RepartitionTableProps> = ({ data }) => {
  const { t } = useTranslation(['common']);

  return (
    <VStack>
      <HStack>
        <Cell />

        <Cell>
          <Icon as={LightsabersIcon} size='xl' />
        </Cell>

        <Cell>
          <Icon as={BlasterIcon} size='xl' />
        </Cell>

        <Cell>
          <Icon as={DeathTrooperIcon} size='xl' />
        </Cell>

        <Cell>
          <Heading size='xs'>{t('common:COMMON.TOTAL')}</Heading>
        </Cell>
      </HStack>

      {map(keys(data.states), (stateValue) => {
        const state: PropState = Number(stateValue);

        return (
          <HStack key={`state${state}`}>
            <Cell colorScheme={propStates[state].colorScheme}>
              <Text size='2xs' textAlign='center' color={`$${propStates[state].colorScheme}500`}>
                {propStates[state].label}
              </Text>
            </Cell>

            {map(data.states[state].values, (value, index) => (
              <Cell key={`valueType${index}`}>
                <Text size='xs' textAlign='center'>
                  {value}
                </Text>
              </Cell>
            ))}

            <Cell>
              <Text size='xs' textAlign='center'>
                {data.states[state].total}
              </Text>
            </Cell>
          </HStack>
        );
      })}

      <HStack>
        <Cell>
          <Heading size='xs'>{t('common:COMMON.TOTAL')}</Heading>
        </Cell>

        {map(data.types, (value, index) => (
          <Cell key={`totalType${index}`}>
            <Text size='xs' textAlign='center'>
              {value}
            </Text>
          </Cell>
        ))}

        <Cell>
          <Text size='xs' textAlign='center'>
            {data.total}
          </Text>
        </Cell>
      </HStack>
    </VStack>
  );
};

export default RepartitionTable;
