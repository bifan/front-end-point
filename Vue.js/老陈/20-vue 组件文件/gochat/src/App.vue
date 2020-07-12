<template>
  <div id="app">
    <div class="app__container">
      <div class="app__left">
        <ChatArea :curUser="curUser" />
        <ChatMsg :msgList="msgList" />
        <ChatInput :sendMsg="sendMsg" />
      </div>
      <div class="app__right">
        <UserList :userList="userList" @click="toggleCurUser" />
      </div>
    </div>
  </div>
</template>

<script>
import ChatArea from "./components/ChatArea.vue";
import ChatMsg from "./components/ChatMsg.vue";
import ChatInput from "./components/ChatInput.vue";
import UserList from "./components/UserList.vue";

export default {
  name: "App",
  components: {
    ChatArea,
    ChatMsg,
    ChatInput,
    UserList
  },
  data() {
    return {
      userList: [],
      msgList: [],
      curUser: null
    };
  },
  methods: {
    toggleCurUser(index) {
      this.curUser = this.userList[index];
    },
    sendMsg(msg) {
      this.msgList.push({
        user: this.curUser,
        msg: msg
      });
    }
  },
  created() {
    this.userList.push(
      ...[
        {
          key: 1,
          name: "ming",
          // 开发中用的url 和构建后用的url 可能不同
          // 比如放在不同的文件夹中以便支持不同的格式和大小
          // 比如文件名增加了随机数以便更新缓存
          imgUrl: require("./assets/avatar/1.jpg")
        },
        {
          key: 2,
          name: "mei",
          imgUrl: require("./assets/avatar/2.jpg")
        },
        {
          key: 3,
          name: "niu",
          imgUrl: require("./assets/avatar/3.jpg")
        },
        {
          key: 4,
          name: "po",
          imgUrl: require("./assets/avatar/4.jpg")
        }
      ]
    );
    this.curUser = this.userList[0];
  }
};
</script>

<style scoped>
#app {
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
.app__container {
  display: flex;
  border: 1px solid #aaa;
}
.app__left {
  width: 20em;
}
.app__right {
  width: 10em;
  background-color: darkcyan;
  color: #ccc;
}
</style>
