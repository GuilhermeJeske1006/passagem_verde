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
                        <input class="input100" v-model="senhaAtual" type="password" name="pass" placeholder="Senha atual">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate="Password is required">
                        <input @input="validatePassword" class="input100" v-model="novaSenha" type="password" name="pass"
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
                        <input @input="validateNewPassword" class="input100" v-model="repeteSenha" type="password"
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
import router from '@/router';

export default {
    name: 'RedefinirView',
    data() {
        return {
            usuario: 'guilherme@gmail.com',
            senhaAtual: '',
            novaSenha: "",
            repeteSenha: "",
            erroNewPassword: {
                erroMinimo: "A senha deve ter pelo menos 8 caracteres",
                erroMinusculo: "A senha deve conter pelo menos um caractere Maiusculo",
                erroSimbolo:
                    "A senha deve conter pelo menos um número, símbolo ou caractere de espaço",
            }
        };
    },
    methods: {
        validatePassword() {
            const newPassword = this.novaSenha;
            // Verifica se a senha tem pelo menos 8 caracteres
            if (newPassword.length >= 8) {
                this.erroNewPassword.erroMinimo = "";
            } else {
                this.erroNewPassword.erroMinimo = "A senha deve ter pelo menos 8 caracteres";
            }

            // Verifica se a senha tem pelo menos uma letra minúscula
            if (/[A-Z]/.test(newPassword)) {
                this.erroNewPassword.erroMinusculo = "";
            } else {
                this.erroNewPassword.erroMinusculo =
                    "A senha deve conter pelo menos um caractere Maiusculo";
            }

            // Verifica se a senha tem pelo menos um número, símbolo ou caractere de espaço em branco
            if (/[0-9!@#$%^&*()\s]/.test(newPassword)) {
                this.erroNewPassword.erroSimbolo = "";
            } else {
                this.erroNewPassword.erroSimbolo =
                    "A senha deve conter pelo menos um número, símbolo ou caractere de espaço.";
            }
        },

        validateNewPassword() {
            if (this.novaSenha != this.repeteSenha) {
                this.erroNewPassword.erro = "A confirmação não esta igual a nova senha!";
            } else {
                this.erroNewPassword.erro = "";
            }
        },

        redefinir() {
            const apiUrl = 'https://cognito-idp.us-east-1.amazonaws.com/';

            const dataToSend = {
                ChallengeName: "NEW_PASSWORD_REQUIRED",
                ChallengeResponses: {
                    USERNAME: this.usuario,
                    NEW_PASSWORD: this.repeteSenha
                },
                ClientId: "2ba84o1sr4kpn5ucbvgg6sm40o",
                Session: localStorage.getItem("session")
            }

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'X-Amz-Target': 'AWSCognitoIdentityProviderService.RespondToAuthChallenge',
                    'Content-Type': 'application/x-amz-json-1.1'
                },
                body: JSON.stringify(dataToSend) // Converte o objeto para JSON
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na resposta da API');
                    }
                    return response.json();
                })
                .then(data => {

                    // Faça algo com a resposta da API, se necessário
                    if (data.AuthenticationResult.IdToken != null) {
                        localStorage.setItem('token', data.AuthenticationResult.IdToken);
                        router.push('/');
                    }
                    
                })
                .catch(error => {
                    console.error('Erro ao fazer a solicitação POST:', error);
                });

        },
    },
};
</script>
  
