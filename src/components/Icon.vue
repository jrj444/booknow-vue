<template>
  <svg class="icon" @click="$emit('click', $event)">
    <use :xlink:href="'#' + name"/>
  </svg>
</template>

<script>
  const importAll = (requireContext) => requireContext.keys().forEach(requireContext);
  try {
    importAll(require.context("../assets/icons", true, /\.svg$/));
  } catch (e) {
    console.log(e);
  }

  export default {
    name: "Icon",
    props: ["name"]
  };
</script>

<style>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>