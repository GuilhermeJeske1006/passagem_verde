<template>
    <div class="modal " tabindex="-1" role="dialog" :class="{ 'show': cota.showCardPix, 'd-block': cota.showCardPix, 'loading-modal': cota.pix.isLoading }">
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

                        <div v-if="isSupported">
                            <a class="btn" @click='copy(cota.pix.qrcode)'>
                                <span v-if='!copied'>Copiar</span>
                                <span v-else>Copiado!</span>
                            </a>
                            <p v-if="text != ''">Pix copiado: <code>{{ text || '' }}</code></p>
                        </div>
                        <p v-else>
                            Your browser does not support Clipboard API
                        </p>
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
            pagarPix

        }
    },
}
</script>

<style scoped>

</style>