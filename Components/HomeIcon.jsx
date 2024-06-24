import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { reSet, stopTimer } from '../redux/gameSetupSlice';
import { useColorScheme } from 'nativewind';

export default function HomeIcon({navigation,isKeyVis}) {
  const dispatch = useDispatch()
  const {colorScheme, setColorScheme} = useColorScheme()
  return (
    <View style={{ paddingTop: 3, marginLeft: 5, alignItems: 'flex-start',position:'static',top:isKeyVis?60:20,left:20 }}>
    <View  style={{ borderWidth: 2, borderColor: colorScheme == 'dark'?'white':'black', borderRadius: 50, padding: 1 }}>
      <Icon name="home" size={30} color={colorScheme == 'dark'?'white':'black'} onPress={()=>{
        dispatch(reSet())
        dispatch(stopTimer())
        navigation.navigate('Home')
      }}/>
    </View>
  </View>
  )
}