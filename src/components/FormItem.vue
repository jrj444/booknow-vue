<template>
  <div class="form-wrapper">
    <label class="form-item">
      <span class="name">{{this.filedName}}</span>
      <input type="text" v-model="value" :placeholder="this.placeholder">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class FormItem extends Vue {
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
  .form-item {
    display: flex;
    font-size: 14px;
    padding: 11px;
    line-height: 22px;

    > .name {
      margin-right: 16px;
    }

    > input {
      border: none;
      background: transparent;
      flex-grow: 1;
    }
  }

</style>