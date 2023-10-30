// A página HTML foi completamente carregada e analisada, e o DOM está pronto para ser manipulado
document.addEventListener("DOMContentLoaded", function () {
    var formulario = document.getElementById("formulario"); // Obtém uma referência ao elemento do formulário com o ID 'formulario'

    // Adicionar um evento de submissão ao formulário
    formulario.addEventListener("submit", function (event) {
        // Obter os valores dos campos de entrada de usuário e senha
        var usuario = document.getElementById("usuario").value;
        var senha = document.getElementById("senha").value;

        if (usuario.trim() === "" || senha.trim() === "") { // Valida se senha e usuário não estão em branco
            alert("Por favor, preencha todos os campos.");
            //event.preventDefault(); // Evita a recarga da página, a fim de realizar uma ação personalizada
        } else {
            window.location.href = `publicacoes.html?usuario=${usuario}`; // Redireciona para a página de publicações com o nome de usuário
        }
    });
});
