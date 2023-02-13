#!/usr/bin/env sh
set -e

npm run build

cd docs/.vitepress/dist

# 删除linux命令相关文件 - 避免重复上传，提高上传效率
rm -rf linux/command
rm -rf assets/linux_command_pages*

# 将目录传到腾讯云服务器
scp -r /Users/KevinWu/Desktop/Project/KeeDoc/docs/.vitepress/dist/* root@tencent_kevin:/www/wwwroot/notewk

cd -
rm -rf docs/node_modules
rm -rf docs/.vitepress/dist