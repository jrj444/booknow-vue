<template>
  <div class="keypad">
    <div class="display">{{ output }}</div>
    <div class="buttons">
      <button @click="numInput">7</button>
      <button @click="numInput">8</button>
      <button @click="numInput">9</button>
      <button @click="remove" class="remove">
        <Icon name="backspace"></Icon>
      </button>
      <button @click="numInput">4</button>
      <button @click="numInput">5</button>
      <button @click="numInput">6</button>
      <button @click="clear" class="clear">清空</button>
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
import {Component, Prop} from 'vue-property-decorator';
import CreateAt from '@/components/Money/CreateAt.vue';
import Icon from '@/components/Icon.vue';

@Component({
  components: {Icon, Date: CreateAt}
})
export default class Keypad extends Vue {
  @Prop(Number) readonly value!: number;
  output = this.value.toString();

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
    const toNum = parseFloat(this.output);
    this.$emit('update:value', toNum);
    this.$emit('submit', toNum);
    this.output = '0';
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
      height: 50px;
      width: 25%;
      text-align: center;
      border: none;
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #353c4f;
      color: #fff;

      > .icon {
        width: 28px;
        height: 28px;
      }
    }

    > .ok {
      height: calc(50 * 2px);
      float: right;
      background: #f46064;
    }

    > .zero {
      width: 50%;
    }
  }
}
</style>