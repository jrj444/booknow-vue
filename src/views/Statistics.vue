<template>
  <Layout>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="x"></Chart>
    </div>
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
  mounted() {
    const div = (this.$refs.chartWrapper as HTMLDivElement);
    div.scrollLeft = div.scrollWidth;
  }

  get x() {
    return {
      grid: {
        left: 0,
        right: 0
      },
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7'],
        axisTick: {alignWithLabel: true},
        axisLine: {lineStyle: {color: '#777'}}
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        symbolSize: 10,
        data: [100, 200, 300, 200, 400, 500, 140],
        type: 'line'
      }],
      tooltip: {
        show: true,
        triggerOn: 'click',
        formatter: '{c}',
        position: 'top'
      }
    };
  }
}
</script>

<style scoped lang="scss">
.chart-wrapper {
  overflow: auto;

  > .chart {
    width: 430%;
  }
}
</style>