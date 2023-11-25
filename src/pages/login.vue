

<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <a href="https://www.passagemverde.com.br/"  target="_blank" class="login100-pic js-tilt">
          <img src="@/assets/logo.png" class="logo-position" alt="IMG" />
        </a>

        <form @submit.prevent="login" class="login100-form validate-form">
          <span class="login100-form-title"> Entre com seu e-mail e senha </span>

          <div
            class="wrap-input100 validate-input"
            data-validate="Valid email is required: ex@abc.xyz"
          >
            <input
              class="input100"
              v-model="usuario.username"
              type="text"
              name="email"
              placeholder="Email"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </span>
          </div>

          <p class="text-danger" v-if="errors.username != ''">
            {{ errors.username }}
          </p>
          <div
            class="wrap-input100 validate-input"
            data-validate="Password is required"
          >
            <input
              class="input100"
              v-model="usuario.password"
              type="password"
              name="pass"
              placeholder="Senha"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-lock" aria-hidden="true"></i>
            </span>
          </div>

          <p class="text-danger" v-if="errors.password != ''">
            {{ errors.password }}
          </p>

          <div class="container-login100-form-btn">
            <button type="submit" class="login100-form-btn">Entrar</button>
          </div>

          <div class="text-center p-t-12">
            <!-- <span class="txt1">
							Forgot
						</span>
						<a class="txt2" href="#">
							Username / Password?
						</a> -->
          </div>

          <div class="text-center p-t-136">
            <RouterLink class="txt2 font-weight-bold" style="font-size: 18px;" to="/register">
							Criar a sua conta
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { useUsuarioStore } from "@/stores/UserStore";
import { ref } from "vue";

export default {
  name: "LoginView",
  setup() {
    
    const usuario = useUsuarioStore();

    const errors = ref({
      username: "",
      password: "",
    });

    const login = () => {
      if (usuario.password !== "" && usuario.username !== "") {
        usuario.login();
      } else {
        if (usuario.username === "") {
          errors.value.username = "O campo email não pode estar vazio";
        }
        if (usuario.password === "") {
          errors.value.password = "O campo senha não pode estar vazio";
        }
      }
    };
    return {
      usuario,
      login,
      errors,
    };
  },
};
</script>
  
