import { View, Text, SafeAreaView, Button, Pressable } from 'react-native';
import React from 'react';
import { styles } from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import Icon  from 'react-native-vector-icons/FontAwesome';
import HomeIcon from '../Components/HomeIcon';
import { playAgain } from '../redux/gameSetupSlice';
import { useColorScheme } from 'nativewind';


export default function GameEndData({navigation}) {
  const { Timer, playerNumber, spyNumber, selectedWord } = useSelector(
    (state) => state.gameSetup
  );
  const dispatch = useDispatch()
  const {colorScheme, setColorScheme} = useColorScheme()

  return (
    <SafeAreaView style={styles.container} className="flex-1">
      <HomeIcon navigation={navigation} isKeyVis={false} />
      <View className=" justify-center items-center my-5">
        <Text className={`${colorScheme == 'dark'?'text-white ':'text-black'} text-2xl`}>Game Data</Text>
      </View>
      <View className=" justify-center items-start gap-y-10 p-10 ">
        <View className="flex flex-row justify-between  w-full ">
          <Text className={`${colorScheme == 'dark'?'text-white ':'text-black'} font-bold text-lg`}>Word </Text>
          <Text className=" text-lg text-[#3282b8]">{selectedWord}</Text>
        </View>
        <View className="flex flex-row justify-between  w-full ">
          <Text className={`${colorScheme == 'dark'?'text-white ':'text-black'} font-bold text-lg`}>Players </Text>
          <Text className=" text-lg text-[#3282B8]">{playerNumber}</Text>
        </View>
        <View className="flex flex-row justify-between  w-full ">
          <Text className={`${colorScheme == 'dark'?'text-white ':'text-black'} font-bold text-lg`}>Spy </Text>
          <Text className=" text-lg text-[#3282B8]">{spyNumber}</Text>
        </View>
        <View className="flex flex-row justify-between  w-full ">
          <Text className={`${colorScheme == 'dark'?'text-white ':'text-black'} font-bold text-lg`}>Time </Text>
          <Text className=" text-lg text-[#3282B8]">{Timer / 60000}</Text>
        </View>
      </View>
      <View className="flex-1 justify-end items-center mb-10">
        <Pressable className="bg-[#3282B8] w-1/2 h-1/5 flex-row gap-x-2 rounded-full justify-center items-center active:bg-[#0F4C75] " onPress={()=>{
          dispatch(playAgain())
          navigation.navigate('PlayerSorting')
        }}>
          <Text className="font-bold text-white text-2xl" >Play again</Text>
          <Icon name='repeat' color={'white'} size={32}/>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
