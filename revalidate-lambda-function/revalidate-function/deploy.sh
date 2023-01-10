#!/usr/bin/env bash

set -e

cfn-lint template.yaml

sam build

sam package --s3-bucket edgarp-dev-website-artifacts --output-template-file output.yaml

sam deploy --template-file output.yaml --stack-name revalidate-function --capabilities CAPABILITY_IAM

rm output.yaml