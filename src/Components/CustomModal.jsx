import { View, Text, StyleSheet, Image, Modal } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import ButtonComp from './ButtonComp'

export default function CustomModal({ showModal, modalText, image, btnTitle, onPress }) {
    return (
        <Modal visible={showModal} transparent={true} animationType='slide'>
            <View style={styles.modalBottom}>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <Image
                            style={styles.checkImg}
                            source={image}
                            resizeMode='contain'
                        />
                        <Text style={styles.modalText}>{modalText}</Text>
                    </View>
                    <ButtonComp style={{ width: '100%', marginTop: moderateVerticalScale(48) }} onPress={onPress} btnTitle={btnTitle} />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBottom: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    modal: {
        backgroundColor: 'white',
        height: moderateScale(352),
        borderTopLeftRadius: moderateScale(20),
        borderTopRightRadius: moderateScale(20),
        alignItems: "center",
        paddingTop: moderateVerticalScale(48),
        paddingHorizontal: moderateScale(20),
    },
    modalContent: {
        gap: moderateScale(16),
        alignItems: "center"
    },
    checkImg: {
        width: moderateScale(80),
        height: moderateScale(80),
    },
    modalText: {
        fontSize: scale(24),
        fontFamily: "Satoshi-Bold",
        textAlign: "center"
    }
})