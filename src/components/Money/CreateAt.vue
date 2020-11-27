<template>
  <div class="createAt-wrapper">
    <label class="createAt">
      <input type="date" :value="x(value)" @input="onValueChanged($event.target.value)">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class CreateAt extends Vue {
  @Prop({default: ''}) value!: string;

  onValueChanged(newValue: string) {
    this.$emit('update:value', newValue);
  }

  x(isoString: string) {
    return dayjs(isoString).format('YYYY-MM-DD');
  }
}
</script>

<style scoped lang="scss">
.createAt {
  display: flex;
  font-size: 14px;
  padding: 11px;
  line-height: 22px;

  > input {
    border: none;
    background: transparent;
    flex-grow: 1;
  }
}
</style>