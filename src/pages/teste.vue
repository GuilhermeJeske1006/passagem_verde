

<template>
    <div>
        <nav-header />
        <div class="container-login100">
            <div @click="openModalNotificacao" class="icon-container">
                <div class="notification-badge">{{ cota.notification.Cota.length }}</div>
            </div>

            <div class="wrap-login100" style="padding-top: 60px ;">
                <span class="p-b-40 login100-form-title"> Em cada viagem, temos a
                    oportunidade de transformar nossa jornada em uma foresta
                    de
                    esperença </span>
                <div class="login100-pic2 js-tilt " data-tilt>
                    <span class="text-start subtitle font-weight-medium">Faltam apenas <b>{{ 20 - folhasCota }}</b> cota
                        para você plantar sua arvore</span>
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
                    </figure>
                    <div class="d-flex m-3 justify-content-center">
                        <button type="button" @click="openModalAdquirir" class="btn btn-cota">Adquirir</button>
                        <button type="button" @click="openModalPresentear" class="btn btn-cota">Presentear</button>

                    </div>
                    <div class="text-center p-t-40 d-flex">
                        <div class="me-5">
                            <span class="number-cota">
                                {{ arvorePlantada }}
                            </span>
                            <p class="subtitle font-weight-medium">Arvores plantadas</p>
                        </div>
                        <div class="m-r-2">
                            <span class="number-cota">
                                {{ folhasCota }}
                            </span>
                            <p class="subtitle font-weight-medium">Numero de cotas</p>
                        </div>

                    </div>
                </div>

                <div class="login100-form validate-form">
                  <div class=" p-sm-20 container-login100-form-btn pt-0 mb-3 ">
                        <p class="m-20 text-start subtitle font-weight-medium">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                            the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                            of type and scrambled
                        </p>
                    </div>

                    <div class="text-center p-t-12">
                        <span class="txt2">
                            <button class="btn btn-confira">Confira os projetos que você ajudou</button>
                        </span>

                        <div class="carousel-container">
                            <div class="carousel">
                                <img src="https://picsum.photos/seed/picsum/200/300" alt="Image 1">
                                <img src="https://picsum.photos/seed/picsum/200/300" alt="Image 2">
                                <img src="https://picsum.photos/seed/picsum/200/300" alt="Image 3">
                            </div>
                            <button class="prev" @click="prevSlide()">&#10094;</button>
                            <button class="next" @click="nextSlide()">&#10095;</button>


                        </div>
                        <div class="col-arvorometro col-12 mt-2" style="background: none;">
                            <h4 class="h4-nome-projeto">Nome do projeto</h4>
                            <a target="_blank" class="">Ver no mapa</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <modal-adquirir />
    <modal-pix />
    <modal-credito />
    <modal-presentar />
    <modal-sucesso />
    <modal-notificacao />
</template>

<script>
import { useUsuarioStore } from "@/stores/UserStore";
import { ref } from "vue";
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { useCotaStore } from "@/stores/CotaStore";
import modalNotificacao from '@/components/modal/modalNotificacao.vue';
import modalPresentar from '@/components/modal/modalPresentar.vue';
import modalSucesso from '@/components/modal/modalSucesso.vue';
import modalCredito from '@/components/modal/modalCredito.vue';
import navHeader from '@/components/geral/navHeader.vue';
import ModalAdquirir from '@/components/modal/modalAdquirir.vue';
import ModalPix from '@/components/modal/modalPix.vue';


export default {
    name: "LoginView",

    components: { 
        modalNotificacao,
        navHeader,
        modalPresentar,
        modalSucesso, 
        ModalAdquirir, 
        modalCredito, 
        ModalPix 
    },

    setup() {
        const usuario = useUsuarioStore();

        const errors = ref({
            username: "",
            password: "",
        });

        const cota = useCotaStore();



        const arvorePlantada = computed(() => {
            const resultado = cota.data.QuantidadeCotas / 20;
            return Math.trunc(resultado);
        });

        const folhasCota = computed(() => cota.data.QuantidadeCotas % 20);

        const checkIfMobile = () => {
            cota.isMobile = window.innerWidth <= 768;
        };

        const openModalAdquirir = () => {
            cota.showModalAdquirir = true;
            document.body.classList.add('modal-open');
        };

        const openModalPresentear = () => {
            cota.showModalPresentear = true
            document.body.classList.add('modal-open');

        }

        const openModalNotificacao = () => {
            cota.showNotificacao = true;
            document.body.classList.add('modal-open');
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
            usuario,
            errors,
            cota,
            arvorePlantada,
            folhasCota,
            checkIfMobile,
            openModalAdquirir,
            nextSlide,
            prevSlide,
            showCardAdquirirMobile,
            showCardPresentearMobile,
            openModalNotificacao,
            openModalPresentear
        };
    },
};
</script>
    
<style scoped>
.carousel-container {
    position: relative;
    width: 300px;
    /* Adjust the width as needed */
    height: 200px;
    /* Adjust the height as needed */
    overflow: hidden;
    border-radius: 15px;
}

.carousel {
    display: flex;
    width: 300%;
    /* Three times the width to accommodate three images */
    transition: transform 0.5s ease-in-out;
}

.carousel img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
}

.prev,
.next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    cursor: pointer;
    color: white;
    background-color: #3498db;
    border: none;
    border-radius: 5px;
    padding: 10px;
    margin: 0 5px;
}

.prev {
    left: 0;
}

.next {
    right: 0;
}
</style>