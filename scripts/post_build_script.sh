#!/bin/bash

set -x

# Log into CodePush
code-push login --accessKey $CODE_PUSH_ACCESS_KEY

# Deploy using code-push
cd app/
code-push release-react $PROJECT_NAME ios || :
code-push release-react $PROJECT_NAME android || :
