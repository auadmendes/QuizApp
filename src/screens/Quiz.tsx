import React, { useState, useEffect, Fragment, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import colors from '../Styles/colors';
import { elevate } from 'react-native-elevate';

import { MaterialIcons } from '@expo/vector-icons';
import { Difficulty, getQuizQuestions, QuestionState } from '../Util';

import Question from '../components/Question';
import Answer from '../components/Answer';
import fonts from '../Styles/fonts';

export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}

function Quiz() {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setgameOver] = useState(true);
    const [number, setNumber] = useState(0);
    const [TOTAL_QUESTIONS] = useState(10);
    const setAnswer = useRef(null);

    const startQuiz = async () => {
        setLoading(true);
        setgameOver(false);

        const newQuestions = await getQuizQuestions(
            TOTAL_QUESTIONS,
            Difficulty.EASY
        );
        
        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
    }

    const checkAnswer = () => {
        if (!gameOver) {

            //user answer
            const answer = setAnswer.current;

            //check if the answer is correct
            const correct = questions[number].correct_answer === answer;

            //increment the score
            if (correct) setScore((prev) => prev + 1);

            //save answer in the array of answers
            const answerObject = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer
            };
            setUserAnswers((prev) => [...prev, answerObject]);
            setTimeout(() => {
                nextQuestion();
            }, 800)
        }
    };

    const nextQuestion = () => {
        //move to the next question if not the last question
        const nextQ = number + 1;
        if (nextQ === TOTAL_QUESTIONS) {
            // show a game over screen
            setgameOver(true);
        } else {
            setNumber(nextQ);
        }

    }

    useEffect(() => {
        startQuiz();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        Lets Play
                    </Text>
                    <Text style={styles.headerText}>
                        And be the first!
                    </Text>
                </View>
                <View style={[styles.info, elevate(3)]}>
                <View style={styles.questions}>
                    <Text style={styles.questionsText}>
                        Questions
                    </Text>
                    <View style={styles.numberContainer}>
                        <Text style={styles.questionsTextNumber}>
                            {number + 1} / {questions.length}
                        </Text>
                    </View>
                </View>
                <View style={styles.score}>
                    <Text style={styles.scoreText}>
                        Score: {score}
                    </Text>
                </View>
                </View>
                {questions.length > 0 ? (
                    <>
                        <Question questionNr={number + 1}
                            question={questions[number].question}
                        />
                        <Answer answers={questions[number].answers}
                            {...{ setAnswer, checkAnswer }}
                            userAnswer={userAnswers ? userAnswers[number] : undefined}
                        />
                    </>
                ) : null}
            </View>
            <View style={styles.floatingIcon}>
                <TouchableWithoutFeedback>
                    {!gameOver && !loading && number != TOTAL_QUESTIONS - 1 ? (
                        <MaterialIcons name="navigate-next" size={28} color="white" onPress={nextQuestion} />
                    ) : (
                        <MaterialIcons name="play-arrow" size={28} color="white" onPress={() => startQuiz()} />
                    )}
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}
//c034eb     purple

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        position: 'relative',
        paddingTop: 20,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: colors.salmon,
    },
    header: {
        width: '100%',
        height: 200,
        marginTop: -20,
        padding: 50,
        paddingTop: 60,
        backgroundColor: colors.purple,
    },
    headerTitle: {
        fontSize: 30,
        paddingBottom: 5,
        fontFamily: fonts.bold,
        color: colors.white,
    },
    headerText: {
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.white,
    },
    info: {
        width: '90%',
        height: 150,
        backgroundColor: colors.white,
        alignSelf:  'center',
        marginTop: -50,
        borderRadius: 7,
    },
    floatingIcon: {
        padding: 20,
        backgroundColor: colors.purple,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 300,
        width: 70,
        height: 70,
        position: 'absolute',
        bottom: 20,
        right: 20,
        marginBottom: 30,
    },
    body: {
        flex: 1,
    },
    questions: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-between',
        padding: 10,
    },
    questionsText: {
        fontSize: 26,
        color: colors.title,
        fontFamily: fonts.bold,
    },
    numberContainer: {
        width: 70,
        padding: 5,
        backgroundColor: colors.orange,
        borderRadius: 5,
        alignItems: 'center',
    },
    questionsTextNumber: {
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.heading
    },
    score: {
        marginHorizontal: 10,
        width: 100,
        backgroundColor: colors.purple,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 50,
    },
    scoreText: {
        fontSize: 20,
        fontFamily: fonts.bold,
        color: colors.white,
    },
});

export default Quiz;