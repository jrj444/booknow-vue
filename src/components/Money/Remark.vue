<template>
  <div class="remark-wrapper">
    <label class="remark">
      <span class="name">备注</span>
      <input type="text" placeholder="在这里输入备注">
    </label>
  </div>
</template>

<script>
  export default {
    name: "Remark"
  };
</script>

<style lang="scss" scoped>
  .remark {
    display: flex;
    font-size: 14px;
    background: #e5e5e5;
    padding: 16px;
    line-height: 22px;

    .name {
      margin-right: 16px;
    }

    input {
      border: none;
      background: transparent;
      flex-grow: 1;
    }
  }

</style>