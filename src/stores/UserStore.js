import router from "@/router";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { useCotaStore } from "./CotaStore";


export const useUsuarioStore = defineStore("usuario", {
  state() {
    return {
      codigo: "",
      isLoading: false,
      username: "",
      password: "",
      usuario: "",
      senhaAtual: "",
      novaSenha: "",
      repeteSenha: "",
      cadastro: {
        nome: "",
        sobrenome: "",
        email: "",
        cpf: "",
        rg: "",
        CNPJ: "",
        ie: "",
        whatsapp: "",
        senha: "",
      },
    };
  },

  actions: {
    
    login() {
      const apiUrl = "https://cognito-idp.us-east-1.amazonaws.com/";
      
      const dataToSend = {
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
          PASSWORD: this.password,
          USERNAME: this.username,
        },
        ClientId: "2ba84o1sr4kpn5ucbvgg6sm40o",
      };

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
          "Content-Type": "application/x-amz-json-1.1",
        },
        body: JSON.stringify(dataToSend), // Converte o objeto para JSON
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na resposta da API");
          }
          return response.json();
        })
        .then((data) => {
          // Faça algo com a resposta da API, se necessário
          if (data.AuthenticationResult && data.AuthenticationResult.IdToken) {
            localStorage.setItem("token", data.AuthenticationResult.IdToken);
            router.push("/");
            useToast().success("Sucesso ao fazer o login!");
          } else {
            localStorage.setItem("session", data.Session);
            localStorage.setItem("username", this.username);
            router.push("/definir-senha");
          }
          console.log("Resposta da API:", data);
        })
        .catch((error) => {
          console.error("Erro ao fazer a solicitação POST:", error);
          useToast().error("Erro ao fazer o login! Tente novamente!");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("session");
      router.push("/login");
    },

    enviarCodigo(email) {
      const apiUrl = "https://api.passagemverde.com.br/forgot";

      const dataToSend = {
          EMAIL: email,
      };
      fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
        },
      })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response);
            }
            return response.json();
          })
          .then(() => {
            const cota = useCotaStore()
            cota.openModalInformacao()
            
            useToast().success("Codigo enviado com sucesso com sucesso!");
          })
          .catch((error) => {
            console.error( error);


            useToast().error("Ops! Occoreu um erro ao enviar o codigo!");
            console.error("Erro ao fazer a solicitação POST:", error);
          });
    },

    redefinir() {
      const apiUrl = "https://api.passagemverde.com.br/forgot";

      const dataToSend = {
        ChallengeName: "NEW_PASSWORD_REQUIRED",
        ChallengeResponses: {
          CODIGO: this.codigo,
          NEW_PASSWORD: this.novaSenha
        },
        ClientId: "2ba84o1sr4kpn5ucbvgg6sm40o",
        Session: localStorage.getItem("session"),
      };

      fetch(apiUrl, {
        method: "PUT",
        headers: {
          "X-Amz-Target":
            "AWSCognitoIdentityProviderService.RespondToAuthChallenge",
          "Content-Type": "application/x-amz-json-1.1",
        },
        body: JSON.stringify(dataToSend), // Converte o objeto para JSON
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na resposta da API");
          }
          return response.json();
        })
        .then((data) => {
          // Faça algo com a resposta da API, se necessário
          if (data.AuthenticationResult.IdToken != null) {
            localStorage.setItem("token", data.AuthenticationResult.IdToken);
            router.push("/");
          }
          useToast().success("Senha redefinida com sucesso!");
        })
        .catch((error) => {
          useToast().error("Erro ao redefinir senha! Tente novamente!");
          console.error("Erro ao fazer a solicitação POST:", error);
        });
    },

    definir() {
      const apiUrl = "https://cognito-idp.us-east-1.amazonaws.com/";

      const dataToSend = {
        ChallengeName: "NEW_PASSWORD_REQUIRED",
        ChallengeResponses: {
          USERNAME: localStorage.getItem("username"),
          NEW_PASSWORD: this.repeteSenha,
        },
        ClientId: "2ba84o1sr4kpn5ucbvgg6sm40o",
        Session: localStorage.getItem("session"),
      };

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "X-Amz-Target":
            "AWSCognitoIdentityProviderService.RespondToAuthChallenge",
          "Content-Type": "application/x-amz-json-1.1",
        },
        body: JSON.stringify(dataToSend), // Converte o objeto para JSON
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na resposta da API");
          }
          return response.json();
        })
        .then((data) => {
          // Faça algo com a resposta da API, se necessário
          if (data.AuthenticationResult.IdToken != null) {
            localStorage.setItem("token", data.AuthenticationResult.IdToken);
            router.push("/");
          }
          useToast().success("Senha redefinida com sucesso!");
        })
        .catch((error) => {
          useToast().error("Erro ao redefinir senha! Tente novamente!");
          console.error("Erro ao fazer a solicitação POST:", error);
        });
    },

    registrar() {
      const apiUrl = "https://api.passagemverde.com.br/register";
      this.isLoading = true
      const dataToSend = {
        email: this.cadastro.email,
        name: this.cadastro.nome,
        last_name: this.cadastro.sobrenome,
        whatsapp: this.cadastro.whatsapp,
      };

      fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(dataToSend),
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status == 409) {
              useToast().error("Usuario já existe na base de dados!");
              throw new Error("Usuario já existe na base de dados!");
            } else {
              useToast().error("Erro ao criar o usuario!");
              throw new Error("Erro ao criar o usuario");
            }
          }

          return response.json();
        })
        .then(() => {
          this.cadastro.email = this.username;
          const cota = useCotaStore()
          cota.openModalInformacao()
        })
        .catch(() => {})
        .finally(() => {
          this.isLoading = false
        })
    },
  },

  getters: {},
});
