import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  CameraRoll,
} from 'react-native';

export default class PostsScreen extends React.Component {
  static navigationOptions = {
    title: 'Posts',
  };

  state = { 
    profile: {},
    posts: []
  };

  componentWillMount() {
    const { params } = this.props.navigation.state;

    fetch(`https://api.instagram.com/v1/users/self/?access_token=${params.token}`)
      .then(response => response.json())
      .then(({ data }) => this.setState({ profile: data }));

    fetch(`https://api.instagram.com/v1/users/self/media/recent/?count=1000&access_token=${params.token}`)
      .then(response => response.json())
      .then(({data}) => this.setState({posts: data}))
  }

  getPhotos() {
    CameraRoll.getPhotos({ first: 20, assetType: 'All' })
      .then(res => {
        console.log(res.edges);
      })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Image style={styles.image} source={{uri: this.state.profile.profile_picture}} />
          <Text>@{this.state.profile.username}</Text>
        </View>
        <FlatList
          data={this.state.posts}
          numColumns={3}
          contentContainerStyle={styles.posts}
          renderItem={({item}) => <Image style={{width: 125, height: 125, alignItems: 'center',}} source={{uri: item.images.thumbnail.url}} />}
        />
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => this.getPhotos()}>
            <Text>Adicionar</Text>
          </TouchableOpacity>
          <View style={{borderWidth: 0.5, borderColor: '#888', height: 30}} />
          <TouchableOpacity>
            <Text>Agendados</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    paddingTop: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  posts: {},
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
    marginBottom: 10
  },
  footer: {
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
 }
});
