<template>
  <div class="about">
    <h1>Vuex Module 中的state: {{ a }}</h1>
    <!-- 通过mapMutations 的映射, 不再需要commit 了(this.$store.commit("plus")) -->
    <button @click="plus">递增</button>
    <hr />
    <h1>Vuex 中的state: {{ v }}</h1>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "About",
  computed: {
    // vuex module state 不能直接映射到vue 组件实例上
    ...mapState({
      // this.$store.state.modelA.a
      a: state => state.modelA.a
    }),
    // vuex state 是可以直接映射到vue 组件实例上的, 指定名称即可, 不用写函数
    ...mapState(
      // this.$store.state.v
      ["v"]
    )
  },
  methods: {
    // Vuex Module 中的 mutations 和全局的mutations 一样用
    // 不像Module state 有自己的命名空间
    ...mapMutations(["plus"])
  },
  mounted() {
    console.log("this:", this);
  }
};
</script>
