import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import diaryIcon from './../../assets/images/diary.jpeg'
import exploreIcon from './../../assets/images/explore.png'
import searchIcon from './../../assets/images/search.png'
import logoutIcon from './../../assets/images/logout.jpeg'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'

export default function ProfileScreen() {

  
  
  const { user } = useUser()

  const navigation = useNavigation()

  const { signOut } = useAuth()

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken') // Remove token from SecureStore
      await signOut() // Sign out user
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const menuList = [
    {
      id: 1,
      name: 'Productos',
      icon: diaryIcon,
      path: 'my-product',
    },
    {
      id: 2,
      name: 'Explorar Mas',
      icon: exploreIcon,
      path: 'explore',
    },
    {
      id: 3,
      name: 'Buscar',
      icon: searchIcon,
      path: 'explore',
    },
    {
      id: 4,
      name: 'Salir',
      logout: true, // Identify logout button
      icon: logoutIcon,
    },
  ]
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="p-5 bg-green-700 flex-1">
        <View className="items-center mt-14">
          <Image
            source={{ uri: user?.imageUrl }}
            className="w-[100px] h-[100px] rounded-full"
          />

          <Text style={{ fontFamily: "Bangers-Regular", fontSize: 50,  color:"white" }}>{user?.fullName}</Text>
          <Text className="text-[28px] mt-2 text-white">
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>
        <FlatList
          data={menuList}
          numColumns={3}
          style={{ marginTop: 20}}
          renderItem={({ item, index }) => {
            console.log('Rendering menu item:', item)
            return (
              <TouchableOpacity
                onPress={() =>
                  item.logout
                    ? handleLogout()
                    : item.path
                    ? navigation.navigate(item.path)
                    : null
                }
                className="flex-1 p-2 border-[1px] items-center m-4 mt-4 rounded-lg border-red-700 bg-green-50"
              >
                {item.icon && (
                  <Image source={item?.icon} className="w-[60px] h-[60px]" />
                )}
                <Text style={{ fontFamily: "Bangers-Regular", fontSize: 13,  color:"black" }}>{item?.name}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </GestureHandlerRootView>
  )
}
