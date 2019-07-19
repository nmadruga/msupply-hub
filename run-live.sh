#!/bin/bash

yarn --cwd ./server start > ./server/output.log &
yarn --cwd ./app start > ./app/output.log & 