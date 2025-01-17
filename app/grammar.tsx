import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import backIcon from '../assets/images/arrow.png';
import { LinearGradient } from 'expo-linear-gradient';

export default function GrammarQuiz() {
  const router = useRouter();
  const [questions] = useState([
    {
      id: 1,
      question:
        'What is the correct form of the verb in this sentence: She _____ to the store yesterday.',
      options: ['goes', 'went', 'going'],
      answer: 'went',
    },
    {
      id: 2,
      question: 'Which article is used before a vowel sound?',
      options: ['a', 'an', 'the'],
      answer: 'an',
    },
    {
      id: 3,
      question: 'What is the plural of "child"?',
      options: ['childs', 'children', 'childrens'],
      answer: 'children',
    },
    {
        id: 4,
        question: 'Which verb form completes the sentence: He has _____ his homework already.',
        options: ['do', 'did', 'done'],
        answer: 'done',
      },
      {
        id: 5,
        question: 'Choose the correct option: If I _____ rich, I would travel the world.',
        options: ['am', 'were', 'was'],
        answer: 'were',
      },
      {
        id: 6,
        question: 'Complete the sentence: I _____ here since 2010.',
        options: ['have lived', 'live', 'lived'],
        answer: 'have lived',
      },
      {
        id: 7,
        question: 'Select the correct comparative form: She is _____ than her sister.',
        options: ['more tall', 'taller', 'most tall'],
        answer: 'taller',
      },
      {
        id: 8,
        question: 'Which preposition fits best: They are interested _____ learning English.',
        options: ['on', 'in', 'at'],
        answer: 'in',
      },
      {
        id: 9,
        question: 'Choose the correct modal verb: You _____ finish your homework before playing games.',
        options: ['must', 'can', 'might'],
        answer: 'must',
      },
      {
        id: 10,
        question: 'What is the correct tense: By the time she arrives, we _____ dinner.',
        options: ['will finish', 'will have finished', 'finish'],
        answer: 'will have finished',
      },
      {
        id: 11,
        question: 'Which pronoun completes the sentence: This book is not mine; it is _____.',
        options: ['your', 'yours', 'you'],
        answer: 'yours',
      },
      {
        id: 12,
        question: 'Choose the correct form of the verb: The movie _____ at 8 PM tonight.',
        options: ['starts', 'start', 'starting'],
        answer: 'starts',
      },
      {
        id: 13,
        question: 'Which conjunction fits best: I will go to the party _____ I finish my work.',
        options: ['although', 'if', 'and'],
        answer: 'if',
      },
      {
        id: 14,
        question: 'Identify the correct passive voice: The cake _____ by Mary.',
        options: ['bakes', 'was baked', 'is baking'],
        answer: 'was baked',
      },
      {
        id: 15,
        question: 'Select the correct quantifier: There isn’t _____ milk in the fridge.',
        options: ['some', 'any', 'a'],
        answer: 'any',
      },
      {
        id: 16,
        question: 'Choose the correct question tag: She’s coming tomorrow, _____?',
        options: ['is she', 'isn’t she', 'does she'],
        answer: 'isn’t she',
      },
      {
        id: 17,
        question: 'What is the correct form: He didn’t see _____ in the room.',
        options: ['anybody', 'somebody', 'nobody'],
        answer: 'anybody',
      },
      {
        id: 18,
        question: 'Which adverb completes the sentence: She speaks English very _____.',
        options: ['good', 'well', 'best'],
        answer: 'well',
      },
      {
        id: 19,
        question: 'Complete the conditional sentence: If I had studied harder, I _____ the test.',
        options: ['would pass', 'would have passed', 'will pass'],
        answer: 'would have passed',
      },
      {
        id: 20,
        question: 'Choose the correct word: The book on the table is _____.',
        options: ['mine', 'me', 'my'],
        answer: 'mine',
      },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionPress = (option : string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setSubmitted(false);
  };

  if (submitted) {
    const score = questions.reduce(
      (acc, question) =>
        selectedAnswers[question.id] === question.answer ? acc + 1 : acc,
      0
    );

    return (
      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        style={styles.gradientContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity 
            onPress={() => router.push('/home')} 
            style={styles.backButton}
          >
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Quiz Complete!</Text>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>
                {score}/{questions.length}
              </Text>
              <Text style={styles.scoreLabel}>Correct Answers</Text>
            </View>
            
            <View style={styles.resultsContainer}>
              {questions.map((q, index) => (
                <View key={q.id} style={styles.resultItem}>
                  <Text style={styles.questionNumber}>Question {index + 1}</Text>
                  <Text style={styles.questionText}>{q.question}</Text>
                  <View style={styles.answerContainer}>
                    <View style={[
                      styles.answerBox,
                      selectedAnswers[q.id] === q.answer 
                        ? styles.correctAnswer 
                        : styles.wrongAnswer
                    ]}>
                      <Text style={styles.answerLabel}>Your Answer</Text>
                      <Text style={styles.answerText}>
                        {selectedAnswers[q.id] || 'No answer'}
                      </Text>
                    </View>
                    <View style={[styles.answerBox, styles.correctAnswer]}>
                      <Text style={styles.answerLabel}>Correct Answer</Text>
                      <Text style={styles.answerText}>{q.answer}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            
            <TouchableOpacity 
              onPress={handleRestart}
              style={styles.tryAgainButton}
            >
              <Text style={styles.tryAgainText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#4158D0', '#C850C0']}
      style={styles.gradientContainer}
    >
      <View style={styles.quizContainer}>
        <TouchableOpacity 
          onPress={() => router.push('/home')} 
          style={styles.backButton}
        >
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>

        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
            ]} 
          />
        </View>

        <Text style={styles.questionCounter}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Text>

        <Text style={styles.questionText}>
          {currentQuestion.question}
        </Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswers[currentQuestion.id] === option && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress(option)}
            >
              <Text style={[
                styles.optionText,
                selectedAnswers[currentQuestion.id] === option && styles.selectedOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleNext}
          style={[
            styles.nextButton,
            !selectedAnswers[currentQuestion.id] && styles.disabledButton
          ]}
          disabled={!selectedAnswers[currentQuestion.id]}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  quizContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    zIndex: 10,
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#4158D0',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  questionCounter: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
    opacity: 0.8,
  },
  questionText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 32,
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#fff',
    borderColor: '#4158D0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
  },
  selectedOptionText: {
    color: '#4158D0',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  nextButtonText: {
    color: '#4158D0',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    marginTop: 60,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#4158D0',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  resultsContainer: {
    gap: 20,
  },
  resultItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  questionNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  answerContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  answerBox: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
  },
  correctAnswer: {
    backgroundColor: 'rgba(46, 213, 115, 0.1)',
  },
  wrongAnswer: {
    backgroundColor: 'rgba(255, 71, 87, 0.1)',
  },
  answerLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  answerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  tryAgainButton: {
    backgroundColor: '#4158D0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  tryAgainText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
