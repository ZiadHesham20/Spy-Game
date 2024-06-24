import { View, Text, SafeAreaView, Image, Button, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../styles'
import ThemeToggle from '../Components/ThemeToggle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useColorScheme } from 'nativewind';

export default function Home({navigation}) {
  const [pressed, setPressed] = useState(false)
  const {colorScheme, setColorScheme} = useColorScheme()
  
  
  return (
    <SafeAreaView className="flex-1 ">
      <View style={styles.container}>
        <ThemeToggle/>
      </View>
      <View className="flex-1 justify-center items-center">
        <View className={`rounded-full border ${colorScheme == 'dark'?'border-[white]':'border-[black]'} border-2 p-3`}>
        <Image source={colorScheme == 'dark'?require('../assets/spy-svgrepo-comDark.png'):require('../assets/spy-svgrepo-com.png')} className="w-44 h-44 "/>
        </View>
       
        <Text className="font-semibold text-2xl text-white">
            SPY
        </Text>
       <Pressable className={`${pressed?'bg-[#0F4C75]':'bg-[#3282B8]'} w-40 h-20 justify-center items-center rounded-full my-3 flex-row`} onPressIn={()=>{setPressed(true)}} onPress={()=>{
        setPressed(false)
        navigation.navigate('SetupGame')
        }}>
        <Text className="font-bold text-white text-2xl">Play</Text>
        <Icon name="play" size={32} color={'white'}/>
       </Pressable>
      </View>
    </SafeAreaView>
  )
}