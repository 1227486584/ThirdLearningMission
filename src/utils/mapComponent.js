import Vue from 'vue'
import LayoutHeader from "../components/LayoutHeader.vue"
const com = {
    "LayoutHeader": LayoutHeader,
}
var install = function () {
    Object.keys(com).forEach((key) => {
      Vue.component(key, com[key])
    })
  }
  
  export default install