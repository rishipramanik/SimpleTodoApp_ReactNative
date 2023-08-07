import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTodo,
  checkTodo,
  deleteTodo,
  loadTodo,
} from '../store/slices/todoSlice';
import {RootState, Todo} from '../store';

function App(): JSX.Element {
  const [todoText, setTodoText] = useState('');
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.todos);

  const deleteIcon = <Icon name="trash-outline" size={25} color="#900" />;

  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  //Add New Todo
  const handleAddTodo = () => {
    if (todoText.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: todoText,
        completed: false,
      };
      dispatch(addTodo(newTodo));
      setTodoText('');
    } else {
      Snackbar.show({
        text: 'Add charachters to create todo',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#50C878',
        textColor: '#000',
      });
    }
  };

  //Mark todo as checked
  const handleCheckTodo = (id: number) => {
    dispatch(checkTodo(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  //getching data from localstorage
  useEffect(() => {
    const getData = async () => {
      try {
        const savedTodos = await AsyncStorage.getItem('savedData');
        if (savedTodos) {
          const updatedList: Todo[] = JSON.parse(savedTodos);
          dispatch(loadTodo(updatedList));
        }
      } catch (e) {
        Snackbar.show({
          text: `Error loading data, ${e}`,
          backgroundColor: '#50C878',
          textColor: '#000',
        });
      }
    };
    getData();
  }, []);

  //saving data to localstorage
  useEffect(() => {
    const storeData = async () => {
      try {
        await AsyncStorage.setItem('savedData', JSON.stringify(data));
      } catch (e) {
        Snackbar.show({
          text: `Error saving data, ${e}`,
          backgroundColor: '#50C878',
          textColor: '#000',
        });
      }
    };
    storeData();
  }, [data]);

  //FlatList renderItem component
  const renderItem = ({item}: {item: Todo}) => {
    return (
      <View style={styles.listView}>
        <TouchableOpacity
          key={item.id}
          style={[
            styles.listContainer,
            item.completed ? styles.checkItem : styles.uncheckItem,
          ]}
          onPress={() => handleCheckTodo(item.id)}>
          <Text
            style={[
              styles.todoText,
              item.completed ? styles.completed : styles.incomplete,
            ]}>
            {item.text}
          </Text>
        </TouchableOpacity>
        <View style={styles.delete}>
          <Pressable onPress={() => handleDelete(item.id)}>
            {deleteIcon}
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text
          style={[
            styles.headingTxt,
            isDarkTheme ? {color: '#FFF'} : {color: '#000'},
          ]}>
          add {'\n'}todos..
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter a todo..."
        value={todoText}
        onChangeText={setTodoText}
      />
      <Button onPress={handleAddTodo} title="+Add To List" color="#FF5733" />
      {data.length >= 1 && (
        <View style={styles.desc}>
          <Text style={styles.descText}>
            Tap item to mark as complete/incomplete
          </Text>
        </View>
      )}
      <FlatList
        // style={styles.list}
        data={data}
        // inverted
        keyExtractor={item => item?.id?.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  head: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headingTxt: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
  desc: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  descText: {},
  listContainer: {
    minHeight: 40,
    marginTop: 8,
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderRadius: 8,
    width: '90%',
  },
  checkItem: {
    backgroundColor: '#353935',
  },
  uncheckItem: {
    backgroundColor: '#50C878',
  },
  list: {
    // flex: 1,
    // height: 'auto',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  listView: {
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  delete: {
    // minHeight: 40,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  todoText: {
    fontSize: 18,
    color: '#000',
    marginHorizontal: 10,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#AEB6BF',
  },
  incomplete: {},
});

export default App;
