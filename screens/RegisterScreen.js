import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import React, { useState } from 'react'

const RegisterScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  return (
    <View>
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
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})