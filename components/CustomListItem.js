import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem, Avatar } from 'react-native-elements'

const CustomListItem = ({id, chatName, enterChat}) => {
    return (
        <ListItem key={id} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri:
                        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
                }}
            />

            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName} 
                    {/* luluchat */}
                </ListItem.Title>
                <ListItem.Subtitle
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                    Quick brown fox jumps over the lazy dog.Quick brown fox jumps over the lazy dog
                </ListItem.Subtitle>
            </ListItem.Content>
            
            

        </ListItem>

        
    )
}

export default CustomListItem

const styles = StyleSheet.create({})