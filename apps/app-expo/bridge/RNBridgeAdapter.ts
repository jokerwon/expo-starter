/**
 * React Native Bridge Adapter
 *
 * Implements the bridge contract for React Native platform.
 * This adapter only does protocol mapping - no business logic.
 */

import type { BridgeCapabilitiesV1, AppInfo, UserData } from '@expo-starter/bridge-contract'
import type { User as DomainUser } from '@expo-starter/domain'
import { Platform } from 'react-native'
import Constants from 'expo-constants'

/**
 * RN Bridge Adapter
 *
 * Platform-specific implementation of bridge capabilities for React Native.
 */
export class RNBridgeAdapter implements BridgeCapabilitiesV1 {
  /**
   * Get application information
   */
  async getAppInfo(): Promise<AppInfo> {
    return {
      platform: Platform.OS as 'ios' | 'android' | 'web',
      version: Constants.expoConfig?.version || '1.0.0',
      buildNumber: Constants.expoConfig?.extra?.buildNumber || '1',
    }
  }

  /**
   * Get current user information
   * This is a mock implementation - replace with actual user data source
   * Returns Domain.User type to satisfy the use case requirements
   */
  async getUser(): Promise<DomainUser | null> {
    // TODO: Implement actual user data retrieval
    // This could come from AsyncStorage, SecureStore, or an API
    return null
  }

  /**
   * Open external URL in system browser
   */
  async openExternal(url: string): Promise<void> {
    const { Linking } = await import('react-native')
    const canOpen = await Linking.canOpenURL(url)

    if (canOpen) {
      await Linking.openURL(url)
    } else {
      throw new Error(`Cannot open URL: ${url}`)
    }
  }

  /**
   * Log message for debugging
   */
  async log(
    level: 'debug' | 'info' | 'warn' | 'error',
    message: string,
    data?: unknown
  ): Promise<void> {
    const logFn = console[level] || console.log
    logFn(`[${level.toUpperCase()}]`, message, data)
  }
}

/**
 * Create RN Bridge Adapter instance
 */
export function createRNBridgeAdapter(): RNBridgeAdapter {
  return new RNBridgeAdapter()
}
