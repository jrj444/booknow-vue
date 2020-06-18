<template>
  <Layout>
    <div class="tags">
      <ul class="exist-tags">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
      <div class="new-tag">
        <button>新增标签</button>
      </div>
    </div>
    <div>
      <label class="remark">
        <span class="name">备注</span>
        <input type="text" placeholder="在这里输入备注">
      </label>
    </div>
    <div>
      <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
    </div>
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
  </Layout>
</template>

<script>
  export default {
    name: "Money"
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

  .types {
    background: #c4c4c4;
    display: flex;
    text-align: center;
    font-size: 24px;

    > li {
      width: 50%;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333333;
      }
    }
  }

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

  .tags {
    padding: 16px;
    font-size: 14px;

    > .exist-tags {
      display: flex;

      > li {
        display: flex;
        align-items: center;
        background: #d9d9d9;
        height: 24px;
        border-radius: 12px;
        padding: 0 18px;
        margin-right: 16px;
      }
    }

    > .new-tag {
      padding-top: 16px;

      button {
        background: transparent;
        border: none;
        color: #999999;
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }
</style>