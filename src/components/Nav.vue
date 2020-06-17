<template>
  <nav>
    <router-link to="/money" class="item">
      <Icon name="money"/>
      记账
    </router-link>

    <router-link to="/labels" class="item">
      <Icon name="labels"/>
      标签
    </router-link>

    <router-link to="/statistics" class="item">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script>
  import Icon from "@/components/Icon";

  export default {
    name: "Nav",
    components: {Icon}
  };
</script>

<style lang="scss" scoped>
  nav {
    display: flex;
    flex-direction: row;
    box-shadow: 0 0 3px rgba(0,0,0,0.25);
    font-size: 12px;


    > .item {
      padding: 3px 0;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .icon {
        width: 32px;
        height: 32px;
      }
    }
  }
</style>