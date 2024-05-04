import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Categories({ categoryList }) {
  const navigation = useNavigation()
  return (
    <View className="m-5">
      <Text
        style={{
          fontFamily: 'Bangers-Regular',
          fontSize: 35,
          color: 'black',
          marginBottom: -20,
        }}
      >
        {''}
        Variedad de Articulos
      </Text>
      <Text
        style={{
          fontFamily: 'Bangers-Regular',
          fontSize: 25,
          color: 'green',
        }}
      >
        Escoje una Categoria
      </Text>

      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('item-list', { category: item.name })
            }
            className="flex-1 items-center justify-center p-2 border-[1px] border-green-400 m-1 h-[80px] rounded-lg text-green-500"
          >
            <Image
              source={{ uri: item.icon }}
              className="w-[35px] h-[35px] p-1 border-[1px]"
            />
            <Text className="text-[7px] mt-1 font-bold mb-1">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
