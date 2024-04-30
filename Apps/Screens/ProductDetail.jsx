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
          text: 'Eliminar',
          onPress: () => deleteFromFirestore(),
          style: 'cancel',
        },
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          
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
    <View className="bg-green-700">
      <Image
        source={{ uri: product.image }}
        style={{ height: 340, width: '100%' }}
      />
      <View className="p-3">
      <Text style={{ fontFamily: "Bangers-Regular", fontSize: 22,  color:"yellow" ,marginTop:3,marginBottom:0}}>
            {product.category}
          </Text>
        <Text style={{ fontFamily: "Bangers-Regular", fontSize: 22,  color:"black" ,marginTop:3,marginBottom:0}}>{product?.name}</Text>
        <View className="items-baseline">
          
          <Text style={{ fontFamily: "Bangers-Regular", fontSize: 18,  color:"yellow" ,marginTop:3,marginBottom:0}}>
          Ubicacion
        </Text>
       <Text style={{ fontFamily: "Bangers-Regular", fontSize: 18,  color:"black" ,marginTop:3,marginBottom:0}}>
            {product.address}
          </Text>
          <Text style={{ fontFamily: "Bangers-Regular", fontSize: 18,  color:"yellow" ,marginTop:3,marginBottom:0}}>
            ${" "}{product.price}
          </Text>
        </View>
        <Text style={{ fontFamily: "Bangers-Regular", fontSize: 18,  color:"black" ,marginTop:3,marginBottom:0}}>
          Detalles del Producto
        </Text>
        <Text style={{ fontFamily: "Bangers-Regular", fontSize: 18,  color:"yellow" ,marginTop:3,marginBottom:0}}>{product?.desc}</Text>
      </View>
      {/*User Info*/}
      <View style={{ padding: '0.25rem', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.25rem', backgroundColor: 'yellow' }}>
  {/* Your content here */}

        <Image
          source={{ uri: product.userImage }}
          className="w-12 h-12 rounded-full"
        />
        <View className="p-3">
          <Text style={{ fontFamily: "Bangers-Regular", fontSize: 18,  color:"black" ,marginTop:3,marginBottom:0}}>{product.userName}</Text>
          <Text style={{ fontFamily: "Bangers-Regular", fontSize: 18,  color:"black" ,marginTop:3,marginBottom:0}}>{product.phone}</Text>
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
          <Text style={{ fontFamily: "Bangers-Regular", fontSize: 18,  color:"black" ,marginTop:3,marginBottom:0}}>
            Enviar Mensaje por Whatsapp
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
