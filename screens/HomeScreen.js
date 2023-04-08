import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { ScrollView } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase';

const HomeScreen = ({ navigation }) => {
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        })
    }


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 0 }}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                        <Avatar
                            rounded
                            source={{
                                uri: auth?.currentUser?.photoURL
                                //  uri: "https://media1.popsugar-assets.com/files/thumbor/hnVKqXE-xPM5bi3w8RQLqFCDw_E/475x60:1974x1559/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/023/n/1922398/9f849ffa5d76e13d154137.01128738_/i/Taylor-Swift.jpg"
                            }}
                        />
                    </TouchableOpacity>

                </View>
            )
        });
    }, []);

    return (
        <View>
            <ScrollView>
                <CustomListItem />
            </ScrollView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})