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
            <div class="col-md-6 col-12 col-nuvem align-items-center justify-content-center">

                

                <div @click="openModalNotificacao" class="icon-container">
                    <div class="notification-badge">{{ cota.notification.Cota.length }}</div>
                </div>

                <div class="nuvem">
                    <div class="speech-bubble">
                        <p class="p-speech">Faltam apenas <span class="font-bold">{{ 20 - folhasCota }} cotas</span><br/>
                            para você plantar sua <br/> árvore!</p>
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
                    <button type="button" @click="openModalAdquirir" class="btn btn-cota text-decoration-underline">Adquirir cota</button>
                    <button type="button" @click="openModalPresentear" class="btn btn-cota text-decoration-underline">Presentear</button>

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
                                <p>Em cada <span>viagem,</span> temos a oportunidade <br> de transformar nossa jornada em uma <br><span>foresta de esperença💛</span>
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
                            <div class="carousel" >
                                <div v-for="(item, index) in cota.data.Projeto" :key="index" class="carousel-item"
                                    :class="{ 'active': index === currentIndex }">
                                    <img :src="item.UrlImagem" alt="Slide Image">
                                
                                </div>
                            </div>
                            <button class="prev" @click="prevSlide()">&#10094;</button>
                            <button class="next" @click="nextSlide()">&#10095;</button>

                        </div>
                        <div class="col-arvorometro col-12 mt-2" style="background: none;">
                                <h4 class="h4-nome-projeto">{{ cota.data.Projeto && cota.data.Projeto[currentIndex] && cota.data.Projeto[currentIndex].NomeProjeto ? cota.data.Projeto[currentIndex].NomeProjeto : 'Nome do Projeto Indefinido' }}</h4>
                                <a :href="cota.data.Projeto && cota.data.Projeto[currentIndex] && cota.data.Projeto[currentIndex].UrlSite ? cota.data.Projeto[currentIndex].UrlSite : '#'" target="_blank" class="p-nome-projeto">Ver no mapa</a>
                                </div>

                    </div>
                
                           
                       
                    </div>



            </div>
        </div>

      <!-- modal adquirir -->
    <div class="modal" tabindex="-1" role="dialog" @click.stop
        :class="{ 'show': cota.showModalAdquirir, 'd-block': cota.showModalAdquirir }">
        <div class="modal-dialog" role="document">
            <form @submit.prevent="submitAdquirir" v-if="cota.showQtdCota" class="modal-content">

                <div class="modal-body">
                    <button type="button" class="btn" @click="closeModalAdquirir">
                        <span>&times;</span>
                    </button>
                    <h5 class="text-center titulo-modal">Quantas cotas você quer adquirir?</h5>
                    <div class="btn-number text-center">
                        <p style="color: red" v-if="cota.errors.cotaAquirir">{{ cota.errors.cotaAquirir }}</p>
                        <button type="button" @click="cota.cotas--" class="btn btn-plus">-</button>
                        <input type="number" class="input-number" v-model="cota.cotas" min="0" max="10">
                        <button type="button" @click="cota.cotas++" class="btn btn-plus">+</button>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-adquirir">Adquirir</button>
                    </div>


                </div>
            </form>

            <div v-if="cota.showMetodoPagamento" class="modal-content">

                <div class="modal-body">
                    <button type="button" class="btn" @click="closeModalAdquirir">
                        <span>&times;</span>
                    </button>
                    <h5 class="text-center titulo-modal">Selecione o sue metodo de pagamento</h5>
                    <div class="btn-number text-center m-5">
                        <div class="text-danger" v-if="cota.errors.metodoPreencher">{{ cota.errors.metodoPreencher }}</div>
                        <div class="form-group d-flex m-2">
                            <input @change="checkCheckbox" class="ml-5 mr-5" v-model="cota.metodo.pix" value="true"
                                type="checkbox" name="pass" placeholder="Sua Senha">
                            <p class="font-weight-medium ml-5 mr-5" style="    margin-left: 10px;">Pix</p>
                        </div>
                        <div class="form-group d-flex m-2">
                            <input class="ml-5 mr-5" @change="checkCheckbox" v-model="cota.metodo.credito" value="true"
                                type="checkbox" name="pass" placeholder="Sua Senha">
                            <p class="font-weight-medium ml-5 mr-5" style="    margin-left: 10px;">Cartão de credito</p>
                        </div>
                    </div>
                    <div class="text-center">
                        <button @click="irPagamento" class="btn btn-adquirir">Proximo</button>
                    </div>


                </div>
            </div>



        </div>
    </div>

    <!-- modal pix -->
    <div class="modal " tabindex="-1" role="dialog" :class="{ 'show': cota.showCardPix, 'd-block': cota.showCardPix }">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form @submit.prevent="pagarPix" class="modal-body">
                    <button type="button" class="btn" @click="closeModalPix">
                        <span>&times;</span>
                    </button>
                    <h5 class="text-center titulo-modal">Scaneie o qrCode</h5>
                    <br />
                    <div class="form-group">
                        <img src="@/assets/folhas/arvore20.png" class="img-fluid" alt="">

                    </div>



                    <button type="submit" class="btn btn-adquirir">Finalizar Pagamento</button>

                </form>

            </div>
        </div>
    </div>


    <!-- modal credito -->
    <div class="modal " tabindex="-1" role="dialog"
        :class="{ 'show': cota.showCardCredito, 'd-block': cota.showCardCredito }">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form @submit.prevent="pagarCredito" class="modal-body">
                    <button type="button" class="btn" @click="closeModalCredito">
                        <span>&times;</span>
                    </button>
                    <h5 class="text-center titulo-modal">Informe os seus dados abaixo</h5>
                    <br />
                    <div class="form-group">
                        <div class="wrap-input100 validate-input">
                            <input class="input100" v-model="cota.credito.nome" type="text" required name="pass"
                                id="nome_cartao" placeholder="Nome no cartão">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-user-circle" aria-hidden="true"></i>
                            </span>
                        </div>

                    </div>
                    <div class="form-group">
                        <div class="wrap-input100 validate-input">
                            <input class="input100" v-model="cota.credito.cpf" type="text" required name="pass" id="cpf"
                                placeholder="Numero do Cpf">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-vcard-o" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <!-- <div class="form-group">
                        <div class="wrap-input100 validate-input">
                            <select class="form-control input100" v-model="cota.credito.bandeira" id="bandeira" required>
                                <option value="" disabled selected>Selecione a bandeira</option>
                                <option value="visa">Visa</option>
                                <option value="mastercard">Mastercard</option>
                            </select>
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-flag" aria-hidden="true"></i>
                            </span>
                        </div>

                    </div> -->
                    <div class="form-group">

                        <div class="wrap-input100 validate-input">
                            <input @change="getBandeira" class="input100" v-model="cota.credito.numero_cartao" type="number"
                                required name="pass" id="numero_cartao" placeholder="Numero do cartão">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-id-card" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="form-group">

                        <div class="wrap-input100 validate-input">
                            <input class="input100" v-model="cota.credito.cvv" type="text" required name="pass" id="cvv"
                                placeholder="CVV">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="form-row d-flex">
                        <div class="form-group col-md-6">

                            <div class="wrap-input100 validate-input">
                                <input class="input100" v-model="cota.credito.mes" type="number" required name="pass"
                                    id="mes" placeholder="Mês Expiração">
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-calendar" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                        <div class="form-group col-md-6">

                            <div class="wrap-input100 validate-input">
                                <input class="input100" v-model="cota.credito.ano" type="number" required name="pass"
                                    id="ano" placeholder="Ano Expiração">
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-calendar" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-adquirir">Finalizar Pagamento</button>

                </form>

            </div>
        </div>
    </div>

    <!-- modal presentear -->
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
                        <p style="color: red" v-if="cota.errors.nome">{{ cota.errors.nome }}</p>
                        <div class="wrap-input100 validate-input">
                            <input class="input100" placeholder="Informe o nome" v-model="cota.enviar.nome" type="text">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-user-circle" aria-hidden="true"></i>
                            </span>
                        </div>
                        <p style="color: red" v-if="cota.errors.email">{{ cota.errors.email }}</p>
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
                        <p style="color: red">{{ cota.errors.cotas }}</p>
                        <p style="color: red">{{ cota.errors.cotasMin }}</p>

                        <button type="button" @click="cota.enviar.cotas--" class="btn btn-plus">-</button>
                        <input type="number" class="input-number" v-model="cota.enviar.cotas" min="0" max="10">
                        <button type="button" @click="cota.enviar.cotas++" class="btn btn-plus">+</button>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-adquirir">Presentar</button>
                    </div>


                </form>
            </div>
        </div>
    </div>


    <!-- modal sucesso  -->
    <div class="modal" tabindex="-1" role="dialog" @click.stop
        :class="{ 'show': cota.showModalPresente, 'd-block': cota.showModalPresente }">
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

    <!-- modal notificacao -->
    <div class="modal" tabindex="-1" role="dialog"
        :class="{ 'show': cota.showNotificacao, 'd-block': cota.showNotificacao }">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form @submit.prevent="postAceitarNotificacao" class="modal-body">
                    <button type="button" class="btn" @click="closeModalNotificacao">
                        <span>&times;</span>
                    </button>
                    <h3 class="text-center titulo-modal">Suas notificaçãoes</h3>
                    <div v-if="cota.notification.Cota.length > 0" class="btn-number text-center">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Mensagem</th>
                                    <th scope="col">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in cota.notification.Cota" :key="item.id">
                                    <th scope="row">{{ index }}</th>
                                    <td>Você recebeu <b>{{ item.Quantidade }}</b> cotas de <b>{{ item.EmailOrigem }}</b>
                                    </td>
                                    <td>
                                        <input type="hidden">
                                        <input v-model="item.isChecked" @change="checkboxChanged(item)" type="checkbox" />
                                    </td>

                                </tr>

                            </tbody>
                        </table>

                    </div>
                    <h5 v-else class="text-center titulo-modal">Você não possui nenhuma notificação</h5>


                    <div v-if="cota.notification.Cota.length < 0" class="text-right">
                        <button type="submit" class="btn btn-adquirir">Aceitar todos</button>
                    </div>


                </form>
            </div>
        </div>
    </div>

    </div>
