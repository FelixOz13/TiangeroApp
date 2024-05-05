import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import { useUser } from '@clerk/clerk-expo'
import { useNavigation } from '@react-navigation/native'

export default function Header() {
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

  return (
    <View>
      {/* User Info Section */}
      <View className="flex flex-row items-center gap-2">
        <Image
          source={{ uri: user?.imageUrl }}
          className="rounded-full w-12 h-12"
        />
        <View>
          <Text className="text-[16px] text-black font-bold">Bienvenido</Text>
          <Text className="text-[20px] font-bold text-green-800">
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
}
