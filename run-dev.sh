#!/bin/bash

yarn --cwd ./server dev > ./server/output.log &
yarn --cwd ./app dev > ./app/output.log & 