<template>
  <div>
    <ul class="anime-list">
      <li
        class="anime-list__li"
        v-for="anime in sortedAnimes"
        :key="anime.uniqueKey"
      >
        <figure>
          <img :src="anime.image" :alt="anime.title" />
          <figcaption>
            <div>名称: {{ anime.title }}</div>
            <div style="margin-left: 2.5em">
              (<a :href="doubanSearch + anime.title" target="_blank">豆瓣搜索</a
              >)
            </div>
            <div>评分: {{ anime.score }}⭐</div>
            <div>年份: {{ anime.airingDate }}</div>
          </figcaption>
        </figure>
      </li>
    </ul>
  </div>
</template>

<script>
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

export default {
  name: "Masonry",
  props: {
    sortedAnimes: {
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      doubanSearch:
        "https://search.douban.com/movie/subject_search?search_text="
    };
  },
  methods: {
    doMasonryLayout() {
      imagesLoaded(".anime-list", () => {
        new Masonry(".anime-list", {
          itemSelector: ".anime-list__li",
          gutter: 10,
          fitWidth: true
        });
      });
    }
  },
  // mounted() {
  //   this.doMasonryLayout();
  // },
  watch: {
    sortedAnimes: {
      // immediate: true,
      // deep: true,
      handler() {
        this.$nextTick(() => {
          this.doMasonryLayout();
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.anime-list {
  display: flex;
  flex-wrap: wrap;
  &__li {
    margin-right: 1em;
    margin-bottom: 1em;
    max-width: 225px;
  }
}
</style>
