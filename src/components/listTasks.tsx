import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useEffect, useState } from 'react';
import { Task } from './task';
import axios from 'axios';

interface ITasks {
  description: string
  id: string
  done: boolean
}

//Função destinada a listagem de tarefas do banco de dados
export default function ListTasks() {

  const [tasks, setTasks] = useState<ITasks[]>([])

  useEffect(() => {
    axios.get<ITasks[]>("http://localhost:3000/tasks")
      .then((response) => {
        setTasks(response.data)
      })
  }, [tasks])
  
  return (
    <List sx={{ width: '100%', maxWidth: 360, 
      bgcolor: 'background.paper' }}>
      {tasks.map((task) => {

        return (
          <ListItem
            key={task.id}
          >
            <Task
              description={task.description}   
              checked={task.done}
              taskId={task.id}
            />
          </ListItem>
        );
      })}
    </List>
  );
}