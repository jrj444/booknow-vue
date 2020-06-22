<template>
  <div class="remark-wrapper">
    <label class="remark">
      <span class="name">{{filedName}}</span>
      <input type="text" v-model="value" :placeholder="placeholder">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class Remark extends Vue {
    value = '';
    @Prop({required: true}) filedName!: string;
    @Prop() placeholder?: string;

    @Watch('value')
    onValueChanged(newValue: string) {
      this.$emit('update:value', newValue);
    }
  }
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