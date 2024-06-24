import React, { useState, useEffect } from 'react';
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SpyGame } from './spy_logic.mjs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import { useColorScheme } from 'nativewind';
import SetupGame from './screens/SetupGame';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import PlayerSort from './screens/PlayerSort';
import GameTimer from './screens/GameTimer';
import GameEndData from './screens/GameEndData';

export default function App() {
  let Stack = createNativeStackNavigator();
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            contentStyle: {
              backgroundColor: colorScheme == 'dark' ? '#0C0C0C' : 'white',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SetupGame"
            component={SetupGame}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlayerSorting"
            component={PlayerSort}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GameTimer"
            component={GameTimer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GameEnd"
            component={GameEndData}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
