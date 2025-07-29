import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  SafeAreaView,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');

const lightTheme = {
  background: '#f8f9fa',
  text: '#2c3e50',
  subText: '#6c757d',
  inputBackground: '#ffffff',
  placeholder: '#8e9aaf',
  border: '#e9ecef',
  icon: '#667eea',
};

const darkTheme = {
  background: '#121212',
  text: '#f1f1f1',
  subText: '#bbbbbb',
  inputBackground: '#1e1e1e',
  placeholder: '#888888',
  border: '#2c2c2c',
  icon: '#a29bfe',
};

const HomeScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [theme, setTheme] = useState('light');
  const [modalVisible, setModalVisible] = useState(false);
  const [question, setQuestion] = useState('');
  const [submittedQuestion, setSubmittedQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const handleImagePicker = () => setModalVisible(true);

  const openCamera = () => {
    setModalVisible(false);
    launchCamera({ mediaType: 'photo', cameraType: 'back', saveToPhotos: true }, (response) => {
      if (!response.didCancel && !response.errorCode) {
        const selectedAsset = response.assets?.[0];
        setSelectedImage(selectedAsset?.uri);
      }
    });
  };

  const openGallery = () => {
    setModalVisible(false);
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, (response) => {
      if (!response.didCancel && !response.errorCode) {
        const selectedAsset = response.assets?.[0];
        setSelectedImage(selectedAsset?.uri);
      }
    });
  };

  const getAnswer = (questionText) => {
    if (!questionText.trim()) return 'Please enter a question.';
    if (questionText.toLowerCase().includes('ayurveda')) {
      return 'Ayurveda is an ancient Indian system of medicine.';
    }
    if (questionText.toLowerCase().includes('ved')) {
      return 'Vedas are ancient Indian texts containing spiritual knowledge.';
    }
    return "Sorry, I don't know the answer yet.";
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={currentTheme.background}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: currentTheme.inputBackground, borderBottomColor: currentTheme.border }]}>
        <View style={styles.profileCircle}>
          <Text style={styles.profileText}>C</Text>
        </View>
        <View style={styles.headerCenter}>
          <View style={styles.providerContainer}>
            <Text style={[styles.perplexityText, { color: currentTheme.text }]}>VedAl</Text>
            <View style={styles.proBadge}>
              <Text style={styles.proText}>PRO</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={toggleTheme}>
          <IconFeather name="zap" size={22} color={currentTheme.icon} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.mainContent} keyboardShouldPersistTaps="handled">
        {answer !== '' ? (
          <View style={styles.conversationContainer}>
            <View style={styles.questionContainer}>
              <View style={[styles.questionBubble, { backgroundColor: currentTheme.inputBackground }]}>
                <Text style={[styles.questionText, { color: currentTheme.text }]}>{submittedQuestion}</Text>
              </View>
            </View>
            <View style={styles.answerContainer}>
              <View style={[styles.answerBubble, { backgroundColor: currentTheme.inputBackground }]}>
                <Text style={[styles.answerText, { color: currentTheme.text }]}>{answer}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setAnswer('');
                setSubmittedQuestion('');
                setQuestion('');
              }}
              style={styles.newQuestionButton}
            >
              <Text style={[styles.newQuestionText, { color: currentTheme.icon }]}>Ask another question</Text>
            </TouchableOpacity>
          </View>
        ) : (
          !isInputFocused && (
            <View style={styles.welcomeContainer}>
              <View style={styles.logoContainer}>
                <LinearGradient colors={['#667eea', '#764ba2']} style={styles.logoGradient}>
                  <IconFeather name="zap" size={40} color="#ffffff" />
                </LinearGradient>
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.mainTitle, { color: currentTheme.text }]}>Where</Text>
                <Text style={[styles.mainTitle, { color: currentTheme.text }]}>Tradition </Text>
                <Text style={[styles.mainTitle, { color: currentTheme.text }]}>Resonates With</Text>
                <Text style={[styles.mainTitle, { color: currentTheme.text }]}>Technology</Text>
                <View style={[styles.underline, { backgroundColor: currentTheme.icon }]} />
              </View>
            </View>
          )
        )}
      </ScrollView>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <LinearGradient
            colors={[currentTheme.inputBackground, currentTheme.background]}
            style={styles.searchGradient}
          >
            <View style={styles.searchInputContainer}>
              <IconFeather
                name="search"
                size={24}
                color={currentTheme.placeholder}
                style={styles.searchIcon}
              />
              <TextInput
                value={question}
                onChangeText={setQuestion}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                style={[styles.searchInput, { color: currentTheme.text }]}
                placeholder="Ask anything..."
                placeholderTextColor={currentTheme.placeholder}
                multiline
                numberOfLines={3}
              />
              <View style={styles.inlineIconsContainer}>
                <TouchableOpacity style={styles.inlineActionIcon} onPress={handleImagePicker}>
                  <LinearGradient colors={['#ff6b6b', '#ff8e8e']} style={styles.inlineIconGradient}>
                    <IconFeather name="image" size={18} color="#ffffff" />
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inlineActionIcon}>
                  <LinearGradient colors={['#4ecdc4', '#44a08d']} style={styles.inlineIconGradient}>
                    <IconMaterial name="function-variant" size={18} color="#ffffff" />
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={() => {
                    if (question.trim()) {
                      const ans = getAnswer(question);
                      setSubmittedQuestion(question);
                      setAnswer(ans);
                      setQuestion('');
                      setIsInputFocused(false);
                    }
                  }}
                >
                  <LinearGradient colors={['#667eea', '#764ba2']} style={styles.sendButtonGradient}>
                    <Entypo name="arrow-up" size={24} color="#ffffff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: 100, height: 100, marginTop: 10, borderRadius: 10 }}
            />
          )}
        </View>
      </View>

      {/* Modal */}
      <Modal transparent visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={openCamera} style={styles.modalButton}>
              <IconFeather name="camera" size={28} color="#667eea" />
            </TouchableOpacity>
            <TouchableOpacity onPress={openGallery} style={styles.modalButton}>
              <IconFeather name="image" size={28} color="#44a08d" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
              <IconFeather name="x" size={28} color="#e74c3c" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8b4513',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  providerContainer: { flexDirection: 'row', alignItems: 'center' },
  perplexityText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
  proBadge: {
    backgroundColor: '#3498db',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  proText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  shareButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  conversationContainer: {
    width: '100%',
    flex: 1,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  questionBubble: {
    padding: 15,
    borderRadius: 20,
    borderBottomRightRadius: 5,
    maxWidth: '80%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  questionText: {
    fontSize: 16,
    lineHeight: 22,
  },
  answerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  answerBubble: {
    padding: 15,
    borderRadius: 20,
    borderBottomLeftRadius: 5,
    maxWidth: '80%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  answerText: {
    fontSize: 16,
    lineHeight: 22,
  },
  newQuestionButton: {
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
  newQuestionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  welcomeContainer: {
    flex: 1,  
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: { marginBottom: 30 },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  textContainer: { alignItems: 'center' },
  mainTitle: {
    fontSize: 30,
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: -1,
  },
  underline: {
    width: 60,
    height: 3,
    marginTop: 20,
    borderRadius: 2,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  searchContainer: { marginBottom: 15 },
  searchGradient: {
    borderRadius: 25,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 18,
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 29,
  },
  searchIcon: {
    marginRight: 15,
    marginTop: 8,
    opacity: 0.6,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: 'top',
    marginRight: 10,
  },
  inlineIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  inlineActionIcon: {
    marginRight: 8,
  },
  inlineIconGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    marginLeft: 4,
  },
  sendButtonGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 20,
  },
  modalButton: {
    alignItems: 'center',
    padding: 12,
  },
});

export default HomeScreen;