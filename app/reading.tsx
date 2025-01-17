import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView,KeyboardAvoidingView,Platform} from 'react-native';
import { useRouter } from 'expo-router';
import backIcon from '../assets/images/arrow.png';

const readingContent = `
Reading is a complex cognitive process that requires decoding symbols to derive meaning. In recent research, it has been found that regular reading not only improves vocabulary but also enhances critical thinking and comprehension. Moreover, reading provides insights into various cultural and historical contexts, enabling individuals to connect with different perspectives. Studies suggest that individuals who engage in daily reading habits are likely to perform better in problem-solving and analytical tasks. In addition, it has been shown that reading stimulates the brain and reduces stress, thereby contributing to mental well-being.
`;

const questions = [
  { id: 1, question: 'What are two cognitive benefits of regular reading mentioned in the passage?', correctAnswer: 'critical thinking and comprehension' },
  { id: 2, question: 'How does reading contribute to mental well-being?', correctAnswer: 'reduces stress' },
  { id: 3, question: 'What kind of contexts does reading provide insights into?', correctAnswer: 'cultural and historical contexts' },
  { id: 4, question: 'What kind of tasks do regular readers perform better at?', correctAnswer: 'problem-solving and analytical tasks' },
  { id: 5, question: 'How does reading affect stress levels?', correctAnswer: 'reduces stress' },
  { id: 6, question: 'What does decoding symbols mean in the context of reading?', correctAnswer: 'deriving meaning' },
  { id: 7, question: 'What are some skills improved by daily reading habits?', correctAnswer: 'vocabulary and critical thinking' },
  { id: 8, question: 'What is a non-cognitive benefit of reading mentioned in the text?', correctAnswer: 'reduces stress' },
  { id: 9, question: 'What does the text suggest about reading and brain stimulation?', correctAnswer: 'stimulates the brain' },
  { id: 10, question: 'How does reading connect individuals with different perspectives?', correctAnswer: 'through cultural and historical contexts' },
];

export default function ReadingQuiz() {
  const router = useRouter();
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  
  const handleAnswerChange = (text : string, index : number) => {
    const newAnswers = [...answers];
    newAnswers[index] = text;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((q, i) => {
      if (answers[i]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);
  };

  const handleRestart = () => {
    setAnswers(Array(questions.length).fill(''));
    setScore(0);
  };

    return (
        <KeyboardAvoidingView
        style={styles.safeArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.push('/home')} style={styles.backButton}>
                <Image source={backIcon} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Reading Comprehension</Text>
            <View style={styles.backIcon} />
        </View>

        {/* Konten */}
        {submitted ? (
            <ScrollView style={styles.container}>
            <View style={styles.scoreCard}>
                <Text style={styles.scoreTitle}>Quiz Results</Text>
                <Text style={styles.scoreText}>{score}/{questions.length}</Text>
                <Text style={styles.scoreSubtext}>Correct Answers</Text>
            </View>

            {questions.map((q, i) => (
                <View key={q.id} style={styles.resultCard}>
                <Text style={styles.questionNumber}>Question {i + 1}</Text>
                <Text style={styles.resultQuestion}>{q.question}</Text>
                <Text style={styles.answerText}>Your Answer: {answers[i] || 'No answer provided'}</Text>
                <Text style={styles.correctAnswerText}>Correct Answer: {q.correctAnswer}</Text>
                </View>
            ))}

            <TouchableOpacity onPress={handleRestart} style={styles.button}>
                <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
            </ScrollView>
        ) : (
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.readingCard}>
                <Text style={styles.readingTitle}>Reading Passage</Text>
                <Text style={styles.readingText}>{readingContent}</Text>
            </View>

            {questions.map((q, index) => (
                <View key={q.id} style={styles.questionCard}>
                <Text style={styles.questionNumber}>Question {index + 1}</Text>
                <Text style={styles.questionText}>{q.question}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Type your answer here..."
                    placeholderTextColor="#94A3B8"
                    value={answers[index]}
                    onChangeText={(text) => handleAnswerChange(text, index)}
                />
                </View>
            ))}

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Submit Answers</Text>
            </TouchableOpacity>
            </ScrollView>
        )}
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#64748B',
  },
  readingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', // Mengganti shadow menjadi boxShadow

  },
  readingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  readingText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', // Mengganti shadow menjadi boxShadow
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1E293B',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  scoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#2563EB',
    marginBottom: 8,
  },
  scoreSubtext: {
    fontSize: 16,
    color: '#64748B',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  resultQuestion: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 16,
  },
  answerContainer: {
    marginTop: 8,
  },
  answerLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    marginBottom: 4,
  },
  answerText: {
    fontSize: 16,
    marginBottom: 8,
  },
  correctAnswer: {
    color: '#059669',
  },
  wrongAnswer: {
    color: '#DC2626',
  },
  correctAnswerText: {
    fontSize: 16,
    color: '#059669',
    fontWeight: '500',
  },
});