# Tasks: 项目初始化

**Input**: Design documents from `/specs/001-project-init/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: 本功能不包含测试任务,专注于项目基础设施搭建。

**Organization**: 任务按用户故事组织,每个故事可独立实施和验证。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可并行运行(不同文件,无依赖)
- **[Story]**: 任务所属用户故事(如 US1, US2, US3)
- 包含具体文件路径

## Path Conventions

本项目采用 Monorepo 结构:
- **Apps**: `apps/app-expo/`, `apps/web-h5/`
- **Packages**: `packages/domain/`, `packages/bridge-contract/`, etc.
- **Docs**: `docs/`
- **Root**: 根目录配置文件

---

## Phase 1: Setup (项目初始化)

**Purpose**: 创建 Monorepo 根配置和基础目录结构

- [x] T001 创建 Monorepo 根 package.json 配置文件
- [x] T002 创建 pnpm-workspace.yaml 配置文件
- [x] T003 [P] 创建 .gitignore 文件
- [x] T004 [P] 创建 .env.example 环境变量模板文件
- [x] T005 创建 apps/ 和 packages/ 目录结构

---

## Phase 2: Foundational (基础设施 - 阻塞所有用户故事)

**Purpose**: 核心基础设施,必须在任何用户故事之前完成

**⚠️ CRITICAL**: 在此阶段完成前,不能开始任何用户故事工作

**根据 constitution.md,基础设施必须遵循分层架构**:

### TypeScript 配置 (最高优先级)
- [x] T006 创建 tsconfig.base.json 根 TypeScript 配置
- [x] T007 [P] 配置 TypeScript 项目引用和路径映射

### Bridge Contract Layer (第二优先级)
- [x] T008 创建 packages/bridge-contract/ 目录结构
- [x] T009 创建 packages/bridge-contract/package.json
- [x] T010 创建 packages/bridge-contract/tsconfig.json
- [x] T011 [P] 创建 packages/bridge-contract/v1/capabilities.ts (能力接口定义)
- [x] T012 [P] 创建 packages/bridge-contract/v1/events.ts (事件接口定义)
- [x] T013 [P] 创建 packages/bridge-contract/v1/index.ts (导出所有接口)
- [x] T014 创建 packages/bridge-contract/index.ts (版本化导出)

### Domain Layer (第三优先级)
- [x] T015 创建 packages/domain/ 目录结构
- [x] T016 创建 packages/domain/package.json
- [x] T017 创建 packages/domain/tsconfig.json (引用 bridge-contract)
- [x] T018 [P] 创建 packages/domain/entities/User.ts (示例实体)
- [x] T019 [P] 创建 packages/domain/usecases/bootstrap.ts (启动用例)
- [x] T020 创建 packages/domain/index.ts (导出所有实体和用例)
- [x] T021 验证 Domain 无 UI/Runtime 依赖 (import 检查)

### Bridge Runtime (第四优先级)
- [x] T022 创建 packages/bridge-runtime/ 目录结构
- [x] T023 创建 packages/bridge-runtime/package.json
- [x] T024 创建 packages/bridge-runtime/tsconfig.json (引用 bridge-contract)
- [x] T025 [P] 创建 packages/bridge-runtime/src/BridgeRuntime.ts
- [x] T026 [P] 创建 packages/bridge-runtime/src/types.ts
- [x] T027 创建 packages/bridge-runtime/index.ts

### API Client (并行)
- [x] T028 [P] 创建 packages/api-client/ 目录结构
- [x] T029 [P] 创建 packages/api-client/package.json
- [x] T030 [P] 创建 packages/api-client/tsconfig.json
- [x] T031 [P] 创建 packages/api-client/src/client.ts (HTTP 客户端)
- [x] T032 [P] 创建 packages/api-client/src/types.ts
- [x] T033 [P] 创建 packages/api-client/index.ts

### UI Tokens (并行,可选)
- [x] T034 [P] 创建 packages/ui-tokens/ 目录结构
- [x] T035 [P] 创建 packages/ui-tokens/package.json
- [x] T036 [P] 创建 packages/ui-tokens/tsconfig.json
- [x] T037 [P] 创建 packages/ui-tokens/src/colors.ts
- [x] T038 [P] 创建 packages/ui-tokens/src/spacing.ts
- [x] T039 [P] 创建 packages/ui-tokens/index.ts

**Checkpoint**: 基础设施就绪 - 用户故事实施现在可以并行开始

---

## Phase 3: User Story 1 - 开发环境搭建 (Priority: P1) 🎯 MVP

**Goal**: 让开发者能在 15 分钟内完成环境搭建并成功运行项目

**Independent Test**: 运行 `pnpm install && pnpm dev`,开发服务器在 30 秒内启动,热重载在 3 秒内响应

**遵循 constitution.md 的开发顺序: Domain → Contract → Adapter → UI**

### Expo 应用初始化 (UI Layer)
- [x] T040 [US1] 创建 apps/app-expo/ 目录结构
- [x] T041 [US1] 使用 Expo CLI 初始化 Expo 项目在 apps/app-expo/
- [x] T042 [US1] 创建 apps/app-expo/package.json (依赖 domain, bridge-contract, bridge-runtime)
- [x] T043 [US1] 创建 apps/app-expo/tsconfig.json (引用所有 packages)
- [x] T044 [US1] 配置 apps/app-expo/app.json (Expo SDK 51 配置)
- [x] T045 [US1] 配置 apps/app-expo/metro.config.js (Monorepo 支持)

### Expo Router 配置
- [x] T046 [P] [US1] 创建 apps/app-expo/app/_layout.tsx (根布局)
- [x] T047 [P] [US1] 创建 apps/app-expo/app/(tabs)/_layout.tsx (标签页布局)
- [x] T048 [P] [US1] 创建 apps/app-expo/app/(tabs)/index.tsx (首页)
- [x] T049 [P] [US1] 创建 apps/app-expo/app/(tabs)/settings.tsx (设置页)
- [x] T050 [P] [US1] 创建 apps/app-expo/app/+not-found.tsx (404 页面)

### Bridge Adapter (RN)
- [x] T051 [P] [US1] 创建 apps/app-expo/bridge/RNBridgeAdapter.ts
- [x] T052 [US1] 实现 RN Bridge Adapter (仅协议映射,无业务逻辑)

### 示例组件和功能
- [x] T053 [P] [US1] 创建 apps/app-expo/components/Button.tsx (示例组件)
- [x] T054 [P] [US1] 创建 apps/app-expo/features/example/ (示例功能模块)
- [x] T055 [P] [US1] 创建 apps/app-expo/assets/ (静态资源目录)

### 环境配置
- [x] T056 [US1] 创建 apps/app-expo/app.config.js (替代 app.json,支持环境变量)
- [x] T057 [US1] 创建 apps/app-expo/src/config/env.ts (类型安全的环境变量访问)

### 依赖安装和验证
- [x] T058 [US1] 在根目录运行 `pnpm install` 安装所有依赖
- [x] T059 [US1] 验证开发服务器启动 (`pnpm --filter app-expo dev`)
- [x] T060 [US1] 验证热重载功能正常工作
- [x] T061 [US1] 验证 TypeScript 类型检查通过
- [x] T062 [US1] 验证环境搭建时间 < 15 分钟

**Checkpoint**: 此时 User Story 1 应完全功能正常且可独立测试

---

## Phase 4: User Story 2 - 项目结构规范 (Priority: P2)

**Goal**: 建立清晰的项目目录结构和代码组织规范

**Independent Test**: 检查目录结构符合 plan.md 定义,示例代码遵循规范

**遵循 constitution.md 的开发顺序: Domain → Contract → Adapter → UI**

### 目录结构文档
- [x] T063 [US2] 在 apps/app-expo/ 创建 README.md (说明目录结构)
- [x] T064 [P] [US2] 在 packages/domain/ 创建 README.md (说明 Domain Layer 职责)
- [x] T065 [P] [US2] 在 packages/bridge-contract/ 创建 README.md (说明 Contract 规范)

### 示例代码完善
- [x] T066 [P] [US2] 完善 packages/domain/entities/User.ts (添加注释和示例)
- [x] T067 [P] [US2] 完善 packages/domain/usecases/bootstrap.ts (添加注释和示例)
- [x] T068 [P] [US2] 完善 apps/app-expo/components/Button.tsx (添加注释和使用示例)

### 代码组织规范
- [x] T069 [US2] 创建 docs/CODE_ORGANIZATION.md (代码组织规范文档)
- [x] T070 [US2] 创建 docs/NAMING_CONVENTIONS.md (命名规范文档)
- [x] T071 [US2] 创建 docs/FILE_STRUCTURE.md (文件结构说明)

### 验证
- [x] T072 [US2] 验证所有目录都有 README.md 说明
- [x] T073 [US2] 验证示例代码符合规范
- [x] T074 [US2] 验证文档完整性 >= 90%

**Checkpoint**: 此时 User Stories 1 和 2 都应独立工作

---

## Phase 5: User Story 3 - 代码质量工具配置 (Priority: P2)

**Goal**: 配置自动化代码质量检查工具,确保代码质量和一致性

**Independent Test**: 运行 `pnpm lint` 和 `pnpm format`,工具能正确检查和修复代码

**遵循 constitution.md 的开发顺序: Domain → Contract → Adapter → UI**

### ESLint 配置
- [ ] T075 [US3] 创建根目录 .eslintrc.js (Expo + TypeScript 配置)
- [ ] T076 [US3] 在根 package.json 添加 ESLint 相关依赖
- [ ] T077 [US3] 在根 package.json 添加 lint 脚本命令
- [ ] T078 [US3] 配置 ESLint 忽略模式 (node_modules, dist, build, .expo)

### Prettier 配置
- [ ] T079 [P] [US3] 创建根目录 .prettierrc.js
- [ ] T080 [P] [US3] 创建根目录 .prettierignore
- [ ] T081 [P] [US3] 在根 package.json 添加 Prettier 依赖
- [ ] T082 [P] [US3] 在根 package.json 添加 format 脚本命令

### VS Code 配置
- [ ] T083 [P] [US3] 创建 .vscode/settings.json (编辑器配置)
- [ ] T084 [P] [US3] 创建 .vscode/extensions.json (推荐插件列表)
- [ ] T085 [P] [US3] 创建 .vscode/launch.json (调试配置)

### Jest 配置 (基础)
- [ ] T086 [P] [US3] 创建根目录 jest.config.js (多项目配置)
- [ ] T087 [P] [US3] 创建 apps/app-expo/jest.config.js (Expo 测试配置)
- [ ] T088 [P] [US3] 创建 packages/domain/jest.config.js (Node 测试配置)
- [ ] T089 [P] [US3] 在根 package.json 添加 Jest 依赖和 test 脚本

### 验证
- [ ] T090 [US3] 运行 `pnpm lint` 验证 ESLint 配置
- [ ] T091 [US3] 运行 `pnpm format` 验证 Prettier 配置
- [ ] T092 [US3] 运行 `pnpm test` 验证 Jest 配置
- [ ] T093 [US3] 验证 VS Code 插件推荐生效
- [ ] T094 [US3] 验证代码质量工具能发现 80%+ 常见问题

**Checkpoint**: 此时 User Stories 1, 2, 3 都应独立工作

---

## Phase 6: User Story 4 - 版本控制规范 (Priority: P3)

**Goal**: 建立统一的 Git 工作流和提交规范

**Independent Test**: 提交不符合规范的消息被拒绝,pre-commit 钩子自动运行检查

**遵循 constitution.md 的开发顺序: Domain → Contract → Adapter → UI**

### Commitlint 配置
- [ ] T095 [US4] 创建 commitlint.config.js (Conventional Commits 配置)
- [ ] T096 [US4] 在根 package.json 添加 commitlint 依赖

### Husky 配置
- [ ] T097 [US4] 在根 package.json 添加 husky 依赖
- [ ] T098 [US4] 在根 package.json 添加 prepare 脚本
- [ ] T099 [US4] 运行 `pnpm prepare` 初始化 husky
- [ ] T100 [US4] 创建 .husky/commit-msg 钩子 (commitlint 检查)
- [ ] T101 [US4] 创建 .husky/pre-commit 钩子 (lint-staged)

### Lint-staged 配置
- [ ] T102 [P] [US4] 在根 package.json 添加 lint-staged 依赖
- [ ] T103 [P] [US4] 在根 package.json 配置 lint-staged 规则

### Git 配置
- [ ] T104 [P] [US4] 更新 .gitignore (添加 .env, node_modules, dist, build, .expo)
- [ ] T105 [P] [US4] 创建 .gitattributes (行尾符规范化)

### 验证
- [ ] T106 [US4] 测试提交不符合规范的消息被拒绝
- [ ] T107 [US4] 测试 pre-commit 钩子自动运行 lint 和 format
- [ ] T108 [US4] 验证 Git 配置正确

**Checkpoint**: 此时 User Stories 1, 2, 3, 4 都应独立工作

---

## Phase 7: User Story 5 - 基础文档完善 (Priority: P3)

**Goal**: 提供完整的项目文档,帮助新成员快速了解项目

**Independent Test**: 新成员阅读文档后能成功搭建环境并理解项目架构

**遵循 constitution.md 的开发顺序: Domain → Contract → Adapter → UI**

### 根目录文档
- [ ] T109 [US5] 创建根目录 README.md (项目简介、技术栈、快速开始)
- [ ] T110 [US5] 基于 specs/001-project-init/quickstart.md 完善 README.md

### 贡献指南
- [ ] T111 [P] [US5] 创建 docs/CONTRIBUTING.md (贡献指南)
- [ ] T112 [P] [US5] 在 CONTRIBUTING.md 添加代码规范章节
- [ ] T113 [P] [US5] 在 CONTRIBUTING.md 添加提交流程章节
- [ ] T114 [P] [US5] 在 CONTRIBUTING.md 添加测试要求章节

### 架构文档更新
- [ ] T115 [P] [US5] 更新 docs/architecture.md (添加实际实施的结构)
- [ ] T116 [P] [US5] 创建 docs/API.md (API 文档模板)
- [ ] T117 [P] [US5] 创建 docs/TROUBLESHOOTING.md (故障排查指南)

### 包文档
- [ ] T118 [P] [US5] 完善 packages/domain/README.md
- [ ] T119 [P] [US5] 完善 packages/bridge-contract/README.md
- [ ] T120 [P] [US5] 完善 packages/bridge-runtime/README.md
- [ ] T121 [P] [US5] 完善 apps/app-expo/README.md

### 验证
- [ ] T122 [US5] 验证 README.md 包含所有必要章节
- [ ] T123 [US5] 验证 CONTRIBUTING.md 完整且清晰
- [ ] T124 [US5] 验证文档完整性评分 >= 90%
- [ ] T125 [US5] 让新成员测试文档可用性

**Checkpoint**: 所有用户故事现在都应独立功能正常

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: 跨用户故事的改进和最终验证

**根据 constitution.md 进行最终合规性检查**:

### Architecture Compliance Review
- [ ] T126 验证 App 是唯一主运行时 (所有业务在 App 内闭环)
- [ ] T127 验证 H5 仅作为受控 UI (当前阶段未创建 H5,符合要求)
- [ ] T128 验证 Bridge Contract 完整性 (所有 Native 能力已定义)
- [ ] T129 验证 Domain Layer 纯粹性 (无 UI/Runtime 依赖)
- [ ] T130 验证分层依赖正确性 (UI → Adapter → Contract → Domain → Native)
- [ ] T131 验证失败策略明确性 (环境搭建失败有明确错误提示)

### Code Quality
- [ ] T132 [P] 运行 `pnpm lint:fix` 修复所有 lint 问题
- [ ] T133 [P] 运行 `pnpm format` 格式化所有代码
- [ ] T134 [P] 运行 `pnpm type-check` 验证类型检查通过
- [ ] T135 [P] 代码清理和重构 (移除未使用的导入和变量)

### Performance Validation
- [ ] T136 验证开发服务器启动时间 < 30 秒
- [ ] T137 验证热重载响应时间 < 3 秒
- [ ] T138 验证依赖安装时间合理 (< 5 分钟)

### Final Validation
- [ ] T139 测试: 删除 web-h5 项目 (当前未创建),App 正常运行 ✅
- [ ] T140 测试: Domain 可独立测试 (无 UI 依赖) ✅
- [ ] T141 测试: Bridge Contract 可演进 (版本化机制已建立) ✅
- [ ] T142 运行 quickstart.md 完整流程验证
- [ ] T143 验证新开发者能在 15 分钟内完成环境搭建
- [ ] T144 验证 95%+ 开发者能通过 README 独立完成搭建

### Documentation Final Pass
- [ ] T145 [P] 检查所有文档链接有效
- [ ] T146 [P] 检查所有代码示例可运行
- [ ] T147 [P] 更新 CHANGELOG.md (如果存在)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无依赖 - 可立即开始
- **Foundational (Phase 2)**: 依赖 Setup 完成 - 阻塞所有用户故事
- **User Stories (Phase 3-7)**: 全部依赖 Foundational 阶段完成
  - 用户故事可并行进行 (如有人力)
  - 或按优先级顺序进行 (P1 → P2 → P3)
- **Polish (Phase 8)**: 依赖所有期望的用户故事完成

### User Story Dependencies

- **User Story 1 (P1)**: Foundational 后可开始 - 无其他故事依赖
- **User Story 2 (P2)**: Foundational 后可开始 - 无其他故事依赖,可独立测试
- **User Story 3 (P2)**: Foundational 后可开始 - 无其他故事依赖,可独立测试
- **User Story 4 (P3)**: Foundational 后可开始 - 无其他故事依赖,可独立测试
- **User Story 5 (P3)**: Foundational 后可开始 - 可能引用其他故事的文档,但可独立测试

### Within Each User Story

- 配置文件优先于代码文件
- 基础结构优先于具体实现
- 核心功能优先于示例代码
- 实现完成后再进行验证

### Parallel Opportunities

- Phase 1 中所有标记 [P] 的任务可并行
- Phase 2 中同一层级标记 [P] 的任务可并行
- Phase 2 完成后,所有用户故事可并行开始 (如团队容量允许)
- 每个用户故事内标记 [P] 的任务可并行
- 不同用户故事可由不同团队成员并行工作

---

## Parallel Example: User Story 1

```bash
# 并行创建 Expo Router 页面:
Task: "创建 apps/app-expo/app/(tabs)/index.tsx"
Task: "创建 apps/app-expo/app/(tabs)/settings.tsx"
Task: "创建 apps/app-expo/app/+not-found.tsx"

