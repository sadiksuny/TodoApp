import React, { useState, useEffect } from 'react';
import Todo from './components/Todo'
import { List,Button, FormControl, Input, InputLabel, AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import  db from './firebase';
import firebase from 'firebase';

const useStyles = makeStyles({
  toolbar: {
      textAlign: "center",
      height: 80
  },
  heading: {
      margin: "auto"
  }
});

function App() {


  const [todos, setTodos]= useState([]);
  const [input, setInput]= useState('');
  const classes = useStyles();

  useEffect(()=>{
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})));
    })
  }, [])


  //This function adds the todo to the database
  const addTodo= (event)=>{
    event.preventDefault(); // this will stop the default refreshing
    
    //Adding the todo to the database
    db.collection('todos').add({
      todo:input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    
    setInput('');
  }
  return (
    //JSX
    <div className="App">
     <AppBar position="static"> 
     <Toolbar className={classes.toolbar}>
      <Typography className={classes.heading} variant="h5" align="center"> Todo app</Typography>
     </Toolbar>
     </AppBar>
     <FormControl>
       <InputLabel>Type a new todo</InputLabel>
     <Input value={input} onChange={event => setInput(event.target.value)}/>
     <Button disabled={!input} type="submit" variant="contained" color="primary" onClick={addTodo}> Add todo</Button>
     </FormControl>
     
    <List>
      
     {todos.map(todo =>(
      <Todo todo={todo}/>
     ))}

    </List>

    </div>
  );
}

export default App;
