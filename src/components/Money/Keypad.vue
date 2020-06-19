<template>
  <div class="keypad">
    <div class="display">{{output}}</div>
    <div class="buttons">
      <button @click="numInput">7</button>
      <button @click="numInput">8</button>
      <button @click="numInput">9</button>
      <button @click="remove">删除</button>
      <button @click="numInput">4</button>
      <button @click="numInput">5</button>
      <button @click="numInput">6</button>
      <button @click="clear">清空</button>
      <button @click="numInput">1</button>
      <button @click="numInput">2</button>
      <button @click="numInput">3</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="numInput" class="zero">0</button>
      <button @click="numInput">.</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Keypad extends Vue {
    output = '0';

    numInput(event: MouseEvent) {
      const button = (event.target as HTMLButtonElement);
      const input = button.textContent as string;
      if (this.output.length === 16) {return;}
      if (this.output === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          this.output = input;
        } else {
          this.output += input;
        }
        return;
      }
      if (this.output.indexOf('.') >= 0 && input === '.') {return;}
      this.output += input;
    }

    remove() {
      if (this.output.length === 1) {
        this.output = '0';
      } else {
        this.output = this.output.slice(0, -1);
      }
    }

    clear() {
      this.output = '0';
    }

    ok() {
      this.$emit('update:value', this.output);
    }
  }
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