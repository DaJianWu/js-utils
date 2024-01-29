#!/bin/bash

set -e

# 检查是否已登录到正确的 npm 账号
npm whoami

# 确保没有未提交的更改
# if [ -n "$(git status --porcelain)" ]; then
#   echo "存在未提交的更改，请在发布前提交或隐藏它们"
#   exit 1
# fi

# 运行构建命令，生成需要发布的文件
pnpm run build

# 生成 docs 和 CHANGELOG.md
pnpm run docs
pnpm run changelog

# 自增版本号并创建 Git 标签
npm version $1 --force

# 获取当前包的版本号
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
echo "发布版本 $PACKAGE_VERSION"

# 写入 TypeScript 文件
echo "console.log('js-utils version \"$PACKAGE_VERSION\"');" >> src/index.ts

# 将需要发布的文件提交至 Git 暂存区
# git add ./dist ./docs ./CHANGELOG.md
git add .
git commit -m "🔧 build: ($PACKAGE_VERSION): 编译发布"

# 发布包到 npm
npm publish --access public

# 获取最新的标签
latest_tag=$(git describe --tags --abbrev=0)

# 推送到远程仓库
git push
git push origin $latest_tag

echo "发布成功！"
