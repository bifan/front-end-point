<template>
  <div id="app">
    <header>
      <h1>
        <img
          src="@/assets/Studio_Ghibli_logo.svg"
          alt="Studio Ghibli logo"
          class="ghibli-logo"
        />
        Ghibli 动画列表
        <div style="font-size: 1rem">
          数据来源: MyAnimeList.net by jikan.moe
        </div>
      </h1>

      <nav>
        <ul class="sort">
          <li class="sort__li">
            <button @click="changeSortStatus('sortYear')">
              年份排序<span class="sort--status">{{ sortYear }}</span>
            </button>
          </li>
          <li class="sort__li">
            <button @click="changeSortStatus('sortScope')">
              评分排序<span class="sort--status">{{ sortScope }}</span>
            </button>
          </li>
          <li class="sort__li">
            <span>评分区间: </span>
            <input
              class="sort__input"
              type="number"
              v-model="scoreStartComputed"
            />
            <span> - </span>
            <input
              class="sort__input"
              type="number"
              v-model="scoreEndComputed"
            />
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <Masonry :sortedAnimes="sortedAnimes"></Masonry>
    </main>
  </div>
</template>

<script>
import { getAnimes } from "./client.js";
import Masonry from "@/components/Masonry.vue";

export default {
  name: "App",
  components: { Masonry },
  data() {
    return {
      scoreStart: 8.2,
      scoreEnd: 10,
      sortYear: "👇",
      sortScope: "👇",
      animes: [],
      sortedAnimes: []
    };
  },
  mounted() {
    getAnimes().then(({ data }) => {
      this.animes = data;
      this.toFilter();
      this.toSort();
    });
  },
  computed: {
    scoreStartComputed: {
      get() {
        return this.scoreStart;
      },
      set(val) {
        this.scoreStart = val;
        this.toFilter();
      }
    },
    scoreEndComputed: {
      get() {
        return this.scoreEnd;
      },
      set(val) {
        this.scoreEnd = val;
        this.toFilter();
      }
    }
  },
  methods: {
    changeSortStatus(key) {
      if (this[key] === "👇") this[key] = "👆";
      else this[key] = "👇";
      this.toSort();
    },
    toSort() {
      this.sortedAnimes.sort((a, b) => {
        let compareYear = 0;
        if (this.sortYear === "👇") compareYear = a.airingDate - b.airingDate;
        else compareYear = b.airingDate - a.airingDate;
        // 只在年份相同时对评分排序
        if (compareYear === 0) {
          if (this.sortScope === "👇") return a.score - b.score;
          return b.score - a.score;
        }
        return compareYear;
      });
    },
    toFilter() {
      this.sortedAnimes = this.animes.filter(item => {
        const min = Math.min(this.scoreStart, this.scoreEnd);
        const max = Math.max(this.scoreStart, this.scoreEnd);
        if (item.score >= min && item.score <= max) return true;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ghibli-logo {
  width: 150px;
  // SVG color convert to CSS filter, 使用filter 改变SVG 颜色
  // https://codepen.io/sosuke/pen/Pjoqqp
  filter: invert(65%) sepia(1%) saturate(1685%) hue-rotate(26deg)
    brightness(105%) contrast(91%);
}
.sort {
  display: flex;
  // gap: 1em;
  &__li {
    margin-left: 1em;
    &:nth-of-type(1) {
      margin-left: 0;
    }
  }
  &__input {
    width: 3em;
    background-color: #333;
    color: #aaa;
    border: 1px solid #aaa;
  }
}
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
