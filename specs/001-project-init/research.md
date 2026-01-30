# Research: 项目初始化技术选型

**Feature**: 001-project-init
**Date**: 2026-01-30
**Status**: Complete

本文档记录了 Expo + React Native + TypeScript Monorepo 项目初始化的技术选型研究结果。

---

## 1. Monorepo 工具选择

### 决策
**选择 pnpm workspace**

### 理由
1. **性能优势**: pnpm 使用内容寻址存储,所有包共享同一个存储空间,安装速度快且节省磁盘空间
2. **严格的依赖管理**: pnpm 使用符号链接创建非扁平的 node_modules 结构,避免幽灵依赖(phantom dependencies)
3. **Expo 兼容性**: Expo SDK 51+ 完全支持 pnpm,官方文档推荐使用
4. **Monorepo 支持**: pnpm workspace 功能完善,支持过滤、并行执行等高级特性

### 替代方案
- **yarn workspace**: 成熟稳定,但性能和磁盘效率不如 pnpm
- **npm workspace**: npm 7+ 原生支持,但功能相对简单,性能较差
- **Turborepo/Nx**: 功能强大但复杂度高,对于初始化项目过于重量级

### 配置示例

**pnpm-workspace.yaml**:
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

**根 package.json**:
```json
{
  "name": "expo-starter",
  "private": true,
  "scripts": {
    "dev": "pnpm --filter app-expo dev",
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "lint": "pnpm -r lint"
  },
  "devDependencies": {
    "typescript": "^5.3.3"
  }
}
```

### 参考
- pnpm workspace 文档: https://pnpm.io/workspaces
- Expo with pnpm: https://docs.expo.dev/guides/monorepos/

---

## 2. Expo SDK 版本

### 决策
**使用 Expo SDK 51 (最新稳定版)**

### 理由
1. **最新特性**: SDK 51 包含最新的 React Native 0.74 支持
2. **expo-router 支持**: SDK 51 完全支持 expo-router v3,提供文件系统路由
3. **稳定性**: SDK 51 已经过充分测试,生产环境可用
4. **长期支持**: Expo 提供至少 6 个月的维护支持

### 版本信息
- **Expo SDK**: 51.0.0
- **React Native**: 0.74.x
- **React**: 18.2.0
- **expo-router**: 3.5.x
- **TypeScript**: 5.3.x

### 升级路径
- 使用 `npx expo install --fix` 自动修复依赖版本
- 遵循 Expo 官方升级指南
- 每个 SDK 版本都有详细的变更日志

### 配置示例

**app.json**:
```json
{
  "expo": {
    "name": "expo-starter",
    "slug": "expo-starter",
    "version": "1.0.0",
    "sdkVersion": "51.0.0",
    "platforms": ["ios", "android", "web"],
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
    }
  }
}
```

### 参考
- Expo SDK 51 发布说明: https://blog.expo.dev/expo-sdk-51-is-now-available
- Expo 版本管理: https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/

---

## 3. TypeScript 配置

### 决策
**使用 TypeScript 项目引用(Project References)和路径映射**

### 理由
1. **类型安全**: 跨包的类型检查和自动补全
2. **构建性能**: 增量编译,只重新构建修改的包
3. **清晰的依赖关系**: 通过 references 明确包之间的依赖
4. **路径映射**: 简化导入路径,避免相对路径地狱

### 配置结构

**tsconfig.base.json** (根目录):
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
      "@expo-starter/bridge-contract": ["./packages/bridge-contract/src"],
      "@expo-starter/bridge-runtime": ["./packages/bridge-runtime/src"],
      "@expo-starter/api-client": ["./packages/api-client/src"],
      "@expo-starter/ui-tokens": ["./packages/ui-tokens/src"]
    }
  },
  "exclude": ["node_modules", "dist", "build"]
}
```

**packages/domain/tsconfig.json**:
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "references": []
}
```

