import 'dotenv/config'

export default {
  expo: {
    name: process.env.APP_NAME || 'Expo Starter',
    slug: 'expo-starter',
    version: process.env.APP_VERSION || '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    assetBundlePatterns: [
      '**/*'
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.example.expostarter'
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      package: 'com.example.expostarter'
    },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro'
    },
    plugins: [
      'expo-router'
    ],
    scheme: 'expo-starter',
    extra: {
      apiBaseUrl: process.env.API_BASE_URL || 'https://api.example.com',
      apiTimeout: parseInt(process.env.API_TIMEOUT || '30000'),
      enableAnalytics: process.env.ENABLE_ANALYTICS === 'true',
      enableDebugMode: process.env.ENABLE_DEBUG_MODE === 'true',
      eas: {
        projectId: 'your-project-id'
      }
    }
  }
}
