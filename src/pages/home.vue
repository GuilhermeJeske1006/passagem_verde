<template>
    <div v-if="cota.isLoading" class="loading"></div>

    <div  v-else>
        <nav-header />
        <div class="col-12 flex-page d-flex">
            <div class="col-md-6 col-12 col-nuvem align-items-center justify-content-center">
                <div @click="openModalNotificacao" class="icon-container">
                    <i class="fa fa-bell notification-icon" tabindex="0" data-bs-toggle="tooltip" title="Notificações"
                        style="color: #ffffff;"></i>
                    <div class="notification-badge">{{ cota.notification.Cota.length }}</div>
                </div>

                <div class="nuvem">
                    <div class="speech-bubble">
                        <p class="p-speech">Com mais  <span class="font-bold">{{ 20 - folhasCota }} {{ 20 - folhasCota
                            == 1 ? 'cota' : 'cotas' }}</span><br>
                             você plantar sua <br> árvore!</p>
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

                    <h4 class="h4-arvore">{{ folhasCota }} {{ folhasCota == 1 ? 'cota' : 'cotas' }}
                        <span class="d-inline-block" style="font-size: large; cursor: pointer;"
                            @click="cota.openModalInformacao">
                            <i style="color: #e3de3a" class="fa-solid fa-circle-info"></i>
                        </span>

                    </h4>
                </figure>

                <div class="d-flex m-3 justify-content-center">
                    <button type="button" @click="openModalAdquirir" class="btn btn-cota text-decoration-underline">Adquirir
                        cota</button>
                    <button type="button" @click="openModalPresentear"
                        class="btn btn-cota text-decoration-underline">Presentear</button>
                </div>

                <div class="text-center">
                    <h4 class="h4-arvore" style="font-size: 25px;color: #000;">Total de cotas: {{ cota.data.QuantidadeCotas
                    }}</h4>

                </div>
            </div>
            <div class="col-md-6 col-12 col-arvorometro">
                <div class="col-12 d-flex" style="margin-top: 13%;">
                    <div class="col-md-6 active col-6 center-arvorometro">
                        <div class="card card-arvorometro">
                            <div class="btn btn-arvorometro">ARVORÔMETRO</div>
                            <div class="d-flex">
                                <div class="d-grid m-1">
                                    <h5 class="card-title text-center titulo-arvorometro ">{{ arvorePlantada }}</h5>
                                    <h6 class="card-subtitle mb-2 text-body-secondary text-center subtitulo-arvorometro">
                                        Árvores para plantar</h6>
                                </div>
                                <div class="d-grid m-1">
                                    <h5 class="card-title text-center titulo-arvorometro ">{{ cota.data.QuantidadeResgatada
                                    }}</h5>
                                    <h6 class="card-subtitle mb-2 text-body-secondary text-center subtitulo-arvorometro">
                                        Árvores
                                        plantadas</h6>
                                </div>
                            </div>



                        </div>
                    </div>
                    <div class="col-6 col-md-6">

                        <div class="balao">
                            <div class="ponta"></div>
                            <div class="conteudo">
                                <p class="conteudo">Em cada <span style="font-weight: bold;">viagem</span>, temos a
                                    oportunidade de transformar nossa jornada em uma <span
                                        style="font-weight: bold;">floresta de esperança💛</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-map">
                    <div class="col-12">
                        <div class="btn card-veja " style="pointer-events: none;">
                            <span>Veja abaixo às áreas de plantio</span>
                            <p class="mt-2">Abaixo você confere os locais de plantio do projeto Passagem Verde e o mapa com
                                a localização das árvores.</p>
                        </div>
                    </div>

                    <div class="text-center p-t-12 d-flex align-items-center flex-column">
                        <div class="col-12 mt-5 ">
                            <a :href="cota.data.Projeto[cota.currentIndex].UrlSite" target="_blank"
                                class=" pt-2 pb-2 btn btn-cota text-decoration-underline">Ver o mapa dos locais de plantio</a>
                            <!-- <a :href="cota.data.Projeto[cota.currentIndex].UrlSite" target="_blank"
                                class="p-nome-projeto">Ver o mapa dos locais de plantio</a> -->
                        </div>
                        <div class="carousel-container">
                            <div class="carousel h-100 active" @click="expandirImagem">
                                <img :src="cota.data.Projeto[cota.currentIndex].UrlImagem" alt="Slide Image">
                            </div>
                            <div class="expandir" v-if="imagemExpandida">
                                <img :src="cota.data.Projeto[cota.currentIndex].UrlImagem" alt="Slide Image">
                                <button @click="contrairImagem"><span>&times;</span></button>
                            </div>
                            <button class="prev" @click="prevSlide">&#10094;</button>
                            <button class="next" @click="nextSlide">&#10095;</button>
                        </div>
                        <div class="col-12 mt-2">
                            <h4 class="
                            h4-nome-projeto
                            ">{{ cota.data.Projeto[cota.currentIndex].NomeProjeto }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal-informacao
        :text="'Ao finalizar as 20 cotas, sua árvore será contabilizado no Arvorômetro, zerando o painel de cotas para aquisição de uma nova árvore'" />
    <modal-adquirir />
    <modal-pix />
    <modal-credito />
    <modal-presentar />
    <modal-sucesso />
    <modal-notificacao />
