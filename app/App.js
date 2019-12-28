/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Formik } from 'formik';
import 'react-native-gesture-handler';

import React, { Component } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Button,
  FlatList,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const BooklistArr = [
                      {
                        id: 1,
                        title: 'Harry Potter and the Goblet of Fire',
                        author: 'J. K. Rowling',
                        thumbnail: 'https://covers.openlibrary.org/w/id/7984916-M.jpg'
                      },
                      {
                        id: 2,
                        title: 'The Hobbit',
                        author: 'J. R. R. Tolkien',
                        thumbnail: 'https://covers.openlibrary.org/w/id/6979861-M.jpg'
                      },
                      {
                        id: 3,
                        title: '1984',
                        author: 'George Orwell',
                        thumbnail: 'https://covers.openlibrary.org/w/id/7222246-M.jpg'
                      }
                    ]
                
class Bookcase extends React.Component {
  state = {Booklist: BooklistArr};

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          data={this.state.Booklist}
          renderItem={({item}) => 
                      <Button 
                        key={item.id} 
                        title={item.title}
                        onPress={()=>{
                          this.props.navigation.push('Details', {
                            itemUrl: item.thumbnail,
                            itemId: item.id,
                            itemTitle: item.title,
                            itemAuthor: item.author
                          })
                        }}
                        />
              }
          keyExtractor={item => item.id}
        />
        
      </View>
    );
  }
}

class AddBook extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Formik
          initialValues={{ title: '' , author: '', thumbnail: '', id: 0}}
          onSubmit={function(values){
                      BooklistArr.push({title: values.title,
                                        author: values.author,
                                        thumbnail: values.thumbnail,
                                        id: Math.floor(Math.random() * 1000)+1});
                      navigation.navigate('Home');
                    }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <Text>Add Form</Text>
              <Text>Title</Text>
              <TextInput
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />
              <Text>Author</Text>
              <TextInput
                onChangeText={handleChange('author')}
                onBlur={handleBlur('author')}
                value={values.author}
              />
              <Text>Thumbnail</Text>
              <TextInput
                onChangeText={handleChange('thumbnail')}
                onBlur={handleBlur('thumbnail')}
                value={values.thumbnail}
              />
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

class Profile extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Image source={{uri: navigation.getParam('itemUrl', 'https://www.searchenginewatch.com/wp-content/uploads/sites/25/cnt-import/sew/IMG/083/172083/google-404-error-png.png')}}
          style={{width: 400, height: 400}} />
        <Text>
          Id: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))}
        </Text>
        <Text>
          Title:
          {JSON.stringify(navigation.getParam('itemTitle', 'No Title'))}
        </Text>
        <Text>
          Author:
          {JSON.stringify(navigation.getParam('itemAuthor', 'No Author'))}
        </Text>
      </View>
    );
  }
}

const BooklistStack = createStackNavigator({
  Home: Bookcase,
  Details: DetailsScreen
});

const TabNavigator = createBottomTabNavigator({
  Home: BooklistStack,
  'Add Book': AddBook,
  Profile: Profile
});

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
