import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { useRoute } from '@react-navigation/native'
import LatestItemsList from '../Components/HomeScreen/LatestItemsList'
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  app,
} from 'firebase/firestore'

export default function ItemList() {
  const { params } = useRoute()
  const db = getFirestore(app)
  const [itemList, setItemList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log(params)
    params && getItemListByCategory()
  }, [params])

  const getItemListByCategory = async () => {
    setItemList([])
    setLoading(true)
    const q = query(
      collection(db, 'UserPost'),
      where('category', '==', params.category),
    )
    const snapshot = await getDocs(q)
    setLoading(false)
    snapshot.forEach((doc) => {
      console.log(doc.data())
      setItemList((itemList) => [...itemList, doc.data()])
      setLoading(false)
    })
  }

  return (
    <View className="p-2">
      {loading ? ( // If loading state is true, display an activity indicator
        <ActivityIndicator size={'large'} />
      ) : itemList?.length > 0 ? (
        <LatestItemsList
          latestItemsList={itemList}
          heading={'Publicaciones Nuevas'}
        />
      ) : (
        <Text className="p-5 text-[20px] mt-24 justify-center text-center text-gray-400">
          Aun No Hay Publicaciones
        </Text>
      )}
    </View>
  )
}
