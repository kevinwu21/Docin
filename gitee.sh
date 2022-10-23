#!/usr/bin/env sh

set -e

npm run docs:build

cd docs/.vitepress/dist

msg="gitee actions 自动部署"

touch .gitignore
echo "/linux/command/" >> .gitignore
git init
git add .
git commit -m "${msg}"
git push -f https://gitee.com/kevinwu_21/notewk.git master:gh-pages

cd -
rm -rf docs/node_modules
rm -rf docs/.vitepress/dist