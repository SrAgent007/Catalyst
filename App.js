import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, ImageBackground, TextInput, Button, Alert, Pressable, TouchableOpacity, TouchableHighlight } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-elements';
import { Avatar, Title, Caption, Paragraph } from 'react-native-paper';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';

//Web App's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAqOL5iUPonoBuVo69qLEUrEK1q6cKc0Cg',
  authDomain: 'catalyst-b67b6.firebaseapp.com',
  projectId: 'catalyst-b67b6',
  storageBucket: 'catalyst-b67b6.appspot.com',
  messagingSenderId: '989678801888',
  appId: '1:989678801888:web:c550f266f9838ae1589185',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

//Main App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Drawers" component={Drawers} options={{ headerShown: false }} />
        <Stack.Screen name="Registration" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//Tab Bar Plus (+) Middle Button
const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity style={{ top: -30, justifyContent: 'center', alignItems: 'center' }} onPress={onPress}>
    <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#0984e3' }}>{children}</View>
  </TouchableOpacity>
);

//Tabs w/o Label
const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      }}
    >
      <Tab.Screen name="Tasks" component={TasksScreen} options={{ headerShown: false, tabBarIcon: ({ color, size }) => <Icon name="tasks" color={color} size={size} type="font-awesome-5" /> }} />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ headerShown: false, tabBarIcon: ({ color, size }) => <Icon name="calendar" color={color} size={size} type="font-awesome" /> }}
      />

      <Tab.Screen
        name="Add"
        component={AddTask}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <Image source={require('./assets/Images/Plus.png')} resizeMode="contain" style={{ width: 30, height: 30, tintColor: '#fff' }} />,
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />

      <Tab.Screen name="Quests" component={QuestScreen} options={{ headerShown: false, tabBarIcon: ({ color, size }) => <Icon name="scroll" color={color} size={size} type="font-awesome-5" /> }} />
      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{ headerShown: false, tabBarIcon: ({ color, size }) => <Icon name="shopping-store" color={color} size={size} type="fontisto" /> }}
      />
    </Tab.Navigator>
  );
};

//Drawers for DrawerContent
const Drawers = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Tasks"
      backBehavior="initialRoute"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f1c40f',
        },
        headerTintColor: 'black',
      }}
    >
      <Drawer.Screen name="Catalyst" component={Tabs} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Notifications" component={NotifsScreen} />
      <Drawer.Screen name="Stats" component={StatsScreen} />
      <Drawer.Screen name="Achievements" component={AchievementsScreen} />
      <Drawer.Screen name="Changelog" component={ChangelogScreen} />
      <Drawer.Screen name="Contact" component={ContactScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
};

//Drawer Styles
function DrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ flex: 1 }}>
          <View style={{ paddingLeft: 20 }}>
            <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15 }}>
              <Avatar.Image source={require('./assets/Avatars/A1.png')} size={80} />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={{ fontSize: 16, fontWeight: 'bold' }}>Username</Title>
                <Caption style={{ fontSize: 14, lineHeight: 14 }}>Level 01</Caption>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Paragraph style={{ fontWeight: 'bold' }}>100</Paragraph>
                  <Image source={require('./assets/Images/CatalystCoin.png')} style={{ height: 25, width: 25 }} />
                  <Paragraph style={{ fontWeight: 'bold', marginLeft: 20 }}>10</Paragraph>
                  <Image source={require('./assets/Images/Crystal.png')} style={{ height: 25, width: 25 }} />
                </View>
              </View>
            </View>
          </View>

          <DrawerItem
            label="Profile"
            onPress={() => props.navigation.navigate('Profile')}
            icon={({ color, size }) => <Icon name="user-circle" color={color} size={size} type="font-awesome-5" />}
            style={styles.drawerDivider}
          />
          <DrawerItem label="Tasks" onPress={() => props.navigation.navigate('Tasks')} icon={({ color, size }) => <Icon name="tasks" color={color} size={size} type="font-awesome-5" />} />

          <DrawerItem
            label="Notifications"
            onPress={() => props.navigation.navigate('Notifications')}
            icon={({ color, size }) => <Icon name="notifications-outline" color={color} size={size} type="ionicon" />}
            style={styles.drawerDivider}
          />
          <DrawerItem label="Stats" onPress={() => props.navigation.navigate('Stats')} icon={({ color, size }) => <Icon name="stats-chart" color={color} size={size} type="ionicon" />} />
          <DrawerItem
            label="Achievements"
            onPress={() => props.navigation.navigate('Achievements')}
            icon={({ color, size }) => <Icon name="trophy-award" color={color} size={size} type="material-community" />}
          />

          <DrawerItem
            label="Changelog"
            onPress={() => props.navigation.navigate('Changelog')}
            icon={({ color, size }) => <Icon name="ballot" color={color} size={size} />}
            style={styles.drawerDivider}
          />
          <DrawerItem label="Contact" onPress={() => props.navigation.navigate('Contact')} icon={({ color, size }) => <Icon name="contact-mail" color={color} size={size} />} />
          <DrawerItem label="About" onPress={() => props.navigation.navigate('About')} icon={({ color, size }) => <Icon name="info" color={color} size={size} type="entypo" />} />
        </View>
      </DrawerContentScrollView>

      <DrawerItem
        label="Sign Out"
        onPress={() => props.navigation.navigate('Login')}
        icon={({ color, size }) => <Icon name="sign-out-alt" color={color} size={size} type="font-awesome-5" />}
        style={styles.bottomDrawerSection}
      />
    </View>
  );
}

