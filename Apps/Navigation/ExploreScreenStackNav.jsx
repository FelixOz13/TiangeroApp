import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductDetail from '../Screens/ProductDetail'
import ExploreScreen from '../Screens/ExploreScreen'

const Stack = createStackNavigator()
export default function ExploreScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="explore-tab"
        component={ExploreScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
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
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}