</template>

<script>
import { useUsuarioStore } from "@/stores/UserStore";
import { ref, watch } from "vue";
import { computed, onMounted } from 'vue';
import { useCotaStore } from "@/stores/CotaStore";
import modalNotificacao from '@/components/modal/modalNotificacao.vue';
import modalPresentar from '@/components/modal/modalPresentar.vue';
import modalSucesso from '@/components/modal/modalSucesso.vue';
import modalCredito from '@/components/modal/modalCredito.vue';
import navHeader from '@/components/geral/navHeader.vue';
import ModalAdquirir from '@/components/modal/modalAdquirir.vue';
import ModalPix from '@/components/modal/modalPix.vue';
import ModalInformacao from '@/components/modal/modalInformacao.vue';


export default {
    name: "LoginView",

    components: {
        modalNotificacao,
        navHeader,
        modalPresentar,
        modalSucesso,
        ModalAdquirir,
        modalCredito,
        ModalPix,
        ModalInformacao
    },

    setup() {
        const usuario = useUsuarioStore();

        const errors = ref({
            username: "",
            password: "",
        });

        const cota = useCotaStore();

        const imagemExpandida = ref(false);

        const expandirImagem = () => {
            imagemExpandida.value = true;
        };

        const contrairImagem = () => {
            imagemExpandida.value = false;
        };



        const arvorePlantada = computed(() => {
            const resultado = (cota.data.QuantidadeCotas / 20) - cota.data.QuantidadeResgatada;
            return Math.trunc(resultado);
        });

        const folhasCota = computed(() => cota.data.QuantidadeCotas % 20);


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
            cota.getUser();
            cota.getPresente();
            console.log(cota)
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

        const updateCota = (newData) => {
            cota.data = newData;
        };

        const updateNotifi = (newData) => {
            cota.notification = newData;
        };


        watch(
            () => {
                if (cota.cota != undefined) {
                    cota.data,
                        (newData,) => {
                            updateCota(newData);
                        }
                }
            }
        );

        watch(
            () => {
                if (cota.notification.cota != undefined) {
                    cota.notification.cota,
                        (newData,) => {
                            updateNotifi(newData)
                        }
                }

            }
        );

        return {
            usuario,
            errors,
            cota,
            arvorePlantada,
            folhasCota,
            openModalAdquirir,
            nextSlide,
            prevSlide,
            showCardAdquirirMobile,
            showCardPresentearMobile,
            openModalNotificacao,
            openModalPresentear,
            expandirImagem,
            imagemExpandida,
            contrairImagem,
        };
    },
};
</script>

<style scoped>
.expandir {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    color: white;
    /* Cor do texto no fundo escuro */

}

.expandir img {
    max-width: 100%;
    max-height: 100%;
}

/* Adicione estilos para o botão de fechar, se necessário */
.expandir button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    color: white;
    border: none;
    cursor: pointer;
}

.carousel-container {
    position: relative;
    width: 80%;
    height: 100%;
    overflow: hidden;
    border-radius: 60px;
    margin-top: 2%;
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
    cursor: pointer;

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
}</style>