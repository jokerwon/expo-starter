---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

<!-- 
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.
  
  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/
  
  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  
  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize [language] project with [framework] dependencies
- [ ] T003 [P] Configure linting and formatting tools

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

**根据 constitution.md，基础设施必须遵循分层架构**：

### Bridge Contract Layer (优先级最高)
- [ ] T004 Define Bridge Contract v1 in packages/bridge-contract/v1/
- [ ] T005 [P] Define capability interfaces (TypeScript types only)
- [ ] T006 [P] Define event interfaces
- [ ] T007 Setup Contract versioning strategy

### Domain Layer (第二优先级)
- [ ] T008 Create domain entities in packages/domain/entities/
- [ ] T009 [P] Define use cases in packages/domain/usecases/
- [ ] T010 [P] Setup domain business rules
- [ ] T011 Ensure Domain has NO UI/Runtime dependencies

### Bridge Adapter Layer (第三优先级)
- [ ] T012 Implement RN Bridge Adapter in apps/app-expo/bridge/
- [ ] T013 [P] Implement H5 Bridge Adapter in apps/web-h5/bridge/
- [ ] T014 [P] Setup bridge-runtime utilities in packages/bridge-runtime/
- [ ] T015 Ensure Adapters only do protocol mapping (no business logic)

### Infrastructure (并行)
- [ ] T016 [P] Setup API client in packages/api-client/
- [ ] T017 [P] Configure error handling and logging
- [ ] T018 [P] Setup environment configuration
- [ ] T019 [P] Define failure and degradation strategies

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T010 [P] [US1] Contract test for [endpoint] in tests/contract/test_[name].py
- [ ] T011 [P] [US1] Integration test for [user journey] in tests/integration/test_[name].py

### Implementation for User Story 1

**遵循 constitution.md 的开发顺序：Domain → Contract → Adapter → UI**

#### Domain Layer (优先)
- [ ] T012 [P] [US1] Create [Entity1] in packages/domain/entities/[entity1].ts
- [ ] T013 [P] [US1] Create [Entity2] in packages/domain/entities/[entity2].ts
- [ ] T014 [US1] Implement [UseCase] in packages/domain/usecases/[usecase].ts (depends on T012, T013)
- [ ] T015 [US1] Verify Domain has NO UI dependencies (import check)

#### Bridge Contract (如需新能力)
- [ ] T016 [US1] Add new capabilities to packages/bridge-contract/v1/ (if needed)
- [ ] T017 [US1] Review capability against 准入原则 (多业务可复用、系统级意义、非纯 UI)

#### Adapter Layer
- [ ] T018 [P] [US1] Implement RN Adapter methods in apps/app-expo/bridge/
- [ ] T019 [P] [US1] Implement H5 Adapter methods in apps/web-h5/bridge/
- [ ] T020 [US1] Verify Adapters only do protocol mapping (no business logic)

#### UI Layer (最后)
- [ ] T021 [P] [US1] Implement App UI in apps/app-expo/features/[feature]/
- [ ] T022 [P] [US1] Implement H5 UI in apps/web-h5/pages/[page]/ (if needed)
- [ ] T023 [US1] Verify H5 does NOT hold login state, decide payment, or request permissions
- [ ] T024 [US1] Add validation and error handling
- [ ] T025 [US1] Add logging for user story 1 operations

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T018 [P] [US2] Contract test for [endpoint] in tests/contract/test_[name].py
- [ ] T019 [P] [US2] Integration test for [user journey] in tests/integration/test_[name].py

### Implementation for User Story 2

**遵循 constitution.md 的开发顺序：Domain → Contract → Adapter → UI**

#### Domain Layer (优先)
- [ ] T020 [P] [US2] Create [Entity] in packages/domain/entities/[entity].ts
- [ ] T021 [US2] Implement [UseCase] in packages/domain/usecases/[usecase].ts
- [ ] T022 [US2] Verify Domain has NO UI dependencies

#### Bridge Contract (如需新能力)
- [ ] T023 [US2] Add new capabilities to packages/bridge-contract/v1/ (if needed)

#### Adapter Layer
- [ ] T024 [P] [US2] Implement RN Adapter methods in apps/app-expo/bridge/
- [ ] T025 [P] [US2] Implement H5 Adapter methods in apps/web-h5/bridge/

#### UI Layer (最后)
- [ ] T026 [P] [US2] Implement App UI in apps/app-expo/features/[feature]/
- [ ] T027 [P] [US2] Implement H5 UI in apps/web-h5/pages/[page]/ (if needed)
- [ ] T028 [US2] Integrate with User Story 1 components (if needed)
- [ ] T029 [US2] Verify architecture compliance

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T024 [P] [US3] Contract test for [endpoint] in tests/contract/test_[name].py
- [ ] T025 [P] [US3] Integration test for [user journey] in tests/integration/test_[name].py

### Implementation for User Story 3

**遵循 constitution.md 的开发顺序：Domain → Contract → Adapter → UI**

#### Domain Layer (优先)
- [ ] T026 [P] [US3] Create [Entity] in packages/domain/entities/[entity].ts
- [ ] T027 [US3] Implement [UseCase] in packages/domain/usecases/[usecase].ts
- [ ] T028 [US3] Verify Domain has NO UI dependencies

#### Bridge Contract (如需新能力)
- [ ] T029 [US3] Add new capabilities to packages/bridge-contract/v1/ (if needed)

#### Adapter Layer
- [ ] T030 [P] [US3] Implement RN Adapter methods in apps/app-expo/bridge/
- [ ] T031 [P] [US3] Implement H5 Adapter methods in apps/web-h5/bridge/

#### UI Layer (最后)
- [ ] T032 [P] [US3] Implement App UI in apps/app-expo/features/[feature]/
- [ ] T033 [P] [US3] Implement H5 UI in apps/web-h5/pages/[page]/ (if needed)
- [ ] T034 [US3] Verify architecture compliance

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

**根据 constitution.md 进行最终合规性检查**：

### Architecture Compliance Review
- [ ] TXXX Verify App 是唯一主运行时（所有业务在 App 内闭环）
- [ ] TXXX Verify H5 仅作为受控 UI（无登录态、支付决策、系统权限）
- [ ] TXXX Verify Bridge Contract 完整性（所有 Native 能力已暴露）
- [ ] TXXX Verify Domain Layer 纯粹性（无 UI/Runtime 依赖）
- [ ] TXXX Verify 分层依赖正确性（UI → Adapter → Contract → Domain → Native）
- [ ] TXXX Verify 失败策略明确性（无静默失败）

### Code Quality
- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX [P] Additional unit tests (if requested) in tests/unit/
- [ ] TXXX Security hardening

### Final Validation
- [ ] TXXX Test: 删除 web-h5 项目，App 是否仍正常运行？
- [ ] TXXX Test: Domain 是否可独立测试（无 UI 依赖）？
- [ ] TXXX Test: Bridge Contract 是否可演进（版本化）？
- [ ] TXXX Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for [endpoint] in tests/contract/test_[name].py"
Task: "Integration test for [user journey] in tests/integration/test_[name].py"

# Launch all models for User Story 1 together:
Task: "Create [Entity1] model in src/models/[entity1].py"
Task: "Create [Entity2] model in src/models/[entity2].py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
