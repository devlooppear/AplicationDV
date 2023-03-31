// Cria uma variável para armazenar os dados da tabela
var tabelaDados = [];

// Função para atualizar os dados da tabela no localStorage
function atualizarLocalStorage() {
localStorage.setItem('tabelaDados', JSON.stringify(tabelaDados));
}

// Adiciona uma linha na tabela
function adicionarLinha(tipo, nome, plataforma, genero) {
// Verifica se todos os campos estão preenchidos
if (!tipo || !nome || !plataforma || !genero) {
alert('Por favor, preencha todos os campos.');
return;
}

// Adiciona os dados na tabelaDados
tabelaDados.push({tipo: tipo, nome: nome, plataforma: plataforma, genero: genero});

// Cria a linha da tabela
var linha = '<tr><td>' + tipo + '</td><td>' + nome + '</td><td>' + plataforma + '</td><td>' + genero + '</td><td><button type="button" class="btn btn-warning editar">Editar</button> <button type="button" class="btn btn-danger remover">Remover</button></td></tr>';

// Adiciona a linha na tabela
$('#tabela tbody').append(linha);

// Limpa o formulário
$('#form')[0].reset();

// Atualiza os dados da tabela no localStorage
atualizarLocalStorage();
}

// Remove uma linha da tabela
function removerLinha(index) {
// Remove o item da tabelaDados
tabelaDados.splice(index, 1);

// Remove a linha da tabela
$('#tabela tbody tr:eq(' + index + ')').remove();

// Atualiza os dados da tabela no localStorage
atualizarLocalStorage();
}

// Preenche o formulário com os dados da linha
function preencherFormulario(index) {
// Preenche o formulário com os dados da linha
$('#tipo').val(tabelaDados[index].tipo);
$('#nome').val(tabelaDados[index].nome);
$('#plataforma').val(tabelaDados[index].plataforma);
$('#genero').val(tabelaDados[index].genero);

// Remove a linha da tabela
removerLinha(index);
}

// Evento de envio de formulário
$('#form').submit(function(event) {
// Previne o comportamento padrão do formulário
event.preventDefault();

// Obtém os valores dos campos
var tipo = $('#tipo').val();
var nome = $('#nome').val();
var plataforma = $('#plataforma').val();
var genero = $('#genero').val();

// Chama a função para adicionar a linha na tabela
adicionarLinha(tipo, nome, plataforma, genero);
});

// Evento de clique no botão "Remover"
$(document).on('click', '.remover', function() {
// Obtém o índice da linha
var index = $(this).closest('tr').index();

// Chama a função para remover a linha da tabela
removerLinha(index);
});

// Evento de clique no botão "Editar"
$(document).on('click', '.editar', function() {
// Obtém o índice da linha
var index = $(this).closest('tr').index();

// Preenche o formulário com os dados da linha
preencherFormulario(index);
});

// Verifica se existem dados no localStorage e carrega na tabela
if (localStorage.getItem('tabelaDados')) {
// Obtém os dados do localStorage
tabelaDados = JSON.parse(localStorage.getItem('tabelaDados'));

// Percorre os dados e adiciona na tabela
for (var i = 0; i < tabelaDados.length; i++) {
var linha = '<tr><td>' + tabelaDados[i].tipo + '</td><td>' + tabelaDados[i].nome + '</td><td>' + tabelaDados[i].plataforma + '</td><td>' + tabelaDados[i].genero + '</td><td><button type="button" class="btn btn-warning editar">Editar</button> <button type="button" class="btn btn-danger remover">Remover</button></td></tr>';
$('#tabela tbody').append(linha);
}
}
