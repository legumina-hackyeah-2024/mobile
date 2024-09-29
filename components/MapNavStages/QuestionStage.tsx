import React from "react";
import {Button, Dimensions, StyleSheet, Text, View, ActivityIndicator} from "react-native";
import {useMutation} from "@apollo/client";
import gql from "graphql-tag";
import {SUBMIT_ANSWER} from "../../api/queries";

export function QuestionStage({goNextStage, currentUserMe}: any) {

    if (!currentUserMe)
        return <></>

    const pointIdx = currentUserMe.userMe.progressOfRoute.currentPointIdx;
    const routeId = currentUserMe.userMe.progressOfRoute.routeId;
    const question = currentUserMe.userMe.progressOfRoute.currentPoint.question;
    const answers = currentUserMe.userMe.progressOfRoute.currentPoint.answers;

    console.log(pointIdx)
    console.log(routeId)
    console.log(question)

    const [badAnswers, setBadAnswers] = React.useState<number[]>([]);
    const [submitAnswer] = useMutation(SUBMIT_ANSWER, {
        context: {
            headers: {
                Authorization: `Bearer ${process.env.EXPO_PUBLIC_JWT}`,
            },
        },
    });

    const addBadAnswer = (answerIndex: number) => {
        setBadAnswers([...badAnswers, answerIndex]);
    };

    const handleAnswerClick = (answerIndex: number) => {
        submitAnswer({
            variables: {routeId: routeId, pointIdx: pointIdx, answerIdx: answerIndex},
        })
            .then((response) => {
                console.log("Answer submitted successfully:", response.data);
                goNextStage();
            })
            .catch((error) => {
                console.error("Error submitting answer:", JSON.stringify(error));
                if (error.extensions.code === "ANSWER_IS_NOT_CORRECT") {
                    addBadAnswer(answerIndex);
                }
                // goNextStage();
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.formattedText}>Your Question</Text>
            <Text>{question}</Text>
            {answers.map((answer: string, index: number) => {
                return (
                    <View
                        style={{...styles.buttonStyle, opacity: badAnswers.includes(index) ? 0.5 : 1}}
                        key={index}
                    >
                        <Button color="#295046" title={answer} onPress={() => handleAnswerClick(index)}/>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height * 0.6,
        width: "100%",
        backgroundColor: "white",
        borderRadius: 30,
        paddingHorizontal: "8%",
        paddingVertical: 4,
        gap: Dimensions.get("window").height * 0.02,
    },
    formattedText: {
        fontFamily: "CaveatBrush_400Regular",
        color: "#295046",
        fontSize: 40,
    },
    buttonStyle: {
        backgroundColor: "#E8F3F0",
        borderRadius: 20,
    },
});
