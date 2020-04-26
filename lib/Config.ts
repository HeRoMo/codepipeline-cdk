import * as config from 'config';

export interface ConfigDefinition {
  appName: string;
  aws: AwsConfig;
}

interface AwsConfig {
  account: string;
  region: string;
}

const CONFIG: ConfigDefinition = {
  appName: config.get<string>('projectName'),
  aws: config.get<AwsConfig>('aws'),
};

export { CONFIG };
