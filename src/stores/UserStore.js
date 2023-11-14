import router from "@/router";
import { defineStore } from "pinia";

export const useUsuarioStore = defineStore("usuario", {
  state() {
    return {
      isLoading: false,
      username: "usuario131@gmail.com",
      password: "Teste123@",
      usuario: "guilherme@gmail.com",
      senhaAtual: "",
      novaSenha: "",
      repeteSenha: "",
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
          } else {
            localStorage.setItem("session", data.Session);
            router.push("/redefinir");
          }
          console.log("Resposta da API:", data);
        })
        .catch((error) => {
          console.error("Erro ao fazer a solicitação POST:", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    redefinir() {
      const apiUrl = "https://cognito-idp.us-east-1.amazonaws.com/";

      const dataToSend = {
        ChallengeName: "NEW_PASSWORD_REQUIRED",
        ChallengeResponses: {
          USERNAME: this.usuario,
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
        })
        .catch((error) => {
          console.error("Erro ao fazer a solicitação POST:", error);
        });
    },
  },

  getters: {},
});