**apps/app-expo/tsconfig.json**:
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "."
  },
  "include": ["**/*"],
  "references": [
    { "path": "../../packages/domain" },
    { "path": "../../packages/bridge-contract" },
    { "path": "../../packages/bridge-runtime" }
  ]
}
```

### 参考
- TypeScript Project References: https://www.typescriptlang.org/docs/handbook/project-references.html
- Monorepo TypeScript 最佳实践: https://turborepo.org/docs/handbook/linting/typescript

---

## 4. ESLint/Prettier 配置

### 决策
**使用 @expo/eslint-config + TypeScript ESLint + Prettier**

### 理由
1. **官方推荐**: @expo/eslint-config 是 Expo 官方维护的配置
2. **TypeScript 支持**: 集成 @typescript-eslint 提供类型感知的 lint 规则
3. **React Native 优化**: 包含 React Native 特定的规则
4. **Prettier 集成**: 自动处理代码格式化,避免与 ESLint 冲突

### 配置示例

**.eslintrc.js** (根目录):
```javascript
module.exports = {
  root: true,
  extends: [
    'expo',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/', '.expo/']
}
```

**.prettierrc.js**:
```javascript
module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  tabWidth: 2,
  arrowParens: 'avoid'
}
```

**package.json scripts**:
```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx",
    "lint:fix": "eslint . --ext .ts,.tsx,.js,.jsx --fix",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\""
  }
}
```

### 参考
- Expo ESLint Config: https://github.com/expo/expo/tree/main/packages/eslint-config-expo
- TypeScript ESLint: https://typescript-eslint.io/

---

## 5. 测试框架配置

### 决策
**使用 Jest + React Native Testing Library**

### 理由
1. **官方支持**: Expo 官方推荐的测试方案
2. **完整生态**: Jest 提供完整的测试工具链(断言、mock、覆盖率)
3. **组件测试**: React Native Testing Library 提供用户行为驱动的测试方式
4. **Monorepo 支持**: Jest 支持多项目配置,适合 Monorepo

### 配置示例

**jest.config.js** (根目录):
```javascript
module.exports = {
  projects: [
    '<rootDir>/apps/app-expo/jest.config.js',
    '<rootDir>/packages/*/jest.config.js'
  ],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
}
```

**apps/app-expo/jest.config.js**:
```javascript
module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@expo-starter/(.*)$': '<rootDir>/../../packages/$1/src'
  }
}
```

**packages/domain/jest.config.js**:
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts']
}
```

### 参考
- Jest with Expo: https://docs.expo.dev/develop/unit-testing/
- React Native Testing Library: https://callstack.github.io/react-native-testing-library/

---

## 6. 环境变量管理

### 决策
**使用 expo-constants + .env 文件 + dotenv**

### 理由
1. **Expo 集成**: expo-constants 提供原生访问环境变量的能力
2. **多环境支持**: 通过 .env.development, .env.staging, .env.production 管理不同环境
3. **类型安全**: 可以为环境变量创建 TypeScript 类型定义
4. **安全性**: .env 文件不提交到 git,使用 .env.example 作为模板

### 配置示例

**.env.example**:
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

**.env.development**:
```bash
API_BASE_URL=http://localhost:3000
ENABLE_DEBUG_MODE=true
```

**app.config.js** (替代 app.json):
```javascript
import 'dotenv/config'

export default {
  expo: {
    name: process.env.APP_NAME || 'Expo Starter',
    slug: 'expo-starter',
    version: process.env.APP_VERSION || '1.0.0',
    extra: {
      apiBaseUrl: process.env.API_BASE_URL,
      apiTimeout: parseInt(process.env.API_TIMEOUT || '30000'),
      enableAnalytics: process.env.ENABLE_ANALYTICS === 'true',
      enableDebugMode: process.env.ENABLE_DEBUG_MODE === 'true'
    }
  }
}
```

**src/config/env.ts** (类型安全的环境变量访问):
```typescript
import Constants from 'expo-constants'

interface EnvConfig {
  apiBaseUrl: string
  apiTimeout: number
  enableAnalytics: boolean
  enableDebugMode: boolean
}

export const env: EnvConfig = {
  apiBaseUrl: Constants.expoConfig?.extra?.apiBaseUrl || '',
  apiTimeout: Constants.expoConfig?.extra?.apiTimeout || 30000,
  enableAnalytics: Constants.expoConfig?.extra?.enableAnalytics || false,
  enableDebugMode: Constants.expoConfig?.extra?.enableDebugMode || false
}
```

**.gitignore**:
```
.env
.env.local
.env.*.local
```

### 参考
- Expo Environment Variables: https://docs.expo.dev/guides/environment-variables/
- expo-constants: https://docs.expo.dev/versions/latest/sdk/constants/

