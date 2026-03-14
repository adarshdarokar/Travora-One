import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from './../../../constants/theme'
import Ionicons from '@expo/vector-icons/Ionicons'
import { auth } from './../../../configs/Firebase'
import { createUserWithEmailAndPassword } from "firebase/auth"

export default function SignUp() {

  const navigation = useNavigation()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [FullName, setFullName] = useState('')

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const OnCreateAccount = () => {

    if (email.length == 0 || password.length == 0 || FullName.length == 0) {
      ToastAndroid.show('Please enter all details', ToastAndroid.SHORT)
      return;
    }
 createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      const user = userCredential.user
      console.log("ACCOUNT CREATED:", user.email)

      ToastAndroid.show("Account Created Successfully", ToastAndroid.SHORT)

      router.replace('/(tabs)/mytrip')

    })
    .catch((error) => {

      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorMessage, errorCode)

      ToastAndroid.show(errorMessage, ToastAndroid.LONG)

    })
}

  return (
    <View style={{
      padding: 25,
      paddingTop: 50,
      backgroundColor: Colors.WHITE,
      height: '100%'
    }}>

      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={{
        fontFamily: 'OutfitBold',
        fontSize: 25,
        marginTop: 30
      }}>
        Create New Account
      </Text>

      <View style={{
        marginTop: 50,
      }}>
        <Text> Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Full Name'
          onChangeText={(value) => setFullName(value)}
        />
      </View>

      <View style={{
        marginTop: 20,
      }}>
        <Text> Email</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Email'
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      <View style={{
        marginTop: 20,
      }}>
        <Text> Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder='Enter Password'
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      <TouchableOpacity
        onPress={OnCreateAccount}
        style={{
          padding: 13,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 45
        }}>
        <Text style={{
          color: Colors.WHITE,
          textAlign: 'center'
        }}>
          Create Account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace('auth/sign-in')}
        style={{
          padding: 13,
          backgroundColor: Colors.WHITE,
          borderRadius: 15,
          marginTop: 15,
          borderWidth: 1
        }}>
        <Text style={{
          color: Colors.PRIMARY,
          textAlign: 'center'
        }}>
          Sign In
        </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY
  }
})