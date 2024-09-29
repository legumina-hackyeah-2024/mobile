import React, {useEffect} from "react";
import {Button, Dimensions, StyleSheet, Text, View, ActivityIndicator} from "react-native";
import {useMutation, useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {GET_USER_ME, SUBMIT_ANSWER} from "../../api/queries";
import {QuestionComplete} from "./QuestionComplete";

export function QuestionStage({goNextStage, currentUserMe}: any) {
    if (!currentUserMe)
        return <></>

    const routeId = currentUserMe.userMe.progressOfRoute.routeId;
    const {data, loading, error} = useQuery(GET_USER_ME(routeId), {
        variables: {id: routeId},
        context: {
            headers: {
                Authorization: `Bearer ${process.env.EXPO_PUBLIC_JWT}`,
            },
        },
    });

    useEffect(() => {
        if (data) {
            console.log(data)
            console.log(data.userMe.progressOfRoute.currentPointIdx)
        }
    }, [data]);

    const [badAnswers, setBadAnswers] = React.useState<number[]>([]);
    const [response, setResponse] = React.useState<any>(null);
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
            variables: {
                routeId: routeId,
                pointIdx: data.userMe.progressOfRoute.currentPointIdx,
                answerIdx: answerIndex
            },
        })
            .then((response) => {
                setResponse(response.data.answer.progressOfRoute.currentPointIdx);
            })
            .catch((error) => {
                addBadAnswer(answerIndex);
            });
    };

    if (loading) return <></>

    if(response) {
        return <QuestionComplete goNextStage={() => {
            goNextStage(response);
        }}/>
    }

    return (
        <View style={styles.container}>
            <Text style={styles.formattedText}>Your Question</Text>
            <Text>{data.userMe.progressOfRoute.currentPoint.question}</Text>
            {data.userMe.progressOfRoute.currentPoint.answers.map((answer: string, index: number) => {
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
