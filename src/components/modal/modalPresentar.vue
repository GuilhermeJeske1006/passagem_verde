<template>
    <div class="modal" tabindex="-1" role="dialog"
            :class="{ 'show': cota.showModalPresentear, 'd-block': cota.showModalPresentear }">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <form @submit.prevent="submit" class="modal-body">
                        <button type="button" class="btn" @click="cota.closeModalPresentear">
                            <span>&times;</span>
                        </button>
                        <h5 class="text-center titulo-modal">Quem você quer presentear?</h5>
                        <div class="btn-number text-center">
                            <p style="color: red" v-if="cota.errors.nome">{{ cota.errors.nome }}</p>
                            <input type="text" class="input-text" placeholder="Informe o nome" v-model="cota.enviar.nome">
                            <p style="color: red" v-if="cota.errors.email">{{ cota.errors.email }}</p>
                            <input type="email" class="input-text" placeholder="Informe o email" v-model="cota.enviar.email">

                        </div>
                        <h5 class="text-center titulo-modal">Com quantas cotas você quer presentear?</h5>
                        <div class="btn-number text-center">
                            <p style="color: red">{{ cota.errors.cotas }}</p>
                            <p style="color: red">{{ cota.errors.cotasMin }}</p>

                            <button type="button" @click="cota.enviar.cotas--" class="btn btn-plus">-</button>
                            <input type="number" class="input-number" v-model="enviar.cotas" min="0" max="10">
                            <button type="button" @click="cota.enviar.cotas++" class="btn btn-plus">+</button>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-adquirir">Adquirir</button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
</template>

<script>
import { useCotaStore } from "@/stores/CotaStore";


export default {
        setup(){
            const cota = useCotaStore()

            const submit = () => {
            if (cota.enviar.nome !== '' && cota.enviar.email !== '' && cota.enviar.cotas !== 0 && cota.enviar.cotas >= 1) {
                if (this.isMobile) {
                    cota.showCardPresentear = false;
                    cota.showCardPresente = true;
                    cota.postPresente()
                } else {
                    closeModalPresentear();
                    openModalPresente();
                }
            } else {
                if (cota.enviar.nome === '') {
                    cota.errors.nome = 'O campo nome não pode estar vazio';
                }
                if (cota.enviar.email === '') {
                    cota.errors.email = 'O campo email não pode estar vazio';
                }
                if (cota.enviar.cotas === 0) {
                    cota.errors.cotas = 'O campo nome não pode estar igual a zero';
                }
                if (cota.enviar.cotas <= 1) {
                    cota.errors.cotasMin = 'A quantidade de cotas não pode ser menor que 0';
                }
            }
        };

        const closeModalPresentear = () => {
            cota.showModalPresentear = false;
            document.body.classList.remove('modal-open');
        };

        const openModalPresente = () => {
            cota.showModalPresente = true;
            document.body.classList.add('modal-open');
        };
            return {
                closeModalPresentear,
                openModalPresente,
                cota,
                submit,
            }
        }
    }
</script>