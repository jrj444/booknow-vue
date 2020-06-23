<template>
  <Layout>
    <div class="nav-bar">
      <Icon class="left-icon" name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="right-icon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="this.tag.name"
                @update:value="update"
                filed-name="标签名"/>
    </div>
    <div class="button-wrapper">
      <DButton @click="remove">删除标签</DButton>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';
  import FormItem from '@/components/FormItem.vue';
  import DButton from '@/components/DButton.vue';

  @Component({
    components: {DButton, FormItem, Icon}
  })
  export default class EditLabel extends Vue {
    tag?: Tag = undefined;

    created() {
      this.tag = window.findTag(this.$route.params.id);
      if (!this.tag) {
        this.$router.replace('/404');
      }
    }

    update(name: string) {
      if (this.tag) {
        window.updateTag(this.tag.id, name);
      }
    }

    remove() {
      if (this.tag) {
        if (window.removeTag(this.tag.id)) {
          this.$router.back();
        } else {
          window.alert('删除失败');
        }
      }
    }

    goBack() {
      this.$router.back();
    }
  }
</script>

<style lang="scss" scoped>
  .nav-bar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > .left-icon {
      width: 20px;
      height: 20px;
    }

    > .right-icon {
      width: 20px;
      height: 20px;
    }

    > .title {

    }
  }

  .form-wrapper {
    background: white;
    margin-top: 8px;
  }

  .button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>