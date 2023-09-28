

<template>
    <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src="@/assets/logo.png" class="logo-position" alt="IMG">
				</div>

				<form @submit.prevent="login" class="login100-form validate-form">
					<span class="login100-form-title">
						Faça o seu login
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" v-model="username" type="text" name="email" placeholder="Email">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input class="input100" v-model="password" type="password" name="pass" placeholder="Password">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div class="container-login100-form-btn">
						<button type="submit" class="login100-form-btn">
							Login
						</button>
					</div>

					<div class="text-center p-t-12">
						<!-- <span class="txt1">
							Forgot
						</span>
						<a class="txt2" href="#">
							Username / Password?
						</a> -->
					</div>

					<div class="text-center p-t-136">
						<!-- <a class="txt2" href="#">
							Create your Account
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a> -->
					</div>
				</form>
			</div>
		</div>
	</div>
  </template>
  
  <script>
  import router from '@/router';

  export default {
    name: 'LoginView',
    data() {
      return {
        username: "usuario131@gmail.com",
        password: "Teste123@",
      };
    },
    methods: {
      login() {
        const apiUrl = 'https://cognito-idp.us-east-1.amazonaws.com/'; 
        
        const dataToSend = {
            AuthFlow : "USER_PASSWORD_AUTH",
            AuthParameters: {
                PASSWORD: this.password,
                USERNAME: this.username
            },
            ClientId: "2ba84o1sr4kpn5ucbvgg6sm40o"
        }

        fetch(apiUrl, {
        method: 'POST',
        headers: {
            'X-Amz-Target' : 'AWSCognitoIdentityProviderService.InitiateAuth',
            'Content-Type' : 'application/x-amz-json-1.1' 
        },
        body: JSON.stringify(dataToSend) // Converte o objeto para JSON
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Erro na resposta da API');
            }
            return response.json();
        })
        .then(data => {

            // Faça algo com a resposta da API, se necessário
            if (data.AuthenticationResult && data.AuthenticationResult.IdToken) {
                localStorage.setItem('token', data.AuthenticationResult.IdToken);
                router.push('/');
              }
            else{
              localStorage.setItem('session', data.Session);
              router.push('/redefinir');

            }
            console.log('Resposta da API:', data);
        })
        .catch(error => {
            console.error('Erro ao fazer a solicitação POST:', error);
        });

      },
    },
  };
  </script>
  
  <style scoped>
  .login {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  </style>