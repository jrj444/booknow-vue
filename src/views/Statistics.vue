<template>
  <Layout>
    <Chart :options="x"></Chart>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Chart from '@/components/Chart.vue';

@Component({
  components: {Chart}
})
export default class Statistics extends Vue {
  get x() {
    return {
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [100, 200, 300, 200, 400, 500, 140],
        type: 'line'
      }],
      tooltip: {show: true}
    };
  }
}
</script>

<style scoped lang="scss">

</style>