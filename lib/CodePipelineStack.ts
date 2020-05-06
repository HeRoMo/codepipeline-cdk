import { Construct, SecretValue } from '@aws-cdk/core';
import { Vpc, SubnetType } from '@aws-cdk/aws-ec2';
import { Artifact, Pipeline } from '@aws-cdk/aws-codepipeline';
import {
  BuildSpec,
  ComputeType,
  LinuxBuildImage,
  PipelineProject,
} from '@aws-cdk/aws-codebuild';
import {
  CodeBuildAction,
  GitHubSourceAction,
  GitHubTrigger,
} from '@aws-cdk/aws-codepipeline-actions';

import { BaseStack } from './BaseStack';
import { CONFIG } from './Config';

const {
  appName,
  github: { owner, repo, branch },
  aws: {
    secretManager,
  },
} = CONFIG;

export class CodePipelineStack extends BaseStack {
  public readonly vpc: Vpc;

  constructor(scope: Construct, id: string, vpc: Vpc) {
    super(scope, id);

    this.vpc = vpc;

    // Source Action
    const sourceOutput = new Artifact('sourceActionOutput');
    const sourceAction = new GitHubSourceAction({
      actionName: 'GitHubSource',
      owner,
      repo,
      branch,
      oauthToken: SecretValue.secretsManager(secretManager.name, { jsonField: 'GITHUB_TOKEN' }),
      output: sourceOutput,
      trigger: GitHubTrigger.WEBHOOK,
    });

    // CodeBuild Action
    const buildArtifact = new Artifact('buildActionOutput');
    const project = new PipelineProject(this, 'CodeBuild', {
      projectName: `${appName}CodeBuild`,
      description: `CodeBuild Project for ${appName}`,
      buildSpec: BuildSpec.fromSourceFilename('buildspec.yml'),
      environment: {
        buildImage: LinuxBuildImage.STANDARD_4_0,
        computeType: ComputeType.SMALL,
        privileged: true,
      },
      subnetSelection: { subnetType: SubnetType.PRIVATE },
      vpc: this.vpc,
    });

    const buildAction = new CodeBuildAction({
      actionName: 'BuildAction',
      project,
      input: sourceOutput,
      outputs: [buildArtifact],
    });

    new Pipeline(this, 'Pipeline', {
      pipelineName: `${appName}Pipeline`,
      stages: [
        {
          stageName: 'Source',
          actions: [sourceAction],
        },
        {
          stageName: 'Build',
          actions: [buildAction],
        },
      ],
    });
  }
}
