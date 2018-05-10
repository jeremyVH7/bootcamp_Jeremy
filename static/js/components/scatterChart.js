// scatter chart component
let scatterChart = Vue.component('scatter-chart', {
  data: function () {
    return {
      count: 0
    }
  },  
  methods: {
    buildScatter: function (scatterData) {      
      var scatterChart = echarts.init(document.getElementById('chart_div'));                  
      
      option = {
        title: {
          text: scatterData['titleText']
        },
        xAxis: {
          name: scatterData['xName'],
          nameLocation: 'end'
        },
        yAxis: {
          name: scatterData['yName'],
          nameLocation: 'end'
        },
        tooltip: {
          showDelay: 0,
          formatter: function (params) {
            if (params.value.length > 1) {
              return params.value[2] + ':<br/>' + scatterData['xName'] +': ' + params.value[0] + '<br/>' + scatterData['yName'] +': ' + params.value[1];
            } else {
              return params.value[2] + ':<br/>' + scatterData['xName'] +': ' + params.value[0] + '<br/>' + scatterData['yName'] +': ' + params.value[1];
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
          data: scatterData['scatter_data'],
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
