<template>
  <div class="selected-list">
    <slot v-if="Object.keys(selected).length"></slot>
    <span v-else>Пока ничего не выбрано</span>
    <ul>
      <li v-for="(elem, select, id) in selected" :key="id">Из селекта {{select}} выбраны значения: {{elem.join(',')}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SelectedList",
  props: {
    selected: Object,
  },
  data() {
    return {
      list: this.selected,
    }
  },
}
</script>

<style scoped lang="scss">
.selected-list {
  width: 50%;
  margin: 50px auto 0;
}

</style>