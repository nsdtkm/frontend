// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store';
import { Top, SignupView, LoginView, TranslateView} from '@/views';

export const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        {path: '/',name: 'Top',component: Top},
        {path: '/login', name:'LoginView', component: LoginView},
        {path: '/signup', name:'SignupView', component: SignupView},
        {path: '/translate', name:'TranslateView', component: TranslateView},
    ]
});

router.beforeEach(async (to,) => {
    // to（遷移先）がログインを必要とするページで、未ログイン状態なら、ログインページへリダイレクト
    const publicPages = ['/', '/signup', '/login'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();
    console.log("to.fullPath=",to.fullPath," authRequired=",authRequired, "  auth.authUser=",auth.authUser)
    if (authRequired==true & auth.authUser==null) { //認証されておらず、認証が必要なページに入る
        auth.returnUrl = to.fullPath;
        return '/login';// リダイレクト先
    }else{
        return true 
    }
});
export default router
