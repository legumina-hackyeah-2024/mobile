import React from "react";
import {Button, Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export function DrawerModal({isDrawerOpen, closeDrawer}: any) {
    return <Modal animationType="slide"
        transparent={true}
        visible={isDrawerOpen}
        onRequestClose={() => closeDrawer()}>

        <View style={[styles.bottomSheet, {height: Dimensions.get('window').height * 0.6}]}>
            <TouchableOpacity style={styles.modalContainer} onPress={() => closeDrawer()} >
                <TouchableOpacity style={styles.modal} activeOpacity={1} >
                    <Text>Modal Content...</Text>
                    <Button title={'close'} onPress={closeDrawer}/>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 23,
        paddingHorizontal: 25,
        bottom: 0,
        borderWidth: 1,
        borderColor: 'red'
    },
    modalContainer: {
        flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
    },
    modal: {
        width: 155,
            height: 300
    },
});
