<template>
    <div class="modal" tabindex="-1" role="dialog" @click.stop
        :class="{ 'show': cota.showModalAdquirir, 'd-block': cota.showModalAdquirir }">
        <div class="modal-dialog" role="document">
            <form @submit.prevent="submitAdquirir" v-if="cota.showQtdCota" class="modal-content">

                <div class="modal-body">
                    <button type="button" class="btn" @click="closeModalAdquirir">
                        <span>&times;</span>
                    </button>
                    <h5 class="text-center titulo-modal">Quantas cotas você quer adquirir?</h5>
                    <div class="btn-number text-center">
                        <p class="text-danger" v-if="cota.errors.cotaAquirir">{{ cota.errors.cotaAquirir }}</p>
                        <button type="button" @click="cota.cotas--" class="btn btn-plus">-</button>
                        <input type="number" class="input-number" v-model="cota.cotas" min="2" >
                        <button type="button" @click="cota.cotas++" class="btn btn-plus">+</button>

                        <br>
                        <p class="titulo-modal">Valor total: <span >R$ {{ valorTotal }}</span> </p>

                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-adquirir">Adquirir</button>
                    </div>


                </div>
            </form>

            <div v-if="cota.showMetodoPagamento" class="modal-content">

                <div class="modal-body">
                    <button type="button" class="btn" @click="closeModalAdquirir">
                        <span>&times;</span>
                    </button>
                    <h5 class="text-center titulo-modal">Selecione o sue metodo de pagamento</h5>
                    <div class="btn-number text-center m-5">
                        <div class="text-danger" v-if="cota.errors.metodoPreencher">{{ cota.errors.metodoPreencher }}</div>
                        <div class="form-group d-flex m-2">
                            <input @change="checkCheckbox" class="ml-5 mr-5" v-model="cota.metodo.pix" value="true"
                                type="checkbox" name="pass" placeholder="Sua Senha">
                            <p class="font-weight-medium ml-5 mr-5" style="    margin-left: 10px;">Pix</p>
                        </div>
                        <div class="form-group d-flex m-2">
                            <input class="ml-5 mr-5" @change="checkCheckbox" v-model="cota.metodo.credito" value="true"
                                type="checkbox" name="pass" placeholder="Sua Senha">
                            <p class="font-weight-medium ml-5 mr-5" style="    margin-left: 10px;">Cartão de credito</p>
                        </div>
                    </div>
                    <div class="text-center">
                        <button @click="irPagamento" class="btn btn-adquirir">Proximo</button>
                    </div>


                </div>
            </div>



        </div>
    </div>
</template>

<script>
import { useCotaStore } from "@/stores/CotaStore";
import { computed } from 'vue';

export default {
    setup() {
        const cota = useCotaStore()

        const submitAdquirir = () => {
            if (cota.cotas < 2) {
                cota.errors.cotaAquirir = 'O valor da cota não pode ser menor que dois';
            } else {
                cota.showQtdCota = false
                cota.showMetodoPagamento = true
                // closeModalAdquirir();
                // console.log('Cotas adquiridas com sucesso');
            }
        };

        const valorTotal = computed(() => {
            const vlrCota = 2.20;
            const total = cota.cotas * vlrCota;
            return parseFloat(total.toFixed(2));
        });


        const checkCheckbox = () => {
            if (cota.metodo.credito && cota.metodo.pix) {
                cota.metodo.credito = !cota.metodo.credito;
                cota.metodo.pix = !cota.metodo.pix;
            }
        };

        const closeModalAdquirir = () => {
            cota.showModalAdquirir = false
            cota.metodo.credito = false
            cota.metodo.pix = false
            cota.showMetodoPagamento = false
            cota.showQtdCota = true

            document.body.classList.remove('modal-open');
        };

        const irPagamento = () => {
            if (cota.metodo.pix == true || cota.metodo.credito == true) {
                if (cota.metodo.pix == true) {
                    closeModalAdquirir()
                    openModalPix()
                    cota.postPix()
                } if (cota.metodo.credito == true) {
                    closeModalAdquirir()
                    openModalCredito()
                }
            } else {
                cota.errors.metodoPreencher = 'Por favor! selecione algum dos metodos para prosseguir!'
            }
        };

        const openModalPix = () => {
            cota.showCardPix = true
            document.body.classList.add('modal-open');

        }

        const openModalCredito = () => {
            cota.showCardCredito = true
            document.body.classList.add('modal-open');

        }


        return {
            cota,
            closeModalAdquirir,
            checkCheckbox,
            submitAdquirir,
            irPagamento,
            openModalPix,
            openModalCredito,
            valorTotal
        }
    },
}
</script>