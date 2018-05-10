// pie chart component
let pieChart = Vue.component('pie-chart', {
  data: function () {
    return {
      count: 0
    }
  },  
  methods: {
    buildPie: function (pieData) {      
      var pieChart = echarts.init(document.getElementById('chart_div'));
      
      var option = {
        title: {
          text: pieData['titleText']
        },
        tooltip: {},
        legend: {
          data: 'Legend'
        },
        series: [{
          name: pieData['name'],
          type: 'pie',
          selectedMode: 'single',
          label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: false,
                textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            }
          },
          labelLine: {
              normal: {
                  show: false
              }
          },
          data: pieData['pie_data']
        }]
      };
      pieChart.setOption(option, true);
   }
  },
  template: `  
  <div>

  </div>  
  `
})
