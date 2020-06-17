<template>
  <div class="Nav-wrapper">
    <div class="Money-content">
      Money
    </div>
    <Nav />
  </div>

</template>

<script>
  export default {
    name: "Money"
  };
</script>

<style scoped>
  .Nav-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .Money-content {
    border: 1px solid blue;
    flex-grow: 1;
    overflow: auto;
  }
</style>