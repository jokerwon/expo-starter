# Expo App (app-expo)

主应用,基于 Expo SDK 和 React Native。

## 目录结构

```
apps/app-expo/
├── app/                    # expo-router 路由目录
│   ├── (tabs)/            # 标签页路由组
│   ├── _layout.tsx        # 根布局
│   └── +not-found.tsx     # 404 页面
├── features/              # 功能模块
│   └── example/           # 示例功能模块
├── components/            # 共享组件
│   └── Button.tsx         # 示例按钮组件
├── bridge/                # Bridge Adapter
│   └── RNBridgeAdapter.ts # React Native Bridge 实现
├── src/                   # 源代码
│   └── config/            # 配置文件
│       └── env.ts         # 环境变量
├── assets/                # 静态资源
├── package.json           # 依赖配置
├── tsconfig.json          # TypeScript 配置
├── app.config.js          # Expo 配置
└── metro.config.js        # Metro bundler 配置
```

## 路由结构

- `/` - 首页
- `/settings` - 设置页
- `+not-found` - 404 页面

## 依赖的 Packages

- `@expo-starter/domain` - 业务领域层
- `@expo-starter/bridge-contract` - Bridge 契约定义
- `@expo-starter/bridge-runtime` - Bridge 运行时
- `@expo-starter/ui-tokens` - UI 设计令牌

## 开发命令

```bash
# 启动开发服务器
pnpm dev

# 类型检查
pnpm type-check

# 代码检查
pnpm lint

# 构建
pnpm build
```

## 技术栈

- **Runtime**: Expo SDK 54, React Native 0.81
- **路由**: expo-router v4 (文件系统路由)
- **语言**: TypeScript 5.x
- **状态管理**: React Hooks
- **桥接**: 自定义 JSBridge (基于 Bridge Contract)