//Stack Screen (First to Load)
function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image style={styles.brandLogo} source={require('./assets/Images/Catalyst.png')} />
      <Text style={styles.textDesign1}>Catalyst</Text>
      <Text style={styles.textDesign2}>Task Scheduler</Text>
      <TextInput style={styles.textBox} value="Username" />
      <TextInput style={styles.textBox} value="Password" />
      <Pressable style={styles.customBtn} onPress={() => navigation.navigate('Drawers')}>
        <Text style={{ fontSize: 20 }}>Login</Text>
      </Pressable>
      <Text>No Account? Register Now!</Text>
      <Button title="Register" color="#8e44ad" onPress={() => Alert.alert('Registered!')} accessibilityLabel="Learn more about this purple button" />
    </View>
  );
}

//Tasks
const Tasks = [
  {
    title: 'Project Submission',
    date: 'Nov. 22, 2021',
    description: 'Enter Confe at 2:30 for Presentation',
  },
  {
    title: 'Start of MG3',
    date: 'Nov. 24, 2021',
    description: 'New Subjects to Study',
  },
];

//Logging to Database
const CreateTask = (title, date, desc) => {
  const db = getDatabase();
  const TaskListRef = ref(db, 'task');
  const newTaskRef = push(TaskListRef);
  set(newTaskRef, {
    title: title,
    date: date,
    desc: desc,
  });

  Alert.alert('Added Successfully!');
};

/*
Firebase Listener from Documentation
*Cant Configure on how to use them*

setupHighscoreListener(userId) {const db = getDatabase();
  const reference = ref(db, 'users/' + userId);
  onValue(reference, (snapshot) => {
    const highscore = snapshot.val().highscore;
    console.log("New high score: " + highscore);
  });
}
*/

//Middle Tab (+) Screen
const AddTask = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.notCentered} resizeMode="contain" source={require('./assets/Images/Catalyst.png')} imageStyle={styles.opacity}>
        <ScrollView>
          <View style={{ alignItems: 'center', marginTop: 25 }}>
            <Text style={{ color: '#000', textAlign: 'center', fontSize: 30, margin: 30, fontWeight: 'bold' }}>Add a Task</Text>
            <TextInput
              style={styles.inputTextbox}
              placeholder="Task Name"
              placeholderTextColor="#aaaaaa"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              onChangeText={(text) => setTitle(text)}
              value={title}
            />

            <TextInput
              style={styles.inputTextbox}
              placeholder="Task Date"
              placeholderTextColor="#aaaaaa"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              onChangeText={(text) => setDate(text)}
              value={date}
            />

            <TextInput
              style={styles.inputTextbox}
              placeholder="Task Description"
              placeholderTextColor="#aaaaaa"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              onChangeText={(text) => setDesc(text)}
              value={desc}
            />

            <Text> </Text>
            <Button title="Add Task" color="#00cec9" onPress={() => CreateTask(title, date, desc)} />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

//Tabs
function TasksScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.notCentered} resizeMode="contain" source={require('./assets/Images/Catalyst.png')} imageStyle={styles.opacity}>
        <ScrollView>
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <View style={styles.items}>
              {Tasks.map((task, key) => (
                <Task task={task} key={key} />
              ))}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

//Tasks
const Task = (props) => {
  return (
    <View style={styles.taskItem}>
      <View style={styles.taskItemLeft}>
        <View style={styles.taskSquare}></View>
        <View styles={{ flexDirection: 'column' }}>
          <Text style={styles.taskItemTitle}>{props.task.title}</Text>
          <Text>{props.task.date}</Text>
          <Text>"{props.task.description}"</Text>
        </View>
      </View>
      <View style={styles.taskCircular}></View>
    </View>
  );
};

