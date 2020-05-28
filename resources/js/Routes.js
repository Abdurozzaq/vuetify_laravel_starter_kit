import multiguard from 'vue-router-multiguard';
import axios from 'axios'

import UserLayout from "./layouts/Dashboard-User.vue";
import AdminLayout from "./layouts/Dashboard-Admin.vue";

// For Auth
import Login from "./pages/auth/Login.vue"
import Register from "./pages/auth/Register.vue"
import ForgotPassword from "./pages/auth/ForgotPassword.vue"
import ResetPassword from "./pages/auth/ResetPassword.vue"
import ResendVerificationMail from "./pages/auth/ResendVerificationMail.vue"
import RedirectAfterVerify from "./pages/auth/RedirectAfterVerify.vue"

import Component from "./components/ExampleComponent.vue"

/**
 *
 * For Authenticated
 * And Not Authenticated
 *
 * Guard
 */
const ifAuthenticated = (to, from, next) => {
    if (localStorage.getItem('userToken')) {
        next()
        return
    } else {
        next('/login')
    }
}
  
const ifNotAuthenticated = (to, from, next) => {
    if (!localStorage.getItem('userToken')) {
        next()
    } else {
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.get('/api/get-user')
                .then(function (response) {
                    // handle success
                    let userRole = response.data.role
                    if (userRole == "admin") {
                        next('/siAdmino')
                        return
                    } else {
                        next('/home')
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        });
    }
}

const adminOnly = (to, from, next) => {
    axios.get('/sanctum/csrf-cookie').then(response => {
        axios.get('/api/get-user')
            .then(function (response) {
                // handle success
                let userRole = response.data.role
                if (userRole == "admin") {
                    next()
                    return
                } else {
                    next('/login')
                    return
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    });
}

const userOnly = (to, from, next) => {
    axios.get('/sanctum/csrf-cookie').then(response => {
        axios.get('/api/get-user')
            .then(function (response) {
                // handle success
                let userRole = response.data.role
                if (userRole == "user") {
                    next()
                    return
                } else {
                    next('/login')
                    return
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    });
}

export const routes = [
    {
        path: "/home",
        component: UserLayout,
        children: [
            {
                path: "",
                component: Component,
                beforeEnter: multiguard([ifAuthenticated, userOnly]),
            }
        ]
    },
    {
        path: "/siAdmino",
        component: AdminLayout,
        children: [
            {
                path: "",
                component: Component,
                beforeEnter: multiguard([ifNotAuthenticated, adminOnly]),
            },
        ]
    },

    /**
     * For Authentication Purposes
     */
    {
        path: "/login",
        component: Login,
        beforeEnter: multiguard([ifNotAuthenticated]),
    },
    {
        path: "/register",
        component: Register,
        beforeEnter: multiguard([ifNotAuthenticated]),
    },
    {
        path: "/forgot-password",
        component: ForgotPassword,
        beforeEnter: multiguard([ifNotAuthenticated]),
    },
    {
        path: "/reset-password",
        component: ResetPassword,
        beforeEnter: multiguard([ifNotAuthenticated]),
    },
    {
        path: "/resend-verification-mail",
        component: ResendVerificationMail,
        beforeEnter: multiguard([ifNotAuthenticated]),
    },
    {
        path: "/verification-success",
        component: RedirectAfterVerify,
        beforeEnter: multiguard([ifNotAuthenticated]),
    }
];


