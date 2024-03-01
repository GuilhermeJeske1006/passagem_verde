

<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <a href="https://www.passagemverde.com.br/" target="_blank" class="login100-pic js-tilt">
          <img src="@/assets/logo.png" class="logo-position" alt="IMG" />
        </a>

        <form @submit.prevent="login" class="login100-form validate-form">
          <span class="login100-form-title"> Entre com seu e-mail e senha </span>

          <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
            <input class="input100" v-model="usuario.username" type="text" name="email" placeholder="Email" />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </span>
          </div>

          <p class="text-danger" v-if="errors.username != ''">
            {{ errors.username }}
          </p>

          <div class="d-flex">
            <div class="wrap-input100 validate-input" data-validate="Password is required">
              <div class="input-container clickable">
                <input class="input100" v-model="usuario.password" type="password" name="pass" placeholder="Senha" />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>

            </div>
            <div @click="cota.openModalInformacao" class="icon-modal justify-content-end pr-3">
              <i class="fa-solid fa-circle-info"></i>
            </div>
          </div>




          <p class="text-danger" v-if="errors.password != ''">
            {{ errors.password }}
          </p>

          <div class="container-login100-form-btn">
            <button type="submit" class="login100-form-btn">Entrar</button>
          </div>

          <div class="text-center p-t-12">
             <span class="txt1">
						</span>
						<a class="txt2" @click="cota.openModalEsquecerSenha()">
              Esqueceu
              a Senha?
						</a>
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
  <modal-esquecer-senha />
  <modal-informacao :text="InformacaoText()" :tela="informacaoTela()" />
</template>
  
<script>
import { useUsuarioStore } from "@/stores/UserStore";
import { ref } from "vue";
import modalInformacao from '@/components/modal/modalInformacao.vue';
import { useCotaStore } from '@/stores/CotaStore';
import ModalEsquecerSenha from "@/components/modal/modalEsquecerSenha.vue";

export default {
  components: {ModalEsquecerSenha, modalInformacao },
  name: "LoginView",
  setup() {

    const cota = useCotaStore()
    const usuario = useUsuarioStore();

    const informacaoTela = () => {
      if(cota.showModalEsquecerSenha){
        return 'login'
      }
      return ''
    }

    const InformacaoText = () => {
      if(cota.showModalEsquecerSenha){
        return 'Por favor! verifique a sua caixa de entrada no email e resgate o código enviado para prosseguir! A seguir você sera redirecionado para a página de redefinição de senha.'
      }
      return 'Caso seja seu primeiro acesso, por favor informe a senha que você recebeu por e-mail.'
    }

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
      cota,
      InformacaoText,
      informacaoTela
    };
  },
};
</script>

<style scoped>
.wrap-input100 {
  position: relative;
}

/* Adicione estilos para tornar o input clicável */
.clickable {
  cursor: pointer;
}

/* Adicione estilos para o ícone de informação */
.fa-circle-info {
  cursor: pointer;
}

.icon-modal {
  padding-right: 18px;
  font-size: large;
  cursor: pointer;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  margin-left: -38px;
  z-index: 2;
  margin-bottom: 10px;
}
</style>
  
