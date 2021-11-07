const handleSearch = async (event) => {
  event.preventDefault();
  //exibir mensagem de carregamento
  const message = document.querySelector('#message');
  message.innerHTML = 'buscando...';

  // limpa lista de programas
  const listaDeProgramas = document.querySelector('#shows');
  listaDeProgramas.innerHTML = '';
  //obter o texto digitado pelo usuario
  const caixadeBusca = document.querySelector('#query');
  const textoAserBuscado = caixadeBusca.value;
  //formar a URL de consulta
  const url = `https://api.tvmaze.com/search/shows?q=${textoAserBuscado}`;
  //Realizar a consulta na API através Fetch API de forma assicrona
  const resposta = await fetch(url); // aqui diz: acessa pra mim essa url, mais vamos gravar isso em uma variavel (await = aguarrdar), tem que esta dentro de uma função async
  const programas = await resposta.json(); // esse objeto pega o response que vem da resposta e converte em JavaScript
  //finaliza o procedimento caso nao haja nenhum resultado
  if (programas.length === 0) {
    message.innerHTML = 'nenhum resultado encontrado';
    return; //limpar função
  }
  //limpar mensagem
  message.innerHTML = '';
  //interar pelos programas
  programas.forEach((programa) => {
    //obter os dados
    const titulo = programa?.show?.name || ''; // ? para evitar error se achar erro mostra null, caso seja null coloca || (ou) para deixar vazio
    const imagem = programa?.show?.image?.medium || '';

    //Inserir os programas na lista de resultados

    listaDeProgramas.insertAdjacentHTML(
      'beforeend',
      `
    <li>
    <img class="poster" src="${imagem}">
    <span class="show-name">${titulo}</span>
    </li>
    `
    );
  }); //lista chamado programas(array ou arranjos)precisar de uma ero function
};

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#search-form') //buscando o formulario
    .addEventListener('submit', handleSearch); //e aplicando o evento submite
});
