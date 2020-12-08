<template>
  <Layout class-prefix="layout">
    <Tags @update:value="record.tags = $event"/>
    <FormItem filed-name="备注" placeholder="在这里输入备注" :value.sync="record.remark"/>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <Date :value.sync="record.createdAt"></Date>
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
import CreateAt from '@/components/Money/CreateAt.vue';

@Component({
  components: {Date: CreateAt, Tabs, Tags, FormItem, Keypad}
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList;
  record: RecordItem = {
    tags: [], remark: '', type: '-', amount: 0, createdAt: new Date().toISOString()
  };

  created() {
    this.$store.commit('fetchRecords');
  }

  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert('请先选择一个标签');
    }
    this.$store.commit('createRecord', this.record);
    window.alert('记录已保存');
    this.record.remark = '';
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;

  .tags-wrapper {
    order: 2;
    background: white;
    overflow: no-content;
  }

  .form-wrapper {
    order: 1;
    padding: 10px;
  }

  .keypad {
    order: -1;
  }

  .tabs {
    order: 3;

  }
}
</style>