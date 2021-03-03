<template>
  <div class="selected-list">
    <span v-show="isSelected">Selected:</span>
    <span v-show="!isSelected">Пока ничего не выбрано</span>
    <ul v-show="isSelected">
      <li v-for="(elem, select, id) in selected" :key="id">Из селекта {{select}} выбраны значения: {{arrToString(elem)}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SelectedList",
  props: {
    selected: Object,
  },
  computed: {
    isSelected() {
      for (let key in this.selected) {
        if (this.selected[key].length) return true;
      }
      return false;
    },
  },
  methods: {
    arrToString(arr) {
      return arr.join(',');
    },
  }
}
</script>

<style scoped lang="scss">
.selected-list {
  width: 60%;
  margin: 50px auto 0;
}

</style>