<template>
  <div class="nav">
    <router-link to="/money">
      <Icon name="money"/>
      记账
    </router-link>
    |
    <router-link to="/labels">
      <Icon name="labels"/>
      标签
    </router-link>
    |
    <router-link to="/statistics">
      <Icon name="statistics"/>
      统计
    </router-link>
  </div>
</template>

<script>
  import Icon from "@/components/Icon";
  export default {
    name: "Nav",
    components: {Icon}
  };
</script>

<style scoped>
  .nav {
    border: 1px solid red;
  }
</style>