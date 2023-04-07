import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = () => {

    }
    return (
        <View style={styles.container}>
            <StatusBar styles="light" />
            <Image source={{
                uri:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Messenger_logo_2018.svg/2048px-Facebook_Messenger_logo_2018.svg.png",
            }}
            style={{width: 150, height: 150}}
            />
            <View style={styles.InputContainer}>
                <Input 
                    placeholder='Email'
                    autoFocus 
                    type="email"
                    value={email}
                    onChange={text => setEmail(text)}
                />
                <Input placeholder='Password'
                    secureTextEntry
                    type="password"
                    value={password}
                    onChange={text => setPassword(text)}
                />
            </View>

            <Button  containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button  onPress={() => navigation.navigate("Register")} containerStyle={styles.button}  type="outline" title="Register" />
            <View style={{height:100}}/>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    InputContainer:{
        width: 300,
        paddingTop: 10,
    },
    button:{
        width: 200,
        marginTop: 15,
    },
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
});