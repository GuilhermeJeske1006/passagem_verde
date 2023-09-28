<template>
    <div v-if="isLoading" class="loading"></div>

    <div v-else>
        <nav class="navbar">
            <div class="container-fluid" v-if="isMobile">
                <div class="col-12 d-flex">
                    <div class="col-6">
                        <a class="navbar-brand" href="#">

                            <div class="rounded-square">
                                Olá {{ data.Nome }}
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
                        Olá {{ data.Nome }}
                    </div>
                </a>
                <a class="navbar-brand" href="#">
                    <img src="@/assets/logo.png" style="width: 60%;" alt="Logo" class="w-60 d-inline-block ">
                </a>

            </div>
        </nav>
        <div class="col-12 flex-page d-flex" style="height: 100vh;">
            <div class="col-md-6 col-12 col-nuvem">



                <div class="nuvem">
                    <div class="speech-bubble">
                        <p>Faltam apenas <span>{{ 20 - folhasCota }} cotas</span>
                            para você plantar sua
                            árvore</p>
                    </div>
                </div>
                <figure class="arvore">
                    <img v-if="folhasCota == 20" src="@/assets/folhas/Árvore20.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 19" src="@/assets/folhas/Árvore19.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 18" src="@/assets/folhas/Árvore18.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 17" src="@/assets/folhas/Árvore17.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 16" src="@/assets/folhas/Árvore16.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 15" src="@/assets/folhas/Árvore15.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 14" src="@/assets/folhas/Árvore14.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 13" src="@/assets/folhas/Árvore13.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 12" src="@/assets/folhas/Árvore12.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 11" src="@/assets/folhas/Árvore11.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 10" src="@/assets/folhas/Árvore10.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 9" src="@/assets/folhas/Árvore9.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 8" src="@/assets/folhas/Árvore8.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 7" src="@/assets/folhas/Árvore7.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 6" src="@/assets/folhas/Árvore6.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 5" src="@/assets/folhas/Árvore5.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 4" src="@/assets/folhas/Árvore4.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 3" src="@/assets/folhas/Árvore3.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 2" src="@/assets/folhas/Árvore2.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 1" src="@/assets/folhas/Árvore1.png" class="img-fluid img-arvore" alt="">
                    <img v-if="folhasCota == 0" src="@/assets/folhas/Árvore0.png" class="img-fluid img-arvore" alt="">

                    <h4 class="h4-arvore">{{ folhasCota }} cotas</h4>
                </figure>
                <div class="d-flex m-3 justify-content-center" v-if="isMobile">
                    <button type="button" @click="showCardAdquirirMobile()" class="btn btn-cota">Adquirir cota</button>
                    <button type="button" @click="showCardPresentearMobile()" class="btn btn-cota">Presentear</button>

                </div>
                <div class="d-flex m-3 justify-content-center" v-else>
                    <button type="button" @click="openModalAdquirir" class="btn btn-cota">Adquirir cota</button>
                    <button type="button" @click="openModalPresentear" class="btn btn-cota">Presentear</button>

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
                            <p style="color: red" v-if="errors.nome">{{ errors.nome }}</p>
                            <input type="text" class="input-text" placeholder="Informe o nome" v-model="enviar.nome">
                            <p style="color: red" v-if="errors.email">{{ errors.email }}</p>
                            <input type="email" class="input-text" placeholder="Informe o email" v-model="enviar.email">

                        </div>
                        <h5 class="text-center titulo-modal">Com quantas cotas você quer presentear?</h5>
                        <div class="btn-number text-center">
                            <p style="color: red">{{ errors.cotas }}</p>
                            <button type="button" @click="enviar.cotas--" class="btn btn-plus">-</button>
                            <input type="number" class="input-number" v-model="enviar.cotas" min="0" max="10">
                            <button type="button" @click="enviar.cotas++" class="btn btn-plus">+</button>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-adquirir">Adquirir</button>
                        </div>


                    </form>

                </div>

                <div style="max-width: 80%; margin-left: 10%;" v-if="isMobile && showCardPresente">
                    <div style="background-color: #135b2d " class="card">
                        <div class="modal-body">
                            <button type="button" class="btn btn-fechar" @click="showCardPresente = false">
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
                                <div v-for="(item, index) in data.Projeto" :key="index" class="carousel-item"
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
        <div class="modal" tabindex="-1" role="dialog" @click.stop
            :class="{ 'show': showModalAdquirir, 'd-block': showModalAdquirir }">
            <div class="modal-dialog" role="document">
                <form @submit.prevent="submitAdquirir" class="modal-content">

                    <div class="modal-body">
                        <button type="button" class="btn" @click="closeModalAdquirir">
                            <span>&times;</span>
                        </button>
                        <h5 class="text-center titulo-modal">Quantas cotas você quer adquirir?</h5>
                        <div class="btn-number text-center">
                            <p style="color: red" v-if="errors.cotaAquirir">{{ errors.cotaAquirir }}</p>
                            <button type="button" @click="cotas--" class="btn btn-plus">-</button>
                            <input type="number" class="input-number" v-model="cotas" min="0" max="10">
                            <button type="button" @click="cotas++" class="btn btn-plus">+</button>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-adquirir">Adquirir</button>
                        </div>


                    </div>
                </form>
            </div>
        </div>

        <!-- Presente enviado com sucesso -->
        <div class="modal" tabindex="-1" role="dialog" @click.stop
            :class="{ 'show': showModalPresente, 'd-block': showModalPresente }">
            <div class="modal-dialog" role="document">
                <div style="background-color: #135b2d " class="modal-content">

                    <div class="modal-body">
                        <button type="button" class="btn btn-fechar" @click="closeModalPresente">
                            <span>&times;</span>
                        </button>
                        <h5 class="text-center titulo-modal">Seu presente foi enviado com sucesso</h5>
                        <div class="btn-number text-center">
                            <p class="p-modal-presente">A pessoa terá <span>07 dias</span>para confirmar o recebimento no
                                <br />
                                email que enviamos. Caso contrário, devolvemos as cotas para sua conta.

                            </p>
                        </div>


                    </div>
                </div>
            </div>
        </div>


        <!-- Modal Presentear -->
        <div class="modal" tabindex="-1" role="dialog"
            :class="{ 'show': showModalPresentear, 'd-block': showModalPresentear }">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <form @submit.prevent="submit" class="modal-body">
                        <button type="button" class="btn" @click="closeModalPresentear">
                            <span>&times;</span>
                        </button>
                        <h5 class="text-center titulo-modal">Quem você quer presentear?</h5>
                        <div class="btn-number text-center">
                            <p style="color: red" v-if="errors.nome">{{ errors.nome }}</p>
                            <input type="text" class="input-text" placeholder="Informe o nome" v-model="enviar.nome">
                            <p style="color: red" v-if="errors.email">{{ errors.email }}</p>
                            <input type="email" class="input-text" placeholder="Informe o email" v-model="enviar.email">

                        </div>
                        <h5 class="text-center titulo-modal">Com quantas cotas você quer presentear?</h5>
                        <div class="btn-number text-center">
                            <p style="color: red">{{ errors.cotas }}</p>
                            <button type="button" @click="enviar.cotas--" class="btn btn-plus">-</button>
                            <input type="number" class="input-number" v-model="enviar.cotas" min="0" max="10">
                            <button type="button" @click="enviar.cotas++" class="btn btn-plus">+</button>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-adquirir">Adquirir</button>
                        </div>


                    </form>
                </div>
            </div>
        </div>

    </div>
