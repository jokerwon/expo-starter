# 代码组织规范

本文档定义项目的代码组织原则和最佳实践。

## 分层架构

项目遵循严格的分层架构,依赖方向必须正确:

```
┌─────────────────────────────────────────┐
│         UI Layer (app-expo)             │
├─────────────────────────────────────────┤
│       Adapter Layer (bridge)            │
├─────────────────────────────────────────┤
│    Contract Layer (bridge-contract)     │
├─────────────────────────────────────────┤
│      Domain Layer (domain)              │
├─────────────────────────────────────────┤
│      Native Layer (Expo modules)        │
└─────────────────────────────────────────┘
```

### 依赖规则

- ✅ UI 可以依赖 Adapter, Contract, Domain
- ✅ Adapter 可以依赖 Contract, Domain
- ✅ Contract 不依赖任何内部包
- ✅ Domain 不依赖任何内部包
- ❌ Domain 不能依赖 UI 或 Adapter
- ❌ Contract 不能依赖 Adapter

## Monorepo 组织

### Apps

```
apps/
├── app-expo/      # 主应用 (唯一核心)
└── web-h5/        # 可选的 H5 应用 (从属 UI)
```

### Packages

```
packages/
├── domain/              # 业务领域层
├── bridge-contract/     # Bridge 契约
├── bridge-runtime/      # Bridge 运行时
├── api-client/          # API 客户端
└── ui-tokens/           # UI 设计令牌
```

## 应用内组织

### Expo App 结构

```
apps/app-expo/
├── app/                 # 路由目录 (expo-router)
│   ├── (tabs)/         # 路由组
│   ├── _layout.tsx     # 布局
│   └── +html.tsx       # 特殊文件
├── features/           # 功能模块 (业务逻辑)
│   └── example/
│       ├── ExampleFeature.tsx
│       └── components/  # 功能专属组件
├── components/         # 共享组件 (UI 组件)
│   └── Button.tsx
├── bridge/            # Bridge Adapter
│   └── RNBridgeAdapter.ts
├── src/
│   ├── config/        # 配置
│   ├── hooks/         # 自定义 Hooks
│   └── utils/         # 工具函数
└── assets/            # 静态资源
```

### 包结构

```
packages/domain/
├── entities/          # 实体定义
├── usecases/          # 用例实现
└── services/          # 领域服务
```

## 模块组织原则

### 1. 按功能分组

✅ 好的做法:

```
features/user/
├── UserList.tsx
├── UserDetail.tsx
├── components/
└── hooks/
```

❌ 不好的做法:

```
components/
├── UserList.tsx
├── UserDetail.tsx
├── ProductList.tsx
└── ProductDetail.tsx
```

### 2. 保持模块内聚

相关的文件应该放在一起:

```
features/auth/
├── AuthFeature.tsx       # 主要功能
├── components/           # 功能专属组件
│   ├── LoginForm.tsx
│   └── RegisterForm.tsx
├── hooks/               # 功能专属 Hooks
│   └── useAuth.ts
└── types.ts             # 功能类型定义
```

### 3. 共享与专属分离

- **components/**: 跨功能共享的 UI 组件
- **features/*/components/**: 功能专属组件

## 导入组织

### 导入顺序

```typescript
// 1. Node.js/Expo 内置模块
import { useState } from 'react'
import { View } from 'react-native'
import Constants from 'expo-constants'

// 2. 外部依赖
import { useRoute } from '@react-navigation/native'

// 3. 内部 packages
import { User } from '@expo-starter/domain'
import type { BridgeCapabilitiesV1 } from '@expo-starter/bridge-contract'

// 4. 相对路径导入
import { Button } from '../../components/Button'
import { useAuth } from '../hooks/useAuth'

// 5. 类型导入 (如果使用 export type)
import type { UserData } from './types'
```

### 路径别名

使用路径别名避免相对路径地狱:

```typescript
// ✅ 使用别名
import { Button } from '@expo-starter/ui-tokens'

// ❌ 避免深层相对路径
import { Button } from '../../../../../../../packages/ui-tokens/src'
```

## 命名约定

### 文件命名

- **组件**: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`, `useUserData.ts`)
- **工具函数**: camelCase (e.g., `formatDate.ts`, `validateEmail.ts`)
- **类型**: PascalCase (e.g., `User.ts`, `ApiConfig.ts`)
- **常量**: UPPER_SNAKE_CASE (e.g., `API_CONFIG.ts`, `COLORS.ts`)

### 目录命名

- **features**: kebab-case (e.g., `user-management/`, `order-history/`)
- **components**: PascalCase (如果单个组件) 或 kebab-case (如果分组)

## 依赖注入

### 构造函数注入

```typescript
class UserService {
  constructor(private apiClient: ApiClient) {}
}
```

### 函数参数注入

```typescript
export async function bootstrap(
  getBridgeCapabilities: () => Promise<BridgeCapabilitiesV1>
): Promise<BootstrapResult> {
  const bridge = await getBridgeCapabilities()
  // ...
}
```

## 边界明确

### UI Layer

- 只包含 React 组件和 Hooks
- 调用 Adapter 获取能力
- 不包含业务逻辑

### Adapter Layer

- 只做协议映射
- 不包含业务逻辑
- 实现 Contract 接口

### Domain Layer

- 纯粹的业务逻辑
- 不依赖 UI 或 Runtime
- 可独立测试

## 代码审查检查清单

- [ ] 依赖方向正确 (UI → Adapter → Contract → Domain)
- [ ] 模块职责单一
- [ ] 导入顺序正确
- [ ] 文件命名符合规范
- [ ] 没有循环依赖
- [ ] 共享代码放在正确位置
