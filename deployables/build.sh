#!/bin/bash

# prereqs:
# - docker (with compose)
#
# tested on
# - ubuntu 24.04

HERE=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ROOT=$( dirname "$HERE" )

# build "production" app
COMPOSE_FILE="${ROOT}/compose.yaml"
docker compose --file "$COMPOSE_FILE" \
  run --build --rm --remove-orphans --user kbh dev \
    bash -c "
      . ~/.nvm/nvm.sh
      cd kbh
      npm ci
      npm run build
    "