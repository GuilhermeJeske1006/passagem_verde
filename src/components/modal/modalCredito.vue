<template>
    <div class="modal"
        :class="{ 'show': cota.showCardCredito, 'd-block': cota.showCardCredito, 'loading-modal': cota.credito.isLoading }"
        tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div v-if="cota.credito.isLoading" class="loading modal-body"></div>

                <form @submit.prevent="pagarCredito" class="modal-body">
                    <button type="button" class="btn" @click="cota.closeModalCredito">
                        <span>&times;</span>
                    </button>
                    <h5 class="text-center titulo-modal">Informe os seus dados abaixo</h5>
                    <br />
                    <div class="form-group">
                        <p class="text-danger m-3 mt-4 mb-1" v-if="errors.nome != ''">{{ errors.nome }}</p>
                        <div class="wrap-input100 validate-input">
                            <input class="input100" v-model="cota.credito.nome" @input="formatarNome" type="text" required
                                name="pass" id="nome_cartao" placeholder="Nome no cartão">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-user-circle" aria-hidden="true"></i>
                            </span>
                        </div>

                    </div>
                    <div class="form-group">
                        <p class="text-danger m-3 mt-4 mb-1" v-if="errors.cpf != ''">{{ errors.cpf }}</p>
                        <div class="wrap-input100 validate-input">
                            <input class="input100" @input="formatarCpf" v-model="cota.credito.cpf" type="text" required
                                name="cpf" id="cpf" placeholder="Número do Cpf">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-vcard-o" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <!-- <div class="form-group">
                        <div class="wrap-input100 validate-input">
                            <select class="form-control input100" v-model="cota.credito.bandeira" id="bandeira" required>
                                <option value="" disabled selected>Selecione a bandeira</option>
                                <option value="visa">Visa</option>
                                <option value="mastercard">Mastercard</option>
                            </select>
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-flag" aria-hidden="true"></i>
                            </span>
                        </div>

                    </div> -->
                    <div class="form-group">
                        <p class="text-danger m-3 mt-4 mb-1" v-if="errors.numero_cartao != ''">{{ errors.numero_cartao }}
                        </p>
                        <div class="wrap-input100 validate-input">
                            <input @input="formatarNumberCard" class="input100" v-model="cota.credito.numero_cartao"
                                type="text" required name="pass" id="numero_cartao" placeholder="Número do cartão">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-id-card" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="form-group">
                        <p class="text-danger m-3 mt-4 mb-1" v-if="errors.cvv != ''">{{ errors.cvv }}</p>
                        <div class="wrap-input100 validate-input">
                            <input class="input100" @input="formatarCvv" v-model="cota.credito.cvv" type="text" required
                                name="pass" id="cvv" placeholder="CVV" maxlength="3">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="form-row d-flex">

                        <div class="form-group col-md-6">
                            <p class="text-danger m-3 mt-4 mb-1" v-if="errors.mes != ''">{{ errors.mes }}</p>

                            <div class="wrap-input100 validate-input">
                                <input class="input100" @input="formatarMes" v-model="cota.credito.mes" type="text" required
                                    name="pass" id="mes" maxlength="2" placeholder="Mês Expiração">
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-calendar" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                        <div class="form-group col-md-6">
                            <p class="text-danger m-3 mt-4 mb-1" v-if="errors.ano != ''">{{ errors.ano }}</p>

                            <div class="wrap-input100 validate-input">
                                <input class="input100" maxlength="4" @input="formatarAno" v-model="cota.credito.ano"
                                    type="text" required name="pass" id="ano" placeholder="Ano Expiração">
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-calendar" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="row justify-content-center">
                        <button type="submit" class="btn btn-adquirir"
                            style="width: 60%; padding: 10px 1rem 10px 1rem;">Finalizar Pagamento</button>
                    </div>

                </form>

            </div>
        </div>
    </div>
</template>

<script>
import { useCotaStore } from "@/stores/CotaStore";
import { ref, watch } from 'vue';
import { useToast } from "vue-toastification";

