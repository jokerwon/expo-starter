/**
 * Bootstrap Use Case
 *
 * Initializes the application and loads necessary data.
 * This is a pure business logic use case with no UI dependencies.
 */

import type { User } from '../entities/User'

export interface BootstrapResult {
  appInfo: {
    platform: string
    version: string
    buildNumber: string
  }
  user: User | null
  isInitialized: boolean
}

/**
 * Bootstrap the application
 *
 * This use case demonstrates how to structure business logic
 * without depending on UI or runtime specifics.
 *
 * @param getBridgeCapabilities - Function to get bridge capabilities
 * @returns Bootstrap result with app info and user data
 */
export async function bootstrap(getBridgeCapabilities: () => Promise<{
  getAppInfo: () => Promise<{ platform: string; version: string; buildNumber: string }>
  getUser: () => Promise<User | null>
}>): Promise<BootstrapResult> {
  try {
    const bridge = await getBridgeCapabilities()

    // Get app information
    const appInfo = await bridge.getAppInfo()

    // Get current user
    const user = await bridge.getUser()

    return {
      appInfo,
      user,
      isInitialized: true,
    }
  } catch (error) {
    console.error('Bootstrap failed:', error)
    throw new Error('Failed to initialize application')
  }
}

/**
 * Validate bootstrap result
 */
export function validateBootstrapResult(result: BootstrapResult): boolean {
  return (
    result.isInitialized &&
    result.appInfo !== null &&
    typeof result.appInfo.platform === 'string' &&
    typeof result.appInfo.version === 'string'
  )
}
