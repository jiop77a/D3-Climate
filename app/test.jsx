import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';
import {getAllAgriculture} from './API_calls/api_calls.js';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state;
    this.getKeys = this.getKeys.bind(this);
  }

  componentDidMount() {
    getAllAgriculture().then(data => {
      let dats = [this.getFirst(data)];
      this.setState(dats);
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

  draw(root) {
    let data = this.state || [[]];
    data = data[0]
    console.log(data)
    let width = 800;
    let height = 400;
    let padding = 50;

    let svg = d3.select(root)
              .append('svg')
              .attr('width', width)
              .attr('height', height)

    let x_scale = d3.scaleLinear()
                  .domain([1990, 2015])
                  .range([padding, width - padding * 2])

    let y_scale = d3.scaleLinear()
                  .domain([
                    d3.min(data, d => d[4]),
                    d3.max(data, d => d[4])
                  ])
                  .range([height - padding, padding]);

    let r_scale = d3.scaleLinear()
                  .domain([d3.min(data, d => d[4]), d3.max(data, d => d[4])])
                  .range([1, 10])

    let x_axis = d3.axisBottom(x_scale)
                .tickFormat(d3.format("d"))
                .ticks(10)

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(0,' + (height - padding) + ')')
      .call(x_axis);

    let y_axis = d3.axisLeft(y_scale)
      .ticks(5);

    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', 'translate(' + padding + ', 0)')
      .call(y_axis);

    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => x_scale(d[3]))
      .attr('cy', d => y_scale(d[4]))
      .attr('r', d => r_scale(d[4]))
      .attr('fill', '#6ce428')


    return root;
  }

  render() {
    let root = new ReactFauxDOM.Element('div');
    // root = this.state ? this.draw(root) :
    root = this.draw(root);

    return (
      <div>
        <div className="alex-chart">
          {root.toReact()}
        </div>
      </div>
    )
  }
}

export default Test;