---

## 7. Git 提交规范

### 决策
**使用 Conventional Commits + commitlint + husky**

### 理由
1. **标准化**: Conventional Commits 是业界标准的提交消息格式
2. **自动化**: 可以自动生成 CHANGELOG 和语义化版本
3. **强制执行**: commitlint + husky 在提交时自动检查格式
4. **团队协作**: 统一的提交格式便于代码审查和历史追溯

### 配置示例

**commitlint.config.js**:
```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // 修复 bug
        'docs',     // 文档变更
        'style',    // 代码格式(不影响代码运行)
        'refactor', // 重构
        'perf',     // 性能优化
        'test',     // 测试相关
        'chore',    // 构建过程或辅助工具变动
        'revert',   // 回退
        'build'     // 构建系统或外部依赖变更
      ]
    ],
    'scope-enum': [
      2,
      'always',
      [
        'app',
        'domain',
        'bridge',
        'api',
        'ui',
        'docs',
        'deps',
        'config'
      ]
    ],
    'subject-case': [0]
  }
}
```

**package.json**:
```json
{
  "scripts": {
    "prepare": "husky install"
  },
  "devDependencies": {
    "@commitlint/cli": "^18.4.3",
    "@commitlint/config-conventional": "^18.4.3",
    "husky": "^8.0.3",
    "lint-staged": "^15.2.0"
  },
  "lint-staged": {
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

**.husky/commit-msg**:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit $1
```

**.husky/pre-commit**:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

**提交消息示例**:
```
feat(app): add user authentication flow

- Implement login screen with email/password
- Add JWT token storage
- Integrate with auth API

Closes #123
```

### 参考
- Conventional Commits: https://www.conventionalcommits.org/
- commitlint: https://commitlint.js.org/
- husky: https://typicode.github.io/husky/

---

## 8. 开发工具配置

### 决策
**VS Code + 推荐插件 + 工作区配置**

### 理由
1. **广泛使用**: VS Code 是最流行的前端开发工具
2. **丰富的插件**: 完整的 TypeScript、React Native、ESLint 支持
3. **工作区配置**: 可以为项目配置统一的编辑器设置
4. **调试支持**: 内置的调试器支持 React Native

### 推荐插件

**.vscode/extensions.json**:
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "expo.vscode-expo-tools",
    "bradlc.vscode-tailwindcss",
    "usernamehw.errorlens",
    "streetsidesoftware.code-spell-checker",
    "eamodio.gitlens",
    "github.copilot"
  ]
}
```

### 工作区配置

**.vscode/settings.json**:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "files.exclude": {
    "**/.expo": true,
    "**/.expo-shared": true,
    "**/node_modules": true,
    "**/dist": true,
    "**/build": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/build": true,
    "**/.expo": true
  },
  "eslint.workingDirectories": [
    { "mode": "auto" }
  ],
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

### 调试配置

**.vscode/launch.json**:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach to Expo",
      "type": "node",
      "request": "attach",
      "port": 19000,
      "sourceMaps": true,
      "outFiles": ["${workspaceFolder}/.expo/**/*.js"]
    },
    {
      "name": "Debug Jest Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand", "--no-cache"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### 参考
- VS Code for React Native: https://code.visualstudio.com/docs/nodejs/reactnative-tutorial
- Expo Tools for VS Code: https://marketplace.visualstudio.com/items?itemName=expo.vscode-expo-tools

---

## 总结

所有技术选型已完成,主要决策如下:

| 领域 | 选择 | 理由 |
|------|------|------|
| Monorepo 工具 | pnpm workspace | 性能优秀,严格依赖管理 |
| Expo SDK | SDK 51 | 最新稳定版,完整功能支持 |
| TypeScript | 项目引用 + 路径映射 | 类型安全,增量编译 |
| Lint/Format | ESLint + Prettier | 官方推荐,完整生态 |
| 测试 | Jest + RNTL | 官方支持,完整工具链 |
| 环境变量 | expo-constants + .env | 原生支持,类型安全 |
| Git 规范 | Conventional Commits | 标准化,可自动化 |
| 开发工具 | VS Code | 广泛使用,丰富插件 |

所有配置示例已提供,可直接用于项目初始化。

**最后更新**: 2026-01-30
