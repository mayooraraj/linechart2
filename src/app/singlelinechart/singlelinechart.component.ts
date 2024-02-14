import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-singlelinechart',
  templateUrl: './singlelinechart.component.html',
  styleUrls: ['./singlelinechart.component.scss']
})
export class SinglelinechartComponent implements OnInit{
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.createLineChart();
  }

  createLineChart(): void {
    // set dimensions and margins for the chart
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 200 - margin.left - margin.right;
    const height = 120 - margin.top - margin.bottom;

    // set up x and y scales
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    // create svg and append it to the chart container
    const svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      //Sets the width & height attribute of the SVG element
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);

    // create fake data set
    const dataset: { month: Date; value: number }[]  = [
      { month: new Date('2023-09-01'), value: 25 },
      { month: new Date('2023-10-01'), value: 15 },
      { month: new Date('2023-11-01'), value: 20 },
      { month: new Date('2023-12-01'), value: 14 },
    ];

    // define the x and y domains
    x.domain(d3.extent(dataset, (d) => d.month) as [Date, Date]);
    y.domain([0,d3.max(dataset, d => d.value) as number]);

   // add x axis
     svg.append('g')
       .attr('transform', `translate(0,${height})`) // move x axis to bottom
       .call(d3.axisBottom(x)
         .tickValues(dataset.map(d => d.month))
          .tickFormat((date: any) => d3.timeFormat('%b')(date as Date))
           .tickSize(0))
        .selectAll('text')
        .style('font-size','10px') 
        .style('color','#555555') 
        .style('font-weight','400')
       
    //add y axis
    svg.append("g")
     .call(d3.axisLeft(y)
      .tickSize(0))
      .selectAll('.tick text')
      .style('display','none')
     
    // Hide x and y axis lines
    svg.selectAll('.domain')
    .style('display', 'none');
               
    //create the line generator
     const line= d3.line<{ month: Date; value: number }>()
      .x( d => x(d.month))
      .y(d => y(d.value));

    // create a linear gradient for the area fill
    const gradient = svg.append("defs")
    .append("linearGradient")
    .attr("id", "areaGradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%");

  // add the gradient stops
  gradient.append("stop")
    .attr("offset", "53%")
    .attr("stop-color", "#003B6D");
  
  gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#F3FAFF");

  // fill the area under the line chart with the gradient
  svg.append('path')
    .datum(dataset)
    .attr("fill", "url(#areaGradient)")
    .attr("opacity", 0.3)
    .attr("d", d3.area<{ month: Date; value: number }>()
      .x(d => x(d.month))
      .y0(height)
      .y1(d => y(d.value))
    );

   //add the line path to the svg element
    svg.append('path')
      .datum(dataset)
      .attr("fill","none")
      .attr("stroke","#003B6D")
      .attr("stroke-width",1)
      .attr("d",line); 
    
  //circle markers
  svg.selectAll("circle1")
    .data(dataset) 
    .enter()         
    .append("circle")  
    .attr("cx", d => x(d.month)) 
    .attr("cy", d => y(d.value))
    .attr("r", 4) 
    .attr("fill", "#003B6D")
    .attr("stroke", "#003B6D");

  
 
}
}
