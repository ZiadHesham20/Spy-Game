import { View, Text, SafeAreaView, Image, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from '../styles';
import SetupForm from '../Components/SetupForm';
import HomeIcon from '../Components/HomeIcon';
import { useColorScheme } from 'nativewind';

export default function SetupGame({navigation}) {
  const [isKeyVis, setisKeyVis] = useState(false)
  const {colorScheme, setColorScheme} = useColorScheme()

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow',()=>{
      setisKeyVis(true)
    })
    Keyboard.addListener('keyboardDidHide',()=>{
      setisKeyVis(false)
    })
  }, [])
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={0} >
      <ScrollView>
        <View >
          <View style={styles.container}>
            <HomeIcon navigation={navigation} isKeyVis={isKeyVis}/>
            
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ borderRadius: 50, borderWidth: 1, borderColor: colorScheme == 'dark'?'white':'black', padding: 3 }}>
                <Image source={colorScheme == 'dark'?require('../assets/spy-svgrepo-comDark.png'):require('../assets/spy-svgrepo-com.png')} style={{ width: 100, height: 100 }} />
              </View>
              <Text style={{ color: colorScheme == 'dark'?'white':'black', fontWeight: 'bold', fontSize: 24 }}>Game Setup</Text>
            </View>
            <SetupForm navigation={navigation}/>
            
          </View>
        </View>
        </ScrollView>
            </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
