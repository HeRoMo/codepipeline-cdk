#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';

import { VpcStack } from '../lib/VpcStack';
import { CodePipelineStack } from '../lib/CodePipelineStack';

const app = new cdk.App();
const vpcStack = new VpcStack(app, 'VpcStack');
new CodePipelineStack(app, 'CodePipelineStack', vpcStack.vpc);
