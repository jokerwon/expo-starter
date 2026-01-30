# 文件结构说明

本文档详细说明项目的文件和目录结构。

## 项目根目录

```
expo-starter/
├── apps/                    # 应用目录
├── packages/                # 共享包目录
├── docs/                    # 项目文档
├── .github/                 # GitHub 配置 (CI/CD)
├── .specify/                # Specify 工具配置
├── .gitignore              # Git 忽略文件
├── .env.example            # 环境变量模板
├── package.json            # 根 package.json (Monorepo 配置)
├── pnpm-workspace.yaml     # pnpm workspace 配置
├── pnpm-lock.yaml          # 依赖锁定文件
├── tsconfig.base.json      # TypeScript 基础配置
├── CLAUDE.md               # Agent 上下文
└── README.md               # 项目说明
```

## Apps 目录

### app-expo (主应用)

```
apps/app-expo/
├── app/                           # expo-router 路由目录
│   ├── (tabs)/                   # 标签页路由组
│   │   ├── _layout.tsx          # 标签页布局
│   │   ├── index.tsx            # 首页
│   │   └── settings.tsx         # 设置页
│   ├── _layout.tsx              # 根布局
│   └── +not-found.tsx           # 404 页面
├── features/                      # 功能模块
│   └── example/                  # 示例功能
│       ├── ExampleFeature.tsx   # 功能主组件
│       ├── components/          # 功能专属组件
│       └── hooks/               # 功能专属 Hooks
├── components/                    # 共享 UI 组件
│   └── Button.tsx               # 示例按钮组件
├── bridge/                       # Bridge Adapter
│   └── RNBridgeAdapter.ts       # RN Bridge 实现
├── src/                          # 源代码
│   └── config/                  # 配置
│       └── env.ts               # 环境变量
├── assets/                       # 静态资源
│   ├── icon.png
│   ├── splash.png
│   ├── adaptive-icon.png
│   └── favicon.png
├── App.tsx                       # Expo 入口 (已废弃,使用 app/ 目录)
├── index.ts                      # 应用入口
├── package.json                  # 应用依赖配置
├── tsconfig.json                 # TypeScript 配置
├── app.config.js                 # Expo 配置
├── app.json                      # Expo 配置 (JSON 格式)
├── metro.config.js               # Metro bundler 配置
├── .gitignore                    # Git 忽略文件
└── README.md                     # 应用说明
```

#### app/ 目录结构 (expo-router)

```
app/
├── (tabs)/                       # 路由组 - 标签页
│   ├── _layout.tsx              # 标签页布局
│   ├── index.tsx                # 首页 (路由: /)
│   └── settings.tsx             # 设置页 (路由: /settings)
├── (auth)/                       # 路由组 - 认证 (示例)
│   ├── _layout.tsx
│   ├── login.tsx                # 路由: /login
│   └── register.tsx             # 路由: /register
├── _layout.tsx                   # 根布局
├── +not-found.tsx                # 404 页面
└── +html.tsx                     # HTML 入口 (Web)
```

### web-h5 (可选,未来添加)

```
apps/web-h5/
├── pages/                        # Next.js 页面
├── components/                   # H5 组件
├── bridge/                       # H5 Bridge Adapter
└── package.json
```

## Packages 目录

### domain (业务领域层)

```
packages/domain/
├── entities/                     # 业务实体
│   └── User.ts                  # 用户实体
├── usecases/                     # 业务用例
│   └── bootstrap.ts             # 启动用例
├── src/
│   └── index.ts                 # 导出入口
├── dist/                         # 构建输出
│   ├── entities/
│   ├── usecases/
│   ├── index.d.ts
│   └── index.js
├── package.json
├── tsconfig.json
└── README.md
```

### bridge-contract (Bridge 契约)

```
packages/bridge-contract/
├── src/
│   ├── v1/                      # 版本 1
│   │   ├── capabilities.ts      # 能力接口定义
│   │   ├── events.ts            # 事件接口定义
│   │   └── index.ts             # 版本导出
│   └── index.ts                 # 主入口
├── dist/                         # 构建输出
│   ├── v1/
│   ├── index.d.ts
│   └── index.js
├── package.json
├── tsconfig.json
└── README.md
```

### bridge-runtime (Bridge 运行时)

```
packages/bridge-runtime/
├── src/
│   ├── BridgeRuntime.ts         # Bridge 运行时类
│   ├── types.ts                 # 类型定义
│   └── index.ts                 # 导出入口
├── dist/                         # 构建输出
├── package.json
├── tsconfig.json
└── README.md
```

### api-client (API 客户端)

```
packages/api-client/
├── src/
│   ├── client.ts                # HTTP 客户端
│   ├── types.ts                 # API 类型
│   └── index.ts                 # 导出入口
├── dist/                         # 构建输出
├── package.json
├── tsconfig.json
└── README.md
```

### ui-tokens (UI 设计令牌)

```
packages/ui-tokens/
├── src/
│   ├── colors.ts                # 颜色定义
│   ├── spacing.ts               # 间距定义
│   ├── typography.ts            # 字体定义 (未来)
│   └── index.ts                 # 导出入口
├── dist/                         # 构建输出
├── package.json
├── tsconfig.json
└── README.md
```

