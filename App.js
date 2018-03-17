import React from 'react';
import {StyleSheet, Text, View, Button, ScrollView, FlatList, TextInput, KeyboardAvoidingView, TouchableHighlight, Modal, Image} from 'react-native';
import {observable, extendObservable} from 'mobx';
import {observer} from 'mobx-react/native'
import { StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Badge, SearchBar, Avatar } from 'react-native-elements';


// @observer
const HomeScreen = observer(class HomeScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Home',
  //   header: ({ state }) => ({
  //       right: <Button title={"Save"} onPress={state.params.onPressLearnMore} />
  //   })
  // };

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle:  'Home',
      headerRight: (
        <Button onPress={params.onPressLearnMore || (()=>{})} title="+1" color="blue" />
      ),
    };
  };

  componentWillMount() {
     this.props.navigation.setParams({ onPressLearnMore: this.onPressLearnMore });
  }

  // @observable list = 'list'
  constructor(props){
    super(props)
    this.state = {name:'name'}
    this.onPressLearnMore = this.onPressLearnMore.bind(this)
    extendObservable(this, {
      list: 'list'
    }); 
  }

  onPressLearnMore(t) {
    this.list = 'listpressbutton'
    this.setState(function(prevState, props) {
      return {
        name: prevState.name + 'eee'
      };
    });    
  }

  render() {
    return (
      <KeyboardAvoidingView  behavior="position" style={{alignItems: 'center'}}>
          {/* <Input
            placeholder='INPUT WITH SHAKING EFFECT'
          /> */}
          <Badge
            value={3}
            textStyle={{ color: 'orange' }}
          />
          <SearchBar
            round
            placeholder='Type Here...' />
          <Button
            onPress={() => this.props.navigation.navigate('Details')}
            title="go details"
            color="blue"
            accessibilityLabel="Learn more about this purple button"/>
          <Text style={{color:'red'}}>{this.state.name}  up App.js to start working on your app!</Text>
          <Button
            onPress={()=>this.onPressLearnMore('t')}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"/>
    
          <Text style={{color:'blue'}}> {this.list} </Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <KeyboardAvoidingView  behavior="position" style={{alignItems: 'center'}}>
            <TextInput
              style={{width:100, height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
         </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    );
  }
})

// @observer
const DetailsScreen = observer(class DetailsScreen extends React.Component {
  
  // @observable list = 'list'
  constructor(props){
    super(props)
    extendObservable(this, {
      list: 'list',
      modalVisible: false
    }); 
  }
  
  onPressLearnMore(t) {
    this.list = 'detailspressbutton' 
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.modalVisible=false;
                }}>
                <Text style={{backgroundColor:'tomato', padding:5}}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.modalVisible=true;
          }}>
          <Text style={{backgroundColor:'tomato', padding:5}}>Show Modal</Text>
        </TouchableHighlight>

        <Button
            title="Go to Details... again"
            onPress={() => this.props.navigation.navigate('Details')} />
        <Text>Details Screen</Text>
        <Button
            onPress={()=> this.onPressLearnMore('t')}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"/>
        <Text style={{color:'blue'}}> {this.list} </Text>
      </View>
    );
  }
})

// @observer
const MineScreen = observer(class MineScreen extends React.Component {
  // @observable list = [
  //   {key: 'Devin'},
  //   {key: 'Jackson'},
  //   {key: 'James'},
  //   {key: 'Joel'},
  //   {key: 'John'},
  //   {key: 'Jillian'},
  //   {key: 'Jimmy'},
  //   {key: 'Julie'}
  // ]

  ls = [
    {key: 'Devin'},
    {key: 'Jackson'},
    {key: 'James'},
    {key: 'Joel'},
    {key: 'John'},
    {key: 'Jillian'},
    {key: 'Jimmy'},
    {key: 'Julie'}
  ]

  constructor(props){
    super(props)
    this.loadMore = this.loadMore.bind(this)
    this.refresh = this.refresh.bind(this)
    extendObservable(this, {
      list: [
        {key: 'Devin'},
        {key: 'Jackson'},
        {key: 'James'},
        {key: 'Joel'},
        {key: 'John'},
        {key: 'Jillian'},
        {key: 'Jimmy'},
        {key: 'Julie'}
      ]
    }); 
  }
  loadMore(){
    console.log('loading'); 
    this.list = this.list.concat(this.ls)
  }
  refreshing = false
  refresh(){
    this.refreshing = true
    this.list = this.ls
    this.refreshing = false
    
  }
  render() {
    return (
      <View>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}/>
        <ScrollView>
          <Text>Details Screen</Text>
          <Text>Details Screen</Text>
          <Text>Details Screen</Text>
          <Text>Details Screen</Text>
        </ScrollView>
        <FlatList
          data={this.list}
          renderItem={({item,index}) => <Text style={styles.item} key={index}>{item.key}</Text>}
          keyExtractor={(item, index) => index.toString()} 
          onEndReachedThreshold={0.5}
          onEndReached={this.loadMore}
          refreshing={this.refreshing}
          onRefresh={this.refresh}
        />
      </View>
    );
  }
})

