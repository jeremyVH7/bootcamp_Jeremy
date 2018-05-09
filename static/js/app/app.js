
var chart_vue = new Vue({      
      el: '#main',
      data: {
        title: "",
        data: {
          currentChart: ''
        }
      },
      components: {
        'scatter-chart': scatterChart
      },
      methods: {
        publisherDropdown: function (d) {
          var dropdown = [];
          dropdown.push('<option value="Bethesda Softworks">Bethesda Softworks</option>');
          var allPublishers = this.data['publishers'];
          
          for (var i = 0; i < allPublishers.length - 1; i++) {
            dropdown.push('<option value="'+ allPublishers[i] +'">' + allPublishers[i] + '</option>');
          }

          document.getElementById('publishers').innerHTML = dropdown;

        },
        onChange: function (d) {
          if (this.data['currentChart'] == 'scatter' || this.data['currentChart'] == '') {
            this.buildScatter();
          }
          else if (this.data['currentChart'] == 'pie') {
            this.buildPie();
          }
          else if (this.data['currentChart'] == 'line') {
            this.buildLine();
          }
        },
        buildScatter: function (d) {
          this.data['currentChart'] = 'scatter';          
          var scatterPub = document.getElementById("publishers");
          var scatterSelected = scatterPub.options[scatterPub.selectedIndex].text;
          var scatter_data = this.data[scatterSelected][0]['scatter_data'];

          var titleText = scatterSelected + ' North American/European Units Sold (in millions)';
          var xName = 'NA Units Sold(in millions)';
          var yName = 'EU Units Sold(in millions)';

          var chartData = [scatterSelected, scatter_data, titleText, xName, yName];

          this.$refs.scatter.buildScatter(chartData);
        },
        buildScatterOld: function (d) {
          var scatterChart = echarts.init(document.getElementById('chart_div'));

          var scatterPub = document.getElementById("publishers");
          var scatterSelected = scatterPub.options[scatterPub.selectedIndex].text;

          var scatter_data = this.data[scatterSelected][0]['scatter_data'];
          
          this.data['currentChart'] = 'scatter';

          option = {
            title: {
              text: scatterSelected + ' North American/European Units Sold (in millions)'
            },
            xAxis: {
              name: 'NA Units Sold(in millions)',
              nameLocation: 'end'
            },
            yAxis: {
              name: 'EU Units Sold(in millions)',
              nameLocation: 'end'
            },
            tooltip: {
              showDelay: 0,
              formatter: function (params) {
                if (params.value.length > 1) {
                  return params.value[2] + ':<br/>NA Units Sold (in millions): ' + params.value[0] + '<br/>EU Units Sold (in millions): ' + params.value[1];
                } else {
                  return params.value[2] + ':<br/>NA Units Sold (in millions): ' + params.value[0] + '<br/>EU Units Sold (in millions): ' + params.value[1];
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
        },
        buildLine: function (d) {
          var lineChart = echarts.init(document.getElementById('chart_div'));

          var linePub = document.getElementById("publishers");
          var lineSelected = linePub.options[linePub.selectedIndex].text;

          var labels = this.data[lineSelected][2]['line_data']['labels'];
          var values = this.data[lineSelected][2]['line_data']['values'];
          this.data['currentChart'] = 'line';          

          option = {
            title: {
              text: lineSelected + ' North American Units Sold (in millions)'
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
              data: labels,
              show: false
            },
            yAxis: {
              type: 'value',
              name: 'NA Units Sold(in millions)',
              nameLocation: 'end'
            },
            series: [{
              // options for smoothing line and area fill below
              smooth: true,
              areaStyle: {},
              ///////
              symbolSize: 10,
              showAllSymbol: true,
              data: values,
              color: '#0055FF',
              type: 'line'
            }]
          };
          lineChart.setOption(option, true);
        },
        buildPie: function (d) {
          var pieChart = echarts.init(document.getElementById('chart_div'));
          
          var piePub = document.getElementById("publishers");
          var pieSelected = piePub.options[piePub.selectedIndex].text;

          var pie_data = this.data[pieSelected][1]['pie_data'];
          this.data['currentChart'] = 'pie';

          var option = {
            title: {
              text: pieSelected + ' North American Units Sold (in millions)'
            },
            tooltip: {},
            legend: {
              data: 'Legend'
            },
            series: [{
              name: 'NA Units Sold(in millions)',
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
              data: pie_data
            }]
          };
          pieChart.setOption(option, true);
        },
        getData: function () {          
          axios.get(GETDATA)
            .then(output => {
                var publishers = output['data']['publishers'];
                this.data['publishers'] = publishers;                                                      

                for (i = 0; i < publishers.length; i++) {                  
                  this.data[publishers[i]] = output['data'][publishers[i]];
                }
                
                this.publisherDropdown()
              })
            }
        },
        created: function () {
          this.getData()          
        }
      })

