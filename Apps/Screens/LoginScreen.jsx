import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser'
import { useOAuth } from '@clerk/clerk-expo'

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

  return (
    <View>
      <Image
        source={require('./../../assets/images/tiangero.png')}
        className="w-full h-[400px] object-cover"
      />
      <View className="p-8 bg-white mt-[-20px] rounded-t-3xl shadow-md items-center justify-center ">
        <Text className="text-[28px] font-bold text-green-600">Tiangero</Text>
        <Text className="text-[18px] text-slate-500 mt-6">
          Mercado de Compra y Venta para obtener ganancias y encontrar lo que
          necesitas.
        </Text>
        <TouchableOpacity
          onPress={onPressGoogle}
          className="p-4 bg-red-700 rounded-full mt-6"
        >
          <Text className="text-white text-center text-[18px]">
            Inicia con Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressFacebook}
          className="p-4 bg-blue-700 rounded-full mt-4"
        >
          <Text className="text-white text-center text-[18px]">
            Inicia con Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressApple}
          className="p-4 bg-black rounded-full mt-4"
        >
          <Text className="text-white text-center text-[18px]">
            Inicia con Apple
          </Text>
        </TouchableOpacity>      
      </View>
    </View>
  );
}



export default LoginScreen;