import { Construct, SecretValue } from '@aws-cdk/core';
import { Vpc, SubnetType } from '@aws-cdk/aws-ec2';
import {
  BuildSpec,
  ComputeType,
  LinuxBuildImage,
  Project,
  Source,
  EventAction,
  FilterGroup,
  GitHubSourceCredentials,
} from '@aws-cdk/aws-codebuild';

import { BaseStack } from './BaseStack';
import { CONFIG } from './Config';

const {
  appName,
  github: { owner, repo, branch },
  aws: {
    secretManager,
  },
} = CONFIG;

export class CodeBuildStack extends BaseStack {
  public readonly vpc: Vpc;

  constructor(scope: Construct, id: string, vpc: Vpc) {
    super(scope, id);

    this.vpc = vpc;

    new GitHubSourceCredentials(this, 'CodeBuildGitHubCreds', {
      accessToken: SecretValue.secretsManager(secretManager.name, { jsonField: 'GITHUB_TOKEN' }),
    });

    const gitHubSource = Source.gitHub({
      owner,
      repo,
      webhook: true, // optional, default: true if `webhookFilteres` were provided, false otherwise
      webhookFilters: [
        FilterGroup.inEventOf(EventAction.PUSH).andBranchIs(branch),
      ],
    });

    // CodeBuild Action
    new Project(this, 'StandaloneCodeBuild', {
      projectName: `${appName}StandaloneCodeBuild`,
      description: `Standalone CodeBuild Project for ${appName}`,
      source: gitHubSource,
      buildSpec: BuildSpec.fromSourceFilename('buildspec.yml'),
      environment: {
        buildImage: LinuxBuildImage.STANDARD_4_0,
        computeType: ComputeType.SMALL,
        privileged: true,
      },
      subnetSelection: { subnetType: SubnetType.PRIVATE },
      vpc: this.vpc,
    });
  }
}
