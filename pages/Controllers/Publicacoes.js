export class FormPost {
    // Criar construtor para inicializar os atributos e propriedades do objeto que está sendo criado
    constructor(idForm, idTextarea, idUlPost, nomeUsuario) {
        this.form = document.getElementById(idForm);
        this.textarea = document.getElementById(idTextarea);
        this.ulPost = document.getElementById(idUlPost);
        this.nomeUsuario = nomeUsuario; 

        this.addSubmit(); // Chama o método addSubmit() para lidar com a submissão do formulário
    }

    //Adicionar um ouvinte de evento de envio ao formulário
    onSubmit(func) {
        this.form.addEventListener('submit', func); 
    }

    // Validar se o texto publicado não está em branco ou é menor que 2
    formValidate(value) {
        if (value == '' || value == null || value == undefined || value.length < 2) {
            return false;
        }
        return true;
    }

    // Adicionar publicação na lista
    addSubmit() { 
        const handleSubmit = (event) => { // Lida com a lógica de submissão do formulário (validação do texto, criação de novas postagens, manipulação de eventos)
            event.preventDefault(); // Evita a recarga da página, a fim de realizar uma ação personalizada

            if (this.formValidate(this.textarea.value)) { // Chama função de validação
                const newPost = document.createElement('li');

                // Pegar a hora e data no momento
                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth();
                const day = now.getDate();
                const hours = now.getHours();
                const minutes = now.getMinutes();

                newPost.classList.add('post'); // Adiciona a classe post ao elemento HTML
                newPost.innerHTML = ` 
                    <img class="perfil_cinza" src="imgs/icone2.png" alt="Perfil">
                    <div class="informacoes">
                        <p class="nome_usuario">${this.nomeUsuario}</p>
                        <p class="hora">${day}/${month}/${year} ${hours}:${minutes}</p>
                    </div>

                    <button type="button" class="favoritar">
                        <img class="favoritada" src="imgs/nao_favoritada.png" alt="Favoritar">
                    </button>
                    <p class="texto_publicado">${this.textarea.value}</p>
                `; // Define conteúdo html do elemento

                this.ulPost.insertBefore(newPost, this.ulPost.firstChild); // Insere o novo post no início da lista de postagens
                this.textarea.value = ''; // Limpa a área de texto

                const favoritarButton = newPost.querySelector('.favoritar'); // Cria a constante favoritarButton ao encontrar esse elemento atarvés da sua classe
                const favoritadaImage = favoritarButton.querySelector('.favoritada'); // Cria a constante favoritadaButton ao encontrar esse elemento atarvés da sua classe

                // Adicionar um ouvinte de evento para alternar entre as imagens favoritadas e não favoritadas
                favoritarButton.addEventListener('click', () => {
                    // Pegar (get) o valor src da imagem, se for imgs/nao_favoritada.png, ela se tornará (set) imgs/favoritada.png, caso contrario, ela se tornará (set) imgs/nao_favoritada.png
                    if (favoritadaImage.getAttribute('src') === 'imgs/nao_favoritada.png') {
                        favoritadaImage.setAttribute('src', 'imgs/favoritada.png');
                    } else {
                        favoritadaImage.setAttribute('src', 'imgs/nao_favoritada.png');
                    }
                });
            }
        };
        // Registrar um evento de submissão do formulário e definir a função de callback para lidar com a submissão
        this.onSubmit(handleSubmit);

    }
}

const urlParams = new URLSearchParams(window.location.search); // Obtém os parâmetros da URL
const nomeUsuario = urlParams.get('usuario'); // Obtém o valor do parâmetro 'usuario' da URL
const postForm = new FormPost('formulario', 'box', 'posts', nomeUsuario); // Cria uma instância de FormPost com o nome de usuário
