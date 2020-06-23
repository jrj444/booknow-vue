<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
        <span>{{tag.name}}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="button-wrapper">
      <DButton @click="createTag">新建标签</DButton>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Icon from '@/components/Icon.vue';
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import DButton from '@/components/DButton.vue';

  @Component({
    components: {DButton, Icon}
  })
  export default class Labels extends Vue {
    tags = window.tagList;

    createTag() {
      const name = window.prompt('请输入标签名');
      if (name) {
        window.createTag(name);
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

  .button-wrapper {
    text-align: center;
    margin-top: 44px;
  }
</style>