import React from 'react';
import { useField } from 'formik';
import InputLabel from './InputLabel';
import { Text, View } from 'react-native';
import Colors from '../constants/colors';
import { moderateVerticalScale, scale } from 'react-native-size-matters';

export default function FormikField({ name, ...props }) {
    const [field, meta, helpers] = useField(name);

    return (
        <View>
            <InputLabel
                {...props}
                meta={meta}
                inpuRef={props.inpuRef}
                value={field.value}
                onChangeText={(text) => helpers.setValue(text)}
                onBlur={() => helpers.setTouched(true)}
            />
            {meta.touched && meta.error && (
                <Text style={{ color: Colors.error, marginTop: moderateVerticalScale(4), fontSize: scale(14) }}>{meta.error}</Text>
            )}
        </View>
    );
}
