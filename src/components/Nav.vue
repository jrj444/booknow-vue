<template>
  <div class="nav">
    <router-link to="/money">
      <svg>
        <use xlink:href="#money"/>
      </svg>
      记账
    </router-link>
    |
    <router-link to="/labels">标签</router-link>
    |
    <router-link to="/statistics">统计</router-link>
  </div>
</template>

<script>
  const importAll = (requireContext) => requireContext.keys().forEach(requireContext);
  try {
    importAll(require.context("../assets/icons", true, /\.svg$/));
  } catch (e) {
    console.log(e);
  }


  export default {
    name: "Nav"
  };
</script>

<style scoped>
  .nav {
    border: 1px solid red;
  }
</style>