import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/homeScreen/HomeScreen';
import Gallery from '../screens/gallery/GalleryScreen';
import {COLORS, FONT, SIZES} from '../constants/theme';
import logo from '../assets/logo.png';
import ScreenHeaderLogoBtn from '../components/screenHeaderLogoBtn/ScreenHeaderLogoBtn';

const Tab = createBottomTabNavigator();

const homeName = 'Home';
const galleryName = 'Gallery';

const tabScreenOptions = ({navigation}) => {
  return {
    headerTitle: 'NASA',
    headerTitleStyle: {
      fontFamily: FONT.nasa,
    },
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: COLORS.tertiary,
    },
    headerLeft: () => {
      return (
        <ScreenHeaderLogoBtn
          iconUrl={logo}
          dimension={'100%'}
          handlePress={() => navigation.navigate(homeName)}
        />
      );
    },
  };
};

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      activeTintColor={COLORS.secondary}
      inactiveTintColor={COLORS.secondary}
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          color = focused ? COLORS.secondary : COLORS.primary;
          size = SIZES.xLarge;
          if (route.name === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === galleryName) {
            iconName = focused ? 'images' : 'images-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name={homeName} component={Home} options={tabScreenOptions} />
      <Tab.Screen
        name={galleryName}
        component={Gallery}
        options={tabScreenOptions}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
