import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../Components/HomeScreen/Header'
import Slider from '../Components/HomeScreen/Slider'
import Categories from '../Components/HomeScreen/Categories'
import LatestItemsList from '../Components/HomeScreen/LatestItemsList'
import { getFirestore, getDocs, collection, orderBy } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import { FlatList } from 'react-native-gesture-handler'

export default function HomeScreen() {
  const db = getFirestore(app)
  const [sliderList, setSliderList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [latestItemsList, setLatestItemsList] = useState([])

  useEffect(() => {
    getSliders()
    getCategoryList()
    getLatestItemsList()
  }, [])

  /*Used to get Sliders for HomeScreen*/
  const getSliders = async () => {
    setSliderList([])
    const querySnapshot = await getDocs(collection(db, 'Sliders'))
    querySnapshot.forEach((doc) => {
      setSliderList((sliderList) => [...sliderList, doc.data()])
    })
  }
  const getCategoryList = async () => {
    const querySnapshot = await getDocs(collection(db, 'Category'))

    const categories = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      console.log('Document data:', data)
      if (data && Object.keys(data).length > 0) {
        categories.push(data)
      }
    })

    console.log('Categories:', categories) // Log categories array

    setCategoryList(categories)
  }

  const getLatestItemsList = async () => {
    setLatestItemsList([])
    const querySnapshot = await getDocs(
      collection(db, 'UserPost'),
      orderBy('createdAt', 'desc'),
    )
    querySnapshot.forEach((doc) => {
      console.log('Docs', doc.data())
      setLatestItemsList((latestItemsList) => [...latestItemsList, doc.data()])
    })
  }

  return (
    <View className="py-8 px-6 bg-white flex-1">
      <FlatList
        data={[{ key: 'header' }, { key: 'slider' }, { key: 'categories' }]}
        renderItem={({ item }) => {
          switch (item.key) {
            case 'header':
              return <Header />
            case 'slider':
              return <Slider sliderList={sliderList} />
            case 'categories':
              return <Categories categoryList={categoryList} />
            default:
              return null
          }
        }}
        ListFooterComponent={() => (
          <LatestItemsList
            latestItemsList={latestItemsList}
            heading={'Agregado Recientemente'}
          />
        )}
      />
    </View>
  )
}
