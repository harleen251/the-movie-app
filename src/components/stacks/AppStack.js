import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShowScreen from '../screens/ShowScreen';
import IndexScreen from '../screens/IndexScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Back to the List"
                    component={IndexScreen}
                    options={{
                        title: 'Movie App',
                        headerStyle: {
                            backgroundColor: "#2c3e50",
                        },
                        headerTitleStyle: {
                            color: '#fff',
                        },
                    }}
                />
                <Stack.Screen name="Show" component={ShowScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppStack;
