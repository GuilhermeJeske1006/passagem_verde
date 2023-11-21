<template>
    <div class="modal " tabindex="-1" role="dialog" :class="{ 'show': cota.showCardPix, 'd-block': cota.showCardPix }">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form @submit.prevent="closeModalPix" class="modal-body">
                    <button type="button" class="btn" @click="closeModalPix">
                        <span>&times;</span>
                    </button>
                    <h5 class="text-center titulo-modal">Scaneie o qrCode</h5>
                    <br />
                    <div class="form-group text-center">
                        <img :src="cota.pix.imagemQrcode" class="img-fluid" alt="">
                        <br>
                        <p style="overflow: auto;">{{ cota.pix.qrcode }}</p>
                    </div>
                    <button type="submit" class="btn btn-adquirir">Já paguei</button>

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

         const closeModalPix = () => {
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
            closeModalPix
        }
    },
}
</script>