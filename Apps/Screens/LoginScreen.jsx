import { View, Text, Image, TouchableOpacity,Dimensions } from 'react-native'
import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser'
import { useOAuth } from '@clerk/clerk-expo'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppLoading } from "expo-app-loading";

import {
  useFonts,
  Roboto_400Regular,
  Bangers_400Regular,
  OpenSans_400Regular
} from "@expo-google-fonts/dev";



WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
  useWarmUpBrowser()
  
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  Bangers_400Regular,
  OpenSans_400Regular
  });
  
  

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

  

  if (!fontsLoaded) {
    return AppLoading;
  } else {
  return (
    <View style={{flex:1}}>
      <View style={{flex: 1.9, alignItems:'stretch'}}>
      <Image
        source={require('./../../assets/images/tiangero.png')}
        style={{flex:1, width: null, height: null }}
      />
      </View>
      <View className=" p-9 bg-green-700 mt-[-35px] items-center justify center rounded-t-3xl">
        <Text  style={{ fontFamily: "Bangers_400Regular", fontSize: 50,  color:"white" }}>Tiangero</Text>
        <Text style={{ fontFamily: "Bangers_400Regular", fontSize: 20,  color:"white" }}>
          Mercado de Compra y Venta para obtener ganancias y encontrar lo que
          necesitas.
        </Text>

        

        <TouchableOpacity
         onPress={onPressApple}
          className="pb-5 pl-5 pr-5 pt-5 bg-black rounded-full mt-4">
   <Text style={{ color: 'white', textAlign: 'center', fontSize: 28 ,fontFamily: "Bangers_400Regular"}}>
     Inicia con Apple{"  "}
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
          className="pb-5 pl-5 pr-5 pt-5 bg-red-700 rounded-full mt-4"
        >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 28 ,fontFamily: "Bangers_400Regular"}}>
            Inicia con Google{"  "}
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
          className="pb-5 pl-5 pr-5 pt-5 bg-blue-700 rounded-full mt-4"
        >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 28 ,fontFamily: "Bangers_400Regular"}}>
            Inicia con Facebook{"  "}
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
    
  );
}}