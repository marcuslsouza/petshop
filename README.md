# Pet Shop Felpudos

Sistema web de comércio de produtos e serviços de um pet shop, desenvolvido nas Fases 1 e 2 do Projeto da Disciplina Fundamentos de Sistemas Web - PUCRS Online.

Site publicado: https://marcuslsouza.github.io/petshop/

**Este arquivo serve como documentação de ajuda do projeto, descrevendo as páginas e as funcionalidades do website.**

## Páginas
- **index.html** - página inicial com apresentação da loja, carrossel de destaques e cartões das categorias.
- **acessorios.html** - quatro acessórios com foto, descrição e valor.
- **racoes.html** - duas rações com foto, descrição e valor.
- **higiene.html** - dois produtos de higiene e limpeza com foto, descrição e valor.
- **servicos.html** - tabela de banho e tosa com descrição, valor e acréscimo opcional de tele-busca.
- **agendamento.html** - formulário de cadastro do cliente e do pet, com escolha do serviço, da modalidade de entrega, da data e do horário.
- **ajuda.html** - descrição das páginas e funcionalidades do website.

## Funcionalidades
- Menu de navegação responsivo no cabeçalho e lista de links no rodapé, presentes em todas as páginas.
- Carrossel de destaques na página inicial, com troca automática e controles manuais.
- Selo no cabeçalho que informa se a loja está aberta, calculado a partir do horário de funcionamento.
- Visualização dos produtos separados por categoria, em cartões.
- Tabela de serviços com valores e opção de tele-busca.
- Formulário de agendamento com máscaras de CPF e telefone, barra de preenchimento, cálculo do valor total e regras de data e horário.
- Contato por e-mail e telefone diretamente pelo rodapé.

## Acessibilidade
- Link de atalho para pular o menu e ir direto ao conteúdo.
- Marcação semântica com header, nav, main, article e footer.
- Atributo alt descritivo em todas as imagens.
- Atributo aria-current identificando a página atual no menu.
- Atributo aria-label distinguindo a navegação do cabeçalho da navegação do rodapé.
- Rótulos associados aos campos do formulário e grupos de opções agrupados em fieldset com legend.
- Marca de foco visível em todos os elementos navegáveis pelo teclado.
- Contraste de cores adequados para textos e componentes de interface.
- Transição do carrossel desligada para quem configura o sistema com movimento reduzido.

## Tecnologias
- HTML5.
- CSS3, com folha de estilo própria em `assets/css/estilo.css`.
- Bootstrap 5.3.8, hospedado no próprio repositório em `assets/vendor/`.
- JavaScript, em `assets/js/principal.js` e `assets/js/agendamento.js`.

As bibliotecas e a fonte são servidas pelo próprio repositório, sem depender de CDN.

Todas as páginas foram validadas no [W3C Markup Validation Service](https://validator.w3.org/), sem erros.

## Autor
Marcus Ricardo Lopes de Souza

## Créditos
- Imagens: Designed by [Magnific.com](https://www.magnific.com)
- Fonte: Nunito (https://github.com/googlefonts/nunito), sob licença SIL Open Font License 1.1
- Bootstrap v5.3.8 (https://getbootstrap.com/), sob licença MIT
