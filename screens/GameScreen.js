import {Alert, FlatList, StyleSheet, useWindowDimensions, View} from "react-native";
import {ScrollView} from "react-native-virtualized-view"
import {Ionicons} from "@expo/vector-icons";

import {useEffect, useState} from "react";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionText from "../components/ui/InstructionText";
import Card from "../components/ui/Card";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomNumber(min, max, exclude) {
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    if (randomNumber === exclude) {
        return generateRandomNumber(min, max, exclude);
    }
    return randomNumber;
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver}) {
    const initialGuess = generateRandomNumber(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    const {width, height} = useWindowDimensions();

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    //only render once, when the component is created,
    //not when it is re-rendered, because of the empty array
    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    function nextGuessHandler(direction) { // 'lower' or 'greater'
        if ((direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)) {
            Alert.alert(
                'Don\'t lie!', 'You know that this is wrong...',
                [{text: 'Sorry!', style: 'cancel'}]
            );
            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }

        const newRandomNumber = generateRandomNumber(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRandomNumber);
        setGuessRounds(prevState => [newRandomNumber, ...prevState]);
    }

    const marginTopDistance = height < 380 ? 40 : 100;
    const paddingHorizontalDistance = width < 600 ? 12 : 64;

    return (
        <ScrollView>
            <View style={[
                    styles.screen,
                    {marginTop: marginTopDistance},
                    {paddingHorizontal: paddingHorizontalDistance}
                ]}>
                <Title>Opponent's Guess</Title>
                <NumberContainer>{currentGuess}</NumberContainer>
                <Card>
                    <InstructionText style={styles.instructionText}>
                        Higher or Lower?
                    </InstructionText>
                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                                <Ionicons name={"md-remove"} size={24} color={"white"}/>
                            </PrimaryButton>
                        </View>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                                <Ionicons name={"md-add"} size={24} color={"white"}/>
                            </PrimaryButton>
                        </View>
                    </View>
                </Card>
                <View style={styles.listContainer}>
                    <FlatList
                        nestedScrollEnabled={true}
                        data={guessRounds}
                        renderItem={(itemData) =>
                            <GuessLogItem
                                guess={itemData.item}
                                roundNumber={guessRounds.length - itemData.index}
                            />}
                        keyExtractor={item => item}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginBottom: '10%',
    },
    instructionText: {
        marginBottom: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: '6%',
    }
});