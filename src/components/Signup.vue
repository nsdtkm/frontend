<template>
    <v-card color="blue-grey-lighten-5" class="d-flex flex-column mx-auto my-6 flat" width="400" >
        <v-card-text>
            <p class="mb-0 font-weight-bold text-center">登録</p>
        </v-card-text>
            <Form @submit="onSubmit" :validation-schema="schema" class="ma-12">
                <p class="mb-0 font-weight-bold">メールアドレス</p>
                <TextFieldWithValidation name="username" label="E-mail" type="email" />
                <p class="mb-0 font-weight-bold">パスワード</p>
                <TextFieldWithValidation name="password" label="Password" type="password" />
                <p class="mb-0 font-weight-bold">パスワード(確認)</p>
                <TextFieldWithValidation name="passwordConfirm" label="Password Confim" type="password"/>
                <div class="text-center">
                    <v-btn color="green" class="" type="submit" >登録</v-btn>
                </div>
            </Form>
    </v-card>
</template>


<script setup>
    import { Form } from 'vee-validate';
    import * as yup from 'yup';
    import axios from 'axios';
    import router from '@/router'
    import TextFieldWithValidation from '@/components/_TextFieldWithValidation.vue';

    const schema = yup.object().shape({
        username: yup.string().email().required().label('E-mail'),
        password: yup.string().min(8).required(),
        passwordConfirm: yup
            .string()
            .oneOf([yup.ref('password')], 'パスワードが一致しません')
            .required()
            .label('パスワード確認'),
    });
    function onSubmit(values, setErrors){
        const { username, password } = values;
        axios.post('https://backend-vywov25xua-as.a.run.app/user/create/',{username, password})
            .then((response) => {
            console.log(response.data)
            router.push('/');
            })
            .catch((err) => {
            console.log("Error = ", err)
            })
    }

</script>
