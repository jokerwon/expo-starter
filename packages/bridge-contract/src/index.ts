/**
 * Bridge Contract
 *
 * Versioned exports of bridge capabilities and events.
 * This is the system constitution - defines all Native capabilities.
 *
 * Version Strategy:
 * - V1: Initial capabilities
 * - V2+: Future additions (must not break V1)
 *
 * Default export is always the latest stable version.
 */

// Export all versions
export * as v1 from './v1'

// Default export is latest stable version
export * from './v1'
