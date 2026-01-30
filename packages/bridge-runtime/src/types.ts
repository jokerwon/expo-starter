/**
 * Bridge Runtime Types
 *
 * Common types used across the bridge runtime.
 */

/**
 * Bridge Message
 *
 * Standard message format for bridge communication.
 */
export interface BridgeMessage<T = unknown> {
  id: string
  method: string
  params: T
  timestamp: number
}

/**
 * Bridge Response
 *
 * Standard response format for bridge calls.
 */
export interface BridgeResponse<T = unknown> {
  id: string
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: unknown
  }
  timestamp: number
}

/**
 * Bridge Error Codes
 */
export enum BridgeErrorCode {
  TIMEOUT = 'BRIDGE_TIMEOUT',
  NOT_AVAILABLE = 'BRIDGE_NOT_AVAILABLE',
  INVALID_METHOD = 'BRIDGE_INVALID_METHOD',
  INVALID_PARAMS = 'BRIDGE_INVALID_PARAMS',
  EXECUTION_ERROR = 'BRIDGE_EXECUTION_ERROR',
}

/**
 * Bridge Error
 */
export class BridgeError extends Error {
  constructor(
    public code: BridgeErrorCode,
    message: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'BridgeError'
  }
}

/**
 * Create a bridge message
 */
export function createBridgeMessage<T>(method: string, params: T): BridgeMessage<T> {
  return {
    id: generateMessageId(),
    method,
    params,
    timestamp: Date.now(),
  }
}

/**
 * Create a success response
 */
export function createSuccessResponse<T>(id: string, data: T): BridgeResponse<T> {
  return {
    id,
    success: true,
    data,
    timestamp: Date.now(),
  }
}

/**
 * Create an error response
 */
export function createErrorResponse(
  id: string,
  code: BridgeErrorCode,
  message: string,
  details?: unknown
): BridgeResponse {
  return {
    id,
    success: false,
    error: {
      code,
      message,
      details,
    },
    timestamp: Date.now(),
  }
}

/**
 * Generate a unique message ID
 */
function generateMessageId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
