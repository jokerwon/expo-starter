# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., TypeScript 5.x, React Native (Expo SDK 51+) or NEEDS CLARIFICATION]
**Primary Dependencies**: [e.g., Expo, React Navigation, expo-router or NEEDS CLARIFICATION]
**Storage**: [if applicable, e.g., AsyncStorage, SQLite, Remote API or N/A]
**Testing**: [e.g., Jest, React Native Testing Library or NEEDS CLARIFICATION]
**Target Platform**: [e.g., iOS 15+, Android 12+, Web (H5) or NEEDS CLARIFICATION]
**Project Type**: Monorepo (Expo + WebView + JSBridge architecture)
**Performance Goals**: [domain-specific, e.g., <100ms bridge call latency, 60fps UI or NEEDS CLARIFICATION]
**Constraints**: [domain-specific, e.g., offline-capable, <50MB bundle size or NEEDS CLARIFICATION]
**Scale/Scope**: [domain-specific, e.g., 100k users, 50 screens, 10 features or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**参考**: `.specify/memory/constitution.md`

### 核心原则合规性

- [ ] **App 主运行时原则**: 功能是否在 App 内完整闭环？H5 是否仅作为从属 UI？
- [ ] **H5 受控原则**: H5 是否尝试持有登录态、决定支付流程或请求系统权限？
- [ ] **Bridge Contract 原则**: 所有 Native 能力是否通过 Bridge Contract 暴露？Contract 是否版本化？
- [ ] **Domain Layer 原则**: Domain 是否保持纯粹（无 UI 依赖）？UI 是否直接调用 bridge/api-client？
- [ ] **分层依赖原则**: 依赖方向是否正确（UI → Adapter → Contract → Domain → Native）？
- [ ] **能力准入原则**: 新增 Bridge 能力是否满足：多业务可复用、系统级意义、非纯 UI 逻辑？
- [ ] **失败策略原则**: 是否定义了明确的失败处理策略（不允许静默失败）？

### 架构约束合规性

- [ ] **Monorepo 结构**: 是否遵循 apps/ 和 packages/ 的强制结构？
- [ ] **WebView 规则**: WebView 是否尝试控制路由、维护全局状态或参与系统决策？
- [ ] **开发顺序**: 是否遵循 Domain → Contract → Adapter → UI 的开发顺序？

### 复杂度说明

如有违规项，必须在下方"Complexity Tracking"表格中说明理由。

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Expand the structure with real paths based on the Monorepo
  structure defined in constitution.md.
-->

```text
# Expo Starter Monorepo Structure (from constitution.md)
apps/
├── app-expo/                    # 主应用（唯一核心）
│   ├── app/                    # expo-router
│   ├── features/
│   ├── components/
│   ├── bridge/                 # RN Bridge Adapter
│   └── main.tsx
│
├── web-h5/                     # 从属 UI 运行时
│   ├── pages/
│   ├── components/
│   ├── bridge/                 # H5 Bridge Adapter
│   └── main.ts
│
packages/
├── domain/                     # 业务唯一入口
│   ├── entities/
│   ├── usecases/
│   └── index.ts
│
├── bridge-contract/            # 系统宪法（版本化）
│   ├── v1/
│   ├── v2/
│   └── index.ts
│
├── bridge-runtime/             # JSBridge 工具
├── api-client/                 # API 访问层
└── ui-tokens/                  # Design Tokens（可选）
```

**Structure Decision**: 本项目遵循 Expo + WebView + JSBridge 架构，使用 Monorepo 结构。
- **apps/app-expo**: 主应用运行时，所有业务必须在此闭环
- **apps/web-h5**: 从属 UI 运行时，仅作为配置驱动的轻量 UI
- **packages/domain**: 业务逻辑唯一入口，不感知 UI/Runtime
- **packages/bridge-contract**: 定义 Native 能力的系统宪法
- **其他 packages**: 支撑层，提供工具和基础设施

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
