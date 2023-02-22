<template>
    <v-dialog transition="dialog-bottom-transition" width="auto" >
    <!-- <v-dialog transition="dialog-bottom-transition" width="auto" v-if="!dialog_flg"> -->
        <template v-slot:activator="{ props }">
        <v-btn v-bind="props" style="text-transform: none">DeepL API keyを登録</v-btn> 
        </template>
        <template v-slot:default="{ isActive }">
            <v-card width="500">
                <v-toolbar title="DeepL API Keyを登録"></v-toolbar>
                    <Form @submit="onSubmit" :validation-schema="schema" class="ma-12">
                        <p class="mb-0 font-weight-bold">DeepL API key</p>
                        <TextFieldWithValidation name="deepl_apikey" label="API-key" type="text" />
                        <div class="text-center">
                            <v-btn color="green" class="" type="submit" >登録</v-btn>
                        </div>
                    </Form>
                <v-card-actions class="justify-end">
                    <v-btn variant="text" @click="isActive.value = false">Close</v-btn>
                </v-card-actions>
            </v-card>
            <p>test</p>
        </template>
    </v-dialog>
</template>

<script setup>
import { useAuthStore } from '@/store';
import axios from 'axios';
import { Form } from 'vee-validate';
import * as yup from 'yup';
import TextFieldWithValidation from '@/components/_TextFieldWithValidation.vue';

    const schema = yup.object().shape({
        deepl_apikey: yup.string().required().label('API-key'),
    });
    // let dialog_flg=false

    function onSubmit(values, setErrors) {
        const { deepl_apikey } = values;
        const authStore = useAuthStore();

        const config = {
            headers:{
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+authStore.token,
            },
        }
        // const params = new URLSearchParams();
        // params.append('deepl_apikey', deepl_apikey);
        // console.log(params)
        // console.log("deepl_apikey",deepl_apikey)
        axios.post('https://backend-vywov25xua-as.a.run.app/user/upload_deepl_credential/',{deepl_apikey},config)
            .then((response) => {
            console.log(response.data)
            // setTimeout(function(){dialog_flg=true}, 3000);
            })
            .catch((err) => {
            console.log("Error = ", err)
            })
    }
</script>