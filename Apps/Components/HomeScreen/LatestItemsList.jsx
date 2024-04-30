import React from 'react'
import { View, Text, FlatList } from 'react-native'
import PostItem from './PostItem'

export default function LatestItemsList({ latestItemsList, heading }) {
  
  return (
    <View className="mt-3">
      <Text style={{ fontFamily: "Bangers-Regular", fontSize: 22,  color:"green",marginLeft:5 }}>{heading}</Text>
      <FlatList
        data={latestItemsList}
        numColumns={2}
        renderItem={({ item, index }) => <PostItem item={item} />}
      />
    </View>
  )
}
