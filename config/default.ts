import { ConfigDefinition } from '../lib/Config';

const config: ConfigDefinition = {
  appName: 'CodePiplineLesson',
  aws: {
    account: process.env.AWS_ACCOUNT || '',
    region: 'ap-northeast-1',
    secretManager: {
      name: process.env.AWS_SECRET_MANAGER_NAME || '',
    },
  },
  github: {
    owner: 'HeRoMo',
    repo: 'codepipeline-cdk',
    branch: 'master',
  },
};

export default config;
