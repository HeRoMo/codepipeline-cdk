import * as config from 'config';

export interface ConfigDefinition {
  projectName: string;
  aws: AwsConfig;
}

interface AwsConfig {
  account: string;
  region: string;
}

const CONFIG: ConfigDefinition = {
  projectName: config.get<string>('projectName'),
  aws: config.get<AwsConfig>('aws'),
};

export { CONFIG };
