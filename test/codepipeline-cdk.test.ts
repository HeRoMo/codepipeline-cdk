import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CodepipelineCdk from '../lib/codepipeline-cdk-stack';

test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CodepipelineCdk.CodepipelineCdkStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(matchTemplate({
    Resources: {},
  }, MatchStyle.EXACT));
});
