import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../Screens/HomeScreen'
import ItemList from '../Screens/ItemList'
import ProductDetail from '../Screens/ProductDetail'
import React from 'react'

const Stack = createStackNavigator()

export default function HomeScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="item-list"
        component={ItemList}
        options={({ route }) => ({
          title: route.params.category,
          headerStyle: {
            backgroundColor: '#800000',
          },
          headerTintColor: '#fff',
        })}
      />
      <Stack.Screen
        name="product-detail"
        component={ProductDetail}
        options={{
          headerStyle: {
            backgroundColor: '#800000',
          },
          headerTintColor: '#fff',
          headerTitle: 'Detalles del Producto',
        }}
      />
    </Stack.Navigator>
  )
}
