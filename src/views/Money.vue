<template>
  <Layout class-prefix="layout">
    {{record}}
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    <Remark @update:value="onUpdateRemark"/>
    <Types :value.sync="record.type"/>
    <keypad :value.sync="record.amount"/>
  </Layout>
</template>

<script lang="ts">
  import Tags from '@/components/Money/Tags.vue';
  import Remark from '@/components/Money/Remark.vue';
  import Types from '@/components/Money/Types.vue';
  import Keypad from '@/components/Money/Keypad.vue';
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  type Record = {
    tags: string[];
    remark: string;
    type: string;
    amount: number;
  }

  @Component({
    components: {Tags, Remark, Types, Keypad}
  })
  export default class Money extends Vue {
    tags: string[] | undefined = ['购物', '饮食', '住宿', '交通'];
    record: Record = {
      tags: [], remark: '', type: '-', amount: 0
    };

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateRemark(value: string) {
      this.record.remark = value;
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;

    .tags {
      order: 2;
    }

    .remark-wrapper {
      order: 1;
    }

    .keypad {
      order: -1;
    }
  }
</style>