<template>
    <div v-if="cota.isLoading" class="loading"></div>

    <div v-else>
        <nav class="navbar">
            <div class="container-fluid" v-if="cota.isMobile">
                <div class="col-12 d-flex">
                    <div class="col-6">
                        <a class="navbar-brand" href="#">

                            <div class="rounded-square">
                                Olá {{ cota.data.Nome }}
                            </div>
                        </a>
                    </div>
                    <div class="col-6">
                        <a class="navbar-brand" href="#">
                            <img src="@/assets/logo.png" style="width: 60%;" alt="Logo" class="w-60 d-inline-block ">
                        </a>
                    </div>

                </div>

            </div>
            <div class="container-fluid" v-else>
                <a class="navbar-brand" href="#">
                    <div class="rounded-square">
                        Olá {{ cota.data.Nome }}
                    </div>
                </a>
                <a class="navbar-brand" href="#">

                    <img src="@/assets/logo.png" style="width: 60%;" alt="Logo" class="w-60 d-inline-block ">

                </a>

            </div>

        </nav>

        <div class="col-12 flex-page d-flex" style="height: 100vh;">
            <div class="col-md-6 col-12 col-nuvem">



                <div @click="openModalNotificacao" class="icon-container">
                    <div class="notification-badge">{{ cota.notification.Cota.length }}</div>
                </div>

                <div class="nuvem">
                    <div class="speech-bubble">
                        <p>Faltam apenas <span>{{ 20 - folhasCota }} cotas</span>
                            para você plantar sua
                            árvore</p>
                    </div>
                </div>
                <figure class="arvore">
                    <img v-if="folhasCota == 20" src="@/assets/folhas/arvore20.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 19" src="@/assets/folhas/arvore19.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 18" src="@/assets/folhas/arvore18.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 17" src="@/assets/folhas/arvore17.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 16" src="@/assets/folhas/arvore16.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 15" src="@/assets/folhas/arvore15.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 14" src="@/assets/folhas/arvore14.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 13" src="@/assets/folhas/arvore13.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 12" src="@/assets/folhas/arvore12.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 11" src="@/assets/folhas/arvore11.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 10" src="@/assets/folhas/arvore10.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 9" src="@/assets/folhas/arvore9.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 8" src="@/assets/folhas/arvore8.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 7" src="@/assets/folhas/arvore7.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 6" src="@/assets/folhas/arvore6.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 5" src="@/assets/folhas/arvore5.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 4" src="@/assets/folhas/arvore4.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 3" src="@/assets/folhas/arvore3.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 2" src="@/assets/folhas/arvore2.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 1" src="@/assets/folhas/arvore1.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 0" src="@/assets/folhas/arvore0.png" class="img-fluid img-arvore" alt="">

                    <h4 class="h4-arvore">{{ folhasCota }} cotas</h4>
                </figure>
                <div class="d-flex m-3 justify-content-center" v-if="isMobile">
                    <button type="button" @click="showCardAdquirirMobile()" class="btn btn-cota">Adquirir cota</button>
                    <button type="button" @click="showCardPresentearMobile()" class="btn btn-cota">Presentear</button>

                </div>
                <div class="d-flex m-3 justify-content-center" v-else>
                    <button type="button" @click="openModalAdquirir" class="btn btn-cota">Adquirir cota</button>
                    <button type="button" @click="cota.openModalPresentear" class="btn btn-cota">Presentear</button>

                </div>

                <div v-if="showCardAdquirir">
                    <div class="modal-body">

                        <h5 class="text-center titulo-modal">Quantas cotas você quer adquirir?</h5>
                        <div class="btn-number text-center">
                            <button type="button" @click="cotas--" class="btn btn-plus">-</button>
                            <input type="number" class="input-number" v-model="cotas" min="0" max="10">
                            <button type="button" @click="cotas++" class="btn btn-plus">+</button>
                        </div>
                        <div class="text-center">
                            <button type="button" class="btn btn-adquirir">Adquirir</button>
                        </div>
                    </div>

                </div>

                <div v-if="showCardPresentear">
                    <form @submit.prevent="submit" class="modal-body">

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
                            <input type="number" class="input-number" v-model="cota.enviar.cotas" min="0" max="10">
                            <button type="button" @click="cota.enviar.cotas++" class="btn btn-plus">+</button>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-adquirir">Adquirir</button>
                        </div>


                    </form>

                </div>

                <div style="max-width: 80%; margin-left: 10%;" v-if="isMobile && cota.showCardPresente">
                    <div style="background-color: #135b2d " class="card">
                        <div class="modal-body">
                            <button type="button" class="btn btn-fechar" @click="cota.showCardPresente = false">
                                <span>&times;</span>
                            </button>
                            <h5 class="text-center titulo-modal">Seu presente foi enviado com sucesso</h5>
                            <div class="btn-number text-center">
                                <p class="p-modal-presente">A pessoa terá <span>07 dias</span>para confirmar o recebimento
                                    no
                                    <br />
                                    email que enviamos. Caso contrário, devolvemos as cotas para sua conta.

                                </p>
                            </div>


                        </div>
                    </div>
                </div>



            </div>
            <div class="col-md-6 col-12 col-arvorometro">
                <div class="col-12 d-flex" style="margin-top: 13%;">
                    <div class="col-md-6 col-5 center-arvorometro">
                        <div class="card card-arvorometro">
                            <div class="btn btn-arvorometro">ARVORÔMETRO</div>

                            <h5 class="card-title text-center titulo-arvorometro ">{{ arvorePlantada }}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary text-center subtitulo-arvorometro">Árvores
                                plantadas</h6>
                        </div>
                    </div>
                    <div class="col-7 col-md-6">
                        <div class="nuvem-branca">
                            <div class="speech-bubble-2">
                                <p>Em cada <span>viagem,</span> temos a
                                    oportunidade de transformar nossa jornada em uma <span>foresta
                                        de
                                        esperença💛</span>
                                </p>
                            </div>

                        </div>
                    </div>

                </div>

                <div class="col-12 col-map">
                    <div class="col-12">
                        <button class="btn btn-confira">Confira os projetos que você ajudou</button>
                    </div>

                    <div>
                        <div class="carousel">
                            <div class="carousel-inner">
                                <div v-for="(item, index) in cota.data.Projeto" :key="index" class="carousel-item"
                                    :class="{ 'active': index === currentIndex }">
                                    <img :src="item.UrlImagem" alt="Slide Image">
                                    <div class="col-arvorometro col-12 mt-2">
                                        <h4 class="h4-nome-projeto">{{ item.NomeProjeto }}</h4>
                                        <a :href="item.UrlSite" target="_blank" class="p-nome-projeto">Ver no mapa</a>
                                    </div>
                                </div>

                            </div>

                            <a class="carousel-control-prev" @click="prevSlide">&lsaquo;</a>
                            <a class="carousel-control-next" @click="nextSlide">&rsaquo;</a>
                        </div>
                    </div>

                </div>


            </div>
        </div>

        <!-- Modal Adquirir Cota -->
        

        <!-- Presente enviado com sucesso -->
        


        <!-- Modal Presentear -->
        <modalPresentar/>


        <!-- Modal Notificacao -->
        

    </div>
