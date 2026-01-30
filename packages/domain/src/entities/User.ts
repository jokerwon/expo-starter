/**
 * User Entity
 *
 * Represents a user in the system.
 * This is a pure domain entity with no UI or runtime dependencies.
 */

export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Create a new user entity
 */
export function createUser(data: {
  id: string
  name: string
  email: string
  createdAt?: Date
  updatedAt?: Date
}): User {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    createdAt: data.createdAt || new Date(),
    updatedAt: data.updatedAt || new Date(),
  }
}

/**
 * Validate user email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate user entity
 */
export function validateUser(user: Partial<User>): string[] {
  const errors: string[] = []

  if (!user.id || user.id.trim() === '') {
    errors.push('User ID is required')
  }

  if (!user.name || user.name.trim() === '') {
    errors.push('User name is required')
  }

  if (!user.email || user.email.trim() === '') {
    errors.push('User email is required')
  } else if (!isValidEmail(user.email)) {
    errors.push('User email is invalid')
  }

  return errors
}
