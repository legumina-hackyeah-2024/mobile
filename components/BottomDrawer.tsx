import React, {useRef} from 'react';
import {View, Text, StyleSheet, Button, SafeAreaView, Dimensions} from 'react-native';
import BottomDrawer, {
    BottomDrawerMethods,
} from 'react-native-animated-bottom-drawer';

const CustomBottomDrawer = ({onClose, children}: any) => {
    const bottomDrawerRef = useRef<BottomDrawerMethods>(null);


    return (
        <SafeAreaView style={styles.container}>
            <Button title="Open" onPress={() => bottomDrawerRef.current!.open()}/>
            <BottomDrawer initialHeight={Dimensions.get('window').height * 0.7} ref={bottomDrawerRef} openOnMount onClose={onClose} backdropOpacity={0.05}>
                <View style={styles.contentContainer}>
                    {children}
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