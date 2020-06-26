<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <div>
      <ul>
        <li v-for="(group, index) in result" :key="index">
          <h4>{{group.title}}</h4>
          <ul>
            <li v-for="item in group.items" :key="item.id">
              ￥ {{item.amount}}
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

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get result() {
      const recordList = this.recordList;
      const hashTable: { [key: string]: HashTableValue } = {};
      for (let i = 0; i < recordList.length; i++) {
        const [date, time] = recordList[i].createdAt!.split('T');
        hashTable[date] = hashTable[date] || {title: date, items: []};
        hashTable[date].items.push(recordList[i]);
      }
      return hashTable;
    }

    created() {
      this.$store.commit('fetchRecords');
    }

    type = '-';
    interval = 'day';
    intervalList = intervalList;
    recordTypeList = recordTypeList;
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

</style>