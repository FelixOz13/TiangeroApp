import React from 'react'
import { View, Text, FlatList } from 'react-native'
import PostItem from './PostItem'
import { AppLoading } from "expo-app-loading";
import {
  useFonts,
  Roboto_400Regular,
  Bangers_400Regular,
  
} from "@expo-google-fonts/dev";

export default function LatestItemsList({ latestItemsList, heading }) {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Bangers_400Regular,
    
    });
  if (!fontsLoaded) {
    return AppLoading;
  } else {
  return (
    <View className="mt-3">
      <Text style={{ fontFamily: "Bangers_400Regular", fontSize: 22,  color:"green",marginLeft:5 }}>{heading}</Text>
      <FlatList
        data={latestItemsList}
        numColumns={2}
        renderItem={({ item, index }) => <PostItem item={item} />}
      />
    </View>
  )
}}