</template>
  
<script>
export default {
    name: 'HomeView',

    data() {
        return {
            isLoading: true,
            data: {
            },
            isMobile: false,
            showCardAdquirir: false,
            showModalAdquirir: false,
            showModalPresentear: false,
            showModalPresente: false,
            showCardPresente: false,
            showCardPresentear: false,
            cotas: 0,
            enviar: {
                nome: '',
                email: '',
                cotas: 0
            },
            errors: {
                nome: '',
                email: '',
                cotas: '',
                cotaAquirir: ''
            },
            currentIndex: 0,

        }
    },
    created() {
        // Add a listener to the 'resize' event
        window.addEventListener('resize', this.checkIfMobile);
        // Initial check on page load
        this.checkIfMobile();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkIfMobile);
    },

    computed: {
        arvorePlantada() {
            const resultado = this.data.QuantidadeCotas / 20;
            return Math.trunc(resultado);
        },
        folhasCota() {
            return this.data.QuantidadeCotas % 20;
        }
    },

    mounted() {
        const apiUrl = "https://7fhxhtheo0.execute-api.us-east-1.amazonaws.com/action-neutralizacarbon/user";

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'AuthToken': localStorage.getItem("token")
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta da API');
                }
                return response.json();
            })
            .then(data => {
                // Defina isLoading como false após receber os dados
                this.isLoading = false;
                this.data = data;
            })
            .catch(error => {
                console.error('Erro ao fazer a solicitação GET:', error);
                // Certifique-se de definir isLoading como false em caso de erro também
                this.isLoading = false;
            });
    },

    methods: {
        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % this.data.Projeto.length;
        },
        prevSlide() {
            this.currentIndex = (this.currentIndex - 1 + this.data.Projeto.length) % this.data.Projeto.length;
        },

        checkIfMobile() {
            this.isMobile = window.innerWidth <= 768;
        },
        openModalAdquirir() {
            this.showModalAdquirir = true;
            document.body.classList.add('modal-open'); // Adicione a classe modal-open para bloquear a rolagem do corpo quando o modal está aberto
        },

        closeModalAdquirir() {
            this.showModalAdquirir = false;
            document.body.classList.remove('modal-open');
        },

        openModalPresente() {
            this.showModalPresente = true;
            document.body.classList.add('modal-open'); // Adicione a classe modal-open para bloquear a rolagem do corpo quando o modal está aberto
        },

        closeModalPresente() {
            this.showModalPresente = false;
            document.body.classList.remove('modal-open');
        },


        openModalPresentear() {
            this.showModalPresentear = true;
            document.body.classList.add('modal-open'); // Adicione a classe modal-open para bloquear a rolagem do corpo quando o modal está aberto
        },

        closeModalPresentear() {
            this.showModalPresentear = false;
            document.body.classList.remove('modal-open'); // Remova a classe modal-open para permitir a rolagem do corpo novamente
        },

        submit() {
            if (this.enviar.nome != '' && this.enviar.email != '' || this.enviar.cotas != 0) {

                if (this.isMobile) {
                    this.showCardPresentear = false
                    this.showCardPresente = true
                } else {
                    this.closeModalPresentear()
                    this.openModalPresente();
                }

            } else {
                if (this.enviar.nome == '') {
                    this.errors.nome = 'O campo nome não pode estar vazio';
                }
                if (this.enviar.email == '') {
                    this.errors.email = 'O campo email não pode estar vazio';
                }
                if (this.enviar.cotas == 0) {
                    this.errors.cotas = 'O campo nome não pode estar igual a zero';
                }
            }
        },

        submitAdquirir() {
            if (this.cotas == 0) {
                this.errors.cotaAquirir = 'O valor da cota não pode ser igual a zero';
            } else {
                this.closeModalAdquirir();
                console.log('Cotas adquiridas com sucesso');
            }
        },

        showCardAdquirirMobile() {
            this.showCardAdquirir = true
            if (this.showCardPresentear == true) {
                this.showCardPresentear = false
            }
        },

        showCardPresentearMobile() {
            this.showCardPresentear = true
            if (this.showCardAdquirir == true) {
                this.showCardAdquirir = false
            }
        }


    },


}
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
</style>