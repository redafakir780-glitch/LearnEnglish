import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, FlatList, TouchableOpacity, I18nManager } from 'react-native';
import * as Speech from 'expo-speech';

const Stack = createNativeStackNavigator();

const STR = {
  ar: {
    title: 'تعلم الإنجليزية',
    courses: 'الدورات',
    play: 'تشغيل الصوت',
    back: 'رجوع'
  },
  en: {
    title: 'Learn English',
    courses: 'Courses',
    play: 'Play Audio',
    back: 'Back'
  }
};

const COURSES = [
  { id: '1', title_en: 'Beginner: Greetings', title_ar: 'مبتدئ: التحيات', description: 'Basic phrases and greetings.' },
  { id: '2', title_en: 'Beginner: Numbers', title_ar: 'مبتدئ: الأرقام', description: 'Counting and numbers.' }
];

const LESSONS = [
  { id: 'l1', title_en: 'Hello / Hi', title_ar: 'مرحبا', content_en: 'Hello! Hi! How are you?', content_ar: 'Hello! Hi! How are you?' },
  { id: 'l2', title_en: 'Good morning', title_ar: 'صباح الخير', content_en: 'Good morning. Have a great day!', content_ar: 'Good morning. Have a great day!' }
];

function HomeScreen({ navigation }) {
  const lang = 'ar';
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 12 }}>{STR[lang].title}</Text>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>{STR[lang].courses}</Text>
      <FlatList
        data={COURSES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Course', { course: item, lang })} style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
            <Text style={{ fontSize: 18 }}>{lang === 'ar' ? item.title_ar : item.title_en}</Text>
            <Text style={{ color: '#666' }}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function CourseScreen({ route, navigation }) {
  const { course, lang } = route.params;
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 8 }}>{lang === 'ar' ? course.title_ar : course.title_en}</Text>
      <FlatList
        data={LESSONS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Lesson', { lesson: item, lang })} style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
            <Text style={{ fontSize: 18 }}>{lang === 'ar' ? item.title_ar : item.title_en}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function LessonScreen({ route, navigation }) {
  const { lesson, lang } = route.params;
  const content = lang === 'ar' ? lesson.content_ar : lesson.content_en;
  const speak = () => {
    Speech.speak(content, { language: 'en-US' });
  };
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22 }}>{lang === 'ar' ? lesson.title_ar : lesson.title_en}</Text>
      <Text style={{ marginVertical: 12 }}>{content}</Text>
      <Button title={STR[lang].play} onPress={speak} />
    </View>
  );
}

function ExerciseScreen({ route }) {
  const { lang } = route.params || { lang: 'ar' };
  const question = lang === 'ar' ? 'اختر الترجمة الصحيحة لكلمة "Hello"' : 'Choose the correct translation for "Hello"';
  const options = lang === 'ar' ? ['مرحبا','وداعا','نعم'] : ['Hello','Goodbye','Yes'];
  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:18, marginBottom:12 }}>{question}</Text>
      {options.map((opt, i) => (
        <TouchableOpacity key={i} style={{ padding:12, borderBottomWidth:1 }}>
          <Text>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function FlashcardsScreen() {
  return (
    <View style={{ flex:1, padding:16 }}>
      <Text>Flashcards (SRS) - coming soon</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Learn English' }} />
        <Stack.Screen name="Course" component={CourseScreen} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
        <Stack.Screen name="Exercise" component={ExerciseScreen} />
        <Stack.Screen name="Flashcards" component={FlashcardsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
