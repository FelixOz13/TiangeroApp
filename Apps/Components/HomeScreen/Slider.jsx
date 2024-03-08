import { View, Image, FlatList } from 'react-native'
import React from 'react'

export default function Slider({ sliderList }) {
  return (
    <View className="mt-5">
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <Image
              source={{ uri: item?.image }}
              className=" rounded-lg mr-3  h-[200px] w-[330px] object-contain"
            />
          </View>
        )}
      />
    </View>
  )
}
