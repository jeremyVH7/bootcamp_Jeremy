var chart_vue = new Vue({      
      el: '#main',
      data: {
        title: "",
        data: {
          currentChart: ''
        }
      },
      components: {
        'scatter-chart': scatterChart,
        'line-chart': lineChart,
        'pie-chart': pieChart
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
            this.runScatter();
          }
          else if (this.data['currentChart'] == 'pie') {
            this.runPie();
          }
          else if (this.data['currentChart'] == 'line') {
            this.runLine();
          }
        },
        runScatter: function (d) {
          this.data['currentChart'] = 'scatter';          
          var scatterPub = document.getElementById("publishers");
          var scatterSelected = scatterPub.options[scatterPub.selectedIndex].text;
          var scatter_data = this.data[scatterSelected][0]['scatter_data'];

          var titleText = scatterSelected + ' North American/European Units Sold (in millions)';
          var xName = 'NA Units Sold(in millions)';
          var yName = 'EU Units Sold(in millions)';

          var scatterData = {                         
            'titleText': titleText, 
            'scatter_data': scatter_data,
            'xName': xName, 
            'yName': yName
          };

          this.$refs.scatter.buildScatter(scatterData);
        },        
        runLine: function (d) {
          this.data['currentChart'] = 'line';  
          var linePub = document.getElementById("publishers");
          var lineSelected = linePub.options[linePub.selectedIndex].text;
          var labels = this.data[lineSelected][2]['line_data']['labels'];
          var values = this.data[lineSelected][2]['line_data']['values'];
                  
          var titleText = lineSelected + ' North American Units Sold (in millions)';          
          var yName = 'NA Units Sold(in millions)';

          var lineData = {                        
            'titleText': titleText, 
            'labels': labels,
            'values': values, 
            'yName': yName
          };

          this.$refs.line.buildLine(lineData);
        },
        runPie: function (d) {
          this.data['currentChart'] = 'pie';                    
          var piePub = document.getElementById("publishers");
          var pieSelected = piePub.options[piePub.selectedIndex].text;
          var pie_data = this.data[pieSelected][1]['pie_data'];
          
          var titleText = pieSelected + ' North American Units Sold (in millions)';
          var name = 'NA Units Sold(in millions)';          

          var pieData = {                         
            'titleText': titleText, 
            'pie_data': pie_data,
            'name': name             
          };

          this.$refs.pie.buildPie(pieData);          
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

