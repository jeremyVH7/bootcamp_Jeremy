// scatter chart component
let scatterChart = Vue.component('scatter-chart', {
  data: function () {
    return {
      count: 0
    }
  },  
  methods: {
    buildScatter: function (chartData) {      
      var scatterChart = echarts.init(document.getElementById('chart_div'));      
      var scatterPub = document.getElementById("publishers");
      var scatterSelected = chartData[0];
      var scatter_data = chartData[1];
      
      option = {
        title: {
          text: chartData[2]
        },
        xAxis: {
          name: chartData[3],
          nameLocation: 'end'
        },
        yAxis: {
          name: chartData[4],
          nameLocation: 'end'
        },
        tooltip: {
          showDelay: 0,
          formatter: function (params) {
            if (params.value.length > 1) {
              return params.value[2] + ':<br/>' + chartData[3] +': ' + params.value[0] + '<br/>' + chartData[4] +': ' + params.value[1];
            } else {
              return params.value[2] + ':<br/>' + chartData[3] +': ' + params.value[0] + '<br/>' + chartData[4] +': ' + params.value[1];
            }
          },
          axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
              type: 'dashed',
              width: 1
            }
          }
        },
        series: [{
          symbolSize: 15,
          data: scatter_data,
          type: 'scatter',
          color: '#0055FF'
        }]
      };
      scatterChart.setOption(option, true);
   }
  },
  template: `  
  <div>

  </div>  
  `
})
