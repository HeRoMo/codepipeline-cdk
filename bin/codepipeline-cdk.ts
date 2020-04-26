#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';

import { VpcStack } from '../lib/VpcStack';
import { CodePipelineStack } from '../lib/CodePipelineStack';

import { CONFIG } from '../lib/Config';

console.info(JSON.stringify({ CONFIG }, null, 2));

const app = new cdk.App();
const vpcStack = new VpcStack(app, 'VpcStack');
new CodePipelineStack(app, 'CodePipelineStack', vpcStack.vpc);
