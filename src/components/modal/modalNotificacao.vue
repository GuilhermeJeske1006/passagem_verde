<template>
    <div class="modal" tabindex="-1" role="dialog"
        :class="{ 'show': cota.showNotificacao, 'd-block': cota.showNotificacao, 'loading-modal': cota.notifica.isLoading }">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div v-if="cota.notifica.isLoading" class="loading modal-body"></div>

                <form @submit.prevent="handleAcceptNotifications" class="modal-body">
                    <button type="button" class="btn" @click="closeModalNotificacao">
                        <span>&times;</span>
                    </button>
                    <h3 class="text-center titulo-modal">Suas notificaçãoes</h3>
                    <div v-if="cota.notification.Cota.length > 0" class="btn-number text-center">
                        <table class="table">
                            <thead>
                                <tr>
                                    <!-- <th scope="col">Id</th> -->
                                    <th scope="col">Mensagem</th>
                                    <th scope="col">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in cota.notification.Cota" :key="item.id">
                                    <th class="d-none" scope="row">{{ index }}</th>
                                    <td>Você recebeu <b>{{ item.Quantidade }}</b> cotas de <b>{{ item.EmailOrigem }}</b>
                                    </td>
                                    <td>
                                        <input type="hidden">
                                        <input v-model="item.isChecked" type="checkbox" />
                                    </td>

                                </tr>

                            </tbody>
                        </table>

                    </div>
                    <h5 v-else class="text-center titulo-modal">Você não possui nenhuma notificação</h5>

                    <p class="text-danger text-center m-2" v-if="error">{{ error }}</p>
                    <div v-if="cota.notification.Cota.length > 0 " class="text-right">
                        <button type="submit" class="btn btn-adquirir">Aceitar cotas</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { useCotaStore } from "@/stores/CotaStore";
import { ref } from 'vue';

export default {
    setup() {
        const cota = useCotaStore()

        const error = ref('')


        const handleAcceptNotifications = async () => {
            if(validaCheckSelecionado()){
                try{
                await cota.postAceitarNotificacao();
                await cota.getPresente();
                await cota.getUser()
                error.value = ''
                closeModalNotificacao();
            }catch (error) {
                console.error('Erro ao aceitar notificações', error);
            }
            }else{
                error.value = 'Você precisa marcar alguma notificação para prosseguir!'
            }   
            
        };

        const validaCheckSelecionado = () => {
            const checkedItems = cota.notification.Cota.filter(
            (item) => item.isChecked
            );

            if(checkedItems.length > 0){
                return true
            }
            return false
        
        }


        const closeModalNotificacao = () => {
            cota.showNotificacao = false;
            document.body.classList.remove('modal-open');
        };

        return {
            cota,
            closeModalNotificacao,
            handleAcceptNotifications,
            validaCheckSelecionado,
            error
        }
    },
}
</script>