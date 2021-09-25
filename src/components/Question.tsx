import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import colors from '../Styles/colors';
import fonts from '../Styles/fonts';

interface QuestionProps {
    questionNr: number,
    question: string,
}

const Question = ({question, questionNr}: QuestionProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.questionNumber}>
                {questionNr}
            </Text>
            <Text style={styles.questionText}>
                {question}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 33,
        paddingRight: 20,
        paddingLeft: 20,   
    },
    questionNumber: {
        color: colors.title,
        fontSize: 22,
        marginRight: 10,
        fontFamily: fonts.heading,
    },
    questionText: {
        color: colors.title,
        fontSize: 20,
        textAlign: 'left',
        fontFamily: fonts.bold,
    },
    genericView: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 14,
        paddingHorizontal: 25,
        marginTop: 30,
    },
});
export default Question;