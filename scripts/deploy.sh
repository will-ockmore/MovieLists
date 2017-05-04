#!/bin/bash
set -e

npm run build
cp -r build/** www/
cd www
git add .
git commit -m 'build'
git push dokku master
