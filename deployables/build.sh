#!/bin/bash

# prereqs:
# - docker (with compose)
# - jq
#
# tested on
# - ubuntu 24.04

HERE=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ROOT=$( dirname "$HERE" )
CODE="${ROOT}/kbh"
PROJ="${CODE}/.next/standalone"

# build "production" app
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output#automatically-copying-traced-files
COMPOSE_FILE="${ROOT}/compose.yaml"
docker compose --file "$COMPOSE_FILE" \
  run --build --rm --remove-orphans --user kbh dev \
    bash -c "
      . ~/.nvm/nvm.sh
      cd kbh
      npm ci
      npm run build
      cp -r public .next/standalone/
      cp -r .next/static .next/standalone/.next/
    "

# build API docker image
VER=$(cat "${PROJ}/package.json" | jq -r '.version')

docker build --tag kbh-api:${VER} --file "$HERE/Dockerfile.API" "$PROJ"
docker build --tag kbh-ui:${VER} --file "$HERE/Dockerfile.API" "$PROJ"