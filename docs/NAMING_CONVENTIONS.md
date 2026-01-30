# 命名规范

本文档定义项目的命名约定,确保代码一致性。

## 文件和目录命名

### 文件命名

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| React 组件 | PascalCase | `Button.tsx`, `UserProfile.tsx` |
| Hooks | camelCase with `use` prefix | `useAuth.ts`, `useUserData.ts` |
| 工具函数 | camelCase | `formatDate.ts`, `validateEmail.ts` |
| 类型定义 | PascalCase | `User.ts`, `ApiConfig.ts` |
| 常量文件 | UPPER_SNAKE_CASE | `API_CONFIG.ts`, `COLORS.ts` |
| 配置文件 | kebab-case | `tsconfig.json`, `.eslintrc.js` |
| 文档文件 | UPPER_SNAKE_CASE | `README.md`, `CONTRIBUTING.md` |

### 目录命名

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| 功能模块 | kebab-case | `user-management/`, `order-history/` |
| UI 组件 | PascalCase (单组件) 或 kebab-case (分组) | `Button/` 或 `form-elements/` |
| 工具目录 | kebab-case | `utils/`, `helpers/` |
| 配置目录 | kebab-case | `config/`, `settings/` |

## 代码命名

### 变量和函数

```typescript
// ✅ camelCase
const userName = 'John'
const isLoggedIn = true
const getUserData = () => {}

// ❌ 避免
const user_name = 'John'  // snake_case
const GetUserData = () => {}  // PascalCase (用于函数)
```

### 布尔值

```typescript
// ✅ 使用 is/has/should/can 前缀
const isActive = true
const hasPermission = false
const shouldUpdate = true
const canEdit = false

// ❌ 避免
const active = true
const permission = false
```

### 类和接口

```typescript
// ✅ PascalCase
class UserService {}
interface UserData {}
type ButtonVariant = 'primary' | 'secondary'

// ❌ 避免
class userService {}
interface user_data {}
```

### 类型参数 (泛型)

```typescript
// ✅ 使用 T 或描述性名称
function identity<T>(value: T): T { return value }
function map<T, U>(values: T[], fn: (v: T) => U): U[] { return [] }

// ❌ 避免
function identity<Value>(value: Value): Value { return value }
```

### 枚举

```typescript
// ✅ PascalCase (枚举名) + PascalCase (成员)
enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}

// ✅ 或者 UPPER_SNAKE_CASE (成员)
enum HttpStatus {
  OK = 200,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}
```

### 常量

```typescript
// ✅ UPPER_SNAKE_CASE (全局常量)
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRY_COUNT = 3
const DEFAULT_TIMEOUT = 30000

// ✅ camelCase (局部/模块级常量)
const defaultConfig = { timeout: 30000 }
const maxItems = 100
```

## React 命名

### 组件

```typescript
// ✅ PascalCase
export function Button() { }
export function UserProfile() { }
export const HomePage = () => { }

// ❌ 避免
export function button() { }
export function user_profile() { }
```

### Props 接口

```typescript
// ✅ 组件名 + Props 后缀
interface ButtonProps {
  title: string
  onPress: () => void
}

interface UserProfileProps {
  userId: string
}

// ✅ 或者使用内联类型
const Button = ({ title, onPress }: { title: string; onPress: () => void }) => {
  // ...
}
```

### Hooks

```typescript
// ✅ use + camelCase
function useAuth() { }
function useUserData(userId: string) { }
function useApiCall<T>() { }

// ❌ 避免
function Auth() { }
function getAuth() { }
function fetchUserData() { }
```

### 事件处理器

```typescript
// ✅ handle + 事件名
const handlePress = () => { }
const handleSubmit = (data: FormData) => { }
const handleUserChange = (user: User) => { }

// ✅ on + 事件名 (用于 props)
interface Props {
  onPress?: () => void
  onSubmit?: (data: FormData) => void
  onUserChange?: (user: User) => void
}
```

## 文件命名约定

### 按角色分组

