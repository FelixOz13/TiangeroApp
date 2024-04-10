import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreenStackNav from './HomeScreenStackNav'
import ExploreScreen from '../Screens/ExploreScreen'
import AddPostScreen from '../Screens/AddPostScreen'
import ProfileScreen from '../Screens/ProfileScreen'
import ProfileScreenStackNav from './ProfileScreenStackNav'

import { Ionicons, Octicons, Feather, MaterialIcons } from '@expo/vector-icons'
import ExploreScreenStackNav from './ExploreScreenStackNav'

const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'green', // Change the active tab color to red
        tabBarInactiveTintColor: 'black', // Change the inactive tab color to black
      }}
    >
      <Tab.Screen
        name="home-nav"
        component={HomeScreenStackNav}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ fontSize: 12, marginBottom: 3, color: color }}>
              Inicio
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="explore"
        component={ExploreScreenStackNav}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ fontSize: 12, marginBottom: 3, color: color }}>
              Explorar
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Octicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="addpost"
        component={AddPostScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ fontSize: 12, marginBottom: 3, color: color }}>
              Publicar
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Feather name="camera" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreenStackNav}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ fontSize: 12, marginBottom: 3, color: color }}>
              Perfil
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
