import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import * as WebBrowser from 'expo-web-browser'
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser'
import { useOAuth } from '@clerk/clerk-expo'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
  useWarmUpBrowser()

  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: 'oauth_google',
  })
  const { startOAuthFlow: startFacebookOAuthFlow } = useOAuth({
    strategy: 'oauth_facebook',
  })
  const { startOAuthFlow: startAppleOAuthFlow } = useOAuth({
    strategy: 'oauth_apple',
  })

  const onPressGoogle = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleOAuthFlow()

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      }
    } catch (err) {
      console.error('Google OAuth error', err)
    }
  }, [])

  const onPressFacebook = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startFacebookOAuthFlow()

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      }
    } catch (err) {
      console.error('Facebook OAuth error', err)
    }
  }, [])

  const onPressApple = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startAppleOAuthFlow()

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      }
    } catch (err) {
      console.error('Apple OAuth error', err)
    }
  }, [])

  const [fontsLoaded, fontError] = useFonts({
    'Bangers-Regular': require('../../assets/fonts/Bangers-Regular.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <View style={{ flex: 1.6, alignItems: 'stretch' }}>
        <Image
          source={require('./../../assets/images/tiangero.png')}
          style={{ flex: 1, width: null, height: null }}
        />
      </View>
      <View className=" p-9 bg-green-700 mt-[-35px] items-center justify center rounded-t-3xl">
        <Text
          style={{
            fontFamily: 'Bangers-Regular',
            fontSize: 50,
            color: 'white',
          }}
        >
          Tiangero
        </Text>
        <Text
          style={{
            fontFamily: 'Bangers-Regular',
            fontSize: 20,
            color: 'white',
          }}
        >
          Mercado de Compra y Venta para obtener ganancias y encontrar lo que
          necesitas.
        </Text>

        <TouchableOpacity
          onPress={onPressApple}
          className="pb-3 pl-3 pr-3 pt-1 bg-black rounded-full mt-4"
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 20,
              fontFamily: 'Bangers-Regular',
            }}
          >
            Inicia con Apple{'  '}
            <MaterialCommunityIcons
              name="apple"
              size={32}
              color="white"
              style={{ marginTop: 15 }}
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressGoogle}
          className="pb-3 pl-3 pr-3 pt-1 bg-red-700 rounded-full mt-4"
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 20,
              fontFamily: 'Bangers-Regular',
            }}
          >
            Inicia con Google{'  '}
            <MaterialCommunityIcons
              name="google"
              size={32}
              color="white"
              style={{ marginTop: 15 }}
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressFacebook}
          className="pb-3 pl-3 pr-3 pt-1 bg-blue-700 rounded-full mt-4"
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 20,
              fontFamily: 'Bangers-Regular',
            }}
          >
            Inicia con Facebook{'  '}
            <MaterialCommunityIcons
              name="facebook"
              size={32}
              color="white"
              style={{ marginTop: 15 }}
            />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
