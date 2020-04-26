#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CodepipelineCdkStack } from '../lib/codepipeline-cdk-stack';

const app = new cdk.App();
new CodepipelineCdkStack(app, 'CodepipelineCdkStack');