/*
Task Screen v1

function TasksScreen({ navigation }) {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let taskItemsCopy = [...taskItems];
    taskItemsCopy.splice(index, 1);
    setTaskItems(taskItemsCopy);
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.notCentered} resizeMode="contain" source={require('./assets/Images/Catalyst.png')} imageStyle={styles.opacity}>
        <ScrollView>
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <View style={styles.items}>
              {taskItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task task={item} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.writeTaskWrapper}>
          <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={(task) => setTask(task)} />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const Task = (props) => {
  return (
    <View style={styles.taskItem}>
      <View style={styles.taskItemLeft}>
        <View style={styles.taskSquare}></View>
        <Text style={styles.taskItemText}>{props.task}</Text>
      </View>
      <View style={styles.taskCircular}></View>
    </View>
  );
};
*/

//Tabs
function CalendarScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} resizeMode="contain" source={require('./assets/Images/Catalyst.png')} imageStyle={styles.opacity}>
        <Text style={styles.textDesign1}>Calendar</Text>
      </ImageBackground>
    </View>
  );
}

//Quests
const QuestList = [
  {
    QuestName: 'Complete 1 Task',
    QuestReward: '1',
    QuestImage: './assets/Avatars/A1.png',
  },
  {
    QuestName: 'Complete 10 Tasks',
    QuestReward: '10',
    QuestImage: './assets/Images/CatalystCoin.png',
  },
  {
    QuestName: 'Complete 100 Tasks',
    QuestReward: '100',
    QuestImage: './assets/Images/Crystal.png',
  },
];

//Tabs
function QuestScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} resizeMode="contain" source={require('./assets/Images/Catalyst.png')} imageStyle={styles.opacity}>
        <ScrollView>
          <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10 }}>Quests</Text>
          <Quest QuestName="Complete 1 Task" QuestReward="10" />
          <Quest QuestName="Complete 10 Tasks" QuestReward="20" />
          <Quest QuestName="Complete 100 Tasks" QuestReward="30" />
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

//Quest Card
const Quest = (props) => {
  return (
    <View style={styles.cardRounded}>
      <View style={{ flexDirection: 'row' }}>
        <Image style={styles.cardImage} source={require('./assets/Avatars/Girls/5star/mona.png')} />
        <View style={{ flexDirection: 'column', margin: 5, width: 150 }}>
          <Text style={{ marginTop: 10 }}>{props.QuestName}</Text>
          <View style={{ flexDirection: 'row', margin: 5, alignContent: 'center' }}>
            <Image source={require('./assets/Images/CatalystCoin.png')} style={{ height: 25, width: 25 }} />
            <Text style={{ fontWeight: 'bold', margin: 5 }}>{props.QuestReward}</Text>
          </View>
        </View>
        <TouchableOpacity style={{ height: 50, width: 50, margin: 10, alignItems: 'center', alignContent: 'center' }} onPress={() => navigation.navigate('Drawers')}>
          <Icon name="checkcircle" type="antdesign" color="#27ae60" size={50} onPress={() => console.log('Done')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

//Tabs
function RewardsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} resizeMode="contain" source={require('./assets/Images/Catalyst.png')} imageStyle={styles.opacity}>
        <Text style={styles.textDesign1}>Rewards</Text>
      </ImageBackground>
    </View>
  );
}

function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} resizeMode="contain" source={require('./assets/Images/Catalyst.png')} imageStyle={styles.opacity}>
        <Text style={styles.textDesign1}>Registration</Text>
      </ImageBackground>
    </View>
  );
}

//Drawer
function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} resizeMode="contain" source={require('./assets/Images/Catalyst.png')} imageStyle={styles.opacity}>
        <Text style={styles.textDesign1}>Profile</Text>
      </ImageBackground>
    </View>
  );
}

//Drawer
function NotifsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} resizeMode="contain" source={require('./assets/Images/Catalyst.png')} imageStyle={styles.opacity}>
        <Text style={styles.textDesign1}>Notifications</Text>
      </ImageBackground>
    </View>
  );
}

//Drawer
function AchievementsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} resizeMode="contain" source={require('./assets/Images/Catalyst.png')} imageStyle={styles.opacity}>
        <Text style={styles.textDesign1}>Achievements</Text>
      </ImageBackground>
    </View>
  );
}

