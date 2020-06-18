<template>
  <div class="tags">
    <ul class="exist-tags">
      <li v-for="tag in dataSource" :key="tag" @click="select(tag)">{{tag}}</li>
    </ul>
    <div class="new-tag">
      <button>新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Tags extends Vue {
    @Prop() dataSource: string[] | undefined;
    selectedTag: string[] = [];

    select(tag: string) {
      this.selectedTag.push(tag);
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    padding: 16px;
    font-size: 14px;
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    flex-grow: 1;

    > .exist-tags {
      display: flex;
      flex-wrap: wrap;
      order: 1;

      > li {
        display: flex;
        align-items: center;
        background: #d9d9d9;
        height: 24px;
        border-radius: 12px;
        padding: 0 18px;
        margin-right: 16px;
        margin-top: 4px;
      }
    }

    > .new-tag {
      padding-top: 16px;

      button {
        background: transparent;
        border: none;
        color: #999999;
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }
</style>