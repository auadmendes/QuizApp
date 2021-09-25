import React, { Fragment } from "react";
import {
    View,
    StyleSheet,
} from 'react-native';
import Button from '../components/Button';
import { AnswerObject } from '../screens/Quiz';

interface AnswersProps {
    answers: string[];
    setAnswer: any;
    checkAnswer: () => void;
    userAnswer: AnswerObject | undefined;
}

export default function Answer({
    answers,
    setAnswer,
    checkAnswer,
    userAnswer,
}: AnswersProps) {
    return (
        <View style={styles.container}>
            {answers.map((answer, key) => (
                <Fragment key={answer}>
                    <Button
                        {...{ key, answer }}
                        correct = {userAnswer?.correctAnswer === answer}
                        disabled={userAnswer ? true : false}
                        onPress={()=>{
                            setAnswer.current = answer;
                            checkAnswer()
                        }}
                    />
                </Fragment>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 14,
        paddingHorizontal: 25,
        marginTop: 30,
        
    },
});