//Drawe
function StatsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.notCentered} resizeMode="contain" source={require('./assets/Images/Catalyst.png')} imageStyle={{ opacity: 0.1 }}>
        <ScrollView>
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Stats</Text>
            <View style={styles.items}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Username</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>Level: 10</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>Title: Task Master</Text>
              <Text> </Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>Tasks Done: 100</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>Quests Done: 7</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>Achievements Earned: 3</Text>
              <Text> </Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>Total Cata Coins Earned: 1028</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>Total Crystals Earned: 31</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>Total Avatars Unlocked: 2</Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

//Drawer
function ChangelogScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.notCentered} resizeMode="contain" source={require('./assets/Images/Catalyst.png')} imageStyle={{ opacity: 0.1 }}>
        <ScrollView>
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Changelog</Text>
            <View style={styles.items}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Version 1.0.0</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>>Full Release</Text>
              <Text style={{ fontSize: 18, marginLeft: 30 }}>-This is the Full Release of Catalyst so feel free to try it and use it in your daily tasks, assignments, work, etc.</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>>Added Avatars:</Text>
              <Text style={{ fontSize: 18, marginLeft: 30 }}>-From Gensin Impact!</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>>Added Quests</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>>Added Rewards</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>>Added Calendar</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>>Added Tasks</Text>
            </View>
            <View style={styles.items}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Version 1.0.0</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>>Full Release</Text>
              <Text style={{ fontSize: 18, marginLeft: 30 }}>-This is the Full Release of Catalyst so feel free to try it and use it in your daily tasks, assignments, work, etc.</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>>Added Avatars:</Text>
              <Text style={{ fontSize: 18, marginLeft: 30 }}>-From Gensin Impact!</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>>Added Quests</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>>Added Rewards</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>>Added Calendar</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>>Added Tasks</Text>
            </View>
            <View style={styles.items}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Version 1.0.0</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>>Full Release</Text>
              <Text style={{ fontSize: 18, marginLeft: 30 }}>-This is the Full Release of Catalyst so feel free to try it and use it in your daily tasks, assignments, work, etc.</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>>Added Avatars:</Text>
              <Text style={{ fontSize: 18, marginLeft: 30 }}>-From Gensin Impact!</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>>Added Quests</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>>Added Rewards</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>>Added Calendar</Text>
              <Text style={{ fontSize: 18, marginLeft: 15 }}>>Added Tasks</Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

//Drawer
function AboutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image style={styles.brandLogo} source={require('./assets/Images/Catalyst.png')} />
      <Text style={styles.textDesign1}>Catalyst</Text>
      <Text style={styles.textDesign2}>Task Scheduler</Text>
      <Text style={styles.textDesign2}> </Text>
      <Text style={styles.textDesign2}>Version 1.0.0</Text>
      <Text style={styles.textDesign2}> </Text>
      <Text style={styles.textDesign3}>Technological Institute of the Philippines</Text>
      <Text style={styles.textDesign2}>Quezon City</Text>
      <Text style={styles.textDesign2}> </Text>
      <Text style={styles.textDesign3}>Creators:</Text>
      <Text style={styles.textDesign2}>Talastas, Angelo Genesis</Text>
      <Text style={styles.textDesign2}>Labrador, Renzo</Text>
      <Text style={styles.textDesign2}>Jamero, John Luke</Text>
      <Text style={styles.textDesign2}> </Text>
      <Text style={styles.textDesign2}>BS Computer Science</Text>
      <Text style={styles.textDesign2}>CS21S2</Text>
      <Text style={styles.textDesign2}> </Text>
      <Text style={styles.textDesign3}>A Project in CS 409 - Mobile Computing</Text>
      <Text style={styles.textDesign2}> </Text>
      <Text style={styles.textDesign2}>Mr. Jerone Alimpia</Text>
      <Text style={styles.textDesign2}>Professor</Text>
    </View>
  );
}
//Drawer
function ContactScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} resizeMode="contain" source={require('./assets/Images/Catalyst.png')} imageStyle={styles.opacity}>
        <Image style={styles.brandLogo} source={require('./assets/Images/CatalystCoin.png')} />
        <Text style={styles.textDesign1}>Contact</Text>
        <View style={styles.rowView}>
          <Pressable style={styles.imageBtn} onPress={() => Alert.alert('@CatalystScheduler \n(Note: For Sample Only)')}>
            <Image style={styles.imageBtnSize} source={require('./assets/Images/Facebook.png')} />
          </Pressable>
          <Pressable style={styles.imageBtn} onPress={() => Alert.alert('catalystscheduler@gmail.com \n(Note: For Sample Only)')}>
            <Image style={styles.imageBtnSize} source={require('./assets/Images/Gmail.png')} />
          </Pressable>
          <Pressable style={styles.imageBtn} onPress={() => Alert.alert('www.CatalystScheduler.com.ph \n(Note: For Sample Only)')}>
            <Image style={styles.imageBtnSize} source={require('./assets/Images/Web.png')} />
          </Pressable>
        </View>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
        <Image style={styles.brandLogo} source={require('./assets/Images/Crystal.png')} />
      </ImageBackground>
    </View>
  );
}

