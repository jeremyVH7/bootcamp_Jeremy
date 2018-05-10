// line chart component
let lineChart = Vue.component('line-chart', {
  data: function () {
    return {
      count: 0
    }
  },  
  methods: {
    buildLine: function (lineData) {      
      var lineChart = echarts.init(document.getElementById('chart_div'));                  
      
      option = {
        title: {
          text: lineData['titleText']
        },
        tooltip: {
          axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
              type: 'dashed',
              width: 1
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: lineData['labels'],
          show: false
        },
        yAxis: {
          type: 'value',
          name: lineData['yname'],
          nameLocation: 'end'
        },
        series: [{
          // options for smoothing line and area fill below
          smooth: true,
          areaStyle: {},
          ///////
          symbolSize: 10,
          showAllSymbol: true,
          data: lineData['values'],
          color: '#0055FF',
          type: 'line'
        }]
      };
      lineChart.setOption(option, true);
   }
  },
  template: `  
  <div>

  </div>  
  `
})
