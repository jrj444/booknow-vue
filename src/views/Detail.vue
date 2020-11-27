<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <div>
      <ul v-if="groupedList.length>0">
        <li v-for="(group,index) in groupedList" :key="index">
          <h4 class="title">{{beautify(group.title)}}<span>￥{{group.total}}</span></h4>
          <ul>
            <li class="recordList" v-for="item in group.items" :key="item.id">
              <span>{{tagsToString(item.tags)}}</span>
              <span class="remark">{{item.remark}}</span>
              <span>￥{{item.amount}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div v-else class="no-records">
        目前没有记录
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
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

    created() {
      this.$store.commit('fetchRecords');
    }

    type = '-';
    recordTypeList = recordTypeList;

    tagsToString(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.map(t => t.name).join(', ');
    }

    beautify(string: string) {
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else {
        return day.format('M月D日');
      }
    }
  }
</script>

<style scoped lang="scss">
  .no-records {
    padding: 16px;
    margin-top: 40px;
    text-align: center;
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

  .title {
    padding: 9px 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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