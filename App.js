import {ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {useCallback, useEffect, useState} from "react";
import * as Font from "expo-font";

import Colors from "./constants/Colors";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from "expo-status-bar";

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [userNumber, setUserNumber] = useState();
    const [gameIsOver, setGameIsOver] = useState(true);
    const [guessRounds, setGuessRounds] = useState(0);

    useEffect(() => {
        async function prepareResources() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await Font.loadAsync({
                    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
                    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
                });
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepareResources();
    }, []);

    const onLayout = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    function pickNumberHandler(pickedNumber) {
        setUserNumber(pickedNumber);
        setGameIsOver(false);
    }

    function gameOverHandler(numberOfRounds) {
        setGameIsOver(true);
        setGuessRounds(numberOfRounds);
    }

    function startNewGameHandler() {
        setUserNumber(null);
        setGuessRounds(0);
    }

    let screen = <StartGameScreen onPickNumber={pickNumberHandler}/>;

    if (userNumber) {
        screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>;
    }

    if (gameIsOver && userNumber) {
        screen = <GameOverScreen userNumber={userNumber}
                                 roundsNumber={guessRounds}
                                 onStartNewGame={startNewGameHandler}/>;
    }

    return (
        <>
            <StatusBar style="light"/>
            <LinearGradient style={styles.rootScreen}
                            colors={[Colors.primary700, Colors.accent500]}>
                <ImageBackground
                    source={require('./assets/images/background.png')}
                    resizeMode={'cover'}
                    style={styles.rootScreen}
                    imageStyle={styles.backgroundImage}>
                    <SafeAreaView style={styles.rootScreen} onLayout={onLayout}>
                        {screen}
                    </SafeAreaView>
                </ImageBackground>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.15
    }
});
