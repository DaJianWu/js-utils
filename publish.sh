#!/bin/bash

set -e

# 确保没有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
  echo "存在未提交的更改，请在发布前提交或隐藏它们"
  exit 1
fi

# 运行构建命令，生成需要发布的文件
pnpm run build

# 将需要发布的文件提交至 Git 暂存区
git add ./dist
git commit -m "🔧 build: 编译发布"

# 检查是否已登录到正确的 npm 账号
npm whoami

# 自增版本号
npm version $1

# 获取当前包的版本号
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
echo "发布版本 $PACKAGE_VERSION"

# 发布包到 npm
npm publish --access public

# 创建 Git 标签
# git tag "v$PACKAGE_VERSION"

# 推送到远程仓库
git push
git push --tags

echo "发布成功！"