</template>
  
<script>
import { useUsuarioStore } from "@/stores/UserStore";
import { ref } from "vue";
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { useCotaStore } from "@/stores/CotaStore";

export default {
    name: "LoginView",
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

        const checkboxChanged = (item) => {
            console.log(`Checkbox para ${item.EmailOrigem} está marcado como ${item.isChecked ? 'true' : 'false'}`);
        };

        const pagarCredito = () => {
            if (cota.credito.nome != '' && cota.credito.cpf != '' &&
                cota.credito.numero_cartao != '' && cota.credito.cvv != ''
                && cota.credito.mes != '' && cota.credito.ano != '') {
                cota.postCredito()
            }
        };


        const submit = () => {
            if (cota.enviar.nome !== '' && cota.enviar.email !== '' && cota.enviar.cotas !== 0 && cota.enviar.cotas >= 1) {
                closeModalPresentear();
                openModalPresente();
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

        const openModalAdquirir = () => {
            cota.showModalAdquirir = true;
            document.body.classList.add('modal-open');
        };

        const closeModalAdquirir = () => {
            cota.showModalAdquirir = false
            cota.metodo.credito = false
            cota.metodo.pix = false
            document.body.classList.remove('modal-open');
        };

        const getBandeira = () => {
            try {
                window.EfiJs.CreditCard
                    .setCardNumber(cota.credito.numero_cartao)
                    .verifyCardBrand()
                    .then(brand => {
                        console.log('Bandeira: ', brand);
                        cota.credito.bandeira = brand

                        if (brand !== 'undefined') {
                            // Exemplo: executar a função para gerar o payment_token com a bandeira identificada
                        }
                    }).catch(err => {
                        console.log('Código: ', err.code);
                        console.log('Nome: ', err.error);
                        console.log('Mensagem: ', err.error_description);
                    });
            } catch (error) {
                console.log('Código: ', error.code);
                console.log('Nome: ', error.error);
                console.log('Mensagem: ', error.error_description);
            }
        }

        const closeModalPresente = () => {
            cota.showModalPresente = false;
            document.body.classList.remove('modal-open');
        };

        const closeModalCredito = () => {
            cota.showCardCredito = false
            closeModalAdquirir()
            document.body.classList.remove('modal-open');

        }
        const closeModalPix = () => {
            cota.showCardPix = false
            closeModalAdquirir()
            document.body.classList.remove('modal-open');

        }
        const openModalCredito = () => {
            cota.showCardCredito = true
            document.body.classList.add('modal-open');

        }

        const openModalPix = () => {
            cota.showCardPix = true
            document.body.classList.add('modal-open');

        }

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
            getBandeira()



        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', checkIfMobile);
        });




        const submitAdquirir = () => {
            if (cota.cotas === 0) {
                cota.errors.cotaAquirir = 'O valor da cota não pode ser igual a zero';
            } else {
                cota.showQtdCota = false
                cota.showMetodoPagamento = true
                // closeModalAdquirir();
                // console.log('Cotas adquiridas com sucesso');
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

        const checkCheckbox = () => {
            // Lógica para garantir que os dois checkboxes não estejam selecionados simultaneamente
            if (cota.metodo.credito && cota.metodo.pix) {
                // Desmarcar o checkbox que foi alterado
                cota.metodo.credito = !cota.metodo.credito;
                cota.metodo.pix = !cota.metodo.pix;
            }
        };

        const irPagamento = () => {
            if (cota.metodo.pix == true || cota.metodo.credito == true) {
                if (cota.metodo.pix == true) {
                    closeModalAdquirir()
                    openModalPix()
                } if (cota.metodo.credito == true) {
                    closeModalAdquirir()
                    openModalCredito()
                }
            } else {
                cota.errors.metodoPreencher = 'Por favor! selecione algum dos metodos para prosseguir!'
            }
        };



        const login = () => {
            if (usuario.password !== "" && usuario.username !== "") {
                usuario.login();
            } else {
                if (usuario.username === "") {
                    errors.value.username = "O campo username não pode estar vazio";
                }
                if (usuario.password === "") {
                    errors.value.password = "O campo password não pode estar vazio";
                }
            }
        };
        return {
            usuario,
            login,
            errors,
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
            closeModalPresentear,
            openModalPresente,
            submit,
            irPagamento,
            openModalCredito,
            closeModalCredito,
            pagarCredito,
            checkCheckbox,
            closeModalPix,
            openModalPix,
            getBandeira
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
    width: 300%;
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