#!/bin/bash

# prereqs:
# - k3d
# - kubectl
# - jq
#
# tested on
# - ubuntu 24.04

HERE=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ROOT=$( dirname "$HERE" )
PROJ="${ROOT}/kbh"
CLUSTER="kanban-homework"
HOST_PORT="8000"

k3d cluster create "${CLUSTER}" \
  --port "${HOST_PORT}:80@loadbalancer" \
  --agents 2

VER=$(cat "${PROJ}/package.json" | jq -r '.version')
k3d image import "kbh-api:${VER}" "kbh-ui:${VER}" --cluster "${CLUSTER}"

export KUBECONFIG=$(k3d kubeconfig write "${CLUSTER}")
kubectl create -f "${ROOT}/deployables/resources.yaml"

echo ""
echo "http://localhost:${HOST_PORT}"