import { StatusBar } from 'expo-status-bar'
import { View, Text,SafeAreaView } from 'react-native'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'
import LoginScreen from './Apps/Screens/LoginScreen'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigation from './Apps/Navigation/TabNavigation'

export default function App() {
  return (                         
    <ClerkProvider publishableKey="pk_test_bm90YWJsZS1oeWVuYS01MS5jbGVyay5hY2NvdW50cy5kZXYk">
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="auto" />
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </SafeAreaView>
    </ClerkProvider>
  )
}
