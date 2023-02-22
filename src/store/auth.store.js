import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        token: null,
        authUser: null,
        returnUrl: null,
    }),
    persist: {
        enabled: true,
        strategies: [
        {
            key: 'user',
            storage: localStorage,
        },
        ],
    },
    actions: {        
        async login(username, password) {
            const params = new URLSearchParams();
            params.append('username', username);
            params.append('password', password);

            let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            };

            axios.post('https://backend-vywov25xua-as.a.run.app/auth/token/', params, config)
            .then((response) => {
            this.authUser = username;
            this.token = response.data.access_token
            localStorage.setItem('token', JSON.stringify(response.data));
            // router.push('/');
            router.push(this.returnUrl || '/');
            })
            .catch((err) => {
            console.log("Error = ", err)
            })
        },
        logout() {
            alert("ログアウトします。")
            this.authUser = null;
            this.token = null;
            this.returnUrl = null;
            localStorage.removeItem('token');
            router.go({path:'/', force: true});
            
        }
    }
});