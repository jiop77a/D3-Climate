import React, { Component } from 'react';
import CowFarts from './cow_farts.js';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>

        <div>React Application!</div>
        <CowFarts />
      </div>
    );
  }
}

export default Main;
