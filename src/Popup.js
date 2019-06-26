import React from "react";
import Chrome from "./utilities/chrome";

class Popup extends React.Component {
  constructor() {
    super();

    this.chrome = new Chrome();
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  async handleSaveClick() {
    window.close();    
  }

  render() {
    return (
      <div>
        <button onClick={this.handleSaveClick}>Save to Reading List</button>
      </div>
    )
  }
}

export default Popup;
