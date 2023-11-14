<template>
    <div class="modal" tabindex="-1" role="dialog" @click.stop
            :class="{ 'show': showModalPresente, 'd-block': showModalPresente }">
            <div class="modal-dialog" role="document">
                <div style="background-color: #135b2d " class="modal-content">

                    <div class="modal-body">
                        <button type="button" class="btn btn-fechar" @click="closeModalPresente">
                            <span>&times;</span>
                        </button>
                        <h5 class="text-center titulo-modal">Seu presente foi enviado com sucesso</h5>
                        <div class="btn-number text-center">
                            <p class="p-modal-presente">A pessoa terá <span>07 dias</span>para confirmar o recebimento no
                                <br />
                                email que enviamos. Caso contrário, devolvemos as cotas para sua conta.

                            </p>
                        </div>


                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    setup() {
        
    },
}
</script>