import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Image,ScrollView } from 'react-native';
import backIcon from '../assets/images/arrow.png';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface Word {
    id: string;
    word: string;
    definition: string;
  }
  
  interface Match {
    wordId: string;
    definitionId: string;
  }
  
  const allWords: Word[] = [
    { id: '1', word: 'Abate', definition: 'To reduce in amount, degree, or intensity' },
    { id: '2', word: 'Benevolent', definition: 'Well-meaning and kindly' },
    { id: '3', word: 'Atrocity', definition: 'An act of shocking cruelty' },
    { id: '4', word: 'Respite', definition: 'A pause of doing something' },
    { id: '5', word: 'Candid', definition: 'Truthful and straightforward' },
    { id: '6', word: 'Diligent', definition: 'Showing care in doing someone work' },
    { id: '7', word: 'Eloquent', definition: 'Fluent or persuasive in speaking or writing' },
    { id: '8', word: 'Frugal', definition: 'Sparing or economical with resources' },
    { id: '9', word: 'Haughty', definition: 'Arrogantly superior and disdainful' },
    { id: '10', word: 'Jubilant', definition: 'Feeling or expressing great happiness' },
    { id: '11', word: 'Kindred', definition: 'Similar in kind; related' },
    { id: '12', word: 'Lucid', definition: 'Expressed clearly; easy to understand' },
    { id: '13', word: 'Nimble', definition: 'Quick and light in movement' },
    { id: '14', word: 'Obscure', definition: 'Not discovered or known about' },
    { id: '15', word: 'Prudent', definition: 'Acting with care and thought for the future' },
  ];
  
  export default function VocabularyQuiz() {
    const router = useRouter();
    const [words, setWords] = useState<Word[]>([]);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [matches, setMatches] = useState<Match[]>([]);
    const [showInstructions, setShowInstructions] = useState(true);
    const [disabledWords, setDisabledWords] = useState<string[]>([]);
  
    const randomizeWords = () => {
      const shuffled = [...allWords].sort(() => Math.random() - 0.5);
      setWords(shuffled.slice(0, 8));
    };
  
    useEffect(() => {
      randomizeWords();
    }, []);
  
    useEffect(() => {
        if (
          !showInstructions && 
          words.length > 0 && 
          matches.length + disabledWords.length === words.length
        ) {
          setCompleted(true);
        }
    }, [matches, disabledWords, showInstructions, words]);
  
    const handleDrop = (definitionId: string) => {
      if (!selectedWord) return;
  
      const word = words.find((w) => w.id === selectedWord);
      const definition = words.find((w) => w.id === definitionId);
  
      if (word && definition && word.definition === definition.definition) {
        setMatches((prevMatches) => [...prevMatches, { wordId: word.id, definitionId: definition.id }]);
        setScore((prevScore) => prevScore + 1);
      } else {
        Alert.alert('Incorrect', 'Try again!');
        setDisabledWords((prevDisabled) => [...prevDisabled, selectedWord]);
      }
  
      setSelectedWord(null);
    };
  
    const handleRestart = () => {
      setScore(0);
      setCompleted(false);
      setMatches([]);
      setSelectedWord(null);
      setDisabledWords([]);
      randomizeWords();
    };

    return (
        <LinearGradient
          colors={['#4F46E5', '#7C3AED']}
          style={styles.container}
        >
          <ScrollView style={styles.scrollView}>
            {/* Back Button */}
            <TouchableOpacity 
              onPress={() => router.push('/home')} 
              style={styles.backButton}
            >
              <View style={styles.backButtonContainer}>
                <Image source={backIcon} style={styles.backIcon} />
              </View>
            </TouchableOpacity>
    
            {/* Instructions Modal */}
            <Modal transparent={true} animationType="fade" visible={showInstructions}>
              <View style={styles.modalContainer}>
                <View style={styles.modalCard}>
                  <Text style={styles.modalTitle}>How to Play</Text>
                  <View style={styles.instructionsContainer}>
                    <View style={styles.instructionItem}>
                      <Text style={styles.instructionNumber}>1</Text>
                      <Text style={styles.modalInstruction}>Choose one vocabulary box</Text>
                    </View>
                    <View style={styles.instructionItem}>
                      <Text style={styles.instructionNumber}>2</Text>
                      <Text style={styles.modalInstruction}>Select the correct definition box</Text>
                    </View>
                    <View style={styles.instructionItem}>
                      <Text style={styles.instructionNumber}>3</Text>
                      <Text style={styles.modalInstruction}>Match correctly to score points</Text>
                    </View>
                    <View style={styles.instructionItem}>
                      <Text style={styles.instructionNumber}>4</Text>
                      <Text style={styles.modalInstruction}>Complete all matches to finish</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => setShowInstructions(false)}
                  >
                    <Text style={styles.startButtonText}>Start Quiz</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
    
            {/* Main Content */}
            <View style={styles.content}>
              <Text style={styles.title}>Vocabulary Quiz</Text>
              
              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${(score / words.length) * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.scoreText}>{score} / {words.length}</Text>
              </View>
    
              {/* Words Section */}
              <Text style={styles.sectionTitle}>Vocabulary Words</Text>
              <View style={styles.wordsContainer}>
                {words.map((word) => (
                  <TouchableOpacity
                    key={word.id}
                    style={[
                      styles.wordButton,
                      disabledWords.includes(word.id) && styles.disabledWord,
                      matches.some((m) => m.wordId === word.id) && styles.matchedWord
                    ]}
                    onPress={() => setSelectedWord(word.id)}
                    disabled={matches.some((m) => m.wordId === word.id) || disabledWords.includes(word.id)}
                  >
                    <Text style={[
                      styles.wordText,
                      (matches.some((m) => m.wordId === word.id) || disabledWords.includes(word.id)) && 
                      styles.disabledWordText
                    ]}>
                      {word.word}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
    
              {/* Definitions Section */}
              <Text style={styles.sectionTitle}>Definitions</Text>
              <View style={styles.definitionsContainer}>
                {words.map((word) => (
                  <TouchableOpacity
                    key={word.id}
                    style={[
                      styles.definitionBox,
                      matches.some((match) => match.definitionId === word.id) && 
                      styles.definitionMatched
                    ]}
                    onPress={() => handleDrop(word.id)}
                    disabled={matches.some((match) => match.definitionId === word.id)}
                  >
                    <Text style={[
                      styles.definitionText,
                      matches.some((match) => match.definitionId === word.id) && 
                      styles.matchedDefinitionText
                    ]}>
                      {word.definition}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
    
          {/* Completion Modal */}
          <Modal
            transparent={true}
            animationType="fade"
            visible={completed}
            onRequestClose={() => setCompleted(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.completionCard}>
                <LinearGradient
                  colors={['#4F46E5', '#7C3AED']}
                  style={styles.scoreCircle}
                >
                  <Text style={styles.finalScoreText}>{score}</Text>
                  <Text style={styles.totalScoreText}>/ {words.length}</Text>
                </LinearGradient>
                <Text style={styles.congratsText}>
                  {score === words.length ? 'Perfect Score!' : 'Quiz Complete!'}
                </Text>
                <Text style={styles.resultText}>
                  You matched {score} out of {words.length} correctly
                </Text>
                <TouchableOpacity 
                  style={styles.restartButton} 
                  onPress={handleRestart}
                >
                  <Text style={styles.restartButtonText}>Try Again</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </LinearGradient>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      scrollView: {
        flex: 1,
      },
      content: {
        padding: 20,
      },
      backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
      },
      backButtonContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 8,
        borderRadius: 12,
      },
      backIcon: {
        width: 24,
        height: 24,
        tintColor: '#4F46E5',
      },
      title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: 60,
        marginBottom: 24,
      },
      progressContainer: {
        marginBottom: 32,
      },
      progressBar: {
        height: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 4,
        marginBottom: 8,
      },
      progressFill: {
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 4,
      },
      scoreText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'right',
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 16,
        opacity: 0.9,
      },
      wordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 32,
      },
      wordButton: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        minWidth: '45%',
        elevation: 2,
      },
      wordText: {
        color: '#4F46E5',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
      },
      disabledWord: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
      },
      matchedWord: {
        backgroundColor: '#10B981',
      },
      disabledWordText: {
        color: '#fff',
      },
      definitionsContainer: {
        gap: 12,
        marginBottom: 32,
      },
      definitionBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 16,
        borderRadius: 12,
        elevation: 2,
      },
      definitionText: {
        color: '#1F2937',
        fontSize: 16,
        lineHeight: 24,
      },
      definitionMatched: {
        backgroundColor: '#10B981',
      },
      matchedDefinitionText: {
        color: '#fff',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        width: '85%',
        maxWidth: 400,
        elevation: 5,
      },
      modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        textAlign: 'center',
        marginBottom: 24,
      },
      instructionsContainer: {
        gap: 16,
        marginBottom: 24,
      },
      instructionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      },
      instructionNumber: {
        backgroundColor: '#4F46E5',
        color: '#fff',
        width: 28,
        height: 28,
        borderRadius: 14,
        textAlign: 'center',
        lineHeight: 28,
        fontSize: 16,
        fontWeight: 'bold',
      },
      modalInstruction: {
        flex: 1,
        fontSize: 16,
        color: '#4B5563',
        lineHeight: 24,
      },
      startButton: {
        backgroundColor: '#4F46E5',
        paddingVertical: 14,
        borderRadius: 12,
        width: '100%',
      },
      startButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      completionCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        width: '85%',
        maxWidth: 400,
        alignItems: 'center',
        elevation: 5,
      },
      scoreCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
      },
      finalScoreText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
      },
      totalScoreText: {
        fontSize: 20,
        color: '#fff',
        opacity: 0.9,
      },
      congratsText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
      },
      resultText: {
        fontSize: 16,
        color: '#4B5563',
        marginBottom: 24,
      },
      restartButton: {
        backgroundColor: '#4F46E5',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 12,
        width: '100%',
      },
      restartButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
    });