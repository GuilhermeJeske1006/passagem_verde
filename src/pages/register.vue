<template>
    <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100" style="padding: 26px 27px 43px 40px">
                <div class="container mt-5">
                    <div class="row justify-content-center">
                        <span class="login100-form-title"> Faça o seu registro </span>

                        <div class="col-md-5">
                            <div class="login100-pic js-tilt" data-tilt>
                                <img src="@/assets/logo.png" style="margin-bottom: 57%;" alt="IMG">
                                     <a href="https://plantacao.s3.amazonaws.com/regulamento.html" class=" text-decoration-none" target="_blank" rel="noopener noreferrer">
                                        <span class="span-requisitos text-base mt-5">

                                        Veja aqui o regulamento
                                    </span>

                                     </a>

                            </div>
                        </div>
                        <div class="col-md-7">
                            <form @submit.prevent="submit">

                                <div class="form-row d-md-flex d-sm-grid">
                                    <div class="form-group col-md-6 col-12  m-r-5">
                                        <p class="text-danger" v-if="errors.nome">{{ errors.nome }}</p>
                                        <div class="wrap-input100 validate-input" data-validate="Password is required">
                                            <input class="input100" v-model="usuario.cadastro.nome" type="text" required
                                                name="pass" placeholder="Seu nome">
                                            <span class="focus-input100"></span>
                                            <span class="symbol-input100">
                                                <i class="fa fa-user-circle" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="form-group col-md-6 col-12 ">
                                        <p class="text-danger" v-if="errors.sobrenome">{{ errors.sobrenome }}</p>
                                        <div class="wrap-input100 validate-input" data-validate="Password is required">
                                            <input class="input100" v-model="usuario.cadastro.sobrenome" required
                                                type="text" name="pass" placeholder="Seu sobrenome">
                                            <span class="focus-input100"></span>
                                            <span class="symbol-input100">
                                                <i class="fa fa-user-circle" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <p class="text-danger" v-if="errors.email">{{ errors.email }}</p>
                                    <div class="wrap-input100 validate-input" data-validate="Password is required">
                                        <input class="input100" v-model="usuario.cadastro.email" type="email" required
                                            name="pass" placeholder="Seu email">
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-envelope" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>
                                <!-- <div class="form-row d-md-flex d-sm-grid">
                                    <div class="form-group col-md-6 col-12 m-r-5">
                                        <div class="wrap-input100 validate-input" data-validate="Password is required">
                                            <input class="input100" v-model="usuario.cadastro.cpf" type="text" name="pass"
                                                placeholder="Seu CPF">
                                            <span class="focus-input100"></span>
                                            <span class="symbol-input100">
                                                <i class="fa fa-vcard-o" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="form-group col-md-6 col-12">
                                        <div class="wrap-input100 validate-input" data-validate="Password is required">
                                            <input class="input100" v-model="usuario.cadastro.rg" type="text" name="pass"
                                                placeholder="Seu RG">
                                            <span class="focus-input100"></span>
                                            <span class="symbol-input100">
                                                <i class="fa fa-vcard-o" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div> -->
                                <!-- <div class="form-row d-md-flex d-sm-grid">
                                    <div class="form-group col-md-6 col-12 m-r-5">
                                        <div class="wrap-input100 validate-input">
                                            <input class="input100" v-model="usuario.cadastro.whatsapp" type="number"
                                                name="pass" placeholder="Seu Whatsapp">
                                            <span class="focus-input100"></span>
                                            <span class="symbol-input100">
                                                <i class="fa fa-whatsapp" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="form-group col-md-6 col-12">
                                        <div class="wrap-input100 validate-input">
                                            <input class="input100" v-model="usuario.cadastro.ie" type="text" name="pass"
                                                placeholder="Seu ie">
                                            <span class="focus-input100"></span>
                                            <span class="symbol-input100">
                                                <i class="fa fa-vcard-o" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div> -->
                                <!-- <div class="form-group">
                                    <div class="wrap-input100 validate-input">
                                        <input class="input100" v-model="usuario.cadastro.CNPJ" type="text" name="pass"
                                            placeholder="Seu CNPJ">
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-vcard-o" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div> -->
                                <div class="form-group">
                                    <div class="wrap-input100 validate-input">
                                            <input class="input100" v-model="usuario.cadastro.whatsapp" type="text"
                                               name="tel" @input="formatarTelefone" placeholder="Seu Whatsapp">
                                            <span class="focus-input100"></span>
                                            <span class="symbol-input100">
                                                <i class="fa fa-whatsapp" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                </div>
                                <!-- <div class="form-group">
                                    <div class="wrap-input100 validate-input" data-validate="Password is required">
                                        <input @input="validatePassword" class="input100" v-model="usuario.cadastro.senha"
                                            type="password" name="pass" placeholder="Sua Senha">
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-lock" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div> -->


                                <div class="form-group d-flex m-3">
                                        <p class="text-danger" v-if="errors.aceite">{{ errors.aceite }}</p>
                                        <input class="ml-5 mr-5"  v-model="usuario.cadastro.aceite"
                                            type="checkbox" name="pass" placeholder="Sua Senha">
                                        <p class="font-weight-medium ml-5 mr-5" style="    margin-left: 10px;">Eu li e concordo com os
                                             <a href="https://plantacao.s3.amazonaws.com/termos.html" target="_blank"
                                             >Termos e Condições </a> e a 
                                             <a href="https://plantacao.s3.amazonaws.com/politica.html" target="_blank"
                                             >Política de Privacidade</a></p>
                                </div>

                                

                                <div class=" container-login100-form-btn">
                                    
                                    <button type="submit" class="login100-form-btn">
                                        Registrar
                                    </button>
                                </div>

                                <div class="form-group m-3 d-md-none justify-content-end text-end pt-2">
                                    <a href="https://plantacao.s3.amazonaws.com/regulamento.html" class=" text-decoration-underline" target="_blank" rel="noopener noreferrer">
                                        <span class="span-requisitos text-base mt-5">

                                        Veja aqui o regulamento
                                    </span>

                                     </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref, watch } from 'vue';
