/**
 * Domain Layer
 *
 * Business logic layer - UI-agnostic and runtime-independent.
 * This layer contains entities, use cases, and business rules.
 *
 * Rules:
 * - NO UI dependencies (React, React Native, Web APIs)
 * - NO runtime dependencies (window, document, Platform)
 * - Pure business logic only
 * - All exports must be framework-agnostic
 */

// Entities
export * from './entities/User'

// Use Cases
export * from './usecases/bootstrap'
