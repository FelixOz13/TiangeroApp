import React from 'react'
import { View, Text, FlatList } from 'react-native'
import PostItem from './PostItem'

export default function LatestItemsList({ latestItemsList, heading }) {
  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">{heading}</Text>
      <FlatList
        data={latestItemsList}
        numColumns={2}
        renderItem={({ item, index }) => <PostItem item={item} />}
      />
    </View>
  )
}
