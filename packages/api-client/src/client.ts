/**
 * HTTP API Client
 *
 * Provides a simple HTTP client for making API requests.
 */

import type { User } from '@expo-starter/domain'

/**
 * API Client Configuration
 */
export interface ApiClientConfig {
  baseUrl: string
  timeout?: number
  headers?: Record<string, string>
}

/**
 * API Response
 */
export interface ApiResponse<T> {
  data: T
  status: number
  headers: Record<string, string>
}

/**
 * API Client
 */
export class ApiClient {
  private config: Required<ApiClientConfig>

  constructor(config: ApiClientConfig) {
    this.config = {
      baseUrl: config.baseUrl,
      timeout: config.timeout || 30000,
      headers: config.headers || {},
    }
  }

  /**
   * Make a GET request
   */
  async get<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>('GET', path, options)
  }

  /**
   * Make a POST request
   */
  async post<T>(path: string, body?: unknown, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>('POST', path, {
      ...options,
      body: JSON.stringify(body),
    })
  }

  /**
   * Make a PUT request
   */
  async put<T>(path: string, body?: unknown, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', path, {
      ...options,
      body: JSON.stringify(body),
    })
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', path, options)
  }

  /**
   * Make a generic HTTP request
   */
  private async request<T>(
    method: string,
    path: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${path}`
    const headers = {
      'Content-Type': 'application/json',
      ...this.config.headers,
      ...options?.headers,
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout)

    try {
      const response = await fetch(url, {
        ...options,
        method,
        headers,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const data = await response.json()

      return {
        data,
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
      }
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  }
}

/**
 * Create an API client instance
 */
export function createApiClient(config: ApiClientConfig): ApiClient {
  return new ApiClient(config)
}
