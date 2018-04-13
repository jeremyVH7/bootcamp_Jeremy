const app = new Vue({
	// create your Vue Object
	
})

// use axios for xhr
axios.get(GETDATA)	    
	.then(output => {
		// debugger;
		
        var scatter_output = output['data']['scatter_data'];
        var line_output = output['data']['line_data'];
        var pie_output = output['data']['pie_data'];

        var chart_vue = new Vue({
			// create your Vue Object
			el: '#main',
			data:{
			  title: ""
			},
			methods:{	    
			    build_scatter:function(d){		        
			        var scatterChart = echarts.init(document.getElementById('scatter'));
					var scatter_data = scatter_output;					
					
			        option = {
			        	title: {
		                    text: 'Bethesda North American/European Sales'
		                },
					    xAxis: {
					    	name: 'NA Sales(in millions)',
					    	nameLocation: 'end'
					    },
					    yAxis: {
					    	name: 'EU Sales(in millions)',
					    	nameLocation: 'end'
					    },
					    tooltip : {                    
		                    showDelay : 0,
		                    formatter : function (params) {
		                        if (params.value.length > 1) {
		                            return params.value[2] + ':<br/>NA Sales: ' + params.value[0] + '<br/>EU Sales: ' + params.value[1];
		                        }
		                        else {
		                            return params.value[2] + ':<br/>NA Sales: ' + params.value[0] + '<br/>EU Sales: ' + params.value[1];
		                        }
		                    },
		                    axisPointer:{
		                        show: true,
		                        type : 'cross',
		                        lineStyle: {
		                            type : 'dashed',
		                            width : 1
		                        }
		                    }
		                },
					    series: [{
					        symbolSize: 20,
					        data: scatter_data,
					        type: 'scatter'
					    }]
					};
					scatterChart.setOption(option);
			    },
			    build_line:function(d){		        
			        var lineChart = echarts.init(document.getElementById('line'));
					
					var line_data = line_output;
			        var labels = line_data['labels'];
			        var values = line_data['values'];

		            option = {
		                title: {
		                    text: 'Bethesda North American Sales'
		                },
		                tooltip: {
		                    axisPointer:{
		                        show: true,
		                        type : 'cross',
		                        lineStyle: {
		                            type : 'dashed',
		                            width : 1
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
		                    name: 'NA Sales(in millions)',
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
		                    type: 'line'
		                }]
		            };
					lineChart.setOption(option);
			    },
			    build_pie:function(d){		        
			        var pieChart = echarts.init(document.getElementById('pie'));					
					var pie_data = pie_output;			        
		            
		            var option = {
		                title: {
		                    text: 'Bethesda North American Sales'
		                },
		                tooltip: {},
		                legend: {
		                    data: 'Legend'
		                },                                              
		                series: [{                    
		                    name: 'NA Sales(in millions)',
		                    type: 'pie',     
		                    selectedMode: 'single',               
		                    data: pie_data                    
		                }]
		            };
					pieChart.setOption(option);
			    }
			}


		})

  })
