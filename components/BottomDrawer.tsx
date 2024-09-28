import React, {useRef} from 'react';
import {View, Text, StyleSheet, Button, SafeAreaView} from 'react-native';
import BottomDrawer, {
    BottomDrawerMethods,
} from 'react-native-animated-bottom-drawer';

const CustomBottomDrawer = ({onClose, children}: any) => {
    // ref
    const bottomDrawerRef = useRef<BottomDrawerMethods>(null);

    // renders
    return (
        <SafeAreaView style={styles.container}>
            <Button title="Open" onPress={() => bottomDrawerRef.current!.open()}/>
            <BottomDrawer ref={bottomDrawerRef} openOnMount onClose={onClose}>
                <View style={styles.contentContainer}>
                    { children }
                </View>
            </BottomDrawer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    contentContainer: {
        flex: 1,
    },
});

export default CustomBottomDrawer;