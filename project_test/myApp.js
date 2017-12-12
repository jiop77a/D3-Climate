/* eslint camelcase: 0 */
/* globals d3 */

let data = [
  [1990, 119.1, 39.4],
  [1991, 119.7, 39],
  [1992, 125, 38.5],
  [1993, 127.7, 38.2],
  [1994, 131.3, 37.6],
  [1995, 135.5, 37.5],
  [1996, 134.8, 37],
  [1997, 131.5, 36.9],
  [1998, 129.8, 36.6],
  [1999, 129, 37.6],
  [2000, 126.7, 38],
  [2001, 125.9, 37.7],
  [2002, 126, 37.8],
  [2003, 126, 38],
  [2004, 123.9, 36.9],
  [2005, 125.2, 37.6],
  [2006, 127, 38.4],
  [2007, 128.1, 40],
  [2008, 126.9, 40.6],
  [2009, 125.8, 41],
  [2010, 124.6, 40.7],
  [2011, 121.8, 41.1],
  [2012, 119.1, 41.7],
  [2013, 118, 41.6],
  [2014, 116.5, 42],
  [2015, 118.1, 42.6]
];


let chart_width     =   800;
let chart_height    =   400;
let padding = 50;

//svg
let svg = d3.select("#chart")
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
