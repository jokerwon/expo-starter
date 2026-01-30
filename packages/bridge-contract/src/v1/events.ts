/**
 * Bridge Events V1
 *
 * Defines all events that can be emitted from Native to WebView/App.
 * Events enable Native to notify the application layer of state changes.
 *
 * Rules:
 * - Only TypeScript type definitions allowed
 * - No runtime logic or implementation
 * - Events are one-way: Native → App/WebView
 * - Event names should be descriptive and namespaced
 */

export interface AppStateChangeEvent {
  type: 'app-state-change'
  state: 'active' | 'background' | 'inactive'
  timestamp: number
}

export interface NetworkStateChangeEvent {
  type: 'network-state-change'
  isConnected: boolean
  connectionType: 'wifi' | 'cellular' | 'none' | 'unknown'
  timestamp: number
}

export interface UserSessionEvent {
  type: 'user-session'
  action: 'login' | 'logout' | 'session-expired'
  userId?: string
  timestamp: number
}

/**
 * Union type of all possible bridge events
 */
export type BridgeEvent = AppStateChangeEvent | NetworkStateChangeEvent | UserSessionEvent

/**
 * Bridge Event Listener
 *
 * Callback function that receives bridge events.
 */
export type BridgeEventListener = (event: BridgeEvent) => void

/**
 * Bridge Event Emitter Interface
 *
 * Allows subscribing to and unsubscribing from bridge events.
 */
export interface BridgeEventEmitter {
  /**
   * Subscribe to bridge events
   * @param listener - Event listener callback
   * @returns Unsubscribe function
   */
  subscribe(listener: BridgeEventListener): () => void

  /**
   * Unsubscribe from bridge events
   * @param listener - Event listener to remove
   */
  unsubscribe(listener: BridgeEventListener): void
}
