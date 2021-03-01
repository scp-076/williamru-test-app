<template>
  <div id="app">
    <img v-if="!isLoading" alt="Vue logo" src="./assets/logo.png">
    <h1 v-if="isLoading && !hasFetchError">Загрузка...</h1>
    <h1 v-else-if="hasFetchError">Произошла ошибка</h1>
    <div v-else class="select">
      <multiselect v-for="(elem, key, id) in options"
                   v-model="selected[key]"
                   :options="options[key]"
                   :key="id"
                   @select="formPrevState($event, key)"
                   class="select"
                   :multiple="true"
                   :close-on-select="false"
                   :searchable="false"
      />
      <Selected-list :selected="selected">Selected:</Selected-list>
    </div>
    <div class="btns">
      <button @click="returnPrevState" :disabled="!this.previouslySelected.length">Отменить последнее действие</button>
      <button @click="resetState" :disabled="!this.previouslySelected.length">Сбросить</button>
    </div>
  </div>
</template>

<script>
import {arrConcat, formSelectOptions} from './utils';
import Multiselect from 'vue-multiselect';
import SelectedList from "@/components/SelectedList";

export default {
  name: 'App',
  components: {Multiselect, SelectedList},
  data() {
    return {
      options: {},
      selected: {},
      previouslySelected: [],
      hasFetchError: false,
      isLoading: true,
    }
  },
  async created() {
    const URL = 'https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json';
    const dbData = await fetch(URL).then(res => res.json()).catch(() => this.hasFetchError = true);
    dbData ? this.formatData(dbData.testArr) : this.hasFetchError = true;
    // Имитация задержки загрузки данных
    dbData ? setTimeout(() => this.isLoading = false, 500) : null;
  },
  methods: {
    // Для форматирования вложенных массивов и формирования обьекта селектов options
    formatData(dataArr) {
      let formattedData = [], subStr = [], subNum = [], subObj = [];
      arrConcat(formattedData, dataArr);
      for (let i = 0; i < formattedData.length; i++) {
        switch (typeof formattedData[i]) {
          case 'string':
            subStr.push(formattedData[i]);
            break;
          case 'number':
            subNum.push(formattedData[i]);
            break;
          case 'object':
            formattedData[i]?.constructor === Object && Object.keys(formattedData[i]).length
                ? subObj.push(formattedData[i])
                : null
            break;
        }
      }
      formSelectOptions(this, subStr, subNum, subObj);
    },
    formPrevState() {
      this.previouslySelected.push(Object.assign({}, this.selected));
    },
    resetState() {
      this.selected = {};
      this.previouslySelected = [];
    },
    returnPrevState() {
      this.selected = this.previouslySelected[this.previouslySelected.length - 1];
      this.previouslySelected.length = this.previouslySelected.length - 1;
    },
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.select {
  width: 50%;
  margin: 10px auto;
}

.btns {
  margin-top: 50px;

  & button {
    margin: 0 20px;
    padding: 10px;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
