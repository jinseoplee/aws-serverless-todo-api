# AWS Serverless Todo API

This project contains the source code and supporting files for a serverless Todo API built using the AWS Serverless Application Model (AWS SAM).
It includes the following folders and files:

- `src` - Code for Lambda function handlers, services, models, and utilities.
- `events` - Invocation events that you can use to invoke the functions.
- `env.json` - Environment configuration for local testing.
- `template.yaml` - A template that defines the application's AWS resources.

This application uses several AWS resources, including Lambda functions, an API Gateway API, an Amazon DynamoDB table, and Amazon Cognito for authentication. These resources are defined in the template.yaml file.

## Prerequisites

You must have the following installed:

- AWS SAM CLI - [Install the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).
- Node.js - [Install Node.js 20](https://nodejs.org/en/), including the npm package management tool.
- Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community).

## Build and Deploy

To build and deploy, run the following commands in your shell:

```bash
sam build
sam deploy --guided
```

The first command will build the source of your application. The second command will package and deploy your application to AWS, with a series of prompts:

- **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
- **AWS Region**: The AWS region you want to deploy your app to.
- **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
- **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modifies IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
- **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

## Use the AWS SAM CLI to build and test locally

Build your application by using the `sam build` command.

```bash
sam build
```

The AWS SAM CLI installs dependencies that are defined in `package.json`, creates a deployment package, and saves it in the `.aws-sam/build` folder.

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
sam local invoke CreateTodoFunction --event events/event-create-todo.json
sam local invoke GetTodoByIdFunction --event events/event-get-todo-by-id.json
```

The AWS SAM CLI can also emulate your application's API. Use the `sam local start-api` command to run the API locally on port 3000.

```bash
sam local start-api
curl http://localhost:3000/
```

The AWS SAM CLI reads the application template to determine the API's routes and the functions that they invoke. The `Events` property on each function's definition includes the route and method for each path.

```yaml
Events:
  Api:
    Type: Api
    Properties:
      Path: /todos
      Method: POST
```

**Note**: Local function invocations use environment variables defined in `env.json`.

## Cleanup

To delete the deployed application that you created, use the AWS CLI.

```bash
sam delete
```
