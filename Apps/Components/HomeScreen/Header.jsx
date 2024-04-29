import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import { useUser } from '@clerk/clerk-expo'
import { useNavigation } from '@react-navigation/native'
import { AppLoading } from "expo-app-loading";

import {
  useFonts,
  Roboto_400Regular,
  Bangers_400Regular,
  OpenSans_400Regular
} from "@expo-google-fonts/dev";
export default function Header() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  Bangers_400Regular,
  OpenSans_400Regular
  });
  const { user } = useUser()
  const navigation = useNavigation()
  const [searchText, setSearchText] = useState('')

  const handleChangeText = (text) => {
    setSearchText(text)
  }

  const handleSearch = () => {
    // Perform search operation using the searchText state
    console.log('Searching for:', searchText)
    // Redirect to Categories screen
    navigation.navigate('Categories', { searchQuery: searchText })
  }
  if (!fontsLoaded) {
    return AppLoading;
  } else {
  return (
    <View>
      {/* User Info Section */}
      <View className="flex flex-row items-center gap-2">
        <Image
          source={{ uri: user?.imageUrl }}
          className="rounded-full w-12 h-12"
        />
        <View>
          <Text style={{ fontFamily: "Bangers_400Regular", fontSize: 35,  color:"green" }}>Bienvenido</Text>
          <Text style={{ fontFamily: "Bangers_400Regular", fontSize: 25,  color:"black" }}>
            {user?.fullName}
          </Text>
        </View>
      </View>
      {/* Search Bar */}
      {/* 
      <View className="p-[9px] px-5 flex flex-row items-center mt-2 rounded-full border-[1px] border-red-400 bg-green-500">
        <Ionicons name="search" size={24} color="gray" />
        <TextInput
          placeholder="Buscar"
          className="ml-2 text-[18px]"
          value={searchText}
          onChangeText={handleChangeText}
        />
        <TouchableOpacity onPress={handleSearch}></TouchableOpacity>
      </View>
        */}
    </View>
  )
}}
