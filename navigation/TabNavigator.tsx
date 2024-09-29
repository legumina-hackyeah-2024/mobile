import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {PeopleStackNavigator, ProfileStackNavigator, TracksStackNavigator} from "./StackNavigator";
import TabBarIcon from "@react-navigation/bottom-tabs/lib/typescript/src/views/TabBarIcon";
import {Image} from "react-native";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerTitle: '',
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                height: 70
            }
        }}>
            <Tab.Screen name="TracksStackNavigator"
                        component={TracksStackNavigator}
                        options={{
                            title: 'Trasy',
                            tabBarIcon: ({size, color}) => {
                                return (
                                    <Image
                                        style={{width: size, height: size}}
                                        source={require('../assets/icons/home.png')}
                                    />
                                );
                            },
                            tabBarActiveTintColor: 'black'
                        }}
            />
            <Tab.Screen name="PeopleStackNavigator"
                        component={PeopleStackNavigator}
                        options={{
                            title: 'Kronika',
                            tabBarIcon: ({size, color}) => {
                                return (
                                    <Image
                                        style={{width: size, height: size}}
                                        source={require('../assets/icons/people.png')}
                                    />
                                );
                            },
                            tabBarActiveTintColor: 'black'
                        }}
            />
            <Tab.Screen name="ProfileStackNavigator"
                        component={ProfileStackNavigator}
                        options={{
                            title: 'Profile',
                            tabBarIcon: ({size, color}) => {
                                return (
                                    <Image
                                        style={{width: size, height: size}}
                                        source={require('../assets/icons/profile.png')}
                                    />
                                );
                            },
                            tabBarActiveTintColor: 'black'
                        }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;