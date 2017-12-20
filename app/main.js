import React, { Component } from 'react';
import CowFarts from './cow_farts.js';
import Test from './test.jsx';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>

        <div>React Application!</div>
        <Test />
        <CowFarts />
      </div>
    );
  }
}

export default Main;
