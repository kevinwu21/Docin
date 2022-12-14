# Git团队开发手册
## 提交到本地仓库 - Commit
```shell
git add .
git commit -m'NEW:新增xxx功能'
```
### 提交备注规范：
> NEW：新增了 xxx 功能
>
> MOD：优化了 xxx 功能 / 逻辑
>
> BUG：修复了 xxx 的 BUG

## 推送到远程仓库（gitee）- push
```shell
# git push origin [branch]
git push origin czq
```
## 拉取远程仓库代码 - pull
```shell
# 普通拉取
# git pull origin [branch]
git pull origin czq

# 强制覆盖拉取
# git fetch --all && git reset --hard origin/[branch] && git pull
git fetch --all && git reset --hard origin/czq && git pull
```

