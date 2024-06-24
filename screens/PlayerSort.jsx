import { View, Text, SafeAreaView, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  nextPlayer,
  setGameSetupTrue,
  setShowPlayerStateFalse,
  setShowPlayerStateTrue,
  startTimer,
  submitData,
} from '../redux/gameSetupSlice';
import { styles } from '../styles';
import HomeIcon from '../Components/HomeIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Pressable } from 'react-native';
import { useColorScheme } from 'nativewind';

export default function PlayerSort({ navigation }) {
  const [pressed, setPressed] = useState(false);
  const [nextPressed, setNextPressed] = useState(false);
  const {colorScheme, setColorScheme} = useColorScheme()
  const {
    playerNumber,
    spyNumber,
    Timer,
    playerStatus,
    currentPlayer,
    nextTurn,
    showPlayerState,
    gameSetupEnd,
  } = useSelector((state) => state.gameSetup);
  const dispatch = useDispatch();

  function handelShowPlayerState() {
    dispatch(setShowPlayerStateTrue());
  }
  function handleNextPlayerTurn() {
    dispatch(setShowPlayerStateFalse());
    dispatch(nextPlayer());
  }

  return (
    <SafeAreaView className="flex-1" style={styles.container}>
      <HomeIcon navigation={navigation} isKeyVis={false} />
      <View className="justify-between items-center flex-col mt-8 flex-1">
        <Text className={`${colorScheme == 'dark'?'text-white ':'text-black'} text-2xl font-semibold`}>
          Player {currentPlayer}
        </Text>
        {/* content */}
        {showPlayerState ? (
          <View>
            <Text className={`${colorScheme == 'dark'?'text-white ':'text-black'} text-2xl font-semibold`}>
              {playerStatus[currentPlayer]}
            </Text>
          </View>
        ) : (
          <View>
            <Text className={`${colorScheme == 'dark'?'text-white ':'text-black'} text-2xl font-semibold`}>
              Put your finger
            </Text>
          </View>
        )}
        {/* buttons */}
        {showPlayerState ? (
          //   next player button
          <Pressable
            className={`${
              nextPressed ? 'bg-[#0F4C75]' : 'bg-[#3282B8]'
            }  rounded-full p-4 mb-8 w-3/4`}
            onPressIn={() => {
              setNextPressed(true);
            }}
            onPress={() => {
              if (currentPlayer == playerNumber) {
                dispatch(startTimer());
                navigation.navigate('GameTimer');
              } else {
                setNextPressed(false);
                handleNextPlayerTurn();
              }
            }}
          >
            <Text className="text-white text-2xl text-center" >Next Player</Text>
          </Pressable>
        ) : (
          //   show player state button
          <Pressable
            className="border-2 border-[#3282B8] rounded-full p-2 mb-8"
            onPressIn={() => {
              setPressed(true);
            }}
            onPress={() => {
              setPressed(false);
              handelShowPlayerState();
            }}
          >
            <Icon
              name="fingerprint"
              size={100}
              color={pressed ? '#3282B8' : colorScheme == 'dark'?'white':'black'}
            />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}
