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
        linkVisualizacao: '',
        isLoading: false,
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
      showModalInformacao: false,
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
        isLoading: false
      },

      presente: {
        isLoading: false
      },
      notifica:{
        isLoading: false
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
          length: 0
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

      this.presente.isLoading = true

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
          this.openModalPresente()
          console.log(responseData);
        })
        .catch((error) => {
          useToast().error("Erro ao enviar presente");
          console.error("Erro ao fazer a solicitação GET:", error);
        })
        .finally(() => {
          this.presente.isLoading = false;
        })
    },

    postAceitarNotificacao() {
      const apiUrl = "https://api.passagemverde.com.br/transfer/accepted";

      this.notifica.isLoading = true

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
          useToast().success("Sua notificação foi aceita com sucesso!");
        })
        .catch((error) => {
          useToast().error("Erro ao aceitar notificação");
          console.error("Erro ao fazer a solicitação POST:", error);
        })
        .finally(() => {
          this.notifica.isLoading = false;
        })
    },

    postCredito() {
      const apiUrl = "https://api.passagemverde.com.br/payment";

      this.credito.isLoading = true

      const cpfSemPontuacao = this.credito.cpf.replace(/\D/g, '');


      const data = {
        typePayment: "card",
        quantidade: this.cotas,
        paymentDetails: {
          payment_token: this.credito.payment_token,
          card_mask: this.credito.card_mask,
          cpf: cpfSemPontuacao,
          name: this.credito.nome,
          phone_number : "47999999999",
          birth : "2003-12-07",
          street : "R ARTHUR OLINGER",
          number : 22,
          neighborhood : "CENTRO I - URBANO",
          zipcode : "88350250",
          city : "BRUSQUE",
          state : "SC"
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
        .then((res) => {
          console.log('resposta transação', res)
          useToast().success("Seu pagamento está sendo processado! Em breve, as cotas adquiridas estão disponíveis na sua conta.");
          this.getUser()
          this.closeModalCredito()
          
        })
        .catch((err) => {
          console.error('erro na transacao', err)
          useToast().info("Atenção! Ocorreu algum erro na sua transação!");

        })
        .finally(() => {
          this.credito.isLoading = false;
        })
    },

    postPix() {
      const apiUrl = "https://api.passagemverde.com.br/payment";

      this.pix.isLoading = true

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
          this.pix.isLoading = false;
        })
    },

      closeModalAdquirir () {
            this.showModalAdquirir = false
            this.metodo.credito = false
            this.metodo.pix = false
            document.body.classList.remove('modal-open');
        },

       closeModalCredito () {
            this.credito.nome = "",
            this.credito.numero_cartao = "",
            this.credito.cvv = "",
            this.credito.mes = "",
            this.credito.ano = "",
            this.credito.cpf = "",
            this.showCardCredito = false
            this.closeModalAdquirir()
            document.body.classList.remove('modal-open');

        },
        openModalPresente() {
          this.showModalPresente = true;
          document.body.classList.add('modal-open');
      },

      openModalInformacao (){
        this.showModalInformacao = true;
        document.body.classList.add('modal-open');
    }
  },

  getters: {},
});
