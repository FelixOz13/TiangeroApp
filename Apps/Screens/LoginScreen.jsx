import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser'
import { useOAuth } from '@clerk/clerk-expo'

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const {
        createdSessionId,
        signIn,
        signUp,
        setActive,
      } = await startOAuthFlow()

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])
  return (
    <View>
      <Image
        source={require('./../../assets/images/tiangero.png')}
        className="w-full h-[400px] object-cover"
      />
      <View className="p-8 bg-white mt-[-20px] rounded-t-3xl shadow-md items-center justify-center ">
        <Text className="text-[28px] font-bold text-red-800">Tiangero</Text>
        <Text className="text-[18px] text-green-900 mt-6 font-bold">
          Mercado de Compra y Venta para obtener ganancias y encontrar lo que
          necesitas.
        </Text>
        <TouchableOpacity
          onPress={onPress}
          className="p-4 bg-red-700 rounded-full mt-20"
        >
          <Text className="text-white text-center text-[18px] font-extrabold">
            Inicia Session{' '}
            <MaterialCommunityIcons
              name="google-plus"
              size={28}
              color="white"
              style={{ marginTop: 35 }}
            />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
