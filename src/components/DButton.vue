<template>
  <button class="button" @click="$emit('click', $event)">
    <slot/>
  </button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class DButton extends Vue {

  }
</script>

<style lang="scss" scoped>
  .button {
    background: #41B883;
    font-size: 17px;
    padding: 9px 16px;
    line-height: 22px;
    border-radius: 4px;
    border: none;
    color: #fff;
  }
</style>