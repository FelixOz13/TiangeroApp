import React from "react";
import * as WebBrowser from "expo-web-browser";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';

WebBrowser.maybeCompleteAuthSession();
 
const LoginScreen = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();
 
const { startOAuthFlow: startAppleOAuthFlow } = useOAuth({ strategy: "oauth_apple" });

const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPressApple = React.useCallback(async () => {
    try {
      const { createdSessionId,  setActive } =
        await startAppleOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  
 
  const onPressGoogle = React.useCallback(async () => {
    try {
      const { createdSessionId,  setActive } =
        await startGoogleOAuthFlow();
  
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  
 
  
  
  return (
    <View>
      <Image
        source={require('./../../assets/images/tiangero.png')}
        className="w-full h-[400px] object-cover"
      />
      <View className="p-8 bg-white mt-[-20px] rounded-t-3xl  items-center justify-center ">
        <Text className="text-[28px] font-bold text-red-800">Tiangero</Text>
        <Text className="text-[18px] text-green-900 mt-6 font-bold">
          Mercado de Compra y Venta para obtener ganancias y encontrar lo que
          necesitas.
        </Text>
        <TouchableOpacity
          onPress={onPressGoogle}
          className="p-4 bg-red-700 rounded-full mt-10"
        >
          <Text className="text-white text-center text-[18px] font-extrabold">
            Inicia Sesión con Google{' '}
            <MaterialCommunityIcons
              name="google-plus"
              size={28}
              color="white"
              style={{ marginTop: 35 }}
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressApple}
          className="p-4 bg-black rounded-full mt-4"
        >
          <Text className="text-white text-center text-[18px] font-extrabold">
            Inicia Sesión con Apple{' '}
            <MaterialCommunityIcons
              name="apple"
              size={28}
              color="white"
              style={{ marginTop: 35 }}
            />
          </Text>
        </TouchableOpacity>      
      </View>
    </View>
  );
}



export default LoginScreen;