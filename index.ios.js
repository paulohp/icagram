import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginScreen from './src/LoginScreen';
import PostsScreen from './src/PostsScreen';

const Icagram = StackNavigator({
    Login: { screen: LoginScreen },
    Posts: { screen: PostsScreen },
});

AppRegistry.registerComponent('icagram', () => Icagram);
