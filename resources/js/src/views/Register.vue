<template>
	<div class="hold-transition register-page">
		<div class="register-box">
			<div class="card card-outline card-primary">
				<div class="card-header text-center">
					<a href="../../index2.html" class="h1"><b>Admin</b>LTE</a>
				</div>
				<div class="card-body">
					<p class="login-box-msg">Register a new membership</p>
					<form @submit.stop.prevent>
						<div class="input-group mb-3">
							<input type="text" class="form-control" placeholder="Full name" v-model="form.name">
							<div class="input-group-append">
								<div class="input-group-text">
									<span class="fas fa-user"></span>
								</div>
							</div>
						</div>
						<div class="input-group mb-3">
							<input type="email" class="form-control" placeholder="Email" v-model="form.email">
							<div class="input-group-append">
								<div class="input-group-text">
									<span class="fas fa-envelope"></span>
								</div>
							</div>
						</div>
						<div class="input-group mb-3">
							<input type="password" class="form-control" placeholder="Password" v-model="form.password">
							<div class="input-group-append">
								<div class="input-group-text">
									<span class="fas fa-lock"></span>
								</div>
							</div>
						</div>
						<div class="input-group mb-3">
							<input type="password" class="form-control" placeholder="Retype password" v-model="form.password_confirmation">
							<div class="input-group-append">
								<div class="input-group-text">
									<span class="fas fa-lock"></span>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-8">
								<div class="icheck-primary">
									<input type="checkbox" id="agreeTerms" name="terms" value="agree">
									<label for="agreeTerms">
									I agree to the <a href="#">terms</a>
									</label>
								</div>
							</div>
							<div class="col-4">
								<button @click="register()" class="btn btn-primary btn-block">Register</button>
							</div>
						</div>
					</form>
					<div class="social-auth-links text-center">
						<a href="#" class="btn btn-block btn-primary">
						<i class="fab fa-facebook mr-2"></i>
						Sign up using Facebook
						</a>
						<a href="#" class="btn btn-block btn-danger">
						<i class="fab fa-google-plus mr-2"></i>
						Sign up using Google+
						</a>
					</div>
					
                    <router-link :to="{ name: 'login' }" class="text-center">I already have a membership</router-link>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import store from "../store"
import { useRouter } from "vue-router"
import Form from "../helpers/Form"

export default defineComponent({
    name: "register",
    setup() {        
        
        const router = useRouter()
        let isSubmitting = ref(false)

        let form = ref(new Form({
            name					: "",
            email					: "",
            password				: "",
            password_confirmation	: ""
        }))

        const register = async() => {
            let response = await form.value.post("/register")            
            await store.dispatch("login",response)
            router.push({ name: "demo.index"})
        }

        return {
            form,
            isSubmitting,
            register
        }
    },
})
</script>