/*
For Database Configuration

const UserInfo = [
  {
    Username: 'Cata User',
    Avatar: '.assets/Avatars/A1.png',
    Level: 0,
    Exp: 0,
    Coins: 0,
    Crystals: 0,
  },
];
*/

const styles = StyleSheet.create({
  //Main Container for all Screens
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffeaa7' },

  cardRounded: { width: 320, backgroundColor: 'white', marginHorizontal: 15, marginTop: 5, marginBottom: 10, borderRadius: 15 },
  cardImage: { height: 80, width: 80, borderRadius: 15, margin: 5, backgroundColor: 'red', marginHorizontal: 5, borderColor: 'black', borderWidth: 1 },

  inputTextbox: {
    margin: 5,
    width: 250,
    height: 70,
    borderColor: '#ff7675',
    borderWidth: 2,
    borderRadius: 5,
    color: '#14213d',
    padding: 15,
    fontSize: 20,
    backgroundColor: '#ecf0f1',
  },

  //Avatars Size
  avatars: { height: 100, width: 100 },
  //Unknown
  tabText: { fontSize: 40, fontWeight: 'bold' },
  //Background Image Opacity
  opacity: { opacity: 0.1 },
  //Main Background
  background: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  //AboutScreen
  brandLogo: { width: 100, height: 100, alignSelf: 'center' },
  //Catalyst Name
  textDesign1: { textAlign: 'center', color: 'red', fontSize: 30 },
  //Special Content
  textDesign2: { textAlign: 'center', color: 'blue', fontSize: 15 },
  //Special Content Bold
  textDesign3: { textAlign: 'center', color: 'blue', fontSize: 15, fontWeight: 'bold' },
  //Login Text Boxes
  textBox: { height: 50, width: '80%', padding: 10, margin: 10, borderWidth: 1, color: 'black', backgroundColor: '#dfe6e9' },
  //Login Button
  customBtn: { width: '50%', padding: 15, margin: 10, alignItems: 'center', backgroundColor: '#27ae60' },
  //Contact Image Buttons
  imageBtn: { margin: 5 },
  //Contact Image Buttons
  imageBtnSize: { height: 50, width: 50, resizeMode: 'contain' },
  //Contact Image Buttons
  rowView: { justifyContent: 'space-between', flexDirection: 'row' },
  //Sample Button Can Remove on FINAL
  spaceForButtons: { justifyContent: 'space-between', margin: 5 },
  //Todays Tasks / Section Header
  notCentered: { flex: 1, width: '100%' },
  tasksWrapper: { paddingTop: 20, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold' },
  items: { marginTop: 15 },
  //Tasks
  taskItem: { backgroundColor: 'white', padding: 15, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  taskItemLeft: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  taskSquare: { width: 24, height: 24, backgroundColor: 'red', opacity: 0.4, borderRadius: 5, marginRight: 15 },
  taskItemTitle: { fontWeight: 'bold' },
  taskCircular: { width: 12, height: 12, borderColor: 'green', borderWidth: 2, borderRadius: 5 },
  //Add Tasks Button Below
  writeTaskWrapper: { position: 'absolute', bottom: 60, width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  input: { paddingVertical: 15, paddingHorizontal: 15, backgroundColor: 'white', borderRadius: 60, borderColor: 'black', borderWidth: 1, width: 250 },
  addWrapper: { width: 60, height: 60, backgroundColor: 'white', borderRadius: 60, justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: 1 },
  addText: { fontSize: 24, fontWeight: 'bold' },
  //Quests (Not Yet Sure)
  writeQuestWrapper: { position: 'absolute', bottom: 60, width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  questItem: { backgroundColor: 'white', padding: 15, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  questSquare: { width: 24, height: 24, backgroundColor: 'red', opacity: 0.4, borderRadius: 5, marginRight: 15 },
  questItemLeft: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  questItemText: { maxWidth: '80%' },
  questCircular: { width: 12, height: 12, borderColor: 'green', borderWidth: 2, borderRadius: 5 },

  drawerDivider: { borderTopColor: 'black', borderTopWidth: 1 },
  bottomDrawerSection: { marginBottom: 10, borderTopColor: 'black', borderTopWidth: 1 },
});
