import React from 'react';
import {StyleSheet, Text, View, Button, ScrollView, FlatList, TextInput, KeyboardAvoidingView, TouchableHighlight, Modal} from 'react-native';
import {observable, extendObservable} from 'mobx';
import {observer} from 'mobx-react/native'
import { StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Badge, SearchBar } from 'react-native-elements';

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
          keyExtractor={(item, index) => index} 
          onEndReachedThreshold={0.5}
          onEndReached={this.loadMore}
          refreshing={this.refreshing}
          onRefresh={this.refresh}
        />
      </View>
    );
  }
})

const HomeStack = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen, 
    navigationOptions: {
      title: '设备总览',
      gesturesEnabled: false,
      tabBarVisible: false
  } },
});

const MineStack = StackNavigator({
  Mine: { screen: MineScreen },
  Details: { screen: DetailsScreen },
});

export default TabNavigator(
  {
    首页: { screen: HomeStack },
    我的: { screen: MineStack },
  },
  {
    /* Other configuration remains unchanged */
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === '首页') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === '我的') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }
        // You can return any component that you like here! We usually use an
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
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