```
features/auth/
├── AuthFeature.tsx          # 主要功能组件 (PascalCase)
├── components/              # 功能组件
│   ├── LoginForm.tsx       # (PascalCase)
│   └── RegisterForm.tsx
├── hooks/
│   ├── useAuth.ts          # (camelCase)
│   └── useAuthState.ts
├── utils/
│   ├── validateCredentials.ts  # (camelCase)
│   └── formatAuthError.ts
└── types.ts                 # 类型定义
```

### 索引文件

```typescript
// features/auth/index.ts - 导出公共 API
export { AuthFeature } from './AuthFeature'
export { useAuth } from './hooks/useAuth'
export type { AuthState } from './types'
```

## 特定模式

### 工厂函数

```typescript
// ✅ create + 名词
function createUser(data: UserData): User { }
function createApiClient(config: ApiConfig): ApiClient { }
```

### 转换函数

```typescript
// ✅ to + 目标类型
function toString(value: number): string { }
function toUserData(apiResponse: ApiResponse): UserData { }
```

### 验证函数

```typescript
// ✅ validate + 名词
function validateUser(user: Partial<User>): string[] { }
function validateEmail(email: string): boolean { }
```

### 格式化函数

```typescript
// ✅ format + 名词
function formatDate(date: Date): string { }
function formatCurrency(amount: number): string { }
```

## 测试文件命名

```
components/
├── Button.tsx
├── Button.test.tsx          # 同名测试文件
└── __tests__/              # 或放在 __tests__ 目录
    └── Button.test.tsx
```

## 包命名

### npm 包名

```
@expo-starter/domain         # kebab-case
@expo-starter/bridge-contract
@expo-starter/ui-tokens
```

### 路径别名 (tsconfig)

```json
{
  "paths": {
    "@expo-starter/domain": ["./packages/domain/src"],
    "@expo-starter/bridge-contract": ["./packages/bridge-contract/src"]
  }
}
```

## CSS/样式命名

### StyleSheet

```typescript
// ✅ camelCase
const styles = StyleSheet.create({
  container: { },
  buttonContainer: { },
  titleText: { },
  errorLabel: { },
})

// ❌ 避免
const styles = StyleSheet.create({
  Container: { },      // 不要 PascalCase
  button_container: { }, // 不要 snake_case
})
```

### Design Tokens

```typescript
// ✅ 分组和层次
colors.primary[500]
colors.text.secondary
spacing[4]

// ❌ 避免
colors.primary500
colors.textSecondary
spacing4
```

## 数据库/API

### API 端点

```
GET    /api/users          # 获取列表
GET    /api/users/:id      # 获取单个
POST   /api/users          # 创建
PUT    /api/users/:id      # 更新
DELETE /api/users/:id      # 删除
```

### 数据库表/字段

```sql
-- ✅ snake_case
CREATE TABLE user_profiles (
  user_id INT PRIMARY KEY,
  first_name VARCHAR(50),
  created_at TIMESTAMP
)

-- ❌ 避免
CREATE TABLE UserProfiles (
  UserId INT PRIMARY KEY,
  FirstName VARCHAR(50)
)
```

## Git 命名

### 分支命名

```
feature/add-user-auth
bugfix/login-crash
hotfix/security-patch
refactor/optimize-api-client
```

### 提交信息

```
feat: add user authentication
fix: resolve login crash on iOS
docs: update README with setup instructions
refactor: optimize API client performance
test: add unit tests for User entity
```

## 违反规范的例外

### 第三方库集成

当与第三方库集成时,遵循该库的命名约定:

```typescript
// 例如: react-navigation
useNavigation()  // 保留库的命名
useRoute()       // 保留库的命名

// 例如: Expo Constants
Constants.expoConfig  // 保留库的命名
```

### 平台特定代码

```typescript
// 平台检测 (保留 Platform 命名)
Platform.OS === 'ios'
Platform.select({ ios: (), android: () })
```

## 命名审查清单

- [ ] 文件命名符合类型约定
- [ ] 变量使用 camelCase
- [ ] 布尔值有 is/has/should 前缀
- [ ] 类/接口使用 PascalCase
- [ ] 常量使用 UPPER_SNAKE_CASE
- [ ] 组件使用 PascalCase
- [ ] Hooks 使用 use 前缀
- [ ] 事件处理器使用 handle/on 前缀
- [ ] 测试文件与源文件同名
- [ ] 包名使用 kebab-case
