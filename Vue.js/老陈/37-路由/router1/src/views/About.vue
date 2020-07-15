<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: "about",
  mounted() {
    console.log("this:", this);
    console.log("this.$router.history.current:", this.$router.history.current);
    console.log("this.$route:", this.$route);
    console.log(
      "this.$router.history.current === this.$route:",
      this.$router.history.current === this.$route
    );
  }
};
</script>
