# 新项目专用｜Expo + WebView + JSBridge 强化版架构设计

> 本文档适用于：
> **从 0 开始的新项目，不考虑任何历史业务，不为兼容妥协。**
>
> 核心目标只有一个：
> **建立一个 App 为绝对中心、可长期演进、不因 H5 膨胀而失控的系统架构。**

---

## 一、最高设计原则（不可违背）

### 1. App 是唯一主运行时

- Expo App 是系统的**唯一主运行时**
- 所有业务最终必须能在 App 内完整闭环
- WebView / H5 永远是从属运行时

> 架构视角中不存在“平级的 Web 与 App”

---

### 2. H5 是受控 UI，不是系统参与者

H5 的定位被严格限定为：

- 配置驱动 UI
- 轻交互、轻状态
- 可替换、可丢弃

H5 **永远不允许**：

- 持有登录态
- 决定支付流程
- 请求系统权限
- 承担全局状态

---

### 3. Bridge Contract 是系统宪法

- 所有 Native 能力必须通过 Bridge Contract 暴露
- Bridge Contract 是**第一份代码**
- 未进入 Contract 的能力视为不存在

---

## 二、分层架构（主从模型）

```
┌──────────────────────────────┐
│          App Runtime         │
│  ┌────────────────────────┐  │
│  │        Expo UI         │  │
│  └──────────┬─────────────┘  │
│             │ WebView        │
│  ┌──────────▼─────────────┐  │
│  │        H5 UI           │  │
│  └────────────────────────┘  │
├──────────────────────────────┤
│     Bridge Adapter Layer     │
│  - RN Adapter                │
│  - H5 Adapter                │
├──────────────────────────────┤
│     Bridge Contract Layer    │
│  - Capabilities              │
│  - Events                    │
├──────────────────────────────┤
│        Domain Layer          │
│  - UseCases                  │
│  - Business Rules            │
├──────────────────────────────┤
│   Native Capability Layer    │
│  - Expo Modules              │
│  - Native SDK                │
└──────────────────────────────┘
```

**依赖铁律：**

- UI → Adapter → Contract → Domain
- Native 能力只向上暴露
- Domain 不感知 UI / Runtime

---

## 三、Monorepo 结构（最终形态）

```
apps/
├─ app-expo/                    # 主应用（唯一核心）
│  ├─ app/                      # expo-router
│  ├─ features/
│  ├─ components/
│  ├─ bridge/                   # RN Bridge Adapter
│  └─ main.tsx
│
├─ web-h5/                      # 从属 UI 运行时
│  ├─ pages/
│  ├─ components/
│  ├─ bridge/                   # H5 Bridge Adapter
│  └─ main.ts
│
packages/
├─ domain/                      # 业务唯一入口
│  ├─ entities/
│  ├─ usecases/
│  └─ index.ts
│
├─ bridge-contract/             # 系统宪法（版本化）
│  ├─ v1/
│  ├─ v2/
│  └─ index.ts
│
├─ bridge-runtime/              # JSBridge 工具
├─ api-client/                  # API 访问层
└─ ui-tokens/                   # Design Tokens（可选）
```

---

## 四、Bridge Contract（强制规范）

### 4.1 定位

Bridge Contract 定义：

- 系统允许的 Native 能力
- 能力的参数、返回、错误语义

它不是实现，而是**法律文本**。

---

### 4.2 设计规则（硬性）

- 只允许 TypeScript 类型
- 不允许运行时判断（Platform / window）
- 新增能力只能增加，不得破坏旧签名

---

### 4.3 示例

```ts
export interface BridgeCapabilitiesV1 {
  getAppInfo(): {
    platform: 'ios' | 'android'
    version: string
  }

  getUser(): Promise<User>

  openExternal(url: string): void
}
```

---

## 五、Domain Layer（业务唯一入口）

### 5.1 地位

- Domain 是业务系统的**唯一入口**
- UI 层禁止直接调用 bridge / api-client

---

### 5.2 禁止事项（红线）

- import React / RN / Web API
- import Adapter 实现
- import window / document

---

### 5.3 UseCase 示例

```ts
export async function bootstrap(bridge: BridgeCapabilitiesV1) {
  const app = bridge.getAppInfo()
  const user = await bridge.getUser()

  return { app, user }
}
```

---

## 六、Bridge Adapter 层（薄而稳定）

### 6.1 原则

- Adapter 只做协议映射
- 不允许业务逻辑
- 不允许状态缓存

---

### 6.2 H5 Adapter 要求

- H5 业务代码不得访问 window.AppBridge
- Adapter 是唯一入口
- 浏览器环境允许降级 mock

---

## 七、WebView 运行时规则（必须遵守）

- WebView 不控制路由
- WebView 不维护全局状态
- WebView 不参与系统决策

WebView 是 **UI 容器，不是系统节点**。

---

## 八、能力准入与治理

### 8.1 准入原则

能力必须满足：

- 多业务可复用
- 具有系统级意义
- 不属于纯 UI 逻辑

---

### 8.2 禁止进入 Bridge 的内容

- 表单校验
- 页面跳转逻辑
- UI 状态

---

## 九、失败与降级策略（必须设计）

- Bridge 不可用 → 阻断业务执行
- WebView 加载失败 → App 接管流程
- Contract 不匹配 → 禁止运行

系统必须在失败路径上保持确定性。

---

## 十、开发流程强约束（写进团队规范）

任何新需求必须遵循：

1. Domain 先行
2. Bridge Contract 评审
3. Adapter 实现
4. UI 最后实现

如果顺序被打乱，视为架构违规。

---

## 十一、成功判定标准

当满足以下条件时，架构是成功的：

- 删除 web-h5 项目，App 不受影响
- 更换 UI 技术栈，Domain 无需修改
- Bridge Contract 可持续演进

---

## 十二、结语

这不是一套追求“全端统一”的架构，
而是一套追求 **控制力、可替换性、长期秩序** 的系统设计。

> App 稳定存在，H5 随时可换，
> 业务逻辑不动如山。
