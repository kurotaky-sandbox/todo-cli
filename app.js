import React from "react";
import ReactDOM from "react-dom";
import TaskApp from "./TaskApp";

ReactDOM.render(
  <TaskApp url="http://localhost:3000/tasks" pollInterval={2000}/>,
  document.getElementById("task")
);
