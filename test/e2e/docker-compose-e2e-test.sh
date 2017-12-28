#!/bin/bash

set -euo pipefail

if [ "$1" != "undefined" ]; then

    if [ "$(uname)" == "Darwin" ]; then
        export DOCKER_HOST_IP="docker.for.mac.localhost"
    else
        export DOCKER_HOST_IP=$(ip -4 addr show docker0 | grep -Po 'inet \K[\d.]+')
    fi

    export DOCKER_PROXY=http://$DOCKER_HOST_IP:$1

fi

export RUN_AS_UID=$(id -u)

docker-compose up --build --exit-code-from e2e-test
docker-compose down
