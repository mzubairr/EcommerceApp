import React from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';

export default function KeyboardAvoidingWrapper({ children }) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
