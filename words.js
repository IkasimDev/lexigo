const fs = require('fs');
const path = require('path');

// Função para ler o arquivo e gerar JSON
function gerarJSON() {
  // Lê o arquivo de texto
  fs.readFile(path.join(__dirname, 'palavras.txt'), 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return;
    }

    // Separa o texto em palavras
    const words = data.split(/\s+/);

    // Filtra apenas as palavras de 5 letras
    const fiveLetterWords = words.filter(word => word.length === 5);

    // Mapeia as palavras para um formato com significado (exemplo genérico de significado)
    const jsonWords = fiveLetterWords.map(word => ({
      word: word,
    }));

    // Cria o JSON com as palavras e significados
    const result = { palavras: jsonWords };

    // Escreve o JSON em um arquivo
    fs.writeFile('palavras.json', JSON.stringify(result, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Erro ao escrever o arquivo JSON:', err);
        return;
      }
      console.log('Arquivo JSON gerado com sucesso!');
    });
  });
}

// Chama a função para gerar o JSON
gerarJSON();
