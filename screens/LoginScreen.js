import { StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if (authUser) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }]
                }); // remove the back button 
            }
        });
        return unsubscribe;
    }, []);

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message));
    };

    return (
        <View style={styles.container}>
            <StatusBar styles="light" />
            <Image
                source={{
                    uri:
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Messenger_logo_2018.svg/2048px-Facebook_Messenger_logo_2018.svg.png",
                }}
                style={{ width: 150, height: 150 }}
            />
            <View style={styles.InputContainer}>
                <Input
                    placeholder='Email'
                    autoFocus
                    type="email"
                    value={email}
                    onChange={text => setEmail(text.nativeEvent.text)}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    type="password"
                    value={password}
                    onChange={text => setPassword(text.nativeEvent.text)}
                />
            </View>
            <Button
                containerStyle={styles.button}
                onPress={signIn}
                title="Login"
            />
            <Button
                onPress={() => navigation.navigate("Register")}
                containerStyle={styles.button}
                type="outline"
                title="Register"
            />
            <View style={{ height: 100 }} />
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    InputContainer: {
        width: 300,
        paddingTop: 10,
    },
    button: {
        width: 200,
        marginTop: 15,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
});
