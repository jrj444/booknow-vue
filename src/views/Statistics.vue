<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="chartOptions"></Chart>
    </div>
    <div class="count">
      {{recordList}}
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Chart from '@/components/Chart.vue';
import _ from 'lodash';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import recordTypeList from '@/constants/recordTypeList';
import Tabs from '@/components/Tabs.vue';

@Component({
  components: {Tabs, Chart}
})
export default class Statistics extends Vue {
  created() {
    this.$store.commit('fetchRecords');
  }

  mounted() {
    const div = (this.$refs.chartWrapper as HTMLDivElement);
    div.scrollLeft = div.scrollWidth;
  }

  type = '-';
  recordTypeList = recordTypeList;

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const recordList = this.recordList;
    const newList = clone(recordList).filter(r => r.type === this.type).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    if (newList.length === 0) {return [];}
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(group => {group.total = group.items.reduce((sum, item) => sum + item.amount, 0);});
    return result;
  }

  get dateAmountList() {
    const today = new Date();
    const array = [];
    for (let i = 0; i < 30; i++) {
      const dateString = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
      const found = _.find(this.groupedList, {title: dateString});
      array.push({date: dateString, amount: found ? found.total : 0});
    }
    array.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      } else if (a.date === b.date) {
        return 0;
      } else {
        return -1;
      }
    });
    return array;
  }

  get chartOptions() {
    const keys = this.dateAmountList.map(item => item.date);
    const values = this.dateAmountList.map(item => item.amount);
    return {
      grid: {
        left: 0,
        right: 0
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisTick: {alignWithLabel: true},
        axisLine: {lineStyle: {color: '#777'}},
        axisLabel: {
          formatter: function (value: string) {
            return value.substr(5);
          }
        }
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
  height: 50%;

  > .chart {
    width: 430%;
    height: 100%;
  }
}

::v-deep {
  .type-tabs-item {
    background: white;

    &.selected {
      background: #41B883;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    background: white;

    &.tabs-item {
      font-size: 20px;
      height: 48px;
    }
  }
}
</style>