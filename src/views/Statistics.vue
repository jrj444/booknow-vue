<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <div class="monthAmount">
      <div class="number">{{ monthAmount }}</div>
      <div class="category">
        <span v-if="type === `-`">本月支出</span>
        <span v-else>本月收入</span>
      </div>
    </div>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="chartOptions"></Chart>
    </div>
    <div class="most-wrapper">
      <div class="most-amount">
        <div class="title">
          <Icon name="amount"></Icon>
          <span>最高金额</span>
        </div>
        <div class="content">
          <span>{{ mostAmount.tag }}</span>
          <span>{{ mostAmount.amount }}</span>
        </div>
      </div>
      <div class="most-times">
        <div class="title">
          <Icon name="times"></Icon>
          <span>最多笔数</span>
        </div>
        <div class="content">
          <span>{{ mostTimes.maxTag }}</span>
          <span>{{ mostTimes.maxCount }} 笔</span>
        </div>
      </div>
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
import Icon from '@/components/Icon.vue';

@Component({
  components: {Icon, Tabs, Chart}
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

  get mostTimes() {
    const recordList = this.recordList;
    const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .filter(r => dayjs(r.createdAt).month() === dayjs(new Date()).month());
    if (newList.length === 0) {
      return {'maxTag': null, 'maxCount': 0};
    }
    const tagsName = [];
    for (let i = 0; i < newList.length; i++) {
      tagsName.push(newList[i].tags[0].name);
    }
    const countTags: { [tag: string]: number } = {};
    for (let i = 0; i < tagsName.length; i++) {
      const tag = tagsName[i];
      if (countTags[tag]) {
        countTags[tag]++;
      } else {
        countTags[tag] = 1;
      }
    }
    let maxCount = 0;
    let maxTag = tagsName[0];
    for (const key in countTags) {
      if (maxCount < countTags[key]) {
        maxCount = countTags[key];
        maxTag = key;
      }
    }
    return {maxTag, maxCount};
  }

  get mostAmount() {
    const recordList = this.recordList;
    const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .filter(r => dayjs(r.createdAt).month() === dayjs(new Date()).month())
        .sort((a, b) => b.amount - a.amount);
    if (newList.length === 0) {
      return {'tag': null, 'amount': 0};
    }
    return {'tag': newList[0].tags[0].name, 'amount': newList[0].amount.toFixed(2)};
  }

  get monthAmount() {
    const groupedList = this.groupedList;
    const newList = clone(groupedList);
    let amount = 0;
    for (let i = 0; i < newList.length; i++) {
      if (dayjs(new Date()).month() === dayjs(newList[i].title).month()) {
        amount += newList[i].total.valueOf();
      }
    }
    return amount.toFixed(2);
  }

  get groupedList() {
    const recordList = this.recordList;
    const newList = clone(recordList).filter(r => r.type === this.type).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    if (newList.length === 0) {return [];}
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]], total: 0}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current], total: 0});
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
.most-wrapper {
  padding: 32px;
  display: flex;
  justify-content: space-around;

  .title {
    font-size: 18px;

    > .icon {
      color: orangered;
      font-size: 20px;
      margin-right: 4px;
    }
  }

  .content {
    color: #999999;
    display: flex;
    justify-content: center;
    align-items: center;

    > span {
      padding: 6px;
      line-height: 14px;
      font-size: 14px;
    }
  }

  > .most-amount {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  > .most-times {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.monthAmount {
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .number {
    font-size: 32px;
    font-family: Montserrat, sans-serif;
  }

  > .category {
    color: #BCBBC1;
    height: 18px;
    margin-top: 10px;
    position: relative;

    > span {
      line-height: 18px;
    }

    &::after, &::before {
      position: absolute;
      width: 48px;
      height: 1px;
      content: '';
      top: 9px;
      background: #BCBBC1;
    }

    &::after {
      left: -100%;
    }

    &::before {
      right: -100%;
    }
  }
}

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
      background: #1890ff;
      color: #fff;

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