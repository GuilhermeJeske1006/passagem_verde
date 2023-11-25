<template>
        <div class="modal" tabindex="-1" role="dialog" @click.stop
        :class="{ 'show': cota.showModalPresente, 'd-block': cota.showModalPresente }">
        <div class="modal-dialog" role="document">
            <div style="background-color: #135b2d " class="modal-content">

                <div class="modal-body">
                    <button type="button" class="btn btn-fechar" @click="closeModalPresente">
                        <span>&times;</span>
                    </button>
                    <h5 class="text-center titulo-modal">Seu presente foi enviado com sucesso</h5>
                    <div class="btn-number text-center">
                        <p class="p-modal-presente m-3">A pessoa terá <span>07 dias</span> para confirmar o recebimento no
                            <br />
                            email e notificação que enviamos. Caso contrário, devolvemos as cotas para sua conta.

                        </p>
                    </div>


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

        const closeModalPresente = () => {
            cota.showModalPresente = false;
            document.body.classList.remove('modal-open');
        };
        return {
            cota,
            closeModalPresente
        }
    },
}
</script>