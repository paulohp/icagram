import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableOpacity,
  CameraRoll,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');
export default class PostsScreen extends React.Component {
  static navigationOptions = {
    title: 'Posts',
    headerLeft: null
  };

  state = {
    ds: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }), 
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
    const { navigate } = this.props.navigation;
    CameraRoll.getPhotos({ first: 20, assetType: 'All' })
      .then(res => {
        navigate('SelectPhoto', {photoArray: res.edges})
      })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Image style={styles.image} source={{uri: this.state.profile.profile_picture}} />
          <Text>@{this.state.profile.username}</Text>
        </View>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.ds.cloneWithRows(this.state.posts)}
          renderRow={(rowData) => <Image style={{width: width / 3, height: width / 3, alignItems: 'center',}} source={{uri: rowData.images.thumbnail.url}} />}
          enableEmptySections={true}
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
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
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
