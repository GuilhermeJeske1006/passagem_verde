import { defineStore } from "pinia";
import router from "@/router";

export const useCotaStore = defineStore("cota", {
  state() {
    return {
      isLoading: false,
        data: {},
        isMobile: false,
        showCardAdquirir: false,
        showModalAdquirir: false,
        showModalPresentear: false,
        showModalPresente: false,
        showCardPresente: false,
        showCardPresentear: false,
        isToastVisible: true,      
        showNotificacao: false,
        cotas: 0,
        enviar: {
            nome: '',
            email: '',
            cotas: 0,

        },
        errors: {
            nome: '',
            email: '',
            cotas: '',
            cotaAquirir: '',
            cotasMin: ''
        },
        notification: {
            Cota: {
                isChecked: false
            }
        },
        currentIndex: 0,
    };
  },

  actions: {
    getUser(){
        const apiUrl = 'https://api.passagemverde.com.br/user';


            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'AuthToken': localStorage.getItem('token'),
                },
            })
                .then((response) => {
                    console.log('response', response)
                    if (response.status == 401) {
                        return router.push("/login")
                    }
                    if (!response.ok) {
                        throw new Error('Erro na resposta da API');
                    }

                    return response.json();
                })
                .then((responseData) => {
                    console.log(responseData)
                    this.isLoading.value = false;
                    this.data.value = responseData;
                })
                .catch((error) => {
                    console.error('Erro ao fazer a solicitação GET:', error);

                    this.isLoading = false;
                });
    },

    getPresente(){
        const apiUrl = 'https://api.passagemverde.com.br/transfer';

            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'AuthToken': localStorage.getItem('token'),
                },
            })
                .then((response) => {
                    if (response.status == 401) {
                        return router.push("/login")
                    }

                    if (!response.ok) {
                        throw new Error('Erro na resposta da API');
                    }

                    return response.json();
                })
                .then((responseData) => {
                    this.isLoading = false;
                    this.notification = responseData;
                })
                .catch((error) => {
                    console.error('Erro ao fazer a solicitação GET:', error);
                });
    },

    postPresente(){
        const apiUrl = 'https://api.passagemverde.com.br/transfer';

            const dataToSend = {
                emailDestino: this.enviar.email,
                quantidade: this.enviar.cotas,
                nome: this.enviar.nome
            }

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'AuthToken': localStorage.getItem('token'),
                },
                body: JSON.stringify(dataToSend)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Erro na resposta da API');
                    }
                    return response.json();
                })
                .then((responseData) => {
                    console.log(responseData);
                })
                .catch((error) => {
                    console.error('Erro ao fazer a solicitação GET:', error);
                });
    },

     postAceitarNotificacao  ()  {
        const apiUrl = 'https://api.passagemverde.com.br/transfer/accepted';

        const checkedItems = this.notification.Cota.filter(item => item.isChecked);

        const dataToSend = {
            Operacao: "resgate",
            TransferenciaKey: checkedItems.map(item => ({ ChaveResgate: item.ChaveResgate })),
        }

        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(dataToSend)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro na resposta da API');
                }
                return response.json();
            })
            .then((responseData) => {
                console.log(responseData);
            })
            .catch((error) => {
                console.error('Erro ao fazer a solicitação POST:', error);
            });
    },

     openModalPresentear ()  {
        this.showModalPresentear = true;
        document.body.classList.add('modal-open');
    }
  },

  getters: {},
});
