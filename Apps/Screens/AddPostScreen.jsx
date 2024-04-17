import React, { useEffect, useState } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import { app } from '../../firebaseConfig'
import { getFirestore, getDocs, collection, addDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Picker } from '@react-native-picker/picker'
import { Formik } from 'formik'
import * as ImagePicker from 'expo-image-picker'
import { useUser } from '@clerk/clerk-expo'

export default function AddPostScreen() {
  const [showBottomNavBar, setShowBottomNavBar] = useState(true);
  const [image, setImage] = useState(null)
  const db = getFirestore(app)
  const storage = getStorage()
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    getCategoryList()
  }, [])

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
  const pickImage = async () => {
    // Request permission to access the media library
    const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // Request permission to access the camera
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();

    if (mediaLibraryStatus !== 'granted' || cameraStatus !== 'granted') {
      Alert.alert('Disculpa, Necesitamos permiso para que esto funcione!');
      return;
    }

    // Prompt the user to choose between picking an image or taking a photo
    Alert.alert(
      'Elige una Opcion',
      'Te gustaria tomar una fotografia o escojer alguna imagen de la biblioteca?',
      [
        {
          text: 'Toma una Fotografia',
          onPress: async () => {
            // Launch the camera
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 4],
              quality: 1,
            });

            // Check if the operation was canceled
            if (!result.canceled) {
              // Update state with the photo URI
              setImage(result.assets[0].uri);
            }
          },
        },
        {
          text: 'Escojer una Imagen',
          onPress: async () => {
            // Launch the image library
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 4],
              quality: 1,
            });

            // Check if the operation was canceled
            if (!result.canceled) {
              // Update state with the image URI
              setImage(result.assets[0].uri);
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };



  const onSubmitMethod = async (value) => {
    value.image = image
    setLoading(true)
    //Convert Uri to Blob File
    const resp = await fetch(image)
    const blob = await resp.blob()
    const storageRef = ref(storage, 'communityPost/' + Date.now() + '.jpg')

    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!')
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl)
          value.image = downloadUrl
          value.userName = user.fullName
          value.userEmail = user.primaryEmailAddress?.emailAddress
          value.userImage = user.imageUrl

          // Log userEmail before displaying Toast

          const docRef = await addDoc(collection(db, 'UserPost'), value)
          if (docRef.id) {
            setLoading(false)
            Alert.alert('Postulacion Agregada Exitosamente!!!')
          }
        })
      })
      .catch((error) => {
        console.error('Upload error:', error)
        // Display an error message to the user
      })
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView className="p-10">
        <Text className="text-[27px] font-bold text-green-900">
          Agrega tus Productos
        </Text>
        <Text className="text-[16px] text-red-500 mb-7">
          Agrega tus Productos y Comienza a Vender
        </Text>
        <Formik
          initialValues={{
            name: '',
            desc: '',
            category: '',
            address: '',
            phone: '52+',
            price: '$',
            image: '',
            userName: '',
            userEmail: '',
            userImage: '',
            createdAt: Date.now(),
          }}
          onSubmit={(values) => {
            // Log the form values including the image
            values.price = values.price.replace('$', '')
            console.log('Form Values:', values)
            // Call your onSubmitMethod
            onSubmitMethod(values)
          }}
          validate={(values) => {
            const errors = {}
            if (!values.name || typeof values.name !== 'string' || values.name.trim() === "") {
              errors.name = 'Articulo debe ser Ingresado';
            }
            if (!values.desc || typeof values.desc !== 'string' || values.desc.trim() === "") {
              errors.desc = 'Descripción debe ser Ingresada';
            }
            if (!values.category || typeof values.category !== 'string' || values.category.trim() === "") {
              errors.category = 'Categoría debe ser Ingresada';
            }
            if (!values.address || typeof values.address !== 'string' || values.address.trim() === "") {
              errors.address = 'Domicilio debe ser Ingresado';
            }
            if (!values.phone || typeof values.phone !== 'string' || values.phone.trim() === "") {
              errors.phone = 'Teléfono debe ser Ingresado';
            }
            if (!values.price || typeof values.price !== 'string' || values.price.trim() === "") {
              errors.price = 'Precio debe ser Ingresado';
            }
          

            // You can add validation for the image field if needed
            // if (!values.image) {
            //   console.log('Imagen no Ingresada');
            //   ToastAndroid.show('Imagen debe ser Ingresada',     ToastAndroid.SHORT);
            //   errors.image = 'Imagen debe ser Ingresada';
            // }
            return errors
          }}        
        >
          {({ handleChange, values, handleSubmit, showBottomNavBar, setFieldValue, errors }) => (
            <ScrollView>
              <TouchableOpacity onPress={pickImage}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 100, height: 100, borderRadius: 15 }}
                  />
                ) : (
                  <Image
                    source={require('./../../assets/images/placeholder.png')}
                    style={{ width: 100, height: 100, borderRadius: 15 }}
                  />
                )}
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Articulo"
                value={values?.name}
                onChangeText={handleChange('name')}
              />

              <TextInput
                style={styles.input}
                placeholder="Descripcion del Producto"
                value={values?.desc}
                multiline={true}
                onChangeText={handleChange('desc')}
              />

              <TextInput
                style={styles.input}
                placeholder="Precio por Unidad"
                value={values?.price}
                keyboardType="number-pad"
                onChangeText={handleChange('price')}
              />
              <TextInput
                style={styles.input}
                placeholder="Telefono de Contacto"
                value={values?.phone}
                keyboardType="number-pad"
                onChangeText={handleChange('phone')}
              />

              <TextInput
                style={styles.input}
                placeholder="Ubicacion o Domicilio"
                value={values?.address}
                multiline={true}
                onChangeText={handleChange('address')}
              />
              <Text className="pt-1">Categoria de Producto</Text>
              {/* Category List Dropdown */}
              <View>
                <Picker
                  selectedValue={values?.category}
                  className="border-2"
                  style={styles.input}
                  onValueChange={(itemValue) =>
                    setFieldValue('category', itemValue)
                  }
                >
                  {categoryList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item?.name}
                      value={item?.name}
                    />
                  ))}
                </Picker>
                <TouchableOpacity onPress={handleSubmit} style={{backgroundColor: loading ? '#ccc' : '#008000',}}
                 disabled={loading}
                 className="p-4 bg-green-500 rounded-full mt-1">
                {loading ? (
               <ActivityIndicator color="#fff" />
                ) : (
               <Text className="text-white text-center text-[16px]">
               Subir
              </Text>
              )}
           </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingTop: 15,
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 17,
    textAlignVertical: 'top',
    fontSize: 17,
  },
})