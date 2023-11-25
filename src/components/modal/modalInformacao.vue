<template>
    <div class="modal" tabindex="-1" role="dialog"
        :class="{ 'show': cota.showModalInformacao, 'd-block': cota.showModalInformacao }">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <button type="button" class="btn" @click="closeModalInformacao">
                        <span>&times;</span>
                    </button>
                    <h2 class="text-center titulo-modal">Atenção! </h2>
                    
                    <h5 class="text-center titulo-modal mt-4 mr-4 ml-4 mb-3 font-weight-bold" style="color: #147933; font-size: 16px;">Ao finalizar as 20 cotas, sua árvore será contabilizado no Arvorômetro, zerando o painel de cotas para aquisição de uma nova árvore</h5>

                    

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useCotaStore } from "@/stores/CotaStore";

export default {
    setup() {
        const cota = useCotaStore()

        const closeModalInformacao = () => {
            cota.showModalInformacao = false;
            document.body.classList.remove('modal-open');
        };

        return {
            cota,
            closeModalInformacao,
        }
    },
}
</script>