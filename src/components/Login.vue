<template>
    <v-card color="blue-grey-lighten-5" class="d-flex flex-column mx-auto my-6 flat" width="400" >
        <v-card-text>
            <p class="mb-0 font-weight-bold text-center">ログイン</p>
        </v-card-text>
            <Form @submit="onSubmit" :validation-schema="schema" class="ma-12">
                <p class="mb-0 font-weight-bold">メールアドレス</p>
                <TextFieldWithValidation name="username" label="E-mail" type="email" />
                <p class="mb-0 font-weight-bold">パスワード</p>
                <TextFieldWithValidation name="password" label="Password" type="password" />
                <div class="text-center">
                <v-btn color="green" class="" type="submit" >ログイン</v-btn>
                </div>
            </Form>
            <RouterLink to="/signup" class="text-center">アカウントを作成する</RouterLink>
    </v-card>
</template>

<script setup>
    import { Form } from 'vee-validate';
    import * as yup from 'yup';
    import { useAuthStore } from '@/store';
    import TextFieldWithValidation from '@/components/_TextFieldWithValidation.vue';

    const schema = yup.object().shape({
        username: yup.string().email().required().label('E-mail'),
        password: yup.string().min(8).required(),
    });

    function onSubmit(values, setErrors) {
        const authStore = useAuthStore();
        const { username, password } = values;
        return authStore.login(username, password)
            .catch(error => setErrors({ apiError: error }));
    }
</script>
