import React, { useState, useEffect } from 'react'
import { ScrollView, Text } from 'react-native'
import {
  getFirestore,
  getDocs,
  collection,
  query,
  orderBy,
} from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import LatestItemsList from '../Components/HomeScreen/LatestItemsList'

export default function ExploreScreen() {
  const db = getFirestore(app)
  const [productList, setproductList] = useState([])

  useEffect(() => {
    getAllProducts()
  }, [])

  const getAllProducts = async () => {
    setproductList([])
    const q = query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'))

    const snapshot = await getDocs(q)
    snapshot.forEach((doc) => {
      setproductList((productList) => [...productList, doc.data()])
    })
  }

  return (
    <ScrollView className="p-6 py-2">
      
      <LatestItemsList className="mt-1" latestItemsList={productList} heading={"Encuentra mas Publicaciones"}/>
    </ScrollView>
  )
}
