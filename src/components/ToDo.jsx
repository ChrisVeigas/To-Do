import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTasks } from "../context/TaskContext";
import { Link } from "react-router-dom";

function ToDo() {

  const { tasks } = useTasks();
  const MotionLink = motion(Link);


  return (
    <Box
      component={motion.div}
      sx={{
        maxHeight: 500,
        overflow: "auto",
        maxWidth: 400,
        margin: "auto",
        marginTop: 10,
        "&:hover": { boxShadow: 3 },
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      <Card sx={{ elevation: 0, backgroundColor: "#E9F1EF", mb: 1 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            color="#3C5556"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            To-Do List
          </Typography>

          <Typography variant="body2" color="#3C5556" sx={{ mb: 2 }}>
            Manage your tasks efficiently.
          </Typography>

          <List>
            {tasks.length === 0 ? (
              <Typography
                variant="body2"
                color="#3C5556"
                sx={{ fontStyle: "italic" }}
              >
                No tasks yet. Add one!
              </Typography>
            ) : (
              tasks.map((task, index) => (
                <ListItem key={index} sx={{ borderBottom: "1px solid #ccc" }}>
                  <ListItemText
                    primary={task.title}
                    secondary={task.description}
                  />
                </ListItem>
              ))
            )}
          </List>

          <CardActions sx={{ justifyContent: "space-between", mt: 2 }}>
            <MotionLink
              to="/add"
              className="text-[#70056B] hover:text-[#70056B] font-medium bg-[#eee6ee] px-3 py-1 rounded-md shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Add Task
            </MotionLink>

            <MotionLink
              to="/edit"
              className="text-[#70056B] hover:text-[#70056B] font-medium bg-[#eee6ee] px-3 py-1 rounded-md shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Edit Task
            </MotionLink>

            <MotionLink
              to="/delete"
              className="text-[#70056B] hover:text-[#70056B] font-medium bg-[#eee6ee] px-3 py-1 rounded-md shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Delete Task
            </MotionLink>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ToDo;