export default {
    setup() {
        const cota = useCotaStore()

        const errors = ref({
            cpf: '',
            numero_cartao: '',
            cvv: '',
            ano: '',
            mes: '',
            nome: ''

        })

        const pagarCredito = () => {
            const partesNome = cota.credito.nome.split(' ');
            if (cota.credito.nome != '' && cota.credito.cpf != '' &&
                cota.credito.numero_cartao != '' && cota.credito.cvv != ''
                && cota.credito.mes != '' && cota.credito.ano != '' && cota.credito.cpf.length == 14
                && cota.credito.mes.length == 2 && cota.credito.ano.length == 4 && cota.credito.numero_cartao.length == 19
                && cota.credito.cvv.length == 3 && partesNome.length > 1) {
                errors.value.cpf = ''
                errors.value.numero_cartao = ''
                errors.value.cvv = ''
                errors.value.ano = ''
                errors.value.mes = ''
                errors.value.nome = ''

                try {
                    window.EfiJs.CreditCard
                        .setCardNumber(cota.credito.numero_cartao.toString())
                        .verifyCardBrand()
                        .then(brand => {
                            cota.credito.bandeira = brand

                            if (brand !== 'undefined') {
                                try {
                                    window.EfiJs.CreditCard
                                        .setAccount('54c02c4b115c3aa6664bf27e1b8b1508')
                                        .setEnvironment('production') // 'production' or 'sandbox'
                                        .setCreditCardData({
                                            brand: brand,
                                            number: cota.credito.numero_cartao.toString(),
                                            cvv: cota.credito.cvv.toString(),
                                            expirationMonth: cota.credito.mes.toString(),
                                            expirationYear: cota.credito.ano.toString(),
                                            reuse: false
                                        })
                                        .getPaymentToken()
                                        .then(data => {
                                            cota.credito.payment_token = data.payment_token;
                                            cota.credito.card_mask = data.card_mask;
                                            cota.postCredito()
                                        }).catch(err => {
                                            useToast().error(err.error_description)
                                        });
                                } catch (error) {
                                    useToast().error(error.error_description)
                                }
                            }
                            else {
                                useToast().error("Bandeira do cartão não encontrada!")
                            }
                        }).catch(err => {
                            useToast().error(err.error_description)
                        });
                } catch (error) {
                    useToast().error(error.error_description)
                }
            } else {

                if (cota.credito.cpf.length != 14) {
                    errors.value.cpf = 'O campo não corresponde aos número de caracteres necessários para o cpf'
                }
                if (cota.credito.mes.length != 2) {
                    errors.value.mes = 'O campo não corresponde aos número de caracteres necessários para o Mês'
                }
                if (cota.credito.ano.length != 4) {
                    errors.value.ano = 'O campo não corresponde aos número de caracteres necessários para o Ano'
                }
                if (cota.credito.numero_cartao.length != 19) {
                    errors.value.numero_cartao = 'O campo não corresponde aos número de caracteres necessários para o Número do cartão'
                }
                if (cota.credito.cvv.length != 3) {
                    errors.value.cvv = 'O campo não corresponde aos número de caracteres necessários para o CVV'
                }
                if (partesNome.length < 2) {
                    errors.value.nome = 'Por favor, insira o nome completo.';
                } else {
                    errors.value.nome = '';
                }
            }
        };

        const formatarNome = () => {
            if (cota.credito.nome != '') {
                const partesNome = cota.credito.nome.split(' ');

                if (partesNome.length < 2) {
                    errors.value.nome = 'Por favor, insira o nome completo.';
                } else {
                    errors.value.nome = '';
                }
            }

        };


        const formatarCpf = () => {
            if (cota.credito.cpf != '') {
                let cpfLimpo = cota.credito.cpf.replace(/\D/g, '');

                if (cota.credito.cpf.length != 14) {
                    errors.value.cpf = 'O campo não corresponde aos número de caracteres necessários para o cpf'
                } else {
                    errors.value.cpf = ''
                }

                if (cpfLimpo.length >= 3 && cpfLimpo.length <= 5) {
                    cota.credito.cpf = `${cpfLimpo.slice(0, 3)}.${cpfLimpo.slice(3)}`;
                } else if (cpfLimpo.length >= 6 && cpfLimpo.length <= 8) {
                    cota.credito.cpf = `${cpfLimpo.slice(0, 3)}.${cpfLimpo.slice(3, 6)}.${cpfLimpo.slice(6)}`;
                } else if (cpfLimpo.length >= 9 && cpfLimpo.length <= 11) {
                    cota.credito.cpf = `${cpfLimpo.slice(0, 3)}.${cpfLimpo.slice(3, 6)}.${cpfLimpo.slice(6, 9)}-${cpfLimpo.slice(9)}`;
                } else {
                    cota.credito.cpf = cpfLimpo;
                }
            }

        };

        const formatarNumberCard = () => {
            if (cota.credito.numero_cartao != '') {
                let card_limpo = cota.credito.numero_cartao.replace(/\D/g, '');

                if (cota.credito.numero_cartao.length != 19) {
                    errors.value.numero_cartao = 'O campo não corresponde aos número de caracteres necessários para o Número do cartão'
                } else {
                    errors.value.numero_cartao = ''
                }
                if (card_limpo.length >= 4 && card_limpo.length <= 8) {
                    cota.credito.numero_cartao = `${card_limpo.slice(0, 4)} ${card_limpo.slice(4)}`;
                } else if (card_limpo.length >= 9 && card_limpo.length <= 13) {
                    cota.credito.numero_cartao = `${card_limpo.slice(0, 4)} ${card_limpo.slice(4, 8)} ${card_limpo.slice(8)}`;
                } else if (card_limpo.length >= 14 && card_limpo.length <= 16) {
                    cota.credito.numero_cartao = `${card_limpo.slice(0, 4)} ${card_limpo.slice(4, 8)} ${card_limpo.slice(8, 12)} ${card_limpo.slice(12)}`;
                } else {
                    cota.credito.numero_cartao = card_limpo.slice(0, 16);
                }
            }


        };


        const formatarCvv = () => {
            if (cota.credito.cvv != '') {
                if (cota.credito.cvv.length != 3) {
                    errors.value.cvv = 'O campo não corresponde aos número de caracteres necessários para o CVV'
                } else {
                    errors.value.cvv = ''
                }
                let formattedCVV = cota.credito.cvv.replace(/\D/g, '');
                formattedCVV = formattedCVV.slice(0, 3);
                cota.credito.cvv = formattedCVV;
            }

        };

        const formatarMes = () => {
            if (cota.credito.mes != '') {

                if (cota.credito.mes.length != 2) {
                    errors.value.mes = 'O campo não corresponde aos número de caracteres necessários para o Mês'
                } else {
                    errors.value.mes = ''
                }
                let formattedMes = cota.credito.mes.replace(/\D/g, '');
                formattedMes = formattedMes.slice(0, 2);
                cota.credito.mes = formattedMes;
            }

        };

        const formatarAno = () => {
            if (cota.credito.ano != '') {
                if (cota.credito.ano.length != 4) {
                    errors.value.ano = 'O campo não corresponde aos número de caracteres necessários para o Ano'
                } else {
                    errors.value.ano = ''
                }
                let formattedAno = cota.credito.ano.replace(/\D/g, '');
                formattedAno = formattedAno.slice(0, 4);
                cota.credito.ano = formattedAno;
            }

        };

        watch(formatarCpf);
        watch(formatarNumberCard)
        watch(formatarCvv)
        watch(formatarAno)
        watch(formatarMes)
        watch(formatarNome)


        return {
            cota,
            pagarCredito,
            errors
        }
    },
}
</script>

<style scoped>
.loading-modal::before {
    content: "";
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.7);
    /* Ajuste a opacidade conforme necessário */
    z-index: 998;
    /* Coloque abaixo do modal */
}
</style>