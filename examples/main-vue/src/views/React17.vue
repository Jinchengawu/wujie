<template>
  <!--保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化 -->
  <WujieVue
    width="100%"
    height="100%"
    name="react17"
    :url="react17Url"
    :sync="true"
    :alive="true"
    :fetch="fetch"
    :degrade="degrade"
    :props="props"
    :attrs="attrs"
    :beforeLoad="lifecycles.beforeLoad"
    :beforeMount="lifecycles.beforeMount"
    :afterMount="lifecycles.afterMount"
    :beforeUnmount="lifecycles.beforeUnmount"
    :afterUnmount="lifecycles.afterUnmount"
    :activated="lifecycles.activated"
    :deactivated="lifecycles.deactivated"
    :loadError="lifecycles.loadError"
  ></WujieVue>
</template>

<script>
import hostMap from "../hostMap";
import fetch from "../fetch";
import lifecycles from "../lifecycle";
import wujieVue from "wujie-vue2";
export default {
  data() {
    return {
      react17Url: hostMap("//localhost:7100/"),
      props: { jump: this.jump },
      // 修正iframe的url，防止github pages csp报错
      attrs: process.env.NODE_ENV === "production" ? { src: hostMap("//localhost:7100/") } : {},
      fetch,
      lifecycles,
      degrade: window.localStorage.getItem("degrade") === "true",
    };
  },
  mounted() {
    // 告诉子应用要跳转哪个路由
    this.$route.params.path && wujieVue.bus.$emit("react17-router-change", `/${this.$route.params.path}`);
  },
  methods: {
    jump(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss" scoped></style>
