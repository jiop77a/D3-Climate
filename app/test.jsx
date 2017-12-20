import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';
import {getAllAgriculture} from './API_calls/api_calls.js';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getKeys = this.getKeys.bind(this);
  }

  componentDidMount() {
    getAllAgriculture().then(data => {
      let dats = this.getFirst(data);
      this.setState(dats);
      console.log(this.state);
    })
  }

  getFirst(data) {
    let keys = Object.keys(data[0].emissionsByYear);
    let values = Object.values(data[0].emissionsByYear);

    let res = []

    for (let i = 0; i < keys.length - 1; i++) {
      res.push([data[0].key, data[0].gasType, data[0].productOf, keys[i], values[i]])
    }

    return res
  }

  getKeys(data) {
    let res = []
    data.forEach(function(dat) {
      res.push([dat.key, dat.gasType, dat.emissionsByYear])
    })
    return res
  }

  render() {
    let data = this.data;
    let root = new ReactFauxDOM.Element('div');

    let svg = d3.select(root)
              .append('svg')
              .attr('width', 800)
              .attr('height', 600)

    let x_scale = d3.scaleLinear()
                  .domain([1990, 2015])
                  .range(1990, 2015)

    let y_scale = d3.scaleLinear()
                  .domain([d3.min(data, d => d[4]), d3.max(data, d => d[4]])
                  .range(100, 300)
  //
  //   let r_scale = d3.scaleLinear()
  //                 .domain([d3.min(data, d => d.emissionsByYear), d3.max(data, d => d.emissionsByYear)])
  //                 .range([1,10])
  //
  //   let x_axis = d3.axisBottom(x_scale)
  //               .tickFormat(d3.format("d"))
  //               .ticks(10)
  //
  //
  // svg.selectAll('circle')
  //   .data(data)
  //   .enter()
  //   .append('circle')
  //   .attr('cx', d => x_scale(d.emissionsByYear.key))
  //   .attr('cy', d => y_scale(d.emissionsByYear.value))
  //   .attr('r', d => r_scale(d.emissionsByYear.value))
  //   .attr('fill', '#6ce428')
  // {root.toReact()}

    return (
      <div>
        lol
      </div>
    )
  }
}

export default Test;
