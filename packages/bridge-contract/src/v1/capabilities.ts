/**
 * Bridge Capabilities V1
 *
 * Defines all Native capabilities that can be accessed through the bridge.
 * This is the system constitution - all Native capabilities MUST be defined here.
 *
 * Rules:
 * - Only TypeScript type definitions allowed
 * - No runtime logic or implementation
 * - New capabilities can only be added, not removed (versioning)
 * - Must satisfy capability admission criteria:
 *   1. Multi-business reusable
 *   2. System-level significance
 *   3. Not pure UI logic
 */

export interface AppInfo {
  platform: 'ios' | 'android' | 'web'
  version: string
  buildNumber: string
}

// User type is imported from Domain Layer to avoid duplication
// This uses a generic type that will be satisfied by Domain.User
export interface UserData {
  id: string
  name: string
  email: string
}

/**
 * Bridge Capabilities V1 Interface
 *
 * All methods are async to support cross-runtime communication.
 */
export interface BridgeCapabilitiesV1 {
  /**
   * Get application information
   * @returns Application metadata
   */
  getAppInfo(): Promise<AppInfo>

  /**
   * Get current user information
   * @returns User data or null if not logged in
   */
  getUser(): Promise<UserData | null>

  /**
   * Open external URL in system browser
   * @param url - URL to open
   */
  openExternal(url: string): Promise<void>

  /**
   * Log message for debugging
   * @param level - Log level
   * @param message - Log message
   * @param data - Optional data to log
   */
  log(level: 'debug' | 'info' | 'warn' | 'error', message: string, data?: unknown): Promise<void>
}
