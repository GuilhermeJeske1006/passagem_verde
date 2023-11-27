<template>
   <div
    class="modal clickable-modal"
    tabindex="-1"
    role="dialog"
    :class="{ 'show': cota.showModalInformacao, 'd-block': cota.showModalInformacao }"
    @click="closeModalInformacao"
  >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <button type="button" class="btn" @click="closeModalInformacao">
                        <span>&times;</span>
                    </button>
                    <h2 class="text-center titulo-modal">Atenção! </h2>
                    
                    <h5 class="text-center titulo-modal mt-4 mr-4 ml-4 mb-3 font-weight-bold" style="color: #147933; font-size: 16px;">{{ text }}</h5>

                    <div class="row justify-content-center">
                        <button @click="closeModalInformacao" class="btn btn-adquirir" style="width: 60%; padding: 10px 1rem 10px 1rem;">Ok, Certo!</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useCotaStore } from "@/stores/CotaStore";
import router from "@/router";

export default {
    props: {
        text: String,
        tela: String
    },

    setup(props) {
        const cota = useCotaStore()

        const closeModalInformacao = () => {
            if(props.tela == 'register'){
                router.push("/login");
                cota.showModalInformacao = false;
                document.body.classList.remove('modal-open');
            }else{
                cota.showModalInformacao = false;
                document.body.classList.remove('modal-open');
            }
            
        };

        return {
            cota,
            closeModalInformacao,
        }
    },
}
</script>