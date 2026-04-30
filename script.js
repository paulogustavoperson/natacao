// Carregar dados do arquivo JSON
async function carregarDados() {
    try {
        const response = await fetch('dados.json');
        const dados = await response.json();
        return dados;
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        return {};
    }
}

// Inicializar a aplicação
async function inicializar() {
    const dados = await carregarDados();
    const atletas = Object.keys(dados);
    
    // Preencher lista de atletas
    const listaAtletas = document.getElementById('lista-atletas');
    const filtroInput = document.getElementById('filtro-input');
    
    function renderizarAtletas(filtro = '') {
        listaAtletas.innerHTML = '';
        const atletasFiltrados = atletas.filter(atleta => 
            atleta.toUpperCase().includes(filtro.toUpperCase())
        );
        
        atletasFiltrados.forEach(atleta => {
            const div = document.createElement('div');
            div.className = 'atleta-item';
            div.textContent = atleta;
            div.addEventListener('click', () => {
                document.querySelectorAll('.atleta-item').forEach(item => {
                    item.classList.remove('ativo');
                });
                div.classList.add('ativo');
                exibirProvas(atleta, dados[atleta]);
            });
            listaAtletas.appendChild(div);
        });
    }
    
    // Filtro de busca
    filtroInput.addEventListener('input', (e) => {
        renderizarAtletas(e.target.value);
    });
    
    // Renderizar atletas inicialmente
    renderizarAtletas();
}

// Exibir provas do atleta selecionado
function exibirProvas(nomeAtleta, provas) {
    const nomeAtletaElement = document.getElementById('nome-atleta');
    const provasContainer = document.getElementById('provas-container');
    
    nomeAtletaElement.textContent = nomeAtleta;
    provasContainer.innerHTML = '';
    
    provas.forEach(prova => {
        const card = document.createElement('div');
        card.className = 'prova-card';
        card.innerHTML = `
            <div class="prova-title">${prova.prova}</div>
            <div class="prova-details">
                <div class="prova-detail-row">
                    <span class="detail-label">Horário - Etapa:</span>
                    <span class="detail-value">${prova.horario}</span>
                </div>
                <div class="prova-detail-row">
                    <span class="detail-label">Número da Prova:</span>
                    <span class="detail-value">${prova.numero}</span>
                </div>
                <div class="prova-detail-row">
                    <span class="detail-label">Série - Raia:</span>
                    <span class="detail-value">${prova.serie_raia}</span>
                </div>
                <div class="prova-detail-row">
                    <span class="detail-label">Tempo de Balizamento:</span>
                    <span class="detail-value">${prova.tempo}</span>
                </div>
            </div>
        `;
        provasContainer.appendChild(card);
    });
}

// Iniciar quando a página carregar
document.addEventListener('DOMContentLoaded', inicializar);