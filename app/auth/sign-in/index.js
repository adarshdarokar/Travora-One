import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation,useRouter } from 'expo-router'
import { Colors } from './../../../constants/theme'
import Ionicons from '@expo/vector-icons/Ionicons';




export default function SignIn() {
    const navigation = useNavigation();
    const router=useRouter()
    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    })
    return (
        <View style={{
            padding: 25,
            paddingTop:55 ,
            backgroundColor: Colors.WHITE,
            height: '100%',
        }}>
            <TouchableOpacity onPress={()=>router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{
                fontFamily: 'OutfitBold',
                fontSize: 25,
                marginTop: 30
            }}> Let's Sign You In</Text>
            <Text style={{
                fontFamily: 'Outfit',
                fontSize: 25,
                color: Colors.GRAY,
                marginTop: 20
            }}> Welcome Back</Text>
            <Text style={{
                fontFamily: 'Outfit',
                fontSize: 25,
                color: Colors.GRAY,
                marginTop: 10
            }}> You've been missed!</Text>

            <View style={{
                marginTop: 50,
            }}>
                <Text> Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Email' />
            </View>
            <View style={{
                marginTop: 20,
            }}>
                <Text> Password</Text>
                <TextInput
                    secureTextEntry={true}
                    type='password'
                    style={styles.input}
                    placeholder='Enter Password' />
            </View>

            <View style={{
                padding: 13,
                backgroundColor: Colors.PRIMARY,
                borderRadius: 15,
                marginTop: 45
            }}>
                <Text style={{
                    color: Colors.WHITE,
                    textAlign: 'center'
                }}>
                    Sign In
                </Text>
            </View>

            <TouchableOpacity 
            onPress={()=>router.replace('auth/sign-up')}
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
                    Create Account
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