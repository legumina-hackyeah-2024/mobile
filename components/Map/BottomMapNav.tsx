import {Dimensions, StyleSheet, Text, View} from "react-native";
import React from "react";
import {NextStationStage} from "../MapNavStages/NextStationStage";
import {CloseStage} from "../MapNavStages/CloseStage";
import {QuestionStage} from "../MapNavStages/QuestionStage";
import {UserMe} from "../../api/types";


interface BottomMapNavProps {
    nextStation: string
    theme: string
    duration: number
    distanceLeft: number
    stage: string
    goToExercise: any
    goNextStage: any
    description: string
    currentUserMe: any
}

let heightFactor = 0.3;

export function BottomMapNav({nextStation, theme, distanceLeft, duration, stage, goToExercise, goNextStage, description, currentUserMe}: BottomMapNavProps) {
    const getStage = (stage: string) => {
        switch (stage) {
            case 'next-station':
                return <NextStationStage nextStation={nextStation} theme={theme} duration={duration} distanceLeft={distanceLeft} description={description}/>
            case 'close':
                return <CloseStage onPress={goToExercise}/>
            case 'question':
                return <QuestionStage goNextStage={goNextStage} currentUserMe={currentUserMe}/>
            default:
                return <></>
        }
    }

    return <>
        {getStage(stage)}
    </>
}