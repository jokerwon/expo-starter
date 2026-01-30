# Quick Start Guide: Expo Starter 项目

**Feature**: 001-project-init
**Date**: 2026-01-30
**Target Time**: 15 分钟内完成环境搭建

本指南帮助新开发者快速搭建开发环境并开始开发。

---

## 前置要求

在开始之前,请确保您的系统满足以下要求:

### 必需软件

- **Node.js**: >= 18.0.0 (推荐使用 LTS 版本)
- **pnpm**: >= 8.0.0 (包管理器)
- **Git**: >= 2.0.0 (版本控制)

### 可选软件

- **Expo CLI**: 用于运行 Expo 应用
- **iOS Simulator** (macOS): 用于 iOS 开发
- **Android Studio**: 用于 Android 开发
- **VS Code**: 推荐的代码编辑器

### 检查环境

运行以下命令检查您的环境:

```bash
# 检查 Node.js 版本
node --version
# 应输出: v18.x.x 或更高

# 检查 pnpm 版本
pnpm --version
# 应输出: 8.x.x 或更高

# 检查 Git 版本
git --version
# 应输出: git version 2.x.x 或更高
```

---

## 步骤 1: 安装必需软件

### 安装 Node.js

**macOS/Linux (使用 nvm)**:
```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 安装 Node.js LTS
nvm install --lts
nvm use --lts
```

