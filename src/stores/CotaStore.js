import { defineStore } from "pinia";
import router from "@/router";
import { useToast } from "vue-toastification";

export const useCotaStore = defineStore("cota", {
  state() {
    return {
      isLoading: false,
      data: {
        QuantidadeCotas: 0,
        Nome: "joao",
        Projeto: [
          {
            NomeProjeto: 'Projeto nome',
            UrlImagem: 'https://picsum.photos/seed/picsum/200/300',
            UrlSite: 'dd'
          }
        ],
      },
      pix: {
        qrcode: '',
        imagemQrcode: "",
        linkVisualizacao: ''
      },
      isMobile: false,
      showCardAdquirir: false,
      showModalAdquirir: false,
      showQtdCota: true,
      showModalPresentear: false,
      showModalPresente: false,
      showCardPresente: false,
      showCardPresentear: false,
      isToastVisible: true,
      showNotificacao: false,
      showMetodoPagamento: false,
      showCardPix: false,
      credito: {
        nome: "",
        bandeira: "",
        numero_cartao: "",
        cvv: "",
        mes: "",
        ano: "",
        cpf: "",
        payment_token: "",
        card_mask: "",
      },

      metodo: {
        credito: false,
        pix: false,
      },
      cotas: 0,
      enviar: {
        nome: "",
        email: "",
        cotas: 0,
      },
      errors: {
        nome: "",
        email: "",
        cotas: "",
        cotaAquirir: "",
        cotasMin: "",
        metodoPreencher: "",
        faltaCota: ''
      },
      notification: {
        Cota: {
          isChecked: false,
        },
      },
      currentIndex: 0,
    };
  },

  actions: {
    getUser() {
      const apiUrl = "https://api.passagemverde.com.br/user";

      this.isLoading = true
      fetch(apiUrl, {
        method: "GET",
        headers: {
          AuthToken: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.status == 401) {
            location.reload();
            return router.push("/login");
          }
          if (!response.ok) {
            throw new Error("Erro na resposta da API");
          }

          return response.json();
        })
        .then((responseData) => {
          this.data = responseData;
        })
        .catch((error) => {
          console.error("Erro ao fazer a solicitação GET:", error);

        })
        .finally(() => {
          this.isLoading = false;

        })
    },

    getPresente() {
      const apiUrl = "https://api.passagemverde.com.br/transfer";
      this.isLoading = true

      fetch(apiUrl, {
        method: "GET",
        headers: {
          AuthToken: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.status == 401) {
            return router.push("/login");
          }

          if (!response.ok) {
            throw new Error("Erro na resposta da API");
          }

          return response.json();
        })
        .then((responseData) => {
          this.isLoading = false;
          this.notification = responseData;
        })
        .catch((error) => {
          console.error("Erro ao fazer a solicitação GET:", error);
        })
        .finally(() => {
          this.isLoading = false;

        })
    },

    postPresente() {
      const apiUrl = "https://api.passagemverde.com.br/transfer";

      this.isLoading = true

      const dataToSend = {
        emailDestino: this.enviar.email,
        quantidade: this.enviar.cotas,
        nome: this.enviar.nome,
      };

      fetch(apiUrl, {
        method: "POST",
        headers: {
          AuthToken: localStorage.getItem("token"),
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na resposta da API");
          }
          return response.json();
        })
        .then((responseData) => {
          useToast().success("Presente enviado com sucesso");
          console.log(responseData);
        })
        .catch((error) => {
          useToast().error("Erro ao enviar presente");
          console.error("Erro ao fazer a solicitação GET:", error);
        })
        .finally(() => {
          this.isLoading = false;
        })
    },

    postAceitarNotificacao() {
      const apiUrl = "https://api.passagemverde.com.br/transfer/accepted";

      this.isLoading = true

      const checkedItems = this.notification.Cota.filter(
        (item) => item.isChecked
      );

      const dataToSend = {
        Operacao: "resgate",
        TransferenciaKey: checkedItems.map((item) => ({
          ChaveResgate: item.ChaveResgate,
        })),
      };

      fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(dataToSend),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na resposta da API");
          }
          return response.json();
        })
        .then((responseData) => {
          console.log(responseData);
        })
        .catch((error) => {
          console.error("Erro ao fazer a solicitação POST:", error);
        })
        .finally(() => {
          this.isLoading = false;
        })
    },

    postCredito() {
      const apiUrl = "https://api.passagemverde.com.br/payment";

      this.isLoading = true

      const cpfSemPontuacao = this.credito.cpf.replace(/\D/g, '');


      const data = {
        typePayment: "card",
        quantidade: this.cotas,
        paymentDetails: {
          payment_token: this.credito.payment_token,
          card_mask: this.credito.card_mask,
          cpf: cpfSemPontuacao,
          name: this.credito.nome
        },
      };

      fetch(apiUrl, {
        method: "POST",
        headers: {
          AuthToken: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na resposta da API");
          }
          return response.json();
        })
        .then(() => {
          this.closeModalCredito()
          useToast().success("Pagamento feito com sucesso!");
        })
        .catch(() => {
          useToast().error("Erro ao Fazer o pagamento");
        })
        .finally(() => {
          this.isLoading = false;
        })
    },

    postPix() {
      const apiUrl = "https://api.passagemverde.com.br/payment";

      this.isLoading = true

      const data = {
        typePayment: "pix",
        quantidade: this.cotas,
      };

      fetch(apiUrl, {
        method: "POST",
        headers: {
          AuthToken: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na resposta da API");
          }
          return response.json();
        })
        .then((responseData) => {
            this.pix = responseData
        })
        .catch(() => {
          useToast().error("Erro ao solicitar o pix! Tente novamente!");
        })
        .finally(() => {
          this.isLoading = false;
        })
    },

      closeModalAdquirir () {
            this.showModalAdquirir = false
            this.metodo.credito = false
            this.metodo.pix = false
            document.body.classList.remove('modal-open');
        },

       closeModalCredito () {
            this.showCardCredito = false
            this.closeModalAdquirir()
            document.body.classList.remove('modal-open');

        },
  },

  getters: {},
});
