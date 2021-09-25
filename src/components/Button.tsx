import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { elevate } from 'react-native-elevate';
import colors from '../Styles/colors';
import fonts from '../Styles/fonts';

import { Feather, FontAwesome5 } from '@expo/vector-icons';

interface ButtonProps {
    //answered: string;
    answer: string;
    key: number;
    onPress: () => void;
    correct: boolean;
    disabled: boolean;
}

const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

const Button = ({ answer, onPress, correct, disabled }: ButtonProps) => {
    return (
        <RectButton
            {...{ onPress }}
            style={[styles.container,
            elevate(3),
            {
                backgroundColor: !correct ? colors.white : colors.purple,
            }]}>
            {correct ? (<FontAwesome5 name="dot-circle" size={24} color="white" />) :null }
            {!correct ? (<Feather name="circle" size={24} color="black" />) :null }   
            <Text style={{ ...styles.label, color: correct ? colors.white : colors.title }}>
                {answer}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 75,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 14,
        paddingHorizontal: 13,
        borderRadius: 5,
        //        backgroundColor: '#fff'
    },
    label: {
        fontSize: 18,
        textAlign: 'center',
        alignItems: 'center',
        color: '#000',
        textTransform: 'capitalize',
        marginLeft: 10,
    },
});

export default Button;