## Docs 目录

```
docs/
├── architecture.md               # 架构文档
├── CODE_ORGANIZATION.md         # 代码组织规范
├── NAMING_CONVENTIONS.md        # 命名规范
├── FILE_STRUCTURE.md            # 文件结构 (本文档)
├── CONTRIBUTING.md              # 贡献指南 (未来)
├── API.md                       # API 文档 (未来)
└── TROUBLESHOOTING.md           # 故障排查 (未来)
```

## Specs 目录

```
specs/
└── 001-project-init/            # 功能规格
    ├── spec.md                  # 功能规格
    ├── plan.md                  # 实施计划
    ├── tasks.md                 # 任务列表
    ├── research.md              # 技术研究
    ├── data-model.md            # 数据模型
    ├── quickstart.md            # 快速开始
    ├── checklists/              # 检查清单
    │   └── requirements.md
    └── contracts/               # 契约定义
        └── project-config-schema.json
```

## 配置文件

### 根目录配置

```
expo-starter/
├── package.json                 # Monorepo 根配置
│   ├── name                    # 项目名称
│   ├── private                 # 私有标记
│   ├── scripts                 # 全局脚本
│   ├── devDependencies         # 开发依赖
│   └── lint-staged             # lint-staged 配置
├── pnpm-workspace.yaml         # workspace 配置
│   └── packages                # 包路径模式
├── tsconfig.base.json          # TypeScript 基础配置
│   ├── compilerOptions         # 编译选项
│   ├── paths                   # 路径映射
│   └── exclude                 # 排除文件
├── .gitignore                  # Git 忽略规则
├── .env.example                # 环境变量模板
└── .husky/                     # Git hooks
    ├── commit-msg              # 提交信息检查
    └── pre-commit              # 预提交检查
```

### 应用配置

```
apps/app-expo/
├── package.json                # 应用依赖
│   ├── dependencies            # 生产依赖
│   ├── devDependencies         # 开发依赖
│   └── scripts                 # 应用脚本
├── tsconfig.json               # TypeScript 配置
│   ├── extends                 # 继承基础配置
│   ├── compilerOptions         # 编译选项
│   └── references              # 项目引用
├── app.config.js               # Expo 配置 (JS 格式)
│   └── expo                    # Expo 配置项
│       ├── name               # 应用名称
│       ├── version            # 应用版本
│       ├── sdkVersion         # SDK 版本
│       ├── platforms          # 支持平台
│       └── extra              # 自定义配置
└── metro.config.js             # Metro 配置
    ├── watchFolders            # 监听目录
    └── resolver                # 解析器配置
```

## 构建输出

```
packages/*/dist/                # 各包的构建输出
├── *.d.ts                      # 类型定义文件
├── *.js                        # JavaScript 输出
└── *.d.ts.map                  # Source map
```

## 隐藏文件

```
expo-starter/
├── .git/                       # Git 仓库
├── .gitignore                  # Git 忽略文件
├── .husky/                     # Git hooks
├── .expo/                      # Expo 临时文件
├── .expo-shared/               # Expo 共享临时文件
└── node_modules/               # 依赖包
```

## 临时文件

```
expo-starter/
├── *.tsbuildinfo               # TypeScript 增量编译信息
├── .DS_Store                   # macOS 系统文件 (应被 .gitignore)
└── *.log                       # 日志文件
```

## 文件扩展名说明

| 扩展名 | 用途 | 位置 |
|--------|------|------|
| `.tsx` | React 组件 (含 JSX) | apps/, packages/ |
| `.ts` | TypeScript 模块 | 全部 |
| `.js` | JavaScript 配置 | 根目录, apps/ |
| `.json` | JSON 配置 | 全部 |
| `.md` | Markdown 文档 | docs/, README |
| `.png` | 图片资源 | assets/ |
| `.yaml` | YAML 配置 | 根目录 |

## 导入路径示例

```typescript
// 从 packages 导入
import { User } from '@expo-starter/domain'
import type { BridgeCapabilitiesV1 } from '@expo-starter/bridge-contract'
import { colors } from '@expo-starter/ui-tokens'

// 从应用内部导入
import { Button } from '../components/Button'
import { useAuth } from './hooks/useAuth'
```

## 目录职责划分

| 目录 | 职责 | 可导入 |
|------|------|--------|
| `app/` | 路由和页面 | components/, features/, packages/ |
| `features/` | 业务功能模块 | components/, packages/ |
| `components/` | 共享 UI 组件 | packages/ui-tokens/ |
| `bridge/` | Bridge Adapter | packages/bridge-contract/, packages/bridge-runtime/ |
| `src/` | 应用源代码 | packages/ |

## 文件组织原则

1. **就近原则**: 相关文件放在一起
2. **层次清晰**: 按层级组织 (app → features → components → utils)
3. **职责单一**: 每个目录有明确职责
4. **易于导航**: 从文件名就能知道内容
5. **避免深层**: 避免过深的嵌套 (最多 3-4 层)
