<template>
    <div class="modal" tabindex="-1" role="dialog"
        :class="{ 'show': cota.showModalPresentear, 'd-block': cota.showModalPresentear }">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form @submit.prevent="submit" class="modal-body">
                    <button type="button" class="btn" @click="closeModalPresentear">
                        <span>&times;</span>
                    </button>
                    <h5 class="text-center titulo-modal">Quem você quer presentear?</h5>
                    <div class="btn-number text-center">
                        <p class="text-danger" v-if="cota.errors.nome">{{ cota.errors.nome }}</p>
                        <div class="wrap-input100 validate-input">
                            <input class="input100" placeholder="Informe o nome" v-model="cota.enviar.nome" type="text">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-user-circle" aria-hidden="true"></i>
                            </span>
                        </div>
                        <p class="text-danger" v-if="cota.errors.email">{{ cota.errors.email }}</p>
                        <div class="wrap-input100 validate-input" data-validate="Password is required">
                            <input class="input100" placeholder="Informe o email" v-model="cota.enviar.email" type="email">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <h5 class="text-center titulo-modal">Com quantas cotas você quer presentear?</h5>
                    <div class="btn-number text-center">
                        <p class="text-danger">{{ cota.errors.cotas }}</p>
                        <p class="text-danger">{{ cota.errors.cotasMin }}</p>
                        <p class="text-danger">{{ cota.errors.faltaCota }}</p>

                        <button type="button" @click="cota.enviar.cotas > 0 ? cota.enviar.cotas-- : cota.enviar.cotas = 0" class="btn btn-plus">-</button>
                        <input type="number" class="input-number" v-model="cota.enviar.cotas" min="0" max="10000">
                        <button type="button" @click="cota.enviar.cotas++" class="btn btn-plus">+</button>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-adquirir">Presentar</button>
                    </div>


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

        const  submit = () => {
            if (cota.enviar.nome !== '' && cota.enviar.email !== '' && cota.enviar.cotas !== 0 && cota.enviar.cotas >= 1  && cota.enviar.cotas < cota.data.QuantidadeCotas) {

            try{
                closeModalPresentear();
                // openModalPresente();
                 cota.postPresente();
                 cota.getPresente();
                 cota.getUser()
                 cota.enviar = ''
            }catch (error) {
                console.error('Erro ao aceitar notificações', error);
            }
            
            } else {
                if (cota.enviar.nome === '') {
                    cota.errors.nome = 'O campo nome não pode estar vazio';
                }else{
                    cota.errors.nome = '';

                }
                if (cota.enviar.email === '') {
                    cota.errors.email = 'O campo email não pode estar vazio';
                }else{
                    cota.errors.email = '';

                }
                if (cota.enviar.cotas === 0) {
                    cota.errors.cotas = 'O campo nome não pode estar igual a zero';
                }else{
                    cota.errors.cotas = '';

                }
                if (cota.enviar.cotas < 0) {
                    cota.errors.cotasMin = 'A quantidade de cotas não pode ser menor que 0';
                }else{
                    cota.errors.cotasMin = '';

                }
                if(cota.enviar.cotas > cota.data.QuantidadeCotas){
                    cota.errors.faltaCota = 'A sua quantidade de cotas é inferior à quantidade que deseja presentear! Adquira mais cotas para prosseguir'
                }else{
                    cota.errors.faltaCota = ''

                }
            }
        };

        const closeModalPresentear = () => {
            cota.showModalPresentear = false;
            document.body.classList.remove('modal-open');
        };

       
        return {
            cota,
            closeModalPresentear,
            submit
        }
    },
}
</script>