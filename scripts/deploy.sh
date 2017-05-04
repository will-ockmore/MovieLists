#!/bin/bash
set -e

npm run build

if [ ! -d "www" ]; then
  mkdir www
fi

cp -r build/** www/
cd www

if [ ! -d ".git" ]; then
  git init
  git remote add dokku dokku@willockmore.com:movielist
fi

git add .
git commit -m 'build'
git push dokku master
