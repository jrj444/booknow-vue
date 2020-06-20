<template>
  <Layout>
    <ul class="tags">
      <li>
        <span>衣</span>
        <Icon name="right"/>
      </li>
      <li>
        <span>食</span>
        <Icon name="right"/>
      </li>
      <li>
        <span>住</span>
        <Icon name="right"/>
      </li>
      <li>
        <span>行</span>
        <Icon name="right"/>
      </li>
    </ul>
    <div class="create-tag-wrapper">
      <button class="create-tag">新建标签</button>
    </div>
  </Layout>
</template>

<script>
  import Icon from "@/components/Icon";

  export default {
    name: "Labels",
    components: {Icon}
  };
</script>

<style lang="scss" scoped>
  .tags {
    background: white;

    > li {
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