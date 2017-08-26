import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginScreen from './src/LoginScreen';
import PostsScreen from './src/PostsScreen';
import ViewPhotosScreen from './src/ViewPhotosScreen';

const Icagram = StackNavigator({
    Login: { screen: LoginScreen },
    Posts: { screen: PostsScreen },
    SelectPhoto: { screen: ViewPhotosScreen }
});

AppRegistry.registerComponent('icagram', () => Icagram);
