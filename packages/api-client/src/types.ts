/**
 * API Client Types
 */

/**
 * API Error
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * API Request Options
 */
export interface ApiRequestOptions extends RequestInit {
  params?: Record<string, string>
  retry?: number
  retryDelay?: number
}
