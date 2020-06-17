<template>
  <div class="Nav-wrapper">
    <div class="content">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script>
  export default {
    name: "Layout"
  };
</script>

<style scoped>
  .Nav-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .content {
    border: 1px solid blue;
    flex-grow: 1;
    overflow: auto;
  }
</style>