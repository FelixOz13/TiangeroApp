import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Share,
  Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import {
  getFirestore,
  getDocs,
  deleteDoc,
  app,
  query,
  collection,
  where,
} from 'firebase/firestore'
import { useUser } from '@clerk/clerk-expo'
import { useNavigation } from '@react-navigation/native'

export default function ProductDetail({ navigation, currentLocation }) {
  const { params } = useRoute()
  const [product, setProduct] = useState([])
  const { user } = useUser()
  const db = getFirestore(app)
  const nav = useNavigation()
  useEffect(() => {
    params && setProduct(params.product)
    shareButton()
  }, [params, navigation])

  const shareButton = () => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="share-social-outline"
          onPress={() => shareProduct()}
          size={24}
          color="white"
          style={{ marginRight: 15 }}
        />
      ),
    })
  }

  const shareProduct = async () => {
    const content = {
      message: product.name + '\n' + product.desc,
    }
    Share.share(content).then(
      (resp) => {
        console.log(resp)
      },
      (error) => {
        console.log(error)
      },
    )
  }

  const sendPhoneMessage = () => {
    Linking.openURL(
      `whatsapp://send?text=${encodeURIComponent(
        `${currentLocation}${params.product?.phone}`,
      )}`,
    )
  }
  const deleteUserPost = () => {
    Alert.alert(
      'Deseas Eliminar Esta Publicacion?',
      'Estas Seguro que deseas eliminar esta Publicacion?',
      [
        {
          text: 'Yes',
          onPress: () => deleteFromFirestore(),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    )
  }
  const deleteFromFirestore = async () => {
    try {
      console.log('Deleted')
      const q = query(
        collection(db, 'UserPost'),
        where('name', '==', product.name),
      )

      const snapshot = await getDocs(q)
      snapshot.forEach((doc) => {
        deleteDoc(doc.ref)
          .then(() => {
            console.log('Deleted the Document')
            nav.goBack() // Assuming `nav` is your navigation object
          })
          .catch((error) => {
            console.error('Error deleting document:', error)
          })
      })
    } catch (error) {
      console.error('Error deleting documents:', error)
    }
  } 
  return (
    <View className="bg-white">
      <Image
        source={{ uri: product.image }}
        style={{ height: 320, width: '100%' }}
      />
      <View className="p-3">
        <Text className="text-[24px] font-bold">{product?.name}</Text>
        <View className="items-baseline">
          <Text className=" text-[16px] p-1 px-2 mt-2 rounded-full  text-green-700">
            {product.category}
          </Text>
        </View>
        <Text className="mt-3 font-bold text-[20px]">
          Detalles del Producto
        </Text>
        <Text className="text-[17px] text-gray-500">{product?.desc}</Text>
      </View>
      {/*User Info*/}
      <View className="p-1 flex flex-row items-center gap-1 bg-green-100">
        <Image
          source={{ uri: product.userImage }}
          className="w-12 h-12 rounded-full"
        />
        <View className="p-3">
          <Text className="font-bold text-[18px]">{product.userName}</Text>
          <Text className="font-bold text-green-500">{product.phone}</Text>
        </View>
      </View>
      {user?.primaryEmailAddress.emailAddress == product.userEmail ? (
        <TouchableOpacity
          onPress={deleteUserPost}
          className=" z-40 bg-red-700 rounded-full p-4 m-2"
        >
          <Text className="text-center collapse text-white">
            Eliminar Publicacion
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={sendPhoneMessage}
          className=" z-40 bg-green-500 rounded-full p-4 m-2"
        >
          <Text className="text-center collapse text-white">
            Enviar Mensaje por Whatsapp
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
