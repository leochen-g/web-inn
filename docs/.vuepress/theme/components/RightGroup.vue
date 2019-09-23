<template>
  <div class="right-group">
    <div v-for="item in list" class="item">
      <span class="title">{{ item.title }}</span>
      <span class="desc">{{ item.desc }}</span>
      <img width="100%" :src="item.imgSrc" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "RightGroup",
  computed: {
    list() {
      const { themeConfig } = this.$site;
      return themeConfig.rightGroup;
    }
  }
};
</script>

<style lang="stylus">
@media (max-width: $MQNarrow)
    .right-group 
        display none;
.right-group {
  position: fixed;
  right: 100px;
  top: 100px;
  width: 150px;

  .item {
    text-align: center;
    margin-bottom: 30px;

    .title {
      display: inline-block;
      color: #2878ff;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 5px;
    }

    .desc {
      display: inline-block;
      color: #333;
      font-size: 11px;
      margin-bottom: 10px;
    }

    img {
      vertical-align: middle;
      border-style: none;
      width: 100%;
    }
  }
}

</style>