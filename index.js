import { Navigation } from 'react-native-navigation';
import { DatabaseInit } from './App/Modules/Database';
import { registerScreens } from './App/Config/Screens';

DatabaseInit();
registerScreens(); // this is where you register all of your app's screens

// start the app
Navigation.startSingleScreenApp({
  screen: {
    screen: 'Login',
    navigatorStyle: {
      navBarHidden: true,
    },
    appStyle: {
     navBarTextColor:"#c49a6c",
   },
    navigatorButtons: {}
  },
  passProps: {},
  animationType: 'slide-down'
});
