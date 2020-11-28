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
import _ from 'lodash';
import dayjs from 'dayjs';

@Component({
  components: {Chart}
})
export default class Statistics extends Vue {
  mounted() {
    const div = (this.$refs.chartWrapper as HTMLDivElement);
    div.scrollLeft = div.scrollWidth;
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get x() {
    const today = new Date();
    const array = [];
    for (let i = 0; i < 30; i++) {
      const dateString = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
      const found = _.find(this.recordList, {createdAt: dateString});
      array.push({date: dateString, amount: found ? found.amount : 0});
    }
    console.log(array);
    const keys = array.map(item => item.date);
    const values = array.map(item => item.amount);
    return {
      grid: {
        left: 0,
        right: 0
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisTick: {alignWithLabel: true},
        axisLine: {lineStyle: {color: '#777'}}
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        symbolSize: 10,
        data: values,
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