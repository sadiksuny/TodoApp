import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import db from '../firebase';
import { Modal, List, ListItem, ListItemText, ListItemIcon, Button, ListItemSecondaryAction, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
function Todo(props) {
    const classes = useStyles();
    const [input, setInput]= useState();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
      };

 const updateTodo= () =>{
     db.collection('todos').doc(props.todo.id).set({
        todo: input
     }, {merge: true})
     setOpen(false);
 }
    return (
        
        <>
        <Modal 
         open={open}
         onClose={e=> setOpen(false)}>
          <div className={classes.paper}>
              <Typography variant="h6"> Update Todo</Typography>
               <input value={input} onChange={event =>setInput(event.target.value)}/>
               <Button variant="contained" color="primary" onClick={updateTodo}> Update Todo</Button>
              </div>     

         </Modal>

            <ListItem>
                <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                 </ListItemIcon>
                <ListItemText primary={props.todo.todo} />
                <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="Edit" onClick={e => setOpen(true)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="Delete" onClick={event => db.collection('todos').doc(props.todo.id).delete()}>
                        <DeleteIcon />
                    </IconButton>
                    
                </ListItemSecondaryAction>
            
            </ListItem>
        </>
    )
}

export default Todo
