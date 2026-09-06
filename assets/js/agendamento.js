/* SERVIÇOS E VALORES */

/* Os nomes são iguais aos value do select de serviço, e os valores estão nas mesmas posições */
const SERVICOS = ["Banho Básico", "Banho Premium", "Tosa Higiênica", "Tosa Premium"];
const VALORES = [60, 100, 70, 130];
const VALOR_TELEBUSCA = 25;

/* FUNÇÃO AUXILIAR */

/* Coloca um zero à esquerda em números menores que 10 (7 vira "07") */
function formatarDoisDigitos(numero) {
    if (numero < 10) {
        return "0" + numero;
    }
    return String(numero);
}

/* MÁSCARAS */

/* Formata o CPF como 000.000.000-00 conforme a pessoa digita */
function formatarCpf(valor) {
    /* \D remove tudo que não for dígito */
    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length > 9) {
        return numeros.slice(0, 3) + "." + numeros.slice(3, 6) + "." + numeros.slice(6, 9) + "-" + numeros.slice(9);
    }
    if (numeros.length > 6) {
        return numeros.slice(0, 3) + "." + numeros.slice(3, 6) + "." + numeros.slice(6);
    }
    if (numeros.length > 3) {
        return numeros.slice(0, 3) + "." + numeros.slice(3);
    }
    return numeros;
}

/* Formata o telefone como (00) 00000-0000 */
function formatarTelefone(valor) {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length > 7) {
        return "(" + numeros.slice(0, 2) + ") " + numeros.slice(2, 7) + "-" + numeros.slice(7);
    }
    if (numeros.length > 2) {
        return "(" + numeros.slice(0, 2) + ") " + numeros.slice(2);
    }
    return numeros;
}

/* VALIDAÇÃO DO CPF */

/* Confere se o CPF tem os 11 dígitos e não é uma sequência repetida */
function cpfValido(cpf) {
    const numeros = cpf.replace(/\D/g, "");

    if (numeros.length !== 11) {
        return false;
    }

    /* Sequências como 111.111.111-11 não existem */
    for (let i = 1; i < 11; i++) {
        if (numeros[i] !== numeros[0]) {
            return true;
        }
    }

    return false;
}

/* Guarda a mensagem de erro no campo, para o navegador barrar o envio */
function validarCpf() {
    const campo = document.getElementById("cpf");

    if (campo.value === "" || cpfValido(campo.value)) {
        campo.setCustomValidity("");
    } else {
        campo.setCustomValidity("Informe os 11 dígitos do CPF.");
    }
}

/* Mostra ou esconde a borda vermelha e o texto de erro do Bootstrap */
function marcarCpf() {
    const campo = document.getElementById("cpf");

    validarCpf();

    if (campo.checkValidity()) {
        campo.classList.remove("is-invalid");
    } else {
        campo.classList.add("is-invalid");
    }
}

/* DATA E HORÁRIO */

/* Define amanhã como primeira data possível para agendar */
function definirDataMinima() {
    const campoData = document.getElementById("data");
    const amanha = new Date();

    amanha.setDate(amanha.getDate() + 1);

    const ano = amanha.getFullYear();
    const mes = formatarDoisDigitos(amanha.getMonth() + 1);
    const dia = formatarDoisDigitos(amanha.getDate());

    campoData.min = ano + "-" + mes + "-" + dia;
}

/* Bloqueia domingo e limita o sábado ao horário de fechamento da loja */
function validarDataEHorario() {
    const campoData = document.getElementById("data");
    const campoHorario = document.getElementById("horario");

    campoData.setCustomValidity("");
    campoHorario.setCustomValidity("");

    if (campoData.value === "") {
        return;
    }

    /* new Date com a string do campo interpreta em UTC e pode voltar um dia, então montamos a data pelos números */
    const partes = campoData.value.split("-");
    const escolhida = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
    const diaDaSemana = escolhida.getDay();

    if (diaDaSemana === 0) {
        campoData.setCustomValidity("A loja não abre aos domingos. Escolha outro dia.");
        return;
    }

    /* Aos sábados a loja fecha às 13h, então o último atendimento começa às 12h */
    if (diaDaSemana === 6 && campoHorario.value > "12:00") {
        campoHorario.setCustomValidity("Aos sábados atendemos até as 12:00.");
    }
}

/* VALOR TOTAL */

/* Soma o serviço escolhido com a tele-busca, quando marcada */
function atualizarValorTotal() {
    const campoServico = document.getElementById("servico");
    const telebusca = document.getElementById("modalidade-telebusca");
    const saida = document.getElementById("valor-total");
    const campoEnvio = document.getElementById("valor-total-envio");

    /* indexOf devolve -1 quando nada foi escolhido ainda */
    const posicao = SERVICOS.indexOf(campoServico.value);

    if (posicao === -1) {
        saida.textContent = "Selecione o serviço";
        campoEnvio.value = "";
        return;
    }

    let total = VALORES[posicao];

    if (telebusca.checked) {
        total = total + VALOR_TELEBUSCA;
    }

    saida.textContent = "R$ " + total.toFixed(2).replace(".", ",");
    campoEnvio.value = total.toFixed(2);
}

/* BARRA DE PREENCHIMENTO */

/* Conta quantos campos obrigatórios já estão válidos e atualiza a barra */
function atualizarPreenchimento() {
    const formulario = document.getElementById("formularioAgendamento");
    const barra = document.getElementById("preenchimento");
    const percentual = document.getElementById("percentual");

    /* Nos grupos de radio apenas o primeiro tem required, então cada grupo conta uma vez */
    const obrigatorios = formulario.querySelectorAll("[required]");
    let preenchidos = 0;

    for (let i = 0; i < obrigatorios.length; i++) {
        if (obrigatorios[i].checkValidity()) {
            preenchidos = preenchidos + 1;
        }
    }

    const valor = Math.round((preenchidos / obrigatorios.length) * 100);

    barra.value = valor;
    percentual.textContent = valor + "% preenchido";
}

/* INÍCIO */

const formularioAgendamento = document.getElementById("formularioAgendamento");
const campoCpf = document.getElementById("cpf");

definirDataMinima();
atualizarValorTotal();
atualizarPreenchimento();

campoCpf.addEventListener("input", function () {
    this.value = formatarCpf(this.value);
    validarCpf();

    /* Se o campo já estava marcado, tira a marca assim que o CPF ficar correto */
    if (this.classList.contains("is-invalid")) {
        marcarCpf();
    }
});

/* Só acusa o erro quando a pessoa sai do campo, para não reclamar no meio da digitação */
campoCpf.addEventListener("blur", marcarCpf);

document.getElementById("telefone").addEventListener("input", function () {
    this.value = formatarTelefone(this.value);
});

/* Marca o campo em vermelho quando a data escolhida não serve */
document.getElementById("data").addEventListener("blur", function () {
    validarDataEHorario();

    if (this.checkValidity()) {
        this.classList.remove("is-invalid");
    } else {
        this.classList.add("is-invalid");
    }
});

document.getElementById("servico").addEventListener("change", atualizarValorTotal);
document.getElementById("modalidade-local").addEventListener("change", atualizarValorTotal);
document.getElementById("modalidade-telebusca").addEventListener("change", atualizarValorTotal);
document.getElementById("data").addEventListener("change", validarDataEHorario);
document.getElementById("horario").addEventListener("change", validarDataEHorario);

/* Qualquer digitação ou escolha dentro do formulário atualiza a barra */
formularioAgendamento.addEventListener("input", atualizarPreenchimento);
