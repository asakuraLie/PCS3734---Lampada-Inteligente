import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Lights from "../pages/Lights";
import Bluetooth from "../pages/Bluetooth";

import { Entypo, Feather } from "@expo/vector-icons";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
    return (
        <NavigationContainer independent={true}>
            <Navigator>
                <Screen
                    name="Bluetooth"
                    component={Bluetooth}
                    // options={{
                    //     tabBarIcon: () => {
                    //         return (
                    //             <Feather
                    //                 name="bluetooth"
                    //                 size={20}
                    //             />
                    //         );
                    //     },
                    // }}
                />
                <Screen
                    name="Lights"
                    component={Lights}
                    // options={{
                    //     tabBarIcon: () => {
                    //         return (
                    //             <Entypo
                    //                 name="light-bulb"
                    //                 size={20}
                    //             />
                    //         );
                    //     },
                    // }}
                />
            </Navigator>
        </NavigationContainer>
    );
}
