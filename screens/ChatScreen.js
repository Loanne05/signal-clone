import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { useLayoutEffect } from 'react';
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useState } from 'react';
// import * as firebase  from 'firebase/compat/app';
import { db, auth } from "../firebase";
import firebase from 'firebase/compat/app';

const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([])
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerTitleALign: "left",
            headerBackTitleVisible: "false",
            headerTitle: () => (
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 150
                }}>
                    <Avatar rounded source={{ uri: messages[0]?.data.photoURL || "https://www.gstatic.com/webp/gallery/1.jpg" }} />
                    <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
                        {route.params.chatName}
                    </Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                // style={{marginLeft:10
                // }}
                // onPress={navigation.goBack}
                >
                    {/* <AntDesign name="arrowleft" size={24} color="white" /> */}
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 3,
                }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [navigation, messages]);

    const sendMessage = () => {
        Keyboard.dismiss();

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setInput("");
    };

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id).
            collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            ));

        return unsubscribe;
    }, [route])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>

                    <ScrollView
                        contentContainerStyle={{ paddingTop: 15 }}
                    >
                        {messages.map(({ id, data }) => (
                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.receiver} >
                                    <Avatar
                                        containerStyle={{
                                            position: "absolute",
                                            bottom: -15,
                                            right: -5
                                        }}
                                        position="absolute"
                                        bottom={-20}
                                        right={-15}
                                        rounded
                                        size={30}
                                        source={{
                                            uri: data.photoURL,
                                            // uri: "https://media1.popsugar-assets.com/files/thumbor/hnVKqXE-xPM5bi3w8RQLqFCDw_E/475x60:1974x1559/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/023/n/1922398/9f849ffa5d76e13d154137.01128738_/i/Taylor-Swift.jpg"
                                        }}
                                    />
                                    <Text style={styles.receiverText}>
                                        {data.message}
                                    </Text>
                                </View>
                            ) : (
                                <View style={styles.sender}>
                                    <Avatar
                                        containerStyle={{
                                            position: "absolute",
                                            bottom: -15,
                                            left: -5
                                        }}
                                        position="absolute"
                                        bottom={-15}
                                        left={-15}
                                        rounded
                                        size={30}
                                        source={{
                                            uri: data.photoURL,
                                            // uri: "https://media1.popsugar-assets.com/files/thumbor/hnVKqXE-xPM5bi3w8RQLqFCDw_E/475x60:1974x1559/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/023/n/1922398/9f849ffa5d76e13d154137.01128738_/i/Taylor-Swift.jpg"
                                        }}
                                    />
                                    <Text style={styles.senderText}>
                                        {data.message}
                                    </Text>
                                    <Text style={styles.senderName}>{data.displayName}</Text>
                                </View>
                            )
                        ))}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput
                            value={input}
                            onChangeText={text => setInput(text)}
                            onSubmitEditing={sendMessage}
                            placeholder='Signal Message'
                            style={styles.textInput} />
                        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5} disabled={!input}>
                            {!input ? <Ionicons name='send' size={24} color="gray" /> : <Ionicons name='send' size={24} color="#2B68E6" />}
                        </TouchableOpacity>


                    </View>

                </>
            </TouchableWithoutFeedback>
        </SafeAreaView >

    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    receiver: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginLeft: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15
    },
    receiverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 0,
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white"
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ECECEC",
        // borderWidth: 1,
        padding: 10,
        color: "grey",
        borderRadius: 30,
    }

})