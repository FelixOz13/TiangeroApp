import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../Screens/HomeScreen'
import ItemList from '../Screens/ItemList'
import ProductDetail from '../Screens/ProductDetail'
import React from 'react'
import { AppLoading } from "expo-app-loading";

import {
  useFonts,
  Roboto_400Regular,
  Bangers_400Regular,
  
} from "@expo-google-fonts/dev";

const Stack = createStackNavigator()

export default function HomeScreenStackNav() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Bangers_400Regular,
    
    });
    if (!fontsLoaded) {
      return AppLoading;
    } else {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false, 
        }}
      />
      <Stack.Screen
        name="item-list"
        component={ItemList}
        options={({ route }) => ({
          title: route.params.category,
          headerStyle: {
            backgroundColor: '#006400',
          },
          headerText: {
            fontFamily: 'Bangers_400Regular',
            fontSize: 20,
            color: '#fff',
          },
          headerTintColor: '#fff',
          headerBackTitleVisible: false, 
        })}
      />
      <Stack.Screen
        name="product-detail"
        component={ProductDetail}
        options={{
          headerStyle: {
            backgroundColor: '#006400',
          },
          headerText: {
            fontFamily: 'Bangers_400Regular',
            fontSize: 20,
            color: '#fff',
          },
          headerTintColor: '#fff',
          headerTitle: 'Detalles del Producto',
          headerBackTitleVisible: false, 
         }}
      />
    </Stack.Navigator>
  )
}}
