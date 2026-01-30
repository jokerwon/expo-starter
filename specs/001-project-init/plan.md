# Implementation Plan: 项目初始化

**Branch**: `001-project-init` | **Date**: 2026-01-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-project-init/spec.md`

## Summary

本功能旨在建立一个完整的 Expo + WebView + JSBridge 架构的项目初始化方案,包括开发环境搭建、项目结构规范、代码质量工具配置、版本控制规范和基础文档。核心目标是让新开发者能在15分钟内完成环境搭建并开始开发,同时确保项目遵循 constitution.md 定义的架构原则。

技术方案采用 Monorepo 结构,使用 Expo SDK 作为主运行时,TypeScript 作为开发语言,配置 ESLint/Prettier 等代码质量工具,建立清晰的分层架构(UI → Adapter → Contract → Domain → Native)。

## Technical Context

**Language/Version**: TypeScript 5.x, React Native (Expo SDK 51+)
**Primary Dependencies**: Expo SDK, expo-router (文件系统路由), React Navigation (如需复杂导航)
**Storage**: AsyncStorage (本地配置), 环境变量通过 .env 文件管理
**Testing**: Jest (单元测试), React Native Testing Library (组件测试)
**Target Platform**: iOS 15+, Android 12+, Web (H5 通过 WebView)
**Project Type**: Monorepo (Expo + WebView + JSBridge architecture)
**Performance Goals**:
- 开发服务器启动时间 < 30秒
- 热重载响应时间 < 3秒
- Bridge 调用延迟 < 100ms (后续功能)
**Constraints**:
- 必须支持跨平台开发(iOS/Android/Web)
- 必须遵循 constitution.md 定义的架构原则
- 开发环境必须支持 Windows/macOS/Linux
**Scale/Scope**:
- 初始项目规模: 基础架构 + 示例代码
- 预期支持: 10+ 开发者并行开发
- 目标: 50+ 功能模块, 100+ 页面

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**参考**: `.specify/memory/constitution.md`

### 核心原则合规性

- [x] **App 主运行时原则**: ✅ 项目初始化建立 App 为中心的架构,所有功能在 App 内闭环
- [x] **H5 受控原则**: ✅ 项目初始化不涉及 H5 业务逻辑,仅建立架构框架
- [x] **Bridge Contract 原则**: ✅ 项目初始化将建立 Bridge Contract 的基础结构和版本化机制
- [x] **Domain Layer 原则**: ✅ 项目结构将建立独立的 Domain Layer,不包含 UI 依赖
- [x] **分层依赖原则**: ✅ 项目结构严格遵循 UI → Adapter → Contract → Domain → Native 依赖方向
- [x] **能力准入原则**: ✅ 项目初始化阶段不涉及具体 Bridge 能力,仅建立准入机制
- [x] **失败策略原则**: ✅ 环境搭建失败将提供明确错误信息,不允许静默失败

### 架构约束合规性

- [x] **Monorepo 结构**: ✅ 将建立符合 constitution.md 的 apps/ 和 packages/ 结构
- [x] **WebView 规则**: ✅ 项目初始化阶段不涉及 WebView 业务逻辑
- [x] **开发顺序**: ✅ 项目初始化将建立 Domain → Contract → Adapter → UI 的开发流程规范

### 复杂度说明

无违规项。项目初始化完全符合 constitution.md 的所有原则和约束。

## Project Structure

### Documentation (this feature)

```text
specs/001-project-init/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output - 技术选型和最佳实践研究
├── data-model.md        # Phase 1 output - 项目配置数据模型
├── quickstart.md        # Phase 1 output - 快速开始指南
├── contracts/           # Phase 1 output - 项目配置契约
│   └── project-config-schema.json
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# 项目初始化将创建以下结构

