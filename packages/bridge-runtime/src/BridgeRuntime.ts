/**
 * Bridge Runtime
 *
 * Core runtime for JSBridge communication.
 * Provides utilities for message passing between Native and WebView/App.
 */

import type { BridgeCapabilitiesV1, BridgeEvent, BridgeEventListener } from '@expo-starter/bridge-contract'

/**
 * Bridge Runtime Configuration
 */
export interface BridgeRuntimeConfig {
  timeout?: number
  debug?: boolean
}

/**
 * Bridge Runtime
 *
 * Manages communication between Native and JavaScript layers.
 */
export class BridgeRuntime {
  private config: Required<BridgeRuntimeConfig>
  private eventListeners: Set<BridgeEventListener> = new Set()

  constructor(config: BridgeRuntimeConfig = {}) {
    this.config = {
      timeout: config.timeout || 30000,
      debug: config.debug || false,
    }
  }

  /**
   * Call a bridge method with timeout
   */
  async call<T>(method: string, ...args: unknown[]): Promise<T> {
    if (this.config.debug) {
      console.log(`[Bridge] Calling ${method}`, args)
    }

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Bridge call timeout: ${method}`))
      }, this.config.timeout)

      try {
        // This is a placeholder - actual implementation depends on the platform
        // RN Adapter and H5 Adapter will provide platform-specific implementations
        const result = this.platformCall(method, args)
        clearTimeout(timeoutId)
        resolve(result as T)
      } catch (error) {
        clearTimeout(timeoutId)
        reject(error)
      }
    })
  }

  /**
   * Subscribe to bridge events
   */
  subscribe(listener: BridgeEventListener): () => void {
    this.eventListeners.add(listener)
    return () => this.unsubscribe(listener)
  }

  /**
   * Unsubscribe from bridge events
   */
  unsubscribe(listener: BridgeEventListener): void {
    this.eventListeners.delete(listener)
  }

  /**
   * Emit a bridge event to all listeners
   */
  emit(event: BridgeEvent): void {
    if (this.config.debug) {
      console.log('[Bridge] Event:', event)
    }

    this.eventListeners.forEach(listener => {
      try {
        listener(event)
      } catch (error) {
        console.error('[Bridge] Event listener error:', error)
      }
    })
  }

  /**
   * Platform-specific call implementation
   * This should be overridden by platform adapters
   */
  protected platformCall(method: string, args: unknown[]): unknown {
    throw new Error(`Platform call not implemented: ${method}`)
  }
}

/**
 * Create a bridge runtime instance
 */
export function createBridgeRuntime(config?: BridgeRuntimeConfig): BridgeRuntime {
  return new BridgeRuntime(config)
}
