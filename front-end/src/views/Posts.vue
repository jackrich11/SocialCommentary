<template>
  <div id="posts">
    <h3>There's no comments yet. Start a post by going to the "Create" page!</h3>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      size: 0
    }
  }
}
</script>

<style scoped>
  #posts h3 {
    color: #7B7B8E !important;
  }
</style>