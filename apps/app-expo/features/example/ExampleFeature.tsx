/**
 * Example Feature
 *
 * Demonstrates feature module structure and usage of domain layer.
 */

import { View, Text, StyleSheet } from 'react-native'
import { Button } from '../../components/Button'
import { createRNBridgeAdapter } from '../../bridge/RNBridgeAdapter'
import { bootstrap } from '@expo-starter/domain'
import { useState } from 'react'

export function ExampleFeature() {
  const [appInfo, setAppInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleBootstrap = async () => {
    setLoading(true)
    try {
      const adapter = createRNBridgeAdapter()
      const result = await bootstrap(async () => adapter)
      setAppInfo(result.appInfo)
    } catch (error) {
      console.error('Bootstrap failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Example Feature</Text>
      <Text style={styles.description}>
        This demonstrates how to use Domain Layer and Bridge Adapter
      </Text>

      <Button
        title={loading ? 'Loading...' : 'Get App Info'}
        onPress={handleBootstrap}
        disabled={loading}
        style={styles.button}
      />

      {appInfo && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Platform: {appInfo.platform}</Text>
          <Text style={styles.infoText}>Version: {appInfo.version}</Text>
          <Text style={styles.infoText}>Build: {appInfo.buildNumber}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
  },
})
