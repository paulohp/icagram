import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import InstagramLogin from 'react-native-instagram-login';

export default class LoginScreen extends Component {

  static navigationOptions = {
    title: 'Login',
  };
  
  state = {
    token: null,
    profile: {},
    posts: []
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Icagram
        </Text>
        <TouchableOpacity style={styles.login} onPress={()=> this.refs.instagramLogin.show()}>
            <Text style={{color: 'black'}}>Login with Instagram</Text>
        </TouchableOpacity>
        <InstagramLogin
            ref='instagramLogin'
            clientId='48b8d07d69a64138bde5a4278e146f91'
            redirectUrl='http://paulopires.co'
            scopes={['public_content', 'follower_list']}
            onLoginSuccess={(token) => {
              this.setState({ token });
              navigate('Posts', { token });
            }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#A3F0B2',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  login: {
    backgroundColor: '#FFF',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 20,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 5
  }
});
