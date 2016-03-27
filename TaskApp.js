import React from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import $ from 'jquery'

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
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(result) {
        this.setState({data: result});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  handleTaskSubmit(task) {
    var tasks = this.state.data;
    var newTasks = tasks.concat([task]);
    this.setState({data: newTasks});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: task,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  taskDestroy(id) {
    $.ajax({
      url: this.props.url + '/' + id,
      dataType: 'json',
      type: 'DELETE',
      data: id,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  taskUpdate(task) {
    console.log(task);
    $.ajax({
      url: this.props.url + '/' + task.task.id,
      dataType: 'json',
      type: 'PATCH',
      data: task,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
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
