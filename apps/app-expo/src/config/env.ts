/**
 * Environment Configuration
 *
 * Type-safe access to environment variables through expo-constants.
 */

import Constants from 'expo-constants'

export interface EnvConfig {
  apiBaseUrl: string
  apiTimeout: number
  enableAnalytics: boolean
  enableDebugMode: boolean
  appName: string
  appVersion: string
}

/**
 * Get environment configuration
 *
 * Provides type-safe access to environment variables.
 */
export const env: EnvConfig = {
  apiBaseUrl: Constants.expoConfig?.extra?.apiBaseUrl || 'https://api.example.com',
  apiTimeout: Constants.expoConfig?.extra?.apiTimeout || 30000,
  enableAnalytics: Constants.expoConfig?.extra?.enableAnalytics || false,
  enableDebugMode: Constants.expoConfig?.extra?.enableDebugMode || false,
  appName: Constants.expoConfig?.name || 'Expo Starter',
  appVersion: Constants.expoConfig?.version || '1.0.0',
}

/**
 * Check if running in development mode
 */
export const isDevelopment = __DEV__

/**
 * Check if running in production mode
 */
export const isProduction = !__DEV__