const TweetListScreen = observer(class TweetListScreen extends  React.Component{
 list = [
    {
      name: '聪聪',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      images: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      tweet: '评论里留下你的〖生日和所在地〗。看到有缘的就找ta聊聊呗！遇到同一天生日的，互粉一个，以后过生日就不孤单啦！'
    },
    {
      name: '慕小白',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      images: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      tweet: '说一件你经历的，最幸运爆棚的事！！！让我们沾沾喜气！出生前追上卵子那次不算 ​​​ ​​​​'
    },
    {
      name: '龙仔',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
      images: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
      tweet: '低潮时没有，但生死悠关时有一句话很给力，13年出车祸的那天，我被120送到医院，快失去意识的时候，我感觉我的眼睛像虚焦的镜头一样，什么都是模糊的，能看的稍微清楚点的以及现在唯一能记在脑海里的就是医生和护士的白大褂。然后模糊的听见一句话，不知道是谁说的“赶紧的吧！你妈买彩票中奖了！” '
    },
    {
      name: '妻弄',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
      images: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
      tweet: '以前我很怕得罪人，不敢迟到，不敢要求，不敢说错话，怕冷场，怕对方不高兴，诚惶诚恐的面对所有人。遗憾的是，我并没有得到相应的尊重。后来，我开始宠爱和迁就自己，你迟到我先走，不想做绝不勉强，冷场就玩手机，多顾个人感受，其他人关我屁事。然后发现，我不但被重视，而且更开心了。——易术 '
    }
  ]

  constructor(props){
    super(props)
    this.loadMore = this.loadMore.bind(this)
    this.refresh = this.refresh.bind(this)
    extendObservable(this,{
      tweets: this.list
    })
  }
  loadMore(){
    // console.log('loading'); 
    this.tweets = this.tweets.concat(this.list)
  }
  refreshing = false
  refresh(){
    this.refreshing = true
    this.tweets = this.list
    this.refreshing = false
    
  }

  render(){
    return (
      <View style={{padding:5}}>
         <FlatList
          data={this.tweets}
          renderItem={({item,index}) => 
            <View key={index} style={{paddingBottom:8}}>
              <View style={{flexDirection:'row',paddingBottom:5}}>
                <View style={{flex:1}}>
                  <Avatar
                    small
                    rounded
                    source={{uri: item.avatar_url}}
                    activeOpacity={0.7}
                  />
                </View>
                <View style={{flex:6}}>
                  <Text>{item.name}</Text>
                  <Text style={{fontSize:12,paddingTop:5}}>2-16</Text>
                </View>
              </View>
              <View style={{paddingTop:5, paddingBottom:10}}>
                <Text style={{lineHeight: 18}}>{item.tweet}</Text>
              </View>
              <View style={{flexDirection:'row',  padding:8, justifyContent:'space-around', borderTopColor:'lightgrey', borderTopWidth:0.5, borderBottomColor:'lightgrey', borderBottomWidth:10}}>
                <Icon name='retweet' color='grey' />
                <Icon name='comment' color='grey' />
                <Icon name='thumbs-o-up' color='grey' />
              </View>
            </View>}
          keyExtractor={(item, index) => index.toString()} 
          onEndReachedThreshold={0.5}
          onEndReached={this.loadMore}
          refreshing={this.refreshing}
          onRefresh={this.refresh}
        />
      </View>
    )
  }

})

const HomeStack = StackNavigator({
  Home: { screen: TweetListScreen },
  Details: { screen: DetailsScreen, 
    navigationOptions: {
      title: '设备总览',
      gesturesEnabled: false,
      tabBarVisible: false
    } 
  },
});

const MineStack = StackNavigator({
  Mine: { screen: MineScreen },
  Details: { screen: DetailsScreen },
});

export default TabNavigator(
  {
    首页: { 
      screen: HomeStack,
      path: '/home',
      navigationOptions: ({ navigation }) => ({
        // tabBarLabel: 'Home',
        tabBarIcon: ({ focused, tintColor }) => {
          return <Image style={{width:27,height:23,position:'relative',right:1}} source={focused?(require('./img/home-on.png')):(require('./img/home-off.png'))} />  
        }
      }),
    },
    我的: { 
      screen: MineStack,
      path: '/mine',
      navigationOptions: ({ navigation }) => ({
        // tabBarLabel: 'Mine',
        tabBarIcon: ({ focused, tintColor }) => {
          return <Image style={{width:27,height:23,position:'relative',right:1}} source={focused?(require('./img/mine-on.png')):(require('./img/mine-off.png'))} />
        }
      }),
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
  }
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

