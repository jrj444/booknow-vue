<template>
  <Layout>
    <div class="nav-bar">
      <Icon class="left-icon" name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="right-icon"></span>
    </div>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
        <span>{{ tag.name }}</span>
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
import {Component} from 'vue-property-decorator';
import DButton from '@/components/DButton.vue';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/tagHelper';

@Component({
  components: {DButton, Icon}
})
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit('fetchTags');
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
    cursor: pointer;
  }

  > .right-icon {
    width: 20px;
    height: 20px;
  }
}

.tags {
  background: white;
  margin-top: 8px;

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

  > .button {
    background: #1890ff;
  }
}
</style>