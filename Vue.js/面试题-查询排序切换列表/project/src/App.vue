<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li>
            <button @click="useList">列表视图</button>
          </li>
          <li>
            <button @click="useGrid">网格视图</button>
          </li>
          <li><input type="search" v-model="searchKey" /></li>
        </ul>
      </nav>
    </header>
    <main>
      <!-- <template v-if="fileNames.length > 0"> -->
      <ListView v-if="useListView" :fileNames="filtedFileNames"></ListView>
      <GridView v-else :fileNames="filtedFileNames"></GridView>
      <!-- </template> -->
    </main>
  </div>
</template>

<script lang="ts">
// import { Component, Vue } from "vue-property-decorator";
import { getFileNames } from "./client.js";
import GridView from "@/components/GridView.vue";
import ListView from "@/components/ListView.vue";

export default {
  name: "App",
  components: {
    GridView,
    ListView
  },
  data() {
    return {
      useListView: true,
      fileNames: [],
      searchKey: "",
      filtedFileNames: []
    };
  },
  mounted() {
    getFileNames().then(({ data }) => {
      this.fileNames.push(...data);
      this.filtedFileNames.push(...data);
    });
  },
  methods: {
    useList() {
      this.useListView = true;
    },
    useGrid() {
      this.useListView = false;
    }
  },
  watch: {
    searchKey(newKey) {
      // this.searchKey = newKey;
      this.filtedFileNames = this.fileNames.filter(item =>
        item.fileName.includes(newKey)
      );
      console.log("this.filtedFileNames :", this.filtedFileNames);
      console.log("newKey:", newKey);
    }
  }
  // computed: {
  //   searchName: {
  //     get() {
  //       return this.seachKey;
  //     },
  //     set(newSeachKey) {
  //       this.searchKey = newSeachKey;
  //       return this.fileNames.filter(item => {
  //         item.fileName.includes(newSeachKey);
  //       });
  //     }
  //   }
  // }
};

// @Component({
//   components: { GridView, ListView }
// })
// export default class App extends Vue {
//   private useListView = true;
//   private fileNames = [];
//   mounted() {
//     getFileNames().then(({ data }) => {
//       this.fileNames = data;
//     });
//   }
//   get useList() {
//     return this.useListView;
//   }
//   set useList(placeholder) {
//     this.useListView = true;
//   }
//   get useGrid() {
//     return this.useListView;
//   }
//   set useGrid(placeholder) {
//     this.useListView = false;
//   }
// }
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  padding: 0;
  list-style: none;
}
li {
  margin-right: 1em;
}
</style>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background-color: #333;
  color: #aaa;
}
</style>
