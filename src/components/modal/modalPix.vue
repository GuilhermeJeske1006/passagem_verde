<template>
    <div class="modal " tabindex="-1" role="dialog"
        :class="{ 'show': cota.showCardPix, 'd-block': cota.showCardPix, 'loading-modal': cota.pix.isLoading }">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div v-if="cota.pix.isLoading" class="loading modal-body"></div>

                <form @submit.prevent="pagarPix" class="modal-body">
                    <button type="button" class="btn" @click="closeModalPix">
                        <span>&times;</span>
                    </button>
                    <h5 class="text-center titulo-modal">Leia ou Copie o PIX</h5>
                    <br />
                    <div class="form-group text-center">
                        <img :src="cota.pix.imagemQrcode" class="img-fluid" alt="">
                        <br>
                        <!-- <p style="overflow: auto;">{{ cota.pix.qrcode }}</p> -->


                        <div class="d-flex">
                            <div class="wrap-input100 validate-input  mt-2 mb-3">
                                <input class="input100" v-model="cota.pix.qrcode" type="text" name="nome" id="nome"
                                    placeholder="Codigo PIX">
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-hashtag" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div>
                                <a @click="copiarTexto" class="btn btn-copiar">copiar</a>

                            </div>
                        </div>

                        <!-- <div v-if="isSupported">
                            <a class="btn" @click='copy(cota.pix.qrcode)'>
                                <span v-if='!copied'>Copiar</span>
                                <span v-else>Copiado!</span>
                            </a>
                            <p v-if="text != ''">Pix copiado: <code>{{ text || '' }}</code></p>
                        </div>
                        <p v-else>
                            Your browser does not support Clipboard API
                        </p> -->
                    </div>
                    <div class="row justify-content-center">
                        <button type="submit" class="btn btn-adquirir" style="width: 54%;">Já paguei</button>
                    </div>

                </form>

            </div>
        </div>
    </div>
</template>

<script>
import { useCotaStore } from "@/stores/CotaStore";
import { ref } from 'vue';
import { useClipboard } from '@vueuse/core'


export default {
    setup() {
        const cota = useCotaStore()

        const source = ref(cota.pix.qrcode)

        const { text, copy, copied, isSupported } = useClipboard({ source })

        const copiarTexto = () => {
            const campoNome = document.getElementById('nome');

            // Seleciona o texto dentro do campo de entrada
            campoNome.select();
            campoNome.setSelectionRange(0, 99999); // Para dispositivos móveis

            // Executa o comando de cópia
            document.execCommand('copy');

            // Desseleciona o texto
            window.getSelection().removeAllRanges();
        };

        const closeModalPix = () => {
            cota.showCardPix = false
            closeModalAdquirir()
            document.body.classList.remove('modal-open');

        }

        const pagarPix = () => {
            cota.getPresente();
            cota.getUser()
            cota.showCardPix = false
            closeModalAdquirir()
            document.body.classList.remove('modal-open');
        }

        const closeModalAdquirir = () => {
            cota.showModalAdquirir = false
            cota.metodo.credito = false
            cota.metodo.pix = false
            document.body.classList.remove('modal-open');
        };

        return {
            cota,
            copy,
            closeModalPix,
            text,
            copied,
            isSupported,
            pagarPix,
            copiarTexto

        }
    },
}
</script>

<style scoped></style>