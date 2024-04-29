import React, { useState, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import {
  getFirestore,
  getDocs,
  collection,
  query,
  orderBy,
} from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItemsList from '../Components/HomeScreen/LatestItemsList';
import { AppLoading } from "expo-app-loading";

import {
  useFonts,
  Roboto_400Regular,
  Bangers_400Regular,
  
} from "@expo-google-fonts/dev";

export default function ExploreScreen() {
  let [fontsLoaded] = useFonts({
  Roboto_400Regular,
  Bangers_400Regular,
  
  });
  const db = getFirestore(app);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    setProductList([]);
    const q = query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const products = snapshot.docs.map(doc => doc.data());
    setProductList(products);
  };

  // Define the data array for the FlatList
  const data = [
    { key: 'header' },
    { key: 'latestItemsList' }
  ];

  // Define the renderItem function
  const renderItem = ({ item }) => {
    switch (item.key) {
      case 'header':
        if (!fontsLoaded) {
          return AppLoading;
        } else {
        return (
          <Text style={{ fontFamily: "Bangers_400Regular", fontSize: 40,  color:"green" ,marginTop:3,marginBottom:0}}>
            Encuentra lo que Buscas
          </Text>
        );}
      case 'latestItemsList':
        // Render the LatestItemsList component
        return (
          <LatestItemsList className="mt-0" latestItemsList={productList} />
        );
      default:
        return null;
    }
  };

  return (
    <View className="p-2 py-1">
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}