</template>
  
<script>
import {  computed, onMounted, onBeforeUnmount } from 'vue';
import { useToast } from "vue-toastification";
import { useCotaStore } from "@/stores/CotaStore";
import modalPresentar from '@/components/modal/modalPresentar.vue'
export default {
    name: 'HomeView',
    setup() {

        
        const toast = useToast();

        const cota = useCotaStore();



        const arvorePlantada = computed(() => {
            const resultado = cota.data.QuantidadeCotas / 20;
            return Math.trunc(resultado);
        });

        const folhasCota = computed(() => cota.data.QuantidadeCotas % 20);

        const checkIfMobile = () => {
            cota.isMobile = window.innerWidth <= 768;
        };

        const checkboxChanged = (item) => {
            console.log(`Checkbox para ${item.EmailOrigem} está marcado como ${item.isChecked ? 'true' : 'false'}`);
        };




        const openModalAdquirir = () => {
            cota.showModalAdquirir = true;
            document.body.classList.add('modal-open');
        };

        const closeModalAdquirir = () => {
            cota.showModalAdquirir = false;
            document.body.classList.remove('modal-open');
        };

        

        const closeModalPresente = () => {
            cota.showModalPresente = false;
            document.body.classList.remove('modal-open');
        };

       

        
        const openModalNotificacao = () => {
            cota.showNotificacao = true;
            document.body.classList.add('modal-open');
        };

        const closeModalNotificacao = () => {
            cota.showNotificacao = false;
            document.body.classList.remove('modal-open');
        };

        const nextSlide = () => {
            cota.currentIndex = (cota.currentIndex + 1) % cota.data.Projeto.length;
        };

        const prevSlide = () => {
            cota.currentIndex = (cota.currentIndex - 1 + cota.data.Projeto.length) % cota.data.Projeto.length;
        };



        onMounted(() => {
            window.addEventListener('resize', checkIfMobile);
            checkIfMobile();
            cota.getUser();
            cota.getPresente();
        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', checkIfMobile);
        });


        

        const submitAdquirir = () => {
            if (cota.cotas === 0) {
                cota.errors.cotaAquirir = 'O valor da cota não pode ser igual a zero';
            } else {
                closeModalAdquirir();
                console.log('Cotas adquiridas com sucesso');
            }
        };


        const showCardAdquirirMobile = () => {
            cota.showCardAdquirir = true;
            if (cota.showCardPresentear) {
                cota.showCardPresentear = false;
            }
        };

        const showCardPresentearMobile = () => {
            cota.showCardPresentear = true;
            if (cota.showCardAdquirir) {
                cota.showCardAdquirir = false;
            }
        };



        return {
            modalPresentar,
            toast,
            cota,
            arvorePlantada,
            folhasCota,
            checkIfMobile,
            openModalAdquirir,
            closeModalAdquirir,
            closeModalPresente,
            nextSlide,
            prevSlide,
            submitAdquirir,
            showCardAdquirirMobile,
            showCardPresentearMobile,
            openModalNotificacao,
            closeModalNotificacao,
            checkboxChanged,
        };
    },

};
</script>

<style scoped>
.loading {
    width: 48px;
    height: 48px;
    border: 5px solid #000;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    position: absolute;
    top: 50%;
    left: 50%;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.icon-container {
    position: relative;
    width: 40px;
    /* Largura do ícone */
    height: 40px;
    /* Altura do ícone */
    background-color: #135b2d;
    /* Cor de fundo do ícone */
    border-radius: 50%;
    /* Formato de círculo */
}

.notification-badge {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #e74c3c;
    /* Cor de fundo do número de notificações */
    color: #fff;
    /* Cor do texto */
    border-radius: 50%;
    /* Formato de círculo */
    width: 20px;
    /* Largura do número */
    height: 20px;
    /* Altura do número */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    /* Tamanho da fonte do número */
}
</style>