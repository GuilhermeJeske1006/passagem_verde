<template>
    <div v-if="cota.isLoading" class="loading"></div>

    <div v-else>
        <nav-header />
        <div class="col-12 flex-page d-flex" style="height: 100vh;">
            <div class="col-md-6 col-12 col-nuvem align-items-center justify-content-center">



                <div @click="openModalNotificacao" class="icon-container">
                    <div class="notification-badge">{{ cota.notification.Cota.length }}</div>
                </div>

                <div class="nuvem">
                    <div class="speech-bubble">
                        <p class="p-speech">Faltam apenas <span class="font-bold">{{ 20 - folhasCota }} cotas</span><br>
                            para você plantar sua <br> árvore!</p>
                    </div>
                </div>
                <figure class="arvore">
                    <img v-if="folhasCota == 20" src="@/assets/folhas/arvore20.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 19" src="@/assets/folhas/arvore19.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 18" src="@/assets/folhas/arvore18.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 17" src="@/assets/folhas/arvore17.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 16" src="@/assets/folhas/arvore16.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 15" src="@/assets/folhas/arvore15.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 14" src="@/assets/folhas/arvore14.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 13" src="@/assets/folhas/arvore13.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 12" src="@/assets/folhas/arvore12.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 11" src="@/assets/folhas/arvore11.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 10" src="@/assets/folhas/arvore10.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 9" src="@/assets/folhas/arvore9.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 8" src="@/assets/folhas/arvore8.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 7" src="@/assets/folhas/arvore7.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 6" src="@/assets/folhas/arvore6.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 5" src="@/assets/folhas/arvore5.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 4" src="@/assets/folhas/arvore4.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 3" src="@/assets/folhas/arvore3.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 2" src="@/assets/folhas/arvore2.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 1" src="@/assets/folhas/arvore1.png" class=" img-arvore" alt="">
                    <img v-if="folhasCota == 0" src="@/assets/folhas/arvore0.png" class=" img-arvore" alt="">

                    <h4 class="h4-arvore">{{ folhasCota }} cotas</h4>
                </figure>
                <!-- <div class="d-flex m-3 justify-content-center" v-if="isMobile">
    <button type="button" @click="showCardAdquirirMobile()" class="btn btn-cota">Adquirir cota</button>
    <button type="button" @click="showCardPresentearMobile()" class="btn btn-cota">Presentear</button>

</div> -->
                <div class="d-flex m-3 justify-content-center">
                    <button type="button" @click="openModalAdquirir" class="btn btn-cota text-decoration-underline">Adquirir
                        cota</button>
                    <button type="button" @click="openModalPresentear"
                        class="btn btn-cota text-decoration-underline">Presentear</button>

                </div>

                <div v-if="showCardAdquirir">
                    <div class="modal-body">

                        <h5 class="text-center titulo-modal">Quantas cotas você quer adquirir?</h5>
                        <div class="btn-number text-center">
                            <button type="button" @click="cota.cotas--" class="btn btn-plus">-</button>
                            <input type="number" class="input-number" v-model="cota.cotas" min="0" max="10">
                            <button type="button" @click="cota.cotas++" class="btn btn-plus">+</button>
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
                            <input type="email" class="input-text" placeholder="Informe o email"
                                v-model="cota.enviar.email">

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
                    <div class="col-md-6 active col-6 center-arvorometro">
                        <div class="card card-arvorometro">
                            <div class="btn btn-arvorometro">ARVORÔMETRO</div>

                            <h5 class="card-title text-center titulo-arvorometro ">{{ arvorePlantada }}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary text-center subtitulo-arvorometro">Árvores
                                plantadas</h6>
                        </div>
                    </div>
                    <div class="col-6 col-md-6">
                        <div class="nuvem-branca">
                            <div class="speech-bubble-2">
                                <p>Em cada <span>viagem,</span> temos a oportunidade <br> de transformar nossa jornada em
                                    uma <br><span>foresta de esperença💛</span>
                                </p>
                            </div>

                        </div>
                    </div>



                </div>

                <div class="col-12 col-map">
                    <div class="col-12">
                        <button class="btn btn-confira">Confira os projetos que você ajudou</button>
                    </div>


                    <!-- <div class="carousel">
                            <div class="carousel-inner">
                                <div v-for="(item, index) in cota.data.Projeto" :key="index" class="carousel-item"
                                    :class="{ 'active': index === currentIndex }">
                                    <img src="https://picsum.photos/seed/picsum/200/300" alt="Slide Image">
                                    <div class="col-arvorometro col-12 mt-2">
                                        <h4 class="h4-nome-projeto">{{ item.NomeProjeto }}</h4>
                                        <a :href="item.UrlSite" target="_blank" class="p-nome-projeto">Ver no mapa</a>
                                    </div>
                                </div>

                            </div>

                            <a class="carousel-control-prev" @click="prevSlide">&lsaquo;</a>
                            <a class="carousel-control-next" @click="nextSlide">&rsaquo;</a>
                        </div> -->

                    <div class="text-center p-t-12 d-flex align-items-center flex-column">


                        <div class="carousel-container">

                            <div v-for="(item, index) in cota.data.Projeto" :key="index" class="carousel"
                                :class="{ 'active': index === cota.currentIndex }">
                                <img :src="item.UrlImagem" alt="Slide Image">
                            </div>
                            <button class="prev" @click="prevSlide()">&#10094;</button>
                            <button class="next" @click="nextSlide()">&#10095;</button>

                        </div>
                        <div class="col-12 mt-2">
                            <h4 class="h4-nome-projeto">{{ cota.data.Projeto[cota.currentIndex].NomeProjeto }}</h4>
                            <a :href="cota.data.Projeto[cota.currentIndex].UrlSite" target="_blank"
                                class="p-nome-projeto">Ver no mapa</a>
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

.carousel-container {
    position: relative;
    width: 80%;
    height: 160px;
    overflow: hidden;
    border-radius: 60px;
    margin-top: 10%;
}

.carousel {
    display: flex;
    width: 100%;
    transition: transform 0.5s ease-in-out;
}

.carousel img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
}

.prev {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    cursor: pointer;
    color: white;
    background-color: #e3de3a;
    border: none;
    border-radius: 50px;
    padding: 10px;
    margin: 0px 5px;
}

.next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    cursor: pointer;
    color: white;
    background-color: #e3de3a;
    border: none;
    border-radius: 50px;
    padding: 10px;
    margin: 0px 5px;
}

.prev {
    left: 0;
}

.next {
    right: 0;
}
</style>