const app = new Vue({
	// create your Vue Object
	
})

// use axios for xhr
axios.get(GETDATA)	    
	.then(output => {
		// debugger;
		
        var chart_output = output['data'];

        var chart_vue = new Vue({
			// create your Vue Object
			el: '#main',
			data:{
			  title: ""
			},
			methods:{	    
			    build_chart:function(d){		        
			        var myChart = echarts.init(document.getElementById('main'));
					// debugger;

					var data = chart_output;

			        option = {
					    xAxis: {},
					    yAxis: {},
					    series: [{
					        symbolSize: 20,
					        data: data,
					        type: 'scatter'
					    }]
					};
					myChart.setOption(option);
			    }
			}


		})

  })
