<template>
    <v-app-bar fixed color="blue-grey">
        <v-toolbar-title @click="$router.push('/')" style="pointer:"> .srt Translator</v-toolbar-title>
        <v-spacer></v-spacer>

        <!-- 非ログイン時 -->
        <template v-if="!authUser">
            <v-btn to="/signup">Sign Up</v-btn>
            <v-btn to="login" variant="outlined">Login</v-btn>
        </template>

        <!-- ログイン時 -->
        <template v-if="authUser">
            <v-row justify="end">
                <v-col cols="auto">
                    <GoogleCredUpload/>
                </v-col>

                <v-col cols="auto">
                    <DeepLAPIUpload/>
                </v-col>
                <v-col cols="auto">
                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn style="text-transform: none" v-bind="props">{{authUser}}</v-btn>
                        </template>
                        <v-list>
                            <v-list-item >
                                <v-list-item-title>
                                    <a @click="authStore.logout()" class="nav-item nav-link">ログアウト</a>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
        </template>
    </v-app-bar>
</template>

<script setup>
    import GoogleCredUpload from '@/components/GoogleCredUpload.vue'
    import DeepLAPIUpload from '@/components/DeepLAPIUpload.vue'

    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/store';
    const authStore = useAuthStore();
    const { authUser } = storeToRefs(authStore);
    console.log(authUser)
</script>