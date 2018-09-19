#!/bin/bash

set -euo pipefail

if [ "$#" -eq 0 ] || [ "$#" -gt 2 ]; then
    printf "Illegal number of arguments: $#.\nExpected: 1 or 2\n  1. [Mandatory] Script file\n  2. [Optional] Proxy port\n"
    exit 1
fi

if [ "$#" -eq 2 ]; then

    if [ "$(uname)" == "Darwin" ]; then
        export DOCKER_HOST_IP="docker.for.mac.localhost"
    else
        export DOCKER_HOST_IP=$(ip -4 addr show docker0 | grep -Po 'inet \K[\d.]+')
    fi

    export DOCKER_PROXY=http://$DOCKER_HOST_IP:$2

fi

export RUN_AS_UID=$(id -u)
export TESTS_TO_RUN=$1

docker-compose --file=./docker/docker-compose.yml up --build --exit-code-from test
docker-compose --file=./docker/docker-compose.yml down
