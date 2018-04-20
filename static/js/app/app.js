


// use axios for xhr
axios.get(GETDATA)	    
	.then(output => {		
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
			        var scatterChart = echarts.init(document.getElementById('chart_div'));
					var scatter_data = scatter_output;					
					
			        option = {
			        	title: {
		                    text: 'Bethesda North American/European Units Sold (in millions)'
		                },
					    xAxis: {
					    	name: 'NA Units Sold(in millions)',
					    	nameLocation: 'end'
					    },
					    yAxis: {
					    	name: 'EU Units Sold(in millions)',
					    	nameLocation: 'end'
					    },
					    tooltip : {                    
		                    showDelay : 0,
		                    formatter : function (params) {
		                        if (params.value.length > 1) {
		                            return params.value[2] + ':<br/>NA Units Sold (in millions): ' + params.value[0] + '<br/>EU Units Sold (in millions): ' + params.value[1];
		                        }
		                        else {
		                            return params.value[2] + ':<br/>NA Units Sold (in millions): ' + params.value[0] + '<br/>EU Units Sold (in millions): ' + params.value[1];
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
					        type: 'scatter',
					        color: '#0055FF'
					    }]
					};
					scatterChart.setOption(option, true);
			    },
			    build_line:function(d){		 			    	   
			        var lineChart = echarts.init(document.getElementById('chart_div'));
					
					var line_data = line_output;
			        var labels = line_data['labels'];
			        var values = line_data['values'];

		            option = {
		                title: {
		                    text: 'Bethesda North American Units Sold (in millions)'
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
			    build_pie:function(d){		 			    	
			        var pieChart = echarts.init(document.getElementById('chart_div'));					
					var pie_data = pie_output;			        
		            
		            var option = {
		                title: {
		                    text: 'Bethesda North American Units Sold (in millions)'
		                },
		                tooltip: {},
		                legend: {
		                    data: 'Legend'
		                },                                              
		                series: [{                    
		                    name: 'NA Units Sold(in millions)',
		                    type: 'pie',     
		                    selectedMode: 'single',               
		                    data: pie_data                    
		                }]
		            };
					pieChart.setOption(option, true);
			    }
			}


		})

  })
