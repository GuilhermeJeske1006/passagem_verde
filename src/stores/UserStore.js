import router from "@/router";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useUsuarioStore = defineStore("usuario", {
  state() {
    return {
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
            useToast().success(
              "Sucesso ao fazer o login!"
            );
          } else {
            localStorage.setItem("session", data.Session);
            localStorage.setItem("username", this.username);
            router.push("/redefinir");
          }
          console.log("Resposta da API:", data);
        })
        .catch((error) => {
          console.error("Erro ao fazer a solicitação POST:", error);
          useToast().error(
            "Erro ao fazer o login! Tente novamente!"
          );
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

    redefinir() {
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
          useToast().success(
            "Senha redefinida com sucesso!"
          );
        })
        .catch((error) => {
          useToast().error(
            "Erro ao redefinir senha! Tente novamente!"
          );
          console.error("Erro ao fazer a solicitação POST:", error);
        });
    },

    registrar() {
      const apiUrl = "https://api.passagemverde.com.br/register";

      const dataToSend = {
        email: this.cadastro.email,
        name: this.cadastro.nome,
        last_name: this.cadastro.sobrenome,
        whatsapp: this.cadastro.whatsapp,
      };

      fetch(apiUrl, {
        method: "POST",
        // headers: {
        //   "X-Amz-Target":
        //     "AWSCognitoIdentityProviderService.RespondToAuthChallenge",
        //   "Content-Type": "application/x-amz-json-1.1",
        // },
        body: JSON.stringify(dataToSend), // Converte o objeto para JSON
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na resposta da API");
          }
          return response.json();
        })
        .then(() => {
          this.cadastro.email = this.username;
          useToast().success(
            "Usuario criado com sucesso! Verifique seu email!"
          );
          router.push("/login");
        })
        .catch((error) => {
          useToast().error("Erro ao criar o usuario!");
          console.error("Erro ao fazer a solicitação POST:", error);
        });
    },
  },

  getters: {},
});
