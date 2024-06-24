import React, { useEffect, useState, useRef } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  View,
  Animated,
} from 'react-native';
import { styles } from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import { stopTimer } from '../redux/gameSetupSlice';
import HomeIcon from '../Components/HomeIcon';
import { Audio } from 'expo-av';
import { useColorScheme } from 'nativewind';

const screen = Dimensions.get('window');
const gameFinishSound = require('../assets/clock-alarm-8761.mp3');

function getRemaining(time) {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins, secs };
}

export default function GameTimer({ navigation }) {
  const { Timer, timerRunning } = useSelector((state) => state.gameSetup);
  const [remainingSecs, setRemainingSecs] = useState(Timer / 1000);
  const dispatch = useDispatch();
  const {colorScheme, setColorScheme} = useColorScheme()

  // Animation setup
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const startShake = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopShake = () => {
    shakeAnim.stopAnimation();
  };

  function timerStop() {
    dispatch(stopTimer());
  }

  async function playSoundI() {
    const { sound } = await Audio.Sound.createAsync(gameFinishSound);
    await sound.playAsync();

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        stopShake();
        sound.unloadAsync();

        try {
          navigation.navigate('GameEnd');
        } catch (error) {
          return true;
        }
      }
    });
  }

  useEffect(() => {
    if (timerRunning) {
      const interval = setInterval(() => {
        setRemainingSecs((prevRemainingSecs) => {
          if (prevRemainingSecs <= 1) {
            clearInterval(interval);
            timerStop();
            return 0;
          }
          return prevRemainingSecs - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setRemainingSecs(Timer / 1000);
    }
  }, [Timer, timerRunning]);

  useEffect(() => {
    if (remainingSecs <= 0 && timerRunning) {
      timerStop();
      playSoundI();
      startShake(); // Start the shake animation when the timer is over
    }
  }, [remainingSecs, timerRunning]);

  const { mins, secs } = getRemaining(remainingSecs);

  return (
    <SafeAreaView style={styles.container} className="flex-1">
      <HomeIcon navigation={navigation} isKeyVis={false} />
      <View className="flex-1 justify-center items-center">
        <View
          className="border-2 border-[#3282B8] rounded-full justify-center items-center"
          style={{ width: screen.width / 2, height: screen.width / 2 }}
        >
          {timerRunning ? (
            <Text className={`${colorScheme == 'dark'?'text-white ':'text-black'} text-7xl`}>
              {mins}:{secs < 10 ? `0${secs}` : secs}
            </Text>
          ) : (
            <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
              <Image
                source={colorScheme == 'dark'?require('../assets/alarm-clock-alt-svgrepo-com.png'):require('../assets/alarm-clock-alt-svgrepo-comDark.png')}
                style={{ width: screen.width / 3, height: screen.width / 3 }}
              />
            </Animated.View>
          )}
        </View>
        <Text  className={`${colorScheme == 'dark'?'text-white ':'text-black'} text-2xl`}>
          {timerRunning ? 'Timer' : ' Time over'}
        </Text>
      </View>
    </SafeAreaView>
  );
}
