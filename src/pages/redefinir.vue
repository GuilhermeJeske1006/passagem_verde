<template>
    <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100">
                <div class="login100-pic js-tilt" data-tilt>
                    <img src="@/assets/logo.png" style="
    margin-bottom: 15%;
" alt="IMG">
                    <span v-if="erroNewPassword.erroSimbolo != '' ||
                        erroNewPassword.erroMinusculo != '' ||
                        erroNewPassword.erroMinimo != ''
                        " class="span-requisitos text-base font-weight-medium mt-2">
                        Requisitos de senha:
                    </span>

                    <ul class="d-flex flex-column mt-2">
                        <li style="list-style-type: circle" v-if="erroNewPassword.erroMinimo != ''" class="d-flex">

                            <p class=" font-weight-medium">{{
                                erroNewPassword.erroMinimo
                            }}</p>
                        </li>
                        <li v-if="erroNewPassword.erroMinusculo != ''" class="d-flex">
                          
                            <p class="font-weight-medium">{{
                                erroNewPassword.erroMinusculo
                            }}</p>
                        </li>
                        <li v-if="erroNewPassword.erroSimbolo != ''" class="d-flex">
                            <p class="font-weight-medium">{{
                                erroNewPassword.erroSimbolo
                            }}</p>
                        </li>
                    </ul>
                </div>

                <form @submit.prevent="redefinir" class="login100-form validate-form">
                    <span class="login100-form-title">
                        Redefine sua senha
                    </span>


                    <div class="wrap-input100 validate-input" data-validate="Password is required">
                        <input class="input100" v-model="usuario.senhaAtual" type="password" name="pass" placeholder="Senha atual">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate="Password is required">
                        <input @input="validatePassword" class="input100" v-model="usuario.novaSenha" type="password" name="pass"
                            placeholder="Nova senha">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                        </span>
                    </div>
                    <p style="color: red" v-if="erroNewPassword.erro != ''">
                        {{ erroNewPassword.erro }}
                    </p>
                    <div class="wrap-input100 validate-input" data-validate="Password is required">
                        <input @input="validateNewPassword" class="input100" v-model="usuario.repeteSenha" type="password"
                            name="pass" placeholder="Confirmar senha">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div class=" container-login100-form-btn">
                        <button  disabled="disabled" v-if="
                          erroNewPassword.erroSimbolo != '' ||
                          erroNewPassword.erroMinusculo != '' ||
                          erroNewPassword.erroMinimo != '' ||
                          erroNewPassword.erro != '' ||
                          repeteSenha == '' ||
                          senhaAtual == ''
                        "  class=" disabled login100-form-btn">
                            Redefinir
                        </button>
                        <button v-else type="submit" class="login100-form-btn">
                            Redefinir
                        </button>
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
                        <!-- <a class="txt2" href="#">
							Create your Account
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a> -->
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import {ref} from 'vue';
import { useUsuarioStore } from "@/stores/UserStore";

export default {
    name: 'RedefinirView',
    setup() {
        const usuario = useUsuarioStore();

        const erroNewPassword = ref({
            erroMinimo: "A senha deve ter pelo menos 8 caracteres",
                erroMinusculo: "A senha deve conter pelo menos um caractere Maiusculo",
                erroSimbolo:
                    "A senha deve conter pelo menos um símbolo ou caractere de especial.",
        })

        const validatePassword = () => {
            const newPassword = usuario.novaSenha;
            // Verifica se a senha tem pelo menos 8 caracteres
            if (newPassword.length >= 8) {
                erroNewPassword.value.erroMinimo = "";
            } else {
                erroNewPassword.value.erroMinimo = "A senha deve ter pelo menos 8 caracteres";
            }

            // Verifica se a senha tem pelo menos uma letra minúscula
            if (/[A-Z]/.test(newPassword)) {
                erroNewPassword.value.erroMinusculo = "";
            } else {
                erroNewPassword.value.erroMinusculo =
                    "A senha deve conter pelo menos um caractere Maiusculo";
            }

            // Verifica se a senha tem pelo menos um número, símbolo ou caractere de espaço em branco
            if (/[!@#$%^&*()\s]/.test(newPassword)) {
                erroNewPassword.value.erroSimbolo = "";
            } else {
                erroNewPassword.value.erroSimbolo =
                    "A senha deve conter pelo menos um símbolo ou caractere de especial.";
            }
        }

        const validateNewPassword = () => {
            if (usuario.novaSenha != usuario.repeteSenha) {
                erroNewPassword.value.erro = "A confirmação não esta igual a nova senha!";
            } else {
                erroNewPassword.value.erro = "";
            }
        }

        const redefinir = () => {
            usuario.redefinir()
        }
  
        return {
            usuario,
            erroNewPassword,
            validateNewPassword,
            validatePassword,
            redefinir
            
        };
    },
};
</script>
  
