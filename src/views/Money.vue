<template>
  <Layout class-prefix="layout">
    <Tags/>
    <FormItem filed-name="备注" placeholder="在这里输入备注" @update:value="onUpdateRemark"/>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <keypad :value.sync="record.amount" @submit="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
  import Tags from '@/components/Money/Tags.vue';
  import FormItem from '@/components/FormItem.vue';
  import Keypad from '@/components/Money/Keypad.vue';
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import recordTypeList from '@/constants/recordTypeList';
  import Tabs from '@/components/Tabs.vue';

  @Component({
    components: {Tabs, Tags, FormItem, Keypad}
  })
  export default class Money extends Vue {
    get recordList() {
      return this.$store.state.recordList;
    }

    recordTypeList = recordTypeList;
    record: RecordItem = {
      tags: [], remark: '', type: '-', amount: 0
    };

    created() {
      this.$store.commit('fetchRecords');
    }

    onUpdateRemark(value: string) {
      this.record.remark = value;
    }

    saveRecord() {
      this.$store.commit('createRecord', this.record);
      window.alert('记录已保存');
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;

    .tags {
      order: 2;
      background: white;
    }

    .form-wrapper {
      order: 1;
      padding: 10px;
    }

    .keypad {
      order: -1;
    }
  }
</style>