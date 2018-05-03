// navbar component
let myNavbar = Vue.component('my-navbar', {
  data: function () {
    return {
      count: 0
    }
  },  
  template: `  
  <div>
    <button id="pie_btn" type="button" class="btn btn-primary" v-on:click.prevent="$emit('build_pie')">Pie chart!</button>
    <button id="line_btn" type="button" class="btn btn-primary" v-on:click.prevent="$emit('build_line')">Line chart!</button>
    <button id="scatter_btn" type="button" class="btn btn-primary" v-on:click.prevent="$emit('build_scatter')">Scatter chart!</button>
    <select id="publishers" name="publishers" style="min-width:12%;" v-on:change="$emit('on_change')"><option value="Bethesda Softworks">Bethesda Softworks</option></select>
  </div>  
  `
})
