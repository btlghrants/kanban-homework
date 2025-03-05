#!/bin/bash

# prereqs:
# - k3d
# - jq
#
# tested on
# - ubuntu 24.04

HERE=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ROOT=$( dirname "$HERE" )
CLUSTER="kanban-homework"

k3d cluster delete kanban-homework