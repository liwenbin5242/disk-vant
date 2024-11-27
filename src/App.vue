<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<style>
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}

#app {
  /* 兼容pc */
  max-width: 600px;
  margin: 0 auto;
  background-color: #f8f8f8;
  padding-bottom: 50px;
  box-sizing: border-box;
}

</style>
