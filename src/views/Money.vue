<template>
  <Layout class-prefix="layout">
    <Tags/>
    <Remark/>
    <Types/>
    <keypad/>
  </Layout>
</template>

<script>
  import Tags from "@/components/Money/Tags";
  import Remark from "@/components/Money/Remark";
  import Types from "@/components/Money/Types";
  import Keypad from "@/components/Money/Keypad";

  export default {
    name: "Money",
    components: {Keypad, Types, Remark, Tags}
  };
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;

    .tags {
      order: 2;
    }

    .remark-wrapper {
      order: 1;
    }

    .keypad {
      order: -1;
    }
  }
</style>