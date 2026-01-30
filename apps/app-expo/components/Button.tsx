/**
 * Button Component
 *
 * Example reusable button component demonstrating component structure.
 */

import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { colors, spacing } from '@expo-starter/ui-tokens'

export interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  disabled?: boolean
  style?: ViewStyle
}

export function Button({ title, onPress, variant = 'primary', disabled = false, style }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, styles[`${variant}Text`], disabled && styles.disabledText]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  primary: {
    backgroundColor: colors.primary[500],
  },
  secondary: {
    backgroundColor: colors.secondary[500],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary[500],
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#ffffff',
  },
  outlineText: {
    color: colors.primary[500],
  },
  disabledText: {
    color: colors.text.disabled,
  },
})
