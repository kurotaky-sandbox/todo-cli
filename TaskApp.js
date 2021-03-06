import React from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import request from 'superagent'

export default class TaskApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    };
    this.taskDestroy = this.taskDestroy.bind(this);
    this.taskUpdate = this.taskUpdate.bind(this);
  }

  loadTaskFromServer() {
    request
      .get(this.props.url)
      .end((err, res) => {
        if (err || !res.ok) {
          console.error(this.props.url, status, err.toString());
        } else {
          this.setState({data: res.body});
        }
      });
  }

  handleTaskSubmit(task) {
    var tasks = this.state.data;
    var newTasks = tasks.concat([task]);
    this.setState({data: newTasks});
    request
      .post(this.props.url)
      .send({task: task})
      .end((err, res) => {
        if (err || !res.ok) {
          console.error(this.props.url, status, err.toString());
        } else {
          this.setState({data: newTasks});
        }
      });
  }

  taskDestroy(id) {
    request
      .del(this.props.url + '/' + id)
      .end((err, res) => {
        if (err || !res.ok) {
          console.error(this.props.url, status, err.toString());
        } else {
          this.setState({data: res.body});
        }
      });
  }

  taskUpdate(task) {
    request
      .patch(this.props.url + '/' + task.task.id)
      .send(task)
      .end((err, res) => {
        if (err || !res.ok) {
          console.error(this.props.url, status, err.toString());
        } else {
          this.setState({data: res.body});
        }
      });
  }

  componentDidMount() {
    this.loadTaskFromServer();
    setInterval(this.loadTaskFromServer.bind(this), this.props.pollInterval);
  }

  render() {
    return (
      <div className="taskApp">
        <TaskForm onTaskSubmit={this.handleTaskSubmit.bind(this)} />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Content</th>
              <th>Status</th>
              <th colSpan="3"></th>
            </tr>
          </thead>
          <TaskList data={this.state.data} onTaskDestroy={this.taskDestroy} onTaskUpdate={this.taskUpdate} />
        </table>
      </div>
    );
  }
}
