import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import LatestItemsList from '../Components/HomeScreen/LatestItemsList'
import { useNavigation } from '@react-navigation/native'

export default function MyProducts() {
  const db = getFirestore(app)
  const { user } = useUser()
  const [productList, setProductList] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    user && getUserPost()
  }, [user])

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      console.log(e)
      getUserPost()
    })
  }, [navigation])

  const getUserPost = async () => {
    setProductList([])
    const q = query(
      collection(db, 'UserPost'),
      where('userEmail', '==', user?.primaryEmailAddress?.emailAddress),
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      setProductList((productList) => [...productList, doc.data()])
    })
  }

  return (
    <View>
      <LatestItemsList
        latestItemsList={productList}
        userProduct={true}
        heading={'Agenda de Mis Productos a Vender'}
      />
    </View>
  )
}
