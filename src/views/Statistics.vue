<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <div>
      <ul>
        <li v-for="(group,index) in groupedList" :key="index">
          <h4 class="title">{{beautify(group.title)}}</h4>
          <ul>
            <li class="recordList" v-for="item in group.items" :key="item.id">
              <span>{{tagsToString(item.tags)}}</span>
              <span class="remark">{{item.remark}}</span>
              <span>￥{{item.amount}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
      const recordList = this.recordList;
      if (recordList.length === 0) {return [];}
      const newList = clone(recordList).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      const result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }
      }
      return result;
    }

    created() {
      this.$store.commit('fetchRecords');
    }

    type = '-';
    interval = 'day';
    intervalList = intervalList;
    recordTypeList = recordTypeList;

    tagsToString(tags: string[]) {
      return tags.length === 0 ? '无' : tags.join(',');
    }

    beautify(string: string) {
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else {
        return day.format('M月D日');
      }
    }
  }
</script>

<style scoped lang="scss">
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

  .title {
    padding: 9px 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .recordList {
    background: white;
    padding: 9px 16px;
    line-height: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .remark {
    margin-right: auto;
    margin-left: 13px;
    color: #999999;
  }
</style>