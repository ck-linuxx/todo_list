import { Grid2, Typography } from "@mui/material"
import ListComponent from "./components/listTasks"
import { AddTask } from "./components/addTask";


export default function App() {

  return (    
      <Grid2
        container
        spacing={0}
        direction={"column"}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', minWidth: "100vw"}}
      >
        <Typography sx={{ fontSize: 24 }}>Task List</Typography>
        <ListComponent />
        <AddTask />
      </Grid2>
  )
}
