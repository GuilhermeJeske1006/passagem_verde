<template>
  <div class="modal " tabindex="-1" role="dialog"
       :class="{ 'show': cota.showModalEsquecerSenha, 'd-block': cota.showModalEsquecerSenha, 'loading-modal': cota.pix.isLoading }">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div v-if="cota.pix.isLoading" class="loading modal-body"></div>

        <form @submit.prevent="enviarEmail" class="modal-body">
          <button type="button" class="btn" @click="cota.closeModalEsquecerSenha">
            <span>&times;</span>
          </button>
          <h5 class="text-center titulo-modal">Informe o seu email para enviarmos o código para a redefinição</h5>
          <div class="form-group text-center">

            <div class="d-flex">
              <div class="wrap-input100 validate-input  mt-2 mb-3">
                <input v-model="item.email" required class="input100"  type="email" name="email" id="email"
                       placeholder="Email">
                <span class="focus-input100"></span>
                <span class="symbol-input100">
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </span>
              </div>
              <div>

              </div>
            </div>

          </div>
          <div class="row justify-content-center">
            <button type="submit" class="btn btn-adquirir" style="width: 54%;">Enviar</button>
          </div>

        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useCotaStore } from "@/stores/CotaStore";
import {ref} from "vue";
import {useUsuarioStore} from "@/stores/UserStore";

    const user = useUsuarioStore()
    const cota = useCotaStore()
    const item = ref({
      email: ''
    })

    const enviarEmail = () => {
    
      user.enviarCodigo(item.value.email)
      
      // cota.openModalInformacao()

    }




</script>

<style scoped></style>