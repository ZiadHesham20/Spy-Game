import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import { useColorScheme } from 'nativewind';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ThemeToggle() {
    const [isLight, setIsLight] = useState(false);
   
    const {colorScheme, setColorScheme} = useColorScheme()
  return (
    <View>
     <View className='flex-row justify-end items-center'>
        <Icon name='dark-mode' color={isLight?"gray":"#3282B8"} size={26}/>
     <Switch
        trackColor={{false: '#767577', true: '#3282B8'}}
        thumbColor={isLight ? '#f4f3f4' : '#f4f3f4'}
        
        onValueChange={()=>{
            setIsLight(previousState => !previousState)
            setColorScheme(colorScheme == "light"?"dark":"light")
        }}
        value={isLight}
      />
       <Icon name='light-mode' color={isLight?"#3282B8":"orange"} size={26}/>
     </View>
      
    </View>
  )
}