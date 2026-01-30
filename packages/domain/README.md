# Domain Layer

业务领域层,包含纯粹的业务逻辑,不依赖任何 UI 或运行时。

## 职责

Domain Layer 是系统的业务唯一入口,负责:

- 定义业务实体 (Entities)
- 实现业务用例 (Use Cases)
- 提供业务规则和验证逻辑
- 保持 UI/运行时无关性

## 关键原则

1. **纯粹性**: 不依赖任何 UI 框架或运行时环境
2. **可测试性**: 可以独立测试,无需模拟 React Native 或浏览器 API
3. **业务驱动**: 所有代码都对应明确的业务��求
4. **类型安全**: 使用 TypeScript 严格类型检查

## 目录结构

```
packages/domain/
├── entities/          # 业务实体
│   └── User.ts       # 用户实体
├── usecases/         # 业务用例
│   └── bootstrap.ts  # 启动用例
├── src/
│   └── index.ts      # 导出入口
├── dist/             # 构建输出
├── package.json
└── tsconfig.json
```

## 实体 (Entities)

### User

表示系统中的用户。

```typescript
import { User, createUser, validateUser } from '@expo-starter/domain'

// 创建用户
const user = createUser({
  id: '123',
  name: 'John Doe',
  email: 'john@example.com'
})

// 验证用户
const errors = validateUser(user)
if (errors.length > 0) {
  console.error('Validation errors:', errors)
}
```

## 用例 (Use Cases)

### Bootstrap

应用启动时的初始化逻辑。

```typescript
import { bootstrap } from '@expo-starter/domain'

const result = await bootstrap(async () => {
  // 提供 Bridge Capabilities
  return { getAppInfo, getUser }
})

console.log('App initialized:', result)
```

## 开发指南

### 添加新实体

1. 在 `entities/` 目录创建新文件
2. 定义实体接口和工厂函数
3. 添加验证函数(如需要)
4. 在 `src/index.ts` 导出

### 添加新用例

1. 在 `usecases/` 目录创建新文件
2. 定义用例函数(接收依赖,返回结果)
3. 确保用例是纯函数或返回 Promise
4. 在 `src/index.ts` 导出

## 禁止事项

- ❌ 导入 React, React Native 或任何 UI 框架
- ❌ 导入 expo-*, @react-navigation/* 等 Expo 模块
- ❌ 导入 bridge-runtime 或特定适配器
- ❌ 直接访问 AsyncStorage, SecureStore 等运行时 API

## 测试

```bash
# 运行单元测试
pnpm --filter @expo-starter/domain test

# 类型检查
pnpm --filter @expo-starter/domain type-check
```

## 依赖

- **无**: Domain Layer 不依赖任何其他内部包
