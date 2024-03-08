import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function PostItem({ item }) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      className="flex-1 m-2 p-2 rounded-lg border-gray-500 border-[1px]"
      onPress={() =>
        navigation.push('product-detail', {
          product: item,
        })
      }
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-[140px] rounded-lg"
      />
      <Text className="text-white-500 bg-green-400 p-1 rounded-full px-1 text-[11px] font-bold w-[80px] mt-2 text-center">
        {item.category}
      </Text>
      <View className="">
        <Text className="text-[15px] font-bold mt-2">{item.name}</Text>
        <Text className="text-[20px] font-bold text-red-500">
          ${item.price}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
