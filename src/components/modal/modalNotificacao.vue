<template>
   <div class="modal" tabindex="-1" role="dialog" :class="{ 'show': showNotificacao, 'd-block': showNotificacao }">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <form @submit.prevent="postAceitarNotificacao" class="modal-body">
                        <button type="button" class="btn" @click="closeModalNotificacao">
                            <span>&times;</span>
                        </button>
                        <h3 class="text-center titulo-modal">Suas notificaçãoes</h3>
                        <div v-if="notification.Cota.length > 0" class="btn-number text-center">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Mensagem</th>
                                        <th scope="col">Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in notification.Cota" :key="item.id">
                                        <th scope="row">{{ index }}</th>
                                        <td>Você recebeu <b>{{ item.Quantidade }}</b> cotas de <b>{{ item.EmailOrigem }}</b>
                                        </td>
                                        <td>
                                            <input type="hidden">
                                            <input v-model="item.isChecked" @change="checkboxChanged(item)"
                                                type="checkbox" />
                                        </td>

                                    </tr>

                                </tbody>
                            </table>

                        </div>
                        <h5 v-else class="text-center titulo-modal">Você não possui nenhuma notificação</h5>


                        <div class="text-right">
                            <button type="submit" class="btn btn-adquirir">Aceitar todos</button>
                        </div>


                    </form>
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