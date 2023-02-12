#!/usr/bin/env sh

set -e

npm run build

cd docs/.vitepress/dist

# 如果是发布到自定义域名
# echo 'notewk.com' > CNAME

git init
git add .
git commit -m "github actions"
git checkout -b gh-pages
git push -f git@github.com:kevinwu21/KeeDoc.git gh-pages

cd -
rm -rf docs/node_modules
rm -rf docs/.vitepress/dist