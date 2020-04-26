import { ConfigDefinition } from '../lib/Config';

const config: ConfigDefinition = {
  appName: 'CodePiplineLesson',
  aws: {
    account: process.env.AWS_ACCOUNT || '',
    region: 'ap-northeast-1',
  },
};

export default config;
