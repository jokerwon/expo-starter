# Bridge Contract Layer

Bridge 契约层,定义所有 Native 能力的接口。这是系统的"宪法" - 所有 Native 能力必须先在此定义,才能被使用。

## 职责

- 定义所有 Native 能力的 TypeScript 接口
- 版本化接口管理 (v1, v2, ...)
- 定义事件类型 (Native → App/WebView)
- 作为 Adapter 实现的契约

## 关键原则

1. **接口先行**: 能力必须先定义,后实现
2. **版本化**: 所有接口都有版本号,避免破坏性变更
3. **类型安全**: 提供完整的 TypeScript 类型定义
4. **无实现**: 仅包含类型定义,不包含运行时逻辑

## 目录结构

```
packages/bridge-contract/
├── src/
│   ├── v1/              # 版本 1 接口
│   │   ├── capabilities.ts  # 能力定义
│   │   ├── events.ts        # 事件定义
│   │   └── index.ts         # 版本导出
│   └── index.ts        # 主入口
├── dist/                # 构建输出
├── package.json
└── tsconfig.json
```

## V1 能力 (Capabilities)

### AppInfo

获取应用元信息。

```typescript
interface AppInfo {
  platform: 'ios' | 'android' | 'web'
  version: string
  buildNumber: string
}

const appInfo = await bridge.getAppInfo()
```

### User

获取当前用户信息。

```typescript
interface UserData {
  id: string
  name: string
  email: string
}

const user = await bridge.getUser()
```

### OpenExternal

打开外部 URL。

```typescript
await bridge.openExternal('https://example.com')
```

### Log

记录日志。

```typescript
await bridge.log('info', 'User logged in', { userId: '123' })
```

## V1 事件 (Events)

### AppStateChangeEvent

应用状态变化事件。

### NetworkStateChangeEvent

网络状态变化事件。

### UserSessionEvent

用户会话事件。

## 版本管理

### 导出特定版本

```typescript
import { BridgeCapabilitiesV1 } from '@expo-starter/bridge-contract/v1'
```

### 导出最新版本

```typescript
import { BridgeCapabilitiesV1 } from '@expo-starter/bridge-contract'
```

## 添加新能力

### 1. 定义接口

在 `src/v1/capabilities.ts` 添加:

```typescript
export interface BridgeCapabilitiesV1 {
  // ... 现有能力

  /**
   * 新增能力描述
   */
  newCapability(arg: Type): Promise<ReturnType>
}
```

### 2. 实现接口

在对应平台实现 (如 `apps/app-expo/bridge/RNBridgeAdapter.ts`)。

### 3. 版本控制

- 如果是破坏性变更,创建 v2 接口
- 如果是新增能力,在当前版本追加

## 禁止事项

- ❌ 添加运行时逻辑或实现代码
- ❌ 导入任何具体实现模块
- ❌ 删除或修改已发布的能力
- ❌ 跨版本导入 (v1 不应导入 v2)

## 测试

```bash
# 类型检查
pnpm --filter @expo-starter/bridge-contract type-check

# 构建
pnpm --filter @expo-starter/bridge-contract build
```

## 依赖

- **无**: Bridge Contract 不依赖任何其他内部包
