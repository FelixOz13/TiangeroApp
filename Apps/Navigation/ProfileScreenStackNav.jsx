import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../Screens/ProfileScreen'
import MyProducts from '../Screens/MyProducts'
import ProductDetail from '../Screens/ProductDetail'

const Stack = createStackNavigator()
export default function ProfileScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile-tab"
        options={{
          headerShown: false,
        }}
        component={ProfileScreen}
      />
      <Stack.Screen
        name="my-product"
        component={MyProducts}
        options={{
          headerStyle: {
            backgroundColor: '#006400',
          },
          headerTintColor: '#fff',
          headerTitle: 'Mis Productos',
        }}
      />
      <Stack.Screen
        name="product-detail"
        component={ProductDetail}
        options={{
          headerStyle: {
            backgroundColor: '#006400',
          },
          headerTintColor: '#fff',
          headerTitle: 'Detalles del Producto',
        }}
      />
    </Stack.Navigator>
  )
}
