/* HORÁRIO DE FUNCIONAMENTO */

/* A posição no vetor é o dia devolvido por getDay() (0 = domingo, 6 = sábado). O valor 0 indica que a loja não abre no dia. */
const HORA_ABERTURA = [0, 8, 8, 8, 8, 8, 8];
const HORA_FECHAMENTO = [0, 19, 19, 19, 19, 19, 13];

/* SITUAÇÃO DA LOJA */

/* Compara a hora atual com o horário do dia e atualiza o selo do cabeçalho */
function atualizarSituacaoLoja() {
    const elemento = document.getElementById("situacao-loja");

    /* Nem toda página tem o selo. Early return. */
    if (!elemento) {
        return;
    }

    const agora = new Date();
    const dia = agora.getDay();
    const hora = agora.getHours();
    const abre = HORA_ABERTURA[dia];
    const fecha = HORA_FECHAMENTO[dia];

    let texto = "";
    let cor = "";

    if (abre === 0) {
        texto = "Fechado hoje";
        cor = "text-bg-secondary";
    } else if (hora < abre) {
        texto = "Abre hoje às " + abre + "h";
        cor = "text-bg-warning";
    } else if (hora < fecha) {
        texto = "Aberto agora, até " + fecha + "h";
        cor = "text-bg-success";
    } else {
        texto = "Fechado no momento";
        cor = "text-bg-secondary";
    }

    elemento.textContent = texto;
    elemento.className = "badge " + cor;
}

/* ANO DO RODAPÉ */

/* Evita que o aviso de direitos autorais fique desatualizado */
function atualizarAnoRodape() {
    const elemento = document.getElementById("ano-atual");

    if (!elemento) {
        return;
    }

    elemento.textContent = new Date().getFullYear();
}

/* INÍCIO */

atualizarSituacaoLoja();
atualizarAnoRodape();

/* Reavalia a situação da loja a cada minuto */
setInterval(atualizarSituacaoLoja, 60000);
