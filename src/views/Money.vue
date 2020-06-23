<template>
  <Layout class-prefix="layout">
    {{record}}
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
  import {Component} from 'vue-property-decorator';

  @Component({
    components: {Tags, FormItem, Types, Keypad}
  })
  export default class Money extends Vue {
    tags = window.tagList;
    record: RecordItem = {
      tags: [], remark: '', type: '-', amount: 0
    };
    recordList = window.recordList;

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateRemark(value: string) {
      this.record.remark = value;
    }

    saveRecord() {
      window.createRecord(this.record);
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