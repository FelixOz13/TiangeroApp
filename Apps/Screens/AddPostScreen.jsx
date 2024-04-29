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
  ToastAndroid, 
  Platform,
  Alert,

} from 'react-native'
import { app } from '../../firebaseConfig'
import { getFirestore, getDocs, collection, addDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { Picker } from '@react-native-picker/picker'
import { Formik } from 'formik'
import * as ImagePicker from 'expo-image-picker'
import { useUser } from '@clerk/clerk-expo'
import { AppLoading } from "expo-app-loading";


import {
  useFonts,
  Roboto_400Regular,
  Bangers_400Regular,
  OpenSans_400Regular
} from "@expo-google-fonts/dev";

export default function AddPostScreen() {
  let [fontsLoaded] = useFonts({
  Roboto_400Regular,
  Bangers_400Regular,
  OpenSans_400Regular
  });
  const [image, setImage] = useState(null)
  const db = getFirestore(app)
  const storage = getStorage()
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  const [categoryList, setCategoryList] = useState([])
  
  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  }

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
          text: 'Escoger una Imagen',
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
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const onSubmitMethod = async(value)=>{
   setLoading(true);
   value.image=image;
   const resp= await fetch(image);
   const blob=await resp.blob();
   const storageRef = ref(storage, 'communityPost/' + Date.now() + '.jpg');
   uploadBytes(storageRef, blob).then((snapshot) => {
    console.log(value,'Uploaded a blob or file!');
}).then((resp)=>{
  getDownloadURL(storageRef).then(async(downloadUrl)=>{
   console.log(downloadUrl); 
   value.image=downloadUrl;
   value.userName=user.fullName;
   value.userEmail = user.primaryEmailAddress?.emailAddress;
   value.userImage = user.imageUrl;
   const docRef=await addDoc(collection(db,"UserPost"),value)
   if(docRef.id)
   {
    setLoading(false);
     console.log("Postulacion Agregada!!")
     Alert.alert("Postulacion Agregada Exitosamente!!")
   }
  })
});
  }
   

const ImagePickerButton = ({ image, pickImage }) => {
  return (
    <TouchableOpacity onPress={pickImage}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      ) : (
        <Image
          source={require('./../../assets/images/placeholder.png')}
          style={styles.image}
        />
      )}
    </TouchableOpacity>
  );
};

  if (!fontsLoaded) {
    return AppLoading;
  } else {
  
  return (
    <KeyboardAvoidingView>
      <ScrollView className="p-3">
      <Text style={{ fontFamily: "Bangers_400Regular", fontSize: 35,  color:"green" }}>
          Agrega tus Productos
        </Text>
        <Text style={{ fontFamily: "Bangers_400Regular", fontSize: 20,  color:"red",paddingBottom:3}}>
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
          onSubmit={value=>onSubmitMethod(value) } >
      {/*   validate={(values) => {
            const errors = {};
           if (!values.name) {
              console.log('Nombre del Producto no Ingresado');
              notifyMessage('Nombre del Producto debe ser Ingresado');
             errors.name = 'Nombre del Producto debe ser Ingresado';
            }
           if (!values.desc) {
              console.log('Descripcion del Producto no Ingresado');
              notifyMessage('Descripcion del Producto debe ser Ingresada');
             errors.desc = 'Descripcion del Producto debe ser Ingresada';
            }
           if (!values.category) {
              console.log('Categoria del Producto no Ingresado');
              notifyMessage('Categoria del Producto debe ser Ingresada');
              errors.category = 'Categoria del Producto debe ser Ingresada';
           }
            if (!values.address) {
              console.log('Ubicacion de Encuentro debe Ingresada');
              notifyMessage('Ubicacion de Encuentro debe ser Ingresada');
             errors.address = 'Ubicacion de Encuentro debe ser Ingresada';
            }
           if (!values.phone) {
              console.log('Telefono del Vendedor debe ser Ingresado');
              notifyMessage('Telefono del Vendedor debe ser Ingresado');
             errors.phone = 'Telefono del Vendedor debe ser Ingresado';
           }
           if (!values.price) {
              console.log('El Precio Aproximado debe ser Ingresado');
              notifyMessage('El Precio Aproximado debe ser Ingresado');
             errors.price = 'El Precio Aproximado debe ser Ingresado';
            }
           if (!values.image) {
              console.log('Imagen no Ingresada');
              notifyMessage('Imagen debe ser Ingresada');
              errors.image = 'Imagen debe ser Ingresada';
            }
            return errors;
       }} */}

          {({ handleChange, values, handleSubmit, setFieldValue, errors}) => (
           <ScrollView>
            <View style={styles.container} >
            <ImagePickerButton image={image} pickImage={pickImage} />
           </View>
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
               <Text style={{ fontFamily: "Bangers_400Regular", fontSize: 20,  color:"red", paddingTop:2}}>Categoria de Producto</Text>
              {/* Category List Dropdown */}
              <View>
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
                <TouchableOpacity onPress={handleSubmit} style={{backgroundColor: loading ? '#ccc' : '#008000',}}
                 disabled={loading}
                 className="p-4 bg-green-500 rounded-full mt-1 mb-5">
                {loading ? (
               <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={{ fontFamily: "Bangers_400Regular", fontSize: 20, color: "red", paddingTop: 2, textAlign: 'center' }}>Subir</Text>

              )}
           </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}}

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
