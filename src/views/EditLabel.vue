<template>
  <Layout>
    <div>
      <Icon name="left"/>
      <span>编辑标签</span>
    </div>
    <FormItem filed-name="标签名"/>
    <DButton>删除标签</DButton>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import {tagListModel} from '@/models/tagListModel';
  import Icon from '@/components/Icon.vue';
  import FormItem from '@/components/FormItem.vue';
  import DButton from '@/components/DButton.vue';

  @Component({
    components: {DButton, FormItem, Icon}
  })
  export default class EditLabel extends Vue {
    created() {
      const id = this.$route.params.id;
      tagListModel.fetch();
      const tags = tagListModel.data;
      const tag = tags.filter(t => t.id === id)[0];
      if (tag) {
        console.log(tag);
      } else {
        this.$router.replace('/404');
      }
    }
  }
</script>

<style scoped>

</style>