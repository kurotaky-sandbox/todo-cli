import React from "react";
import ReactDOM from "react-dom";

export default class TaskForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    var content = ReactDOM.findDOMNode(this.refs.content).value.trim();
    if (!content) {
      return;
    }
    this.props.onTaskSubmit({task: {content: content, status: 'todo'}});
    ReactDOM.findDOMNode(this.refs.content).value = '';
    return;
  }

  render() {
    return (
      <form className="todoForm" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="ToDo" ref="content" />
        </div>
        <input type="submit" className="btn btn-primary" value="登録" />
      </form>
    );
  }
}
