import { logger } from 'react-native-logs';

const LOG = logger.createLogger({
  async: true,
  dateFormat: 'local',
  severity: __DEV__ ? 'debug' : 'info',
});

export default LOG;
