<template>
  <v-main>
    <Header />
    <div v-if="is_login"><LoginSuccessAlert /></div>
    <v-container class="fill-height">
        <v-responsive class="d-flex align-center text-center fill-height">
        <div class="text-body-2 font-weight-light mb-n1">字幕ファイルを一括で多言語翻訳します!</div>
        <v-btn to="translate" variant="outlined">翻訳ページへ</v-btn>
        </v-responsive>
      </v-container>
  </v-main>
</template>

<script setup>
  import Header from '@/components/Header.vue'
  import LoginSuccessAlert from '@/components/LoginSuccessAlert.vue'
  import router from '@/router'
  import { computed, ref } from "vue";
  let is_login = false

  is_login= computed(() =>{
    router.afterEach((from,to)=>{
        console.log("afterEach from.path",to.path) 
        if (from.path=="/login"){
          return true
        }else{
          return false
        }
      })
})
</script>
