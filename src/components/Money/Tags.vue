<template>
  <div class="tags">
    <ul class="exist-tags">
      <li v-for="tag in tagList" :key="tag.id" :class="{selected: selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">
        {{tag.name}}
      </li>
    </ul>
    <div class="new-tag">
      <button @click="newTag()">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import store from '@/store/index2';

  @Component
  export default class Tags extends Vue {
    tagList = store.fetchTags();
    selectedTags: string[] = [];

    toggle(tag: string) {
      const index = this.selectedTags.indexOf(tag);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.$emit('update:value', this.selectedTags);
    }

    newTag() {
      const name = window.prompt('请输入标签名');
      if (!name) {
        return window.alert('标签名不能为空');
      } else {
        store.createTag(name);
      }
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

        &.selected {
          background: #777777;
          color: white;
        }
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