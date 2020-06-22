<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
        <span>{{tag.name}}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="create-tag-wrapper">
      <button class="create-tag" @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Icon from '@/components/Icon.vue';
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import {tagListModel} from '@/models/tagListModel';

  tagListModel.fetch();
  @Component({
    components: {Icon}
  })
  export default class Labels extends Vue {
    tags = tagListModel.data;

    createTag() {
      const name = window.prompt('请输入标签名');
      if (name) {
        const message = tagListModel.create(name);
        if (message === 'duplicated') {
          window.alert('标签名重复了，请重新添加！');
        } else if (message === 'success') {
          window.alert('添加成功');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    background: white;

    > .tag {
      display: flex;
      align-items: center;
      font-size: 16px;
      line-height: 16px;
      justify-content: space-between;
      padding: 12px 16px 16px 15px;
      box-shadow: inset 0px -1px 0px 0px #BCBBC1;
    }
  }

  .create-tag {
    background: #41B883;
    font-size: 17px;
    padding: 9px 16px;
    line-height: 22px;
    border-radius: 4px;
    border: none;
    color: #fff;

    &-wrapper {
      text-align: center;
      margin-top: 44px;
    }
  }
</style>