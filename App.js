import React from 'react';
import {StyleSheet, Text, View, Button, ScrollView, FlatList} from 'react-native';
import {observable, extendObservable} from 'mobx';
import {observer} from 'mobx-react/native'
import { StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
      <View style={styles.container}>

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
      </View>
    );
  }
})

// @observer
const DetailsScreen = observer(class DetailsScreen extends React.Component {
  
  // @observable list = 'list'
  constructor(props){
    super(props)
    extendObservable(this, {
      list: 'list'
    }); 
  }
  
  onPressLearnMore(t) {
    this.list = 'detailspressbutton' 
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
const SettingsScreen = observer(class SettingsScreen extends React.Component {
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
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
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

const SettingsStack = StackNavigator({
  Settings: { screen: SettingsScreen },
  Details: { screen: DetailsScreen },
});

export default TabNavigator(
  {
    Home: { screen: HomeStack },
    Settings: { screen: SettingsStack },
  },
  {
    /* Other configuration remains unchanged */
    // navigationOptions: ({ navigation }) => ({
    //   tabBarIcon: ({ focused, tintColor }) => {
    //     const { routeName } = navigation.state;
    //     let iconName;
    //     if (routeName === 'Home') {
    //       iconName = `ios-information-circle${focused ? '' : '-outline'}`;
    //     } else if (routeName === 'Settings') {
    //       iconName = `ios-options${focused ? '' : '-outline'}`;
    //     }
    //     // You can return any component that you like here! We usually use an
    //     return <Ionicons name={iconName} size={25} color={tintColor} />;
    //   },
    // }),
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

