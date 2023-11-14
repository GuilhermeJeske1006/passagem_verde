<template>
    <div class="modal" tabindex="-1" role="dialog" @click.stop
            :class="{ 'show': cota.showModalAdquirir, 'd-block': cota.showModalAdquirir }">
            <div class="modal-dialog" role="document">
                <form @submit.prevent="submitAdquirir" class="modal-content">

                    <div class="modal-body">
                        <button type="button" class="btn" @click="closeModalAdquirir">
                            <span>&times;</span>
                        </button>
                        <h5 class="text-center titulo-modal">Quantas cotas você quer adquirir?</h5>
                        <div class="btn-number text-center">
                            <p style="color: red" v-if="cota.errors.cotaAquirir">{{ cota.errors.cotaAquirir }}</p>
                            <button type="button" @click="cota.cotas--" class="btn btn-plus">-</button>
                            <input type="number" class="input-number" v-model="cotas" min="0" max="10">
                            <button type="button" @click="cota.cotas++" class="btn btn-plus">+</button>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-adquirir">Adquirir</button>
                        </div>


                    </div>
                </form>
            </div>
        </div>
</template>

<script>
export default {
    setup() {
        
    },
}
</script>