/* eslint camelcase: 0 */

import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

class CowFarts extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }


  componentDidMount() {
      this.getBeef().then(result => {
        // console.log(result);
        this.setState(result);
      });
    }


  async getBeef() {
      let agriculture = await fetch("https://young-everglades-14913.herokuapp.com/agriculture");
      let array = await agriculture.json();
      let BeefFarts = this.findEmissions(array, 'Beef Cattle', 'Enteric Fermentation');
      let DairyFarts = this.findEmissions(array, 'Dairy Cattle', 'Enteric Fermentation')
      return {BeefFarts, DairyFarts};
      };


  findEmissions(array, key, productOf) {
    for (let i = 0; i < array.length; i++) {
      let category = array[i];
      if (category.key === key
          && category.productOf === productOf) {
        return category.emissionsByYear;
        }
      }
    }

  makeData(beef, dairy) {
    let data = []
    Object.keys(beef).forEach(year => {

      data.push([parseInt(year), beef[year], dairy[year]])
    })
    return data;
  }

  makeChart(chart) {

    let {BeefFarts, DairyFarts} = this.state;
    let data = this.makeData(BeefFarts, DairyFarts);
    console.log(data);

    let chart_width     =   800;
    let chart_height    =   400;
    let padding = 50;

    //svg

    let svg = d3.select(chart)
                .append('svg')
                .attr('width', chart_width)
                .attr('height', chart_height);

    let x_scale = d3.scaleLinear()
                .domain([1990, 2015])
                .range([padding, chart_width - padding * 2]);

    let y_scale = d3.scaleLinear()
                .domain([
                  d3.min(data, d => d[2]),
                  d3.max(data, d => d[1])
                ])
                .range([chart_height - padding, padding]);

    let r_scale = d3.scaleLinear()
                .domain([
                  d3.min(data, d => d[2]),
                  d3.max(data, d => d[1])
                ])
                .range([1, 10]);

    //axis

    let x_axis = d3.axisBottom(x_scale)
                .tickFormat(d3.format("d"))
                .ticks(20);
                // .ticks(6)
                // .tickValues([0, 150, 250, 600, 700]);

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(0,' + (chart_height - padding) + ')')
      .call(x_axis);

    let y_axis = d3.axisLeft(y_scale)
      .ticks(5);
      // .tickFormat(d => d + '%')

    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', 'translate(' + padding + ', 0)')
      .call(y_axis);

    //circles
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => x_scale(d[0]))
      .attr('cy', d => y_scale(d[1]))
      .attr('r', d => r_scale(d[1]))
      .attr('fill', '#D1AB0E');

    svg.selectAll('p')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => x_scale(d[0]))
      .attr('cy', d => y_scale(d[2]))
      .attr('r', d => r_scale(d[2]))
      .attr('fill', 'green');

    return chart;
  }

  makeSpinner(chart) {
    let spinner = d3.select(chart)
                    .attr('class', 'loader')

    return chart;
  }

  render() {

    let chart = new ReactFauxDOM.Element('div');

    chart = (this.state) ? this.makeChart(chart) : this.makeSpinner(chart);

    return (

      <div>
        <h2>Here is some fancy data:</h2>
        <div className='alex-chart'>
          {chart.toReact()}
        </div>
      </div>
    );
  }
}


export default CowFarts;
