import * as config from 'config';

export interface ConfigDefinition {
  appName: string;
  aws: AwsConfig;
  github: GithubConfig;
}

interface AwsConfig {
  account: string;
  region: string;
  secretManager: {
    name: string;
  }
}

interface GithubConfig {
  owner: string;
  repo: string;
  branch: string;
}

const CONFIG: ConfigDefinition = {
  appName: config.get<string>('appName'),
  aws: config.get<AwsConfig>('aws'),
  github: config.get<GithubConfig>('github'),
};

export { CONFIG };
