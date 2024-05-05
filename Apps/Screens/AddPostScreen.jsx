import React, { useEffect, useState } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
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
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

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
            phone: '',
            price: '',
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
            if (!values.name) {
              console.log('Articulo no Ingresado')
              ToastAndroid.show(
                'Articulo debe ser Ingresado',
                ToastAndroid.SHORT,
              )
              errors.name = 'Articulo debe ser Ingresado'
            }
            if (!values.desc) {
              console.log('Descripcion del Producto no Ingresado')
              notifyMessage('Descripcion del Producto debe ser Ingresada')
              errors.desc = 'Descripcion del Producto debe ser Ingresada'
            }
            if (!values.category) {
              console.log('Categoria del Producto no Ingresado')
              notifyMessage('Categoria del Producto debe ser Ingresada')
              errors.category = 'Categoria del Producto debe ser Ingresada'
            }
            if (!values.address) {
              console.log('Ubicacion de Encuentro debe Ingresada')
              notifyMessage('Ubicacion de Encuentro debe ser Ingresada')
              errors.address = 'Ubicacion de Encuentro debe ser Ingresada'
            }
            if (!values.phone) {
              console.log('Telefono del Vendedor debe ser Ingresado')
              notifyMessage('Telefono del Vendedor debe ser Ingresado')
              errors.phone = 'Telefono del Vendedor debe ser Ingresado'
            }
            if (!values.price) {
              console.log('El Precio Aproximado debe ser Ingresado')
              notifyMessage('El Precio Aproximado debe ser Ingresado')
              errors.price = 'El Precio Aproximado debe ser Ingresado'
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
          {({ handleChange, values, handleSubmit, setFieldValue, errors }) => (
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
                value={values.price}
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
              <Text className="pt-5">Categoria de Producto</Text>
              {/* Category List Dropdown */}
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: 15,
                }}
              >
                <Picker
                  selectedValue={values?.category}
                  className="border-2"
                  itemStyle
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
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  backgroundColor: loading ? '#ccc' : '#008000',
                }}
                disabled={loading}
                className="p-4 bg-green-500 rounded-full mt-10"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white text-center text-[16px]">
                    Subir
                  </Text>
                )}
              </TouchableOpacity>
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
  button: {
    marginRight: 10, // Margin between buttons
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 10,
  },
  container: {
    flexDirection: 'row', // Arrange items horizontally
  },
})