import { useUsuarioStore } from "@/stores/UserStore";

export default {
    name: 'RedefinirView',
    setup() {
        const usuario = useUsuarioStore();

        const erroNewPassword = ref({
            erroMinimo: "A senha deve ter pelo menos 8 caracteres",
            erroMinusculo: "A senha deve conter pelo menos um caractere Maiusculo",
            erroSimbolo:
                "A senha deve conter pelo menos um número, símbolo ou caractere de espaço",
        })

        const errors = ref({
            nome: '',
            sobrenome: '',
            email: '',
            aceite: ''
        })



        const formatarTelefone = () => {
            let telefoneLimpo = usuario.cadastro.whatsapp.replace(/\D/g, '');

            if (telefoneLimpo.length === 11) {
                usuario.cadastro.whatsapp = `(${telefoneLimpo.slice(0, 2)}) ${telefoneLimpo.slice(2, 7)}-${telefoneLimpo.slice(7)}`;
            } else if (telefoneLimpo.length === 10) {
                usuario.cadastro.whatsapp = `(${telefoneLimpo.slice(0, 2)}) ${telefoneLimpo.slice(2, 6)}-${telefoneLimpo.slice(6)}`;
            } else {
                usuario.cadastro.whatsapp = telefoneLimpo;
            }
            };

            watch(formatarTelefone);


        const validatePassword = () => {
            const newPassword = usuario.cadastro.senha;
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
            if (/[0-9!@#$%^&*()\s]/.test(newPassword)) {
                erroNewPassword.value.erroSimbolo = "";
            } else {
                erroNewPassword.value.erroSimbolo =
                    "A senha deve conter pelo menos um número, símbolo ou caractere de espaço.";
            }
        }


        const redefinir = () => {
            usuario.redefinir()
        }

        const submit = () => {
            if (usuario.cadastro.nome != '' && usuario.cadastro.sobrenome != ''
                && usuario.cadastro.email != '' 
                && usuario.cadastro.aceite == true) {
                usuario.registrar()
            } else {
                if (usuario.cadastro.nome == '') {
                    errors.value.nome = 'Por favor! Preencha o campo nome'
                }
                if (usuario.cadastro.sobrenome == '') {
                    errors.value.sobrenome = 'Por favor! Preencha o campo sobrenome'
                }
                if (usuario.cadastro.email == '') {
                    errors.value.email = 'Por favor! Preencha o campo email'
                }
                if(usuario.cadastro.aceite == false){
                    errors.value.aceite = 'Por favor! Selecione os termos de aceite!'
                }
                
                // if (usuario.cadastro.senha == '') {
                //     validatePassword()
                // }
            }
        }

        return {
            usuario,
            erroNewPassword,
            validatePassword,
            redefinir,
            submit,
            errors,
            formatarTelefone

        };
    },
};
</script>
  