expo-starter/                           # 项目根目录
├── apps/
│   ├── app-expo/                       # 主应用（唯一核心）
│   │   ├── app/                        # expo-router 路由目录
│   │   │   ├── (tabs)/                # 标签页路由组
│   │   │   │   ├── index.tsx          # 首页
│   │   │   │   └── settings.tsx       # 设置页
│   │   │   ├── _layout.tsx            # 根布局
│   │   │   └── +not-found.tsx         # 404页面
│   │   ├── features/                   # 功能模块
│   │   │   └── example/               # 示例功能
│   │   ├── components/                 # 共享组件
│   │   │   └── Button.tsx             # 示例组件
│   │   ├── bridge/                     # RN Bridge Adapter
│   │   │   └── RNBridgeAdapter.ts
│   │   ├── assets/                     # 静态资源
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── app.json                    # Expo 配置
│   │   └── metro.config.js             # Metro 打包配置
│   │
│   └── web-h5/                         # 从属 UI 运行时（可选,初期可不创建）
│       ├── pages/
│       ├── components/
│       ├── bridge/                     # H5 Bridge Adapter
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── domain/                         # 业务唯一入口
│   │   ├── entities/                   # 实体定义
│   │   │   └── User.ts                # 示例实体
│   │   ├── usecases/                   # 用例
│   │   │   └── bootstrap.ts           # 启动用例
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── index.ts
│   │
│   ├── bridge-contract/                # 系统宪法（版本化）
│   │   ├── v1/
│   │   │   ├── capabilities.ts        # 能力定义
│   │   │   ├── events.ts              # 事件定义
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── index.ts
│   │
│   ├── bridge-runtime/                 # JSBridge 工具
│   │   ├── src/
│   │   │   ├── BridgeRuntime.ts       # Bridge 运行时
│   │   │   └── types.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── api-client/                     # API 访问层
│   │   ├── src/
│   │   │   ├── client.ts              # HTTP 客户端
│   │   │   └── types.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── ui-tokens/                      # Design Tokens（可选）
│       ├── src/
│       │   ├── colors.ts
│       │   └── spacing.ts
│       ├── package.json
│       └── tsconfig.json
│
├── .github/                            # GitHub 配置
│   └── workflows/                      # CI/CD 工作流（后续）
│
├── docs/                               # 项目文档
│   ├── architecture.md                 # 架构文档（已存在）
│   ├── CONTRIBUTING.md                 # 贡献指南
│   └── API.md                          # API 文档
│
├── .specify/                           # Specify 工具配置（已存在）
│
├── package.json                        # Monorepo 根配置
├── pnpm-workspace.yaml                 # pnpm workspace 配置
├── tsconfig.base.json                  # TypeScript 基础配置
├── .eslintrc.js                        # ESLint 配置
├── .prettierrc.js                      # Prettier 配置
├── .gitignore                          # Git 忽略文件
├── .env.example                        # 环境变量示例
└── README.md                           # 项目说明
```

**Structure Decision**:
- 采用 pnpm workspace 管理 Monorepo,提供更好的依赖管理和磁盘效率
- apps/app-expo 使用 expo-router 实现文件系统路由,简化路由配置
- packages/ 下的每个包都是独立的 npm 包,可单独发布和测试
- 初期可以不创建 web-h5,待需要时再添加
- 所有包使用 TypeScript,共享 tsconfig.base.json 基础配置

## Complexity Tracking

无违规项,无需填写。

## Phase 0: Research & Technology Selection

### Research Tasks

需要研究以下技术选型和最佳实践:

1. **Monorepo 工具选择**: pnpm workspace vs yarn workspace vs npm workspace
2. **Expo SDK 版本**: 确定使用 Expo SDK 51+ 的具体版本和兼容性
3. **TypeScript 配置**: Monorepo 环境下的 TypeScript 项目引用最佳实践
4. **ESLint/Prettier 配置**: React Native + TypeScript 的推荐规则集
5. **测试框架配置**: Jest + React Native Testing Library 在 Monorepo 中的配置
6. **环境变量管理**: Expo 环境下的 .env 文件管理方案
7. **Git 提交规范**: Conventional Commits 和 commitlint 配置
8. **开发工具配置**: VS Code 推荐插件和工作区配置

### Research Output

研究结果将输出到 `research.md`,包含:
- 每个技术选型的决策和理由
- 考虑的替代方案及其优缺点
- 具体的配置参数和最佳实践
- 参考文档和示例链接

## Phase 1: Design & Contracts

### Data Model

将在 `data-model.md` 中定义:

1. **项目配置实体**:
   - package.json 结构
   - tsconfig.json 结构
   - app.json (Expo配置) 结构
   - 环境变量结构

2. **开发工具配置实体**:
   - ESLint 配置结构
   - Prettier 配置结构
   - Git hooks 配置结构

3. **Monorepo 结构实体**:
   - workspace 配置
   - 包依赖关系
   - 构建顺序

### Contracts

将在 `contracts/` 目录生成:

1. **project-config-schema.json**: 项目配置的 JSON Schema
   - 定义所有配置文件的结构和验证规则
   - 用于 IDE 自动补全和验证

2. **workspace-structure.json**: Workspace 结构定义
   - 定义 apps 和 packages 的命名规范
   - 定义依赖关系约束

### Quickstart Guide

将在 `quickstart.md` 中提供:

1. **环境准备**: Node.js, pnpm, Expo CLI 安装
2. **项目初始化**: 克隆和依赖安装步骤
3. **开发服务器启动**: 启动命令和验证方法
4. **常用命令**: 开发、构建、测试、lint 等命令
5. **故障排查**: 常见问题和解决方案

## Phase 2: Implementation Tasks

任务将在 `/speckit.tasks` 命令中生成,预期包含:

1. **P1 任务 - 开发环境搭建**:
   - 创建 Monorepo 根配置
   - 初始化 apps/app-expo
   - 配置 TypeScript
   - 配置开发服务器

2. **P2 任务 - 项目结构规范**:
   - 创建 packages/ 结构
   - 建立包依赖关系
   - 创建示例代码

3. **P2 任务 - 代码质量工具**:
   - 配置 ESLint
   - 配置 Prettier
   - 配置 Git hooks

4. **P3 任务 - 版本控制规范**:
   - 配置 commitlint
   - 创建 .gitignore
   - 配置分支策略

5. **P3 任务 - 基础文档**:
   - 编写 README.md
   - 编写 CONTRIBUTING.md
   - 更新架构文档

## Phase Completion Status

### Phase 0: Research & Technology Selection ✅ COMPLETE

**完成时间**: 2026-01-30

**输出文件**:
- ✅ `research.md` - 技术选型和最佳实践研究

**研究成果**:
1. Monorepo 工具: pnpm workspace (性能优秀,严格依赖管理)
2. Expo SDK: SDK 51 (最新稳定版,完整功能支持)
3. TypeScript: 项目引用 + 路径映射 (类型安全,增量编译)
4. Lint/Format: ESLint + Prettier (官方推荐,完整生态)
5. 测试: Jest + RNTL (官方支持,完整工具链)
6. 环境变量: expo-constants + .env (原生支持,类型安全)
7. Git 规范: Conventional Commits (标准化,可自动化)
8. 开发工具: VS Code (广泛使用,丰富插件)

所有技术选型决策已完成,配置示例已提供。

---

### Phase 1: Design & Contracts ✅ COMPLETE

**完成时间**: 2026-01-30

**输出文件**:
- ✅ `data-model.md` - 项目配置数据模型
- ✅ `contracts/project-config-schema.json` - 项目配置 JSON Schema
- ✅ `contracts/workspace-structure.json` - Workspace 结构定义
- ✅ `quickstart.md` - 快速开始指南
- ✅ `CLAUDE.md` - Agent context 已更新

**设计成果**:
1. **数据模型**: 定义了 6 类配置实体和 4 类环境变量
2. **配置契约**: 提供 JSON Schema 验证所有配置文件
3. **结构定义**: 明确 Monorepo 结构和依赖约束
4. **快速指南**: 15 分钟环境搭建指南,包含故障排查

所有设计文档已完成,可以进入实施阶段。

---

### Constitution Check - Post-Design Re-evaluation ✅ PASS

**重新评估时间**: 2026-01-30

**核心原则合规性** (无变化):
- ✅ **App 主运行时原则**: 设计完全符合,App 为中心的架构
- ✅ **H5 受控原则**: 设计中 H5 仅作为可选的从属 UI
- ✅ **Bridge Contract 原则**: 设计建立了完整的 Contract 版本化机制
- ✅ **Domain Layer 原则**: 设计确保 Domain 独立且无 UI 依赖
- ✅ **分层依赖原则**: 设计严格遵循依赖方向,通过 workspace-structure.json 强制约束
- ✅ **能力准入原则**: 设计建立了能力准入的结构化机制
- ✅ **失败策略原则**: 设计包含明确的错误处理和故障排查指南

**架构约束合规性** (无变化):
- ✅ **Monorepo 结构**: 设计完全符合 constitution.md 的强制结构
- ✅ **WebView 规则**: 设计中 WebView 不控制路由或全局状态
- ✅ **开发顺序**: 设计建立了 Domain → Contract → Adapter → UI 的开发流程

**结论**: 设计阶段完成后,所有原则和约束仍然完全合规,无违规项。

---

## Next Steps

### 立即可执行

使用 `/speckit.tasks` 命令生成详细的实施任务列表:
```
/speckit.tasks
```

这将基于 spec.md 和 plan.md 生成 tasks.md,包含:
- P1 任务: 开发环境搭建 (Monorepo 根配置、apps/app-expo 初始化、TypeScript 配置)
- P2 任务: 项目结构规范 (packages/ 结构、包依赖关系、示例代码)
- P2 任务: 代码质量工具 (ESLint、Prettier、Git hooks)
- P3 任务: 版本控制规范 (commitlint、.gitignore、分支策略)
- P3 任务: 基础文档 (README.md、CONTRIBUTING.md、架构文档更新)

### 实施阶段

任务生成后,使用 `/speckit.implement` 命令开始实施:
```
/speckit.implement
```

这将按照任务列表逐步实施项目初始化。
