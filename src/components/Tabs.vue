<template>
  <ul class="tabs">
    <li v-for="item in dataSource" :key="item.value" @click="select(item)"
        :class="{selected:item.value === value, [classPrefix+'-tabs-item']:classPrefix}" class="tabs-item">
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array}) dataSource!: DataSourceItem[];
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;

  select(item: DataSourceItem) {
    this.$emit('update:value', item.value);
  }
}
</script>

<style lang="scss">
.tabs {
  display: flex;
  text-align: center;
  font-size: 18px;
  background: #fff;

  .tabs-item {
    width: 50%;
    height: 48px;
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
      background: #f46064;
    }
  }
}
</style>