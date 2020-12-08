<template>
  <div class="tags-wrapper">
    <div class="all-tags">
      <span>常用类别</span>
      <router-link class="all" to="/labels">
        <span>全部</span>
        <Icon class="right-icon" name="right"></Icon>
      </router-link>
    </div>
    <div class="tags">
      <ul class="exist-tags">
        <li v-for="tag in tagList" :key="tag.id" :class="{selected: selectedTags.indexOf(tag)>=0}"
            @click="toggle(tag)">
          {{ tag.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/tagHelper';
import Icon from '@/components/Icon.vue';

@Component({
  components: {Icon}
})
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

<style lang="scss">
.tags-wrapper {
  padding: 8px 16px;
  flex-grow: 1;

  > .all-tags {
    color: #bfbfbf;
    padding: 4px;
    display: flex;
    justify-content: space-between;

    > .all {
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 14px;
      cursor: pointer;
    }
  }

  > .tags {
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

}


</style>