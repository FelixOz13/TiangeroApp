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

export default function ExploreScreen() {
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
        // Render the header Text component
        return (
          <Text className="text-[30px] text-green-800 rounded-lg font-bold mt-[10px]">
            Encuentra lo que Buscas
          </Text>
        );
      case 'latestItemsList':
        // Render the LatestItemsList component
        return (
          <LatestItemsList className="mt-1" latestItemsList={productList} />
        );
      default:
        return null;
    }
  };

  return (
    <View className="p-6 py-2">
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}