**Windows**:
- 从 [nodejs.org](https://nodejs.org/) 下载并安装 LTS 版本

### 安装 pnpm

```bash
# 使用 npm 安装 pnpm
npm install -g pnpm

# 或使用 corepack (Node.js 16.13+)
corepack enable
corepack prepare pnpm@latest --activate
```

### 安装 Expo CLI (可选)

```bash
# 全局安装 Expo CLI
pnpm add -g expo-cli

# 或使用 npx (无需全局安装)
npx expo --version
```

---

## 步骤 2: 克隆项目

```bash
# 克隆项目仓库
git clone <repository-url> expo-starter
cd expo-starter

# 切换到开发分支 (如果需要)
git checkout develop
```

---

## 步骤 3: 安装依赖

```bash
# 安装所有依赖 (根目录和所有子包)
pnpm install

# 预期时间: 2-5 分钟 (取决于网络速度)
```

**故障排查**:
- 如果遇到权限错误,请勿使用 `sudo`
- 如果安装失败,尝试清理缓存: `pnpm store prune`
- 如果网络慢,可以配置国内镜像:
  ```bash
  pnpm config set registry https://registry.npmmirror.com
  ```

---

## 步骤 4: 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件,填入您的配置
# 使用任意文本编辑器打开 .env
```

**示例 .env 配置**:
```bash
# API Configuration
API_BASE_URL=http://localhost:3000
API_TIMEOUT=30000

# Feature Flags
ENABLE_ANALYTICS=false
ENABLE_DEBUG_MODE=true

# App Configuration
APP_NAME=Expo Starter Dev
APP_VERSION=1.0.0
```

---

## 步骤 5: 启动开发服务器

### 启动 Expo 应用

```bash
# 进入 app-expo 目录
cd apps/app-expo

# 启动开发服务器
pnpm dev

# 或从根目录运行
pnpm --filter app-expo dev
```

**预期输出**:
```
› Metro waiting on exp://192.168.1.100:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press j │ open debugger
› Press r │ reload app
› Press m │ toggle menu
```

### 在设备上运行

**iOS Simulator** (仅 macOS):
```bash
# 按 'i' 键打开 iOS 模拟器
# 或运行命令
pnpm ios
```

**Android Emulator**:
```bash
# 确保 Android Studio 已安装并配置
# 按 'a' 键打开 Android 模拟器
# 或运行命令
pnpm android
```

**物理设备**:
1. 在手机上安装 [Expo Go](https://expo.dev/client) 应用
2. 扫描终端显示的 QR 码
3. 应用将自动加载

**Web 浏览器**:
```bash
# 按 'w' 键在浏览器中打开
# 或运行命令
pnpm web
```

---

## 步骤 6: 验证安装

### 检查应用是否正常运行

1. **应用启动**: 应用应在 30 秒内启动完成
2. **热重载**: 修改代码后,应用应在 3 秒内自动刷新
3. **无错误**: 终端和应用中不应有错误信息

### 运行测试

```bash
# 从根目录运行所有测试
pnpm test

# 运行特定包的测试
pnpm --filter @expo-starter/domain test

# 运行测试并查看覆盖率
pnpm test:coverage
```

### 运行代码检查

```bash
# 运行 ESLint
pnpm lint

# 自动修复 lint 错误
pnpm lint:fix

# 运行 Prettier 格式化
pnpm format
```

---

## 常用命令

### 开发命令

```bash
# 启动开发服务器
pnpm dev

# 启动特定平台
pnpm ios          # iOS 模拟器
pnpm android      # Android 模拟器
pnpm web          # Web 浏览器

# 清理缓存并重启
pnpm start:clean
```

### 构建命令

```bash
# 构建所有包
pnpm build

# 构建特定包
pnpm --filter @expo-starter/domain build

# 清理构建产物
pnpm clean
```

### 测试命令

```bash
# 运行所有测试
pnpm test

# 监听模式运行测试
pnpm test:watch

# 生成测试覆盖率报告
pnpm test:coverage
```

### 代码质量命令

```bash
# 运行 lint 检查
pnpm lint

# 自动修复 lint 问题
pnpm lint:fix

# 格式化代码
pnpm format

# 类型检查
pnpm type-check
```

### 依赖管理命令

```bash
# 添加依赖到特定包
pnpm --filter app-expo add <package>

# 添加开发依赖
pnpm --filter app-expo add -D <package>

# 更新依赖
pnpm update

# 查看过期依赖
pnpm outdated
```

---

## 项目结构概览

```
expo-starter/
├── apps/
│   └── app-expo/              # 主应用 (Expo)
│       ├── app/               # expo-router 路由
│       ├── components/        # UI 组件
│       ├── features/          # 功能模块
│       └── bridge/            # Bridge Adapter
│
├── packages/
│   ├── domain/                # 业务逻辑层
│   ├── bridge-contract/       # Native 能力契约
│   ├── bridge-runtime/        # Bridge 运行时
│   ├── api-client/            # API 客户端
│   └── ui-tokens/             # 设计令牌
│
├── docs/                      # 项目文档
├── .specify/                  # Specify 工具配置
└── specs/                     # 功能规范
```

---

## 开发工作流

### 1. 创建新功能

```bash
# 使用 Specify 工具创建功能规范
/speckit.specify "功能描述"

# 生成实施计划
/speckit.plan

# 生成任务列表
/speckit.tasks

# 开始实施
/speckit.implement
```

### 2. 提交代码

```bash
# 暂存修改
git add .

# 提交 (会自动运行 lint 和格式化)
git commit -m "feat(app): add new feature"

# 推送到远程
git push origin feature-branch
```

**提交消息格式**:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型 (type)**:
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具变更

**范围 (scope)**:
- `app`: 应用层
- `domain`: 业务逻辑层
- `bridge`: Bridge 相关
- `api`: API 客户端
- `ui`: UI 组件
- `docs`: 文档
- `config`: 配置

### 3. 代码审查

提交 Pull Request 前,请确保:

- [ ] 所有测试通过 (`pnpm test`)
- [ ] 代码通过 lint 检查 (`pnpm lint`)
- [ ] 代码已格式化 (`pnpm format`)
- [ ] 类型检查通过 (`pnpm type-check`)
- [ ] 提交消息符合规范
- [ ] 已更新相关文档

---

## 故障排查

### 问题 1: 依赖安装失败

**症状**: `pnpm install` 报错

**解决方案**:
```bash
# 清理缓存
pnpm store prune

# 删除 node_modules 和 lock 文件
rm -rf node_modules pnpm-lock.yaml

# 重新安装
pnpm install
```

### 问题 2: Metro bundler 启动失败

**症状**: 开发服务器无法启动

**解决方案**:
```bash
# 清理 Metro 缓存
pnpm start:clean

# 或手动清理
rm -rf .expo node_modules/.cache

# 重启开发服务器
pnpm dev
```

### 问题 3: 热重载不工作

**症状**: 修改代码后应用不自动刷新

**解决方案**:
1. 检查文件是否保存
2. 检查是否有语法错误
3. 尝试手动刷新 (按 'r' 键)
4. 重启开发服务器

### 问题 4: TypeScript 类型错误

**症状**: IDE 显示类型错误

**解决方案**:
```bash
# 重新构建类型定义
pnpm build

# 重启 TypeScript 服务器 (VS Code)
# Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"
```

### 问题 5: iOS 模拟器无法打开

**症状**: 按 'i' 键后无响应

**解决方案**:
```bash
# 检查 Xcode 是否安装
xcode-select --install

# 打开 Xcode 并接受许可协议
sudo xcodebuild -license accept

# 手动打开模拟器
open -a Simulator
```

### 问题 6: Android 模拟器无法打开

**症状**: 按 'a' 键后无响应

**解决方案**:
1. 确保 Android Studio 已安装
2. 打开 Android Studio -> AVD Manager
3. 创建或启动一个虚拟设备
4. 配置环境变量:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

---

## 获取帮助

### 文档资源

- **项目文档**: `docs/` 目录
- **架构文档**: `docs/architecture.md`
- **贡献指南**: `docs/CONTRIBUTING.md`
- **API 文档**: `docs/API.md`

### 在线资源

- **Expo 文档**: https://docs.expo.dev/
- **React Native 文档**: https://reactnative.dev/
- **TypeScript 文档**: https://www.typescriptlang.org/
- **pnpm 文档**: https://pnpm.io/

### 社区支持

- **GitHub Issues**: 报告 bug 或请求功能
- **GitHub Discussions**: 提问和讨论
- **团队 Slack**: 内部沟通渠道

---

## 下一步

恭喜!您已成功搭建开发环境。接下来您可以:

1. **阅读架构文档**: 了解项目架构和设计原则
   ```bash
   cat docs/architecture.md
   ```

2. **浏览示例代码**: 学习项目的代码组织方式
   ```bash
   # 查看示例组件
   cat apps/app-expo/components/Button.tsx

   # 查看示例用例
   cat packages/domain/usecases/bootstrap.ts
   ```

3. **创建第一个功能**: 使用 Specify 工具创建新功能
   ```bash
   /speckit.specify "我的第一个功能"
   ```

4. **加入团队**: 联系项目负责人获取访问权限

---

## 检查清单

在开始开发前,请确认以下项目:

- [ ] Node.js >= 18.0.0 已安装
- [ ] pnpm >= 8.0.0 已安装
- [ ] 项目已克隆到本地
- [ ] 依赖已成功安装 (`pnpm install`)
- [ ] 环境变量已配置 (`.env` 文件)
- [ ] 开发服务器可以启动 (`pnpm dev`)
- [ ] 应用可以在设备/模拟器上运行
- [ ] 测试可以运行 (`pnpm test`)
- [ ] Lint 检查通过 (`pnpm lint`)
- [ ] 已阅读架构文档
- [ ] 已配置 VS Code 插件 (如使用 VS Code)
- [ ] 已加入团队沟通渠道

---

**预计完成时间**: 15 分钟

如果您在 15 分钟内无法完成环境搭建,请查看故障排查部分或寻求帮助。

**最后更新**: 2026-01-30
