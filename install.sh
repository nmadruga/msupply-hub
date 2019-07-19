#!/bin/bash

echo "****** Pulling latest master ******"
echo ""
git pull

echo ""
echo "****** Installing server dependencies *******"
echo ""
yarn --cwd ./server --modules-folder ./server/node_modules

echo ""
echo "****** Installing web dependencies *******"
echo ""
yarn --cwd ./app --modules-folder ./app/node_modules