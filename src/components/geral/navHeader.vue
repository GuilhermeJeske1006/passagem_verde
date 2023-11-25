<template>
    <div>
        <nav class="navbar">
            <div class="container-fluid d-md-none" >
                <div class="col-12 d-flex">
                    <div class="col-6">
                        <a class="navbar-brand">

                            <div class="rounded-square">
                                Olá {{ cota.data.Nome }}
                            </div>
                        </a>
                    </div>
                    <div class="col-6 d-flex">
                        <a class="navbar-brand">

                            <img src="@/assets/logo.png" style="width: 60%;" alt="Logo" class="w-60 d-inline-block ">

                            <a tabindex="0" data-bs-toggle="tooltip" title="Sair" style="margin-left: 33%; cursor: pointer;" @click="user.logout">
                                <img src="@/assets/images/icons/right-from-bracket-solid.svg" class="img-fluid"
                                    style="max-width: 9%;" alt="">
                            </a>
                        </a>
                    </div>
                </div>
            </div>
            <div class="container-fluid d-none d-md-flex">
                <a class="navbar-brand">
                    <div class="rounded-square">
                        Olá {{ cota.data.Nome }}
                    </div>
                </a>
                <a class="navbar-brand">
                    <img src="@/assets/logo.png" style="width: 60%;" alt="Logo" class="w-60 d-inline-block ">
                    <a tabindex="0" data-bs-toggle="tooltip" title="Sair" style="margin-left: 33%; cursor: pointer;" @click="user.logout">
                        <img src="@/assets/images/icons/right-from-bracket-solid.svg" class="img-fluid"
                            style="max-width: 7%;" alt="">
                    </a>
                </a>
            </div>
        </nav>
    </div>
</template>

<script>
import { useCotaStore } from "@/stores/CotaStore";
import { useUsuarioStore } from "@/stores/UserStore";

export default {
    setup() {
        const cota = useCotaStore()
        const user = useUsuarioStore()

        const closeModalNotificacao = () => {
            cota.showNotificacao = false;
            document.body.classList.remove('modal-open');
        };
        return {
            user,
            cota,
            closeModalNotificacao
        }
    },
}
</script>