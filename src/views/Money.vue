<template>
  <Layout class-prefix="layout">
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    <FormItem filed-name="备注" placeholder="在这里输入备注" @update:value="onUpdateRemark"/>
    <Types :value.sync="record.type"/>
    <keypad :value.sync="record.amount" @submit="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
  import Tags from '@/components/Money/Tags.vue';
  import FormItem from '@/components/FormItem.vue';
  import Types from '@/components/Money/Types.vue';
  import Keypad from '@/components/Money/Keypad.vue';
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import {recordListModel} from '@/models/recordListModel';
  import {tagListModel} from '@/models/tagListModel';

  const recordList = recordListModel.fetch();
  const tagList = tagListModel.fetch();

  @Component({
    components: {Tags, FormItem, Types, Keypad}
  })
  export default class Money extends Vue {
    tags = tagList;
    record: RecordItem = {
      tags: [], remark: '', type: '-', amount: 0
    };
    recordList = recordList;

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateRemark(value: string) {
      this.record.remark = value;
    }

    saveRecord() {
      recordListModel.createItem(this.record);
    }

    @Watch('recordList')
    onRecordListChanged() {
      recordListModel.save();
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