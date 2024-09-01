import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid"
import { Add } from "@mui/icons-material";
import { Button, Fab, Grid2, TextField } from "@mui/material";
import axios from "axios";

interface ITasks {
  description: string
  id: string
  done: boolean
}

//Função destinada a adicionar tasks no banco de dados
export function AddTask() {
  const [ addMode, setAddMode ] = useState(false)
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/tasks")
      .then((response) => setTasks(response.data.tasksFromServer));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if(todoInput === "") setAddMode(!addMode)
    else {
      setAddMode(!addMode)
      setTodoInput("")

      axios.post("http://localhost:3000/tasks", {
        id: uuid(),
        description: todoInput,
        done: false
      })
        .then(({data}) => {
          setTasks([...tasks, data]);
          setTodoInput("");
        });
    }
  }


  return (
    (!addMode) ?
      (
          <Fab color="primary" aria-label="add" 
          onClick={() => setAddMode(!addMode)}>
          <Add />
        </Fab>
      ): 
      (
        <Grid2 
            container
            spacing={4}
            direction={"row"}
            alignItems="center"
            justifyContent="center"
        >
          <TextField 
            id="outlined-basic" 
            label="New task" 
            variant="outlined" 
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <Button type="submit" 
            onClick={handleSubmit}
            variant="contained"
          >
            Submit
          </Button>
        </Grid2>
      )
  )
}