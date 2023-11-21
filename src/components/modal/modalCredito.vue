<template>
    <div class="modal " tabindex="-1" role="dialog"
        :class="{ 'show': cota.showCardCredito, 'd-block': cota.showCardCredito }">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form @submit.prevent="pagarCredito" class="modal-body">
                    <button type="button" class="btn" @click="closeModalCredito">
                        <span>&times;</span>
                    </button>
                    <h5 class="text-center titulo-modal">Informe os seus dados abaixo</h5>
                    <br />
                    <div class="form-group">
                        <div class="wrap-input100 validate-input">
                            <input class="input100" v-model="cota.credito.nome" type="text" required name="pass"
                                id="nome_cartao" placeholder="Nome no cartão">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-user-circle" aria-hidden="true"></i>
                            </span>
                        </div>

                    </div>
                    <div class="form-group">
                        <div class="wrap-input100 validate-input">
                            <input class="input100" v-model="cota.credito.cpf" type="text" required name="pass" id="cpf"
                                placeholder="Numero do Cpf">
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

                        <div class="wrap-input100 validate-input">
                            <input @change="getBandeira" class="input100" v-model="cota.credito.numero_cartao" type="number"
                                required name="pass" id="numero_cartao" placeholder="Numero do cartão">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-id-card" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="form-group">

                        <div class="wrap-input100 validate-input">
                            <input class="input100" v-model="cota.credito.cvv" type="text" required name="pass" id="cvv"
                                placeholder="CVV">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="form-row d-flex">
                        <div class="form-group col-md-6">

                            <div class="wrap-input100 validate-input">
                                <input class="input100" v-model="cota.credito.mes" type="text" required name="pass"
                                    id="mes" placeholder="Mês Expiração">
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-calendar" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                        <div class="form-group col-md-6">

                            <div class="wrap-input100 validate-input">
                                <input class="input100" v-model="cota.credito.ano" type="number" required name="pass"
                                    id="ano" placeholder="Ano Expiração">
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-calendar" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-adquirir">Finalizar Pagamento</button>

                </form>

            </div>
        </div>
    </div>
</template>

<script>
import { useCotaStore } from "@/stores/CotaStore";

export default {
    setup() {
        const cota = useCotaStore()

        const pagarCredito = () => {
            console.log('ofeowjfiojwioefj')
            if (cota.credito.nome != '' && cota.credito.cpf != '' &&
                cota.credito.numero_cartao != '' && cota.credito.cvv != ''
                && cota.credito.mes != '' && cota.credito.ano != '') {


                    
                try {
                    window.EfiJs.CreditCard
                        .setCardNumber(cota.credito.numero_cartao.toString())
                        .verifyCardBrand()
                        .then(brand => {
                            cota.credito.bandeira = brand
                            console.log(brand)

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
                                            console.log(data)
                                            cota.credito.payment_token = data.payment_token;
                                            cota.credito.card_mask = data.card_mask;
                                            cota.postCredito()

                                            console.log('payment_token', cota.credito.payment_token);
                                            console.log('card_mask', cota.credito.card_mask);
                                        }).catch(err => {
                                            console.log('Código: ', err.code);
                                            console.log('Nome: ', err.error);
                                            console.log('Mensagem: ', err.error_description);
                                        });
                                } catch (error) {
                                    console.log('Código: ', error.code);
                                    console.log('Nome: ', error.error);
                                    console.log('Mensagem: ', error.error_description);
                                }
                            }
                        }).catch(err => {
                            console.log('Código: ', err.code);
                            console.log('Nome: ', err.error);
                            console.log('Mensagem: ', err.error_description);
                        });
                } catch (error) {
                    console.log('Código: ', error.code);
                    console.log('Nome: ', error.error);
                    console.log('Mensagem: ', error.error_description);
                }
            }
        };

        const closeModalAdquirir = () => {
            cota.showModalAdquirir = false
            cota.metodo.credito = false
            cota.metodo.pix = false
            document.body.classList.remove('modal-open');
        };

        const closeModalCredito = () => {
            cota.showCardCredito = false
            closeModalAdquirir()
            document.body.classList.remove('modal-open');

        }

        const getBandeira = () => {

        }
        return {
            cota,
            closeModalCredito,
            getBandeira,
            pagarCredito,
        }
    },
}
</script>