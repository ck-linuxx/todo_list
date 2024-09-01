import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Grid2, TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button } from '@mui/material';

type IProps = {
  description: string,
  checked: boolean, 
  taskId: string,
}

interface ITasks {
  description: string
  id: string
  done: boolean
}

//Função destinada a interface da aplicação
export function Task({ description, checked, taskId }: IProps) {

  const [done, setDone] = useState(checked)
  const [edit, setEdit] = useState(false)
  const [desc, setDesc] = useState("")
  const [todoInput, setTodoInput] = useState(description);
  const [tasks, setTasks] = useState<ITasks[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/tasks")
      .then((response) => setTasks(response.data.tasksFromServer));
  }, []);

  //Função destinada a definir a task como concluida
  function toggleChecked(e) {
    e.preventDefault()

    setDone(!done)

    axios.patch(`http://localhost:3000/tasks/${taskId}`,{
      done
    })
  }

  //Função destinada a remove a task do banco de dados
  function remove() {
    axios.delete(`http://localhost:3000/tasks/${taskId}`) 
  }

  //Função destinada a alteração da task
  function patchDescription(e) {
    e.preventDefault()

    if(todoInput === "") {
      setEdit(!edit)
    }
    else {
    setDesc(todoInput)
    
    axios.patch(`http://localhost:3000/tasks/${taskId}`,{
      description: todoInput
    })
    setEdit(!edit)
    }
  }

  return (
    (!edit ? 
      <>
      <Grid2
        container
        spacing={5}
        direction={"row"}
        alignItems="center"
        justifyContent="space-between"
        sx={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <ListItemButton dense>
          <ListItemIcon>
            <Checkbox
              onClick={toggleChecked}
              edge="start"
              checked={checked}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText 
            primary={description} 
          />
        </ListItemButton>
      </Grid2>
      <Button onClick={() => setEdit(!edit)}>
        <ModeEditIcon color="action" />
      </Button>
      <IconButton onClick={remove} edge="end" aria-label="delete">
        <DeleteIcon />
    </IconButton>
    </> : 
      <Grid2 
      container
      sx={{ flex: 1, justifyContent: "space-between" }}
      direction={"row"}
      alignItems="center"
      justifyContent="center"
    >
      <TextField 
        id="outlined-basic" 
        label="Edit Task" 
        variant="outlined" 
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <Button type="submit" 
        onClick={patchDescription}
        variant="contained"
      >
        Submit
      </Button>
    </Grid2>
    )
)}