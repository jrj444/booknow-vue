<template>
  <div class="tags">
    <ul class="exist-tags">
      <li v-for="tag in tagList" :key="tag.id" :class="{selected: selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">
        {{tag.name}}
      </li>
    </ul>
    <div class="new-tag">
      <button @click="createTag()">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/tagHelper';

  @Component
  export default class Tags extends mixins(TagHelper) {
    get tagList() {
      return this.$store.state.tagList;
    }

    selectedTags: string[] = [];

    created() {
      this.$store.commit('fetchTags');
    }

    toggle(tag: string) {
      const index = this.selectedTags.indexOf(tag);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.$emit('update:value', this.selectedTags);
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
        border: 2px solid #999999;
        height: 24px;
        border-radius: 8px;
        padding: 0 18px;
        margin-right: 8px;
        margin-bottom: 8px;

        &.selected {
          border: 2px solid #f46064;
        }
      }
    }

    > .new-tag {
      padding-top: 6px;

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