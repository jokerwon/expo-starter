# Data Model: 项目初始化

**Feature**: 001-project-init
**Date**: 2026-01-30
**Status**: Complete

本文档定义项目初始化所涉及的配置实体和数据结构。

---

## 1. 项目配置实体

### 1.1 Monorepo 根配置

**实体名称**: MonorepoConfig

**描述**: Monorepo 根目录的配置,定义工作区结构和全局依赖

**字段**:
- `name`: string - 项目名称
- `private`: boolean - 是否为私有包(必须为 true)
- `workspaces`: string[] - 工作区包路径模式
- `scripts`: Record<string, string> - 全局脚本命令
- `devDependencies`: Record<string, string> - 全局开发依赖
- `engines`: { node: string, pnpm: string } - 运行时版本要求

**验证规则**:
- `private` 必须为 true
- `workspaces` 必须包含 'apps/*' 和 'packages/*'
- `engines.node` 必须 >= 18.0.0
- `engines.pnpm` 必须 >= 8.0.0

**示例**:
```json
{
  "name": "expo-starter",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "pnpm --filter app-expo dev",
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "lint": "pnpm -r lint"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0",
    "eslint": "^8.56.0",
    "prettier": "^3.1.1"
  },
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  }
}
```

---

### 1.2 Expo 应用配置

**实体名称**: ExpoAppConfig

**描述**: Expo 应用的配置,定义应用元数据和平台特定设置

**字段**:
- `expo.name`: string - 应用显示名称
- `expo.slug`: string - 应用唯一标识符
- `expo.version`: string - 应用版本号
- `expo.sdkVersion`: string - Expo SDK 版本
- `expo.platforms`: string[] - 支持的平台
- `expo.ios`: object - iOS 特定配置
- `expo.android`: object - Android 特定配置
- `expo.web`: object - Web 特定配置
- `expo.extra`: object - 自定义环境变量

**验证规则**:
- `slug` 必须是小写字母、数字和连字符
- `version` 必须符合语义化版本格式
- `sdkVersion` 必须是有效的 Expo SDK 版本
- `platforms` 必须包含至少一个平台

**示例**:
```json
{
  "expo": {
    "name": "Expo Starter",
    "slug": "expo-starter",
    "version": "1.0.0",
    "sdkVersion": "51.0.0",
    "platforms": ["ios", "android", "web"],
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.example.expostarter"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.example.expostarter"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "apiBaseUrl": "https://api.example.com",
      "enableAnalytics": true
    }
  }
}
```

---

### 1.3 TypeScript 配置

**实体名称**: TypeScriptConfig

**描述**: TypeScript 编译器配置,定义类型检查和编译选项

**字段**:
- `extends`: string - 继承的基础配置路径
- `compilerOptions`: object - 编译器选项
- `include`: string[] - 包含的文件模式
- `exclude`: string[] - 排除的文件模式
- `references`: Array<{ path: string }> - 项目引用

**验证规则**:
- `compilerOptions.strict` 必须为 true
- `compilerOptions.target` 必须 >= ES2022
- 根配置必须设置 `composite: true`
- 包配置必须设置 `rootDir` 和 `outDir`

**示例 (根配置)**:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "commonjs",
    "jsx": "react-native",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "composite": true,
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@expo-starter/domain": ["./packages/domain/src"],
      "@expo-starter/bridge-contract": ["./packages/bridge-contract/src"]
    }
  },
  "exclude": ["node_modules", "dist", "build"]
}
```

---

### 1.4 包配置

**实体名称**: PackageConfig

**描述**: 单个包(app 或 package)的配置

**字段**:
- `name`: string - 包名称(必须以 @expo-starter/ 开头)
- `version`: string - 包版本号
- `private`: boolean - 是否为私有包
- `main`: string - 入口文件路径
- `types`: string - 类型定义文件路径
- `scripts`: Record<string, string> - 包脚本命令
- `dependencies`: Record<string, string> - 生产依赖
- `devDependencies`: Record<string, string> - 开发依赖
- `peerDependencies`: Record<string, string> - 对等依赖

**验证规则**:
- `name` 必须符合 npm 包命名规范
- `version` 必须符合语义化版本格式
- packages/ 下的包必须设置 `main` 和 `types`
- 不允许循环依赖

**示例 (domain 包)**:
```json
{
  "name": "@expo-starter/domain",
  "version": "1.0.0",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "jest",
    "lint": "eslint src --ext .ts"
  },
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.3.3",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.1"
  }
}
```

---

## 2. 开发工具配置实体

### 2.1 ESLint 配置

**实体名称**: ESLintConfig

**描述**: ESLint 代码检查配置

**字段**:
- `root`: boolean - 是否为根配置
- `extends`: string[] - 继承的配置
- `parser`: string - 解析器
- `parserOptions`: object - 解析器选项
- `plugins`: string[] - 插件列表
- `rules`: Record<string, any> - 规则配置
- `ignorePatterns`: string[] - 忽略的文件模式

**验证规则**:
- 根配置必须设置 `root: true`
- 必须包含 TypeScript 解析器和插件
- 必须包含 React 相关规则

**示例**:
```javascript
{
  "root": true,
  "extends": [
    "expo",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint", "react-hooks"],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "react-hooks/rules-of-hooks": "error"
  },
  "ignorePatterns": ["node_modules/", "dist/", "build/"]
}
```

---

### 2.2 Prettier 配置

**实体名称**: PrettierConfig

**描述**: Prettier 代码格式化配置

**字段**:
- `semi`: boolean - 是否使用分号
- `singleQuote`: boolean - 是否使用单引号
- `trailingComma`: string - 尾随逗号策略
- `printWidth`: number - 每行最大字符数
- `tabWidth`: number - 缩进空格数
- `arrowParens`: string - 箭头函数参数括号

**验证规则**:
- `printWidth` 必须在 80-120 之间
- `tabWidth` 必须为 2 或 4

**示例**:
```javascript
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "avoid"
}
```

---

### 2.3 Git Hooks 配置

**实体名称**: GitHooksConfig

**描述**: Git 钩子配置,用于提交前检查

**字段**:
- `hooks`: Record<string, string> - 钩子脚本映射
- `lintStaged`: Record<string, string[]> - lint-staged 配置

**验证规则**:
- 必须包含 `commit-msg` 钩子(commitlint)
- 必须包含 `pre-commit` 钩子(lint-staged)

**示例**:
```json
{
  "hooks": {
    "commit-msg": "npx --no -- commitlint --edit $1",
    "pre-commit": "npx lint-staged"
  },
  "lintStaged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

---

## 3. Monorepo 结构实体

### 3.1 工作区结构

**实体名称**: WorkspaceStructure

**描述**: Monorepo 工作区的目录结构和包关系

**字段**:
- `apps`: Array<AppPackage> - 应用包列表
- `packages`: Array<LibraryPackage> - 库包列表
- `dependencies`: Array<Dependency> - 包依赖关系

**关系**:
- apps 可以依赖 packages
- packages 之间可以相互依赖(不允许循环)
- packages 不能依赖 apps

**示例**:
```typescript
interface WorkspaceStructure {
  apps: [
    {
      name: 'app-expo',
      path: 'apps/app-expo',
      dependencies: [
        '@expo-starter/domain',
        '@expo-starter/bridge-contract',
        '@expo-starter/bridge-runtime'
      ]
    }
  ],
  packages: [
    {
      name: '@expo-starter/domain',
      path: 'packages/domain',
      dependencies: []
    },
    {
      name: '@expo-starter/bridge-contract',
      path: 'packages/bridge-contract',
      dependencies: []
    },
    {
      name: '@expo-starter/bridge-runtime',
      path: 'packages/bridge-runtime',
      dependencies: ['@expo-starter/bridge-contract']
    }
  ]
}
```

---

### 3.2 构建顺序

**实体名称**: BuildOrder

**描述**: 包的构建顺序,基于依赖关系拓扑排序

**字段**:
- `order`: string[] - 按构建顺序排列的包名称列表

**验证规则**:
- 被依赖的包必须先构建
- 不允许循环依赖

**示例**:
```json
{
  "order": [
    "@expo-starter/bridge-contract",
    "@expo-starter/domain",
    "@expo-starter/bridge-runtime",
    "@expo-starter/api-client",
    "@expo-starter/ui-tokens",
    "app-expo"
  ]
}
```

---

## 4. 环境变量实体

### 4.1 环境变量配置

**实体名称**: EnvironmentConfig

**描述**: 应用的环境变量配置

**字段**:
- `API_BASE_URL`: string - API 基础 URL
- `API_TIMEOUT`: number - API 超时时间(毫秒)
- `ENABLE_ANALYTICS`: boolean - 是否启用分析
- `ENABLE_DEBUG_MODE`: boolean - 是否启用调试模式
- `APP_NAME`: string - 应用名称
- `APP_VERSION`: string - 应用版本

**验证规则**:
- `API_BASE_URL` 必须是有效的 URL
- `API_TIMEOUT` 必须 > 0
- 敏感信息不能提交到 git

**示例 (.env.example)**:
```bash
# API Configuration
API_BASE_URL=https://api.example.com
API_TIMEOUT=30000

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_DEBUG_MODE=false

# App Configuration
APP_NAME=Expo Starter
APP_VERSION=1.0.0
```

---

## 5. 实体关系图

```
MonorepoConfig (根)
├── WorkspaceStructure
│   ├── AppPackage (app-expo)
│   │   ├── ExpoAppConfig
│   │   ├── PackageConfig
│   │   └── TypeScriptConfig
│   └── LibraryPackage (packages/*)
│       ├── PackageConfig
│       └── TypeScriptConfig
├── ESLintConfig
├── PrettierConfig
├── GitHooksConfig
└── EnvironmentConfig
```

---

## 6. 状态转换

### 6.1 项目初始化状态

**状态**:
1. `未初始化`: 空目录或仅有基础文件
2. `配置中`: 正在创建配置文件
3. `依赖安装中`: 正在安装 npm 依赖
4. `已初始化`: 所有配置完成,可以开始开发

**转换规则**:
- 未初始化 → 配置中: 开始创建配置文件
- 配置中 → 依赖安装中: 所有配置文件创建完成
- 依赖安装中 → 已初始化: 依赖安装成功
- 任何状态 → 未初始化: 清理项目(危险操作)

**验证**:
- 配置中: 必须创建所有必需的配置文件
- 依赖安装中: 必须成功安装所有依赖
- 已初始化: 必须能成功运行 `pnpm dev`

---

## 总结

本文档定义了项目初始化涉及的所有配置实体和数据结构,包括:

1. **项目配置**: Monorepo、Expo、TypeScript、Package
2. **开发工具**: ESLint、Prettier、Git Hooks
3. **结构定义**: 工作区结构、构建顺序
4. **环境变量**: 多环境配置管理

所有实体都包含字段定义、验证规则和示例,可直接用于实施阶段。
