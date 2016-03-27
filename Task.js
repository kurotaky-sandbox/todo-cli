import React from "react";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDestroy(e) {
    e.preventDefault();
    this.props.onTaskDestroy(this.props.id);
  }

  render() {
    return (
      <tr key={this.props.id}>
        <td>
          {this.props.content}
        </td>
        <td>
          {this.props.status}
        </td>
        <td>
          <button onClick={this.handleDestroy}>destroy</button>
        </td>
      </tr>
    );
  }
}
