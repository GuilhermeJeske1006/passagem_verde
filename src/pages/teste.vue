

<template>
    <div class="teste">
    <div class="speech-bubble">
        <p>Faltam apenas <span>20 cotas</span>
para você plantar sua
árvore</p>
    </div>

    <div class="rounded-square">
        Olá João
    </div>

    <div class="speech-bubble-2">
        <p>Em cada <span>viagem,</span> temos a
                                oportunidade de transformar nossa jornada em uma <span>foresta
                                    de
                                    esperença💛</span>
                            </p>
    </div>
</div>
  </template>
  
  <script>

  export default {
    name: 'LoginView',
  }
  </script>
  
  <style scoped>
 .teste {
    font-family: Arial, sans-serif;
    background-color: blue;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}


.speech-bubble {
    position: relative;
    background-color: #47793b;
    border-radius: 15px;
    padding: 20px;
    max-width: 300px;
    text-align: center;
}

.speech-bubble > p{
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    font-weight: 600;
}

.speech-bubble > p > span{
    color: #E1DC4C;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    font-weight: 600;
}

.speech-bubble::before {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 10px 15px 10px 0;
    border-color: transparent #47793b transparent transparent;
    right: 100%;
    top: 57px;

}

.speech-bubble-2 {
    position: relative;
    background-color: #fff;
    border-radius: 15px;
    padding: 20px;
    max-width: 300px;
    text-align: center;
}

.speech-bubble-2 > p{
    color: #47793C;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    font-weight: 600;
}

.speech-bubble-2 > p > span{
    color: #47793C;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    font-weight: 600;
}

.speech-bubble-2::before {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 10px 15px 10px 0;
    border-color: transparent #fff transparent transparent;
    right: 100%;
    top: 57px;

}


.rounded-square {
    width: 142px;
    height: 122px;
    background-color: #47793b;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    text-align: center;
    line-height: 100px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 20px;
    font-style: normal;
    color: #F6F6F6;
    position: absolute;
    top: 0;
    left: 7%;
        }

  </style>