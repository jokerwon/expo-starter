<!--
Sync Impact Report:
- Version change: [INITIAL] → 1.0.0
- Modified principles: N/A (initial creation)
- Added sections: All core principles from architecture.md
- Removed sections: N/A
- Templates requiring updates:
  ✅ plan-template.md - Constitution Check section aligned
  ✅ spec-template.md - Requirements structure aligned
  ✅ tasks-template.md - Phase structure aligned with architecture layers
  ⚠ agent-file-template.md - Generic template, no updates needed
  ⚠ checklist-template.md - Generic template, no updates needed
- Follow-up TODOs: None
-->

# Expo Starter Constitution

## Core Principles

### I. App 是唯一主运行时

**原则声明**：
- Expo App 是系统的**唯一主运行时**
- 所有业务最终必须能在 App 内完整闭环
- WebView / H5 永远是从属运行时

**不可违背的规则**：
- 架构视角中不存在"平级的 Web 与 App"
- 任何新功能必须首先在 App 层面设计
- H5 不得独立于 App 存在核心业务逻辑

**理由**：确保系统的长期可控性和演进能力，避免因 H5 膨胀导致架构失控。

---

### II. H5 是受控 UI，不是系统参与者

**原则声明**：
H5 的定位被严格限定为：
- 配置驱动 UI
- 轻交互、轻状态
- 可替换、可丢弃

**H5 永远不允许**：
- 持有登录态
- 决定支付流程
- 请求系统权限
- 承担全局状态

**理由**：H5 是 UI 容器而非系统节点，必须保持其从属地位以维护架构清晰度。

---

### III. Bridge Contract 是系统宪法

**原则声明**：
- 所有 Native 能力必须通过 Bridge Contract 暴露
- Bridge Contract 是**第一份代码**
- 未进入 Contract 的能力视为不存在

**强制规范**：
- 只允许 TypeScript 类型定义
- 不允许运行时判断（Platform / window）
- 新增能力只能增加，不得破坏旧签名
- Contract 必须版本化管理（v1, v2...）

**理由**：Bridge Contract 定义系统边界和能力清单，是架构稳定性的基石。

---

### IV. Domain Layer 是业务唯一入口

**原则声明**：
- Domain 是业务系统的**唯一入口**
- UI 层禁止直接调用 bridge / api-client
- Domain 不感知 UI / Runtime

**禁止事项（红线）**：
- import React / RN / Web API
- import Adapter 实现
- import window / document
- 包含业务逻辑之外的任何运行时依赖

**理由**：确保业务逻辑的纯粹性和可测试性，支持 UI 技术栈的自由替换。

---

### V. 分层依赖铁律

**原则声明**：
依赖方向必须严格遵循：
```
UI → Adapter → Contract → Domain → Native Capability
```

**强制规则**：
- Native 能力只向上暴露
- 下层不得依赖上层
- 同层之间不得循环依赖
- Adapter 只做协议映射，不允许业务逻辑和状态缓存

**理由**：清晰的依赖方向是系统可维护性和可测试性的保证。

---

### VI. 能力准入与治理

**准入原则**：
能力必须满足以下所有条件才能进入 Bridge Contract：
- 多业务可复用
- 具有系统级意义
- 不属于纯 UI 逻辑

**禁止进入 Bridge 的内容**：
- 表单校验
- 页面跳转逻辑
- UI 状态管理
- 单一业务特有逻辑

**理由**：防止 Bridge Contract 膨胀，保持系统边界清晰。

---

### VII. 失败与降级策略

**原则声明**：
系统必须在失败路径上保持确定性：
- Bridge 不可用 → 阻断业务执行
- WebView 加载失败 → App 接管流程
- Contract 不匹配 → 禁止运行

**不允许**：
- 静默失败
- 降级到不确定状态
- 跳过关键检查

**理由**：明确的失败处理策略比模糊的降级更有利于系统稳定性。

---

## 架构约束

### Monorepo 结构规范

**强制结构**：
```
apps/
├─ app-expo/          # 主应用（唯一核心）
│  ├─ app/           # expo-router
│  ├─ features/
│  ├─ components/
│  ├─ bridge/        # RN Bridge Adapter
│  └─ main.tsx
│
├─ web-h5/           # 从属 UI 运行时
│  ├─ pages/
│  ├─ components/
│  ├─ bridge/        # H5 Bridge Adapter
│  └─ main.ts
│
packages/
├─ domain/           # 业务唯一入口
│  ├─ entities/
│  ├─ usecases/
│  └─ index.ts
│
├─ bridge-contract/  # 系统宪法（版本化）
│  ├─ v1/
│  ├─ v2/
│  └─ index.ts
│
├─ bridge-runtime/   # JSBridge 工具
├─ api-client/       # API 访问层
└─ ui-tokens/        # Design Tokens（可选）
```

**不允许**：
- 在 apps/ 之外创建应用入口
- 在 packages/ 之外创建共享代码
- 跨越层级的直接依赖

---

### WebView 运行时规则

**必须遵守**：
- WebView 不控制路由
- WebView 不维护全局状态
- WebView 不参与系统决策

**H5 Adapter 要求**：
- H5 业务代码不得访问 window.AppBridge
- Adapter 是唯一入口
- 浏览器环境允许降级 mock

---

## 开发流程

### 需求开发顺序（强约束）

任何新需求必须遵循以下顺序：

1. **Domain 先行**：在 packages/domain 中定义业务逻辑
2. **Bridge Contract 评审**：确定需要暴露的 Native 能力
3. **Adapter 实现**：实现 RN Adapter 和 H5 Adapter
4. **UI 最后实现**：在 App 和 H5 中实现 UI

**如果顺序被打乱，视为架构违规。**

---

### 代码审查要求

**必须检查项**：
- Domain 代码是否包含 UI 依赖
- Bridge Contract 是否有破坏性变更
- Adapter 是否包含业务逻辑
- H5 是否尝试持有系统状态
- 依赖方向是否正确

**审查通过标准**：
- 删除 web-h5 项目，App 不受影响
- 更换 UI 技术栈，Domain 无需修改
- Bridge Contract 可持续演进

---

## 成功判定标准

当满足以下条件时，架构是成功的：

1. **可替换性**：删除 web-h5 项目，App 不受影响
2. **技术栈独立性**：更换 UI 技术栈，Domain 无需修改
3. **可演进性**：Bridge Contract 可持续演进而不破坏现有功能
4. **业务稳定性**：业务逻辑不动如山，UI 随时可换

---

## Governance

### 宪章地位

- 本宪章是项目的最高技术规范
- 所有架构决策必须符合本宪章
- 违反宪章的代码不得合并

### 修订流程

**修订类型**：
- **MAJOR**：向后不兼容的原则移除或重新定义
- **MINOR**：新增原则或重大扩展
- **PATCH**：澄清、措辞、错误修正

**修订要求**：
- 必须有书面提案和理由
- 必须经过团队评审
- 必须有迁移计划（如适用）
- 必须更新所有依赖模板

### 合规性审查

**审查时机**：
- 所有 PR 必须验证合规性
- 每个 Sprint 结束时进行架构审查
- 重大功能上线前进行全面审查

**审查内容**：
- 代码是否符合分层依赖铁律
- Bridge Contract 是否正确使用
- Domain 是否保持纯粹
- H5 是否越界

**违规处理**：
- 轻微违规：要求修改后合并
- 严重违规：拒绝合并，要求重新设计
- 持续违规：升级至技术负责人处理

---

**Version**: 1.0.0 | **Ratified**: 2026-01-30 | **Last Amended**: 2026-01-30
