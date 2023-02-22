<template>
  <Header />
    <v-container class="fill-height">
        <v-responsive class="d-flex align-center text-center fill-height">
          <v-radio-group v-model="radios">
            <template v-slot:label>
                <div><strong>翻訳エンジンを選択してください</strong></div>
            </template>
            <v-radio value="Google">
                <template v-slot:label>
                <div><strong class="text-success">GoogleCloudTranslate</strong></div>
                </template>
            </v-radio>
            <v-radio value="DeepL">
                <template v-slot:label>
                <div><strong class="text-primary">DeepL</strong></div>
                </template>
            </v-radio>
            </v-radio-group>
            <div v-if="radios==='Google'">
              <TranslateWithG/>
            </div>
            <div v-else>
              <TranslateWithD/>
            </div>
        </v-responsive>
    </v-container>
</template>

<script setup>
  import Header from '@/components/Header.vue'
  import TranslateWithG from '@/components/TranslateWithG.vue'
  import TranslateWithD from '@/components/TranslateWithD.vue'
  import { ref } from 'vue';

  let radios = ref('Google');	

</script>
