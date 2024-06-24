import { View, Text, TextInput, Image, Button, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { gameStart, playerNumberDecrement, playerNumberIncrement, spyNumberDecrement, spyNumberIncrement, timerDecrement, timerIncrement} from '../redux/gameSetupSlice';
import { useColorScheme } from 'nativewind';




export default function SetupForm({navigation}) {
    const {playerNumber,spyNumber,Timer,playerStatus} = useSelector(state=>state.gameSetup)
    const dispatch = useDispatch()
    const {colorScheme, setColorScheme} = useColorScheme()

    // player number dispatch
    function handlePlayerNumberDec() {
        dispatch(playerNumberDecrement())
    }
    function handlePlayerNumberInc() {
        dispatch(playerNumberIncrement())
    }
    // spy number dispatch
    function handleSpyNumberDec() {
        dispatch(spyNumberDecrement())
    }
    function handleSpyNumberInc() {
        dispatch(spyNumberIncrement())
    }
    // timer dispatch
    function handleTimerDec() {
        dispatch(timerDecrement())
    }
    function handleTimerInc() {
        dispatch(timerIncrement())
    }
    function handleSubmit() {
        dispatch(gameStart())
        
    }
    
    
  return (
    <View>
        {/* player number input */}
      <View className="justify-center items-center mt-5">
<View className="flex-row  items-center w-44 h-14 bg-[#3282B8] p-2 rounded-full">
    <MIcon name='supervised-user-circle' color={'white'} size={36}/>
<Text className="text-white  ml-3 font-semibold">Player Number</Text>
</View>
<View className="flex-row justify-center items-center">
    <Icon name='minus-circle-outline' color={colorScheme == 'dark'?'white':'black'} size={36} onPress={handlePlayerNumberDec}/>
<TextInput className={` w-24 h-16 my-3 text-center text-2xl font-semibold  ${colorScheme == 'dark'?'text-white ':'text-black'}`} defaultValue={`${playerNumber}`}  keyboardType = 'numeric' />
<Icon name='plus-circle-outline' color={colorScheme == 'dark'?'white':'black'} size={36} onPress={handlePlayerNumberInc}/>
</View>
</View>
{/* spy number input */}
<View className="justify-center items-center ">
<View className="flex-row  items-center w-44 h-14 bg-[#3282B8] p-2 rounded-full">
<Image source={require('../assets/spy-svgrepo-comDark.png')} className="w-8 h-8"/>
<Text className="text-white ml-4 font-semibold">Spy Number</Text>
</View>
<View className="flex-row justify-center items-center">
    <Icon name='minus-circle-outline' color={colorScheme == 'dark'?'white':'black'} size={36} onPress={handleSpyNumberDec}/>
<TextInput className={` w-24 h-16 my-3 text-center text-2xl font-semibold  ${colorScheme == 'dark'?'text-white ':'text-black'}`} defaultValue={`${spyNumber}`} keyboardType = 'numeric' />
<Icon name='plus-circle-outline' color={colorScheme == 'dark'?'white':'black'} size={36} onPress={handleSpyNumberInc}/>
</View>
</View>
{/* Timea input */}
<View className="justify-center items-center ">
<View className="flex-row items-center w-44 h-14 bg-[#3282B8] p-2 rounded-full">
    <MIcon name='timer' color={'white'} size={32}/>
<Text className="text-white ml-8 font-semibold">Timer</Text>
</View>
<View className="flex-row justify-center items-center">
    <Icon name='minus-circle-outline' color={colorScheme == 'dark'?'white':'black'} size={36} onPress={handleTimerDec}/>
<TextInput className={` w-24 h-16 my-3 text-center text-2xl font-semibold  ${colorScheme == 'dark'?'text-white ':'text-black'}`} defaultValue={`${Timer}`} keyboardType = 'numeric' />
<Icon name='plus-circle-outline' color={colorScheme == 'dark'?'white':'black'} size={36} onPress={handleTimerInc}/>
</View>
</View>
{/* submit button */}

<View className="justify-center items-center">
<Pressable className={`border-2 ${colorScheme == 'dark'?'border-[white]':'border-[black]'} rounded-full p-2`} onPress={()=>{
    handleSubmit()
    navigation.navigate('PlayerSorting')
}}>
<Icon name="play" size={50} color={'#3282B8'}/>
</Pressable>
</View>
    </View>
  )
}