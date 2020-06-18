<template>
  <div class="keypad">
    <div class="display">100</div>
    <div class="buttons">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="ok">OK</button>
      <button class="zero">0</button>
      <button>.</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Keypad"
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .keypad {
    font-size: 18px;

    > .display {
      font-size: 36px;
      font-family: Consolas, monospace;
      padding: 9px 16px;
      text-align: right;
      box-shadow: inset 0 -3px 3px -3px rgba(0, 0, 0, 0.25);
    }

    > .buttons {
      @extend %clear-fix;

      > button {
        height: 64px;
        width: 25%;
        border: none;
        float: left;
      }

      > .ok {
        height: 128px;
        float: right;
      }

      > .zero {
        width: 50%;

      }

    }

  }
</style>