# 并行创建示例组件和功能:
Task: "创建 apps/app-expo/components/Button.tsx"
Task: "创建 apps/app-expo/features/example/"
Task: "创建 apps/app-expo/assets/"
```

---

## Implementation Strategy

### MVP First (仅 User Story 1)

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational (关键 - 阻塞所有故事)
3. 完成 Phase 3: User Story 1
4. **停止并验证**: 独立测试 User Story 1
5. 如果就绪可部署/演示

### Incremental Delivery

1. 完成 Setup + Foundational → 基础就绪
2. 添加 User Story 1 → 独立测试 → 部署/演示 (MVP!)
3. 添加 User Story 2 → 独立测试 → 部署/演示
4. 添加 User Story 3 → 独立测试 → 部署/演示
5. 添加 User Story 4 → 独立测试 → 部署/演示
6. 添加 User Story 5 → 独立测试 → 部署/演示
7. 每个故事增加价值而不破坏之前的故事

### Parallel Team Strategy

多个开发者时:

1. 团队一起完成 Setup + Foundational
2. Foundational 完成后:
   - 开发者 A: User Story 1 (开发环境搭建)
   - 开发者 B: User Story 2 (项目结构规范)
   - 开发者 C: User Story 3 (代码质量工具)
3. 故事独立完成和集成

---

## Task Summary

**Total Tasks**: 147
**By Phase**:
- Phase 1 (Setup): 5 tasks
- Phase 2 (Foundational): 34 tasks
- Phase 3 (US1 - 开发环境搭建): 23 tasks
- Phase 4 (US2 - 项目结构规范): 12 tasks
- Phase 5 (US3 - 代码质量工具): 20 tasks
- Phase 6 (US4 - 版本控制规范): 14 tasks
- Phase 7 (US5 - 基础文档完善): 17 tasks
- Phase 8 (Polish): 22 tasks

**By User Story**:
- US1 (P1): 23 tasks - 开发环境搭建
- US2 (P2): 12 tasks - 项目结构规范
- US3 (P2): 20 tasks - 代码质量工具配置
- US4 (P3): 14 tasks - 版本控制规范
- US5 (P3): 17 tasks - 基础文档完善

**Parallel Opportunities**: 约 60+ 任务标记为 [P],可并行执行

**Suggested MVP Scope**: Phase 1 + Phase 2 + Phase 3 (User Story 1) = 62 tasks

**Independent Test Criteria**:
- US1: 运行 `pnpm dev`,服务器 < 30s 启动,热重载 < 3s
- US2: 目录结构符合文档,示例代码遵循规范
- US3: `pnpm lint` 和 `pnpm format` 正常工作
- US4: 不规范提交被拒绝,pre-commit 钩子生效
- US5: 新成员能通过文档独立搭建环境

---

## Notes

- [P] 任务 = 不同文件,无依赖
- [Story] 标签将任务映射到特定用户故事以便追踪
- 每个用户故事应可独立完成和测试
- 在每个检查点停止以独立验证故事
- 每个任务或逻辑组后提交
- 避免: 模糊任务、同文件冲突、破坏独立性的跨故事依赖
- 遵循 constitution.md 的架构原则和开发顺序
