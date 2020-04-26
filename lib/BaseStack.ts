import { Construct, Stack } from '@aws-cdk/core';

import { CONFIG } from './Config';

const { aws: { region, account } } = CONFIG;
const env = { region, account };

export class BaseStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id, { env, stackName: `${CONFIG.appName}${id}` });
  }
}
