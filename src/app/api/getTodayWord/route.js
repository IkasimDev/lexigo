'use server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from "next/server";

// Função para ler o cache com base na data
async function readCache(date) {
    try {
        const cachePath = path.resolve('./src/cache/cache.json');
        const cacheData = await fs.readFile(cachePath, 'utf-8');
        const cache = JSON.parse(cacheData);
        return cache[date] || null; // Retorna a palavra e definição do dia se existir no cache
    } catch (err) {
        return null; // Retorna null se o cache não existir ou ocorrer algum erro
    }
}

// Função para escrever no cache com a data
async function writeCache(date, word, text) {
    try {
        const cachePath = path.resolve('./src/cache/cache.json');
        let cache = {};

        try {
            const cacheData = await fs.readFile(cachePath, 'utf-8');
            cache = JSON.parse(cacheData);
        } catch (err) {
            // O arquivo de cache pode não existir, então inicializamos um novo objeto
        }

        cache[date] = { word, text }; // Armazena a palavra e definição do dia no cache
        await fs.writeFile(cachePath, JSON.stringify(cache, null, 2));
    } catch (err) {
        console.error("Erro ao escrever no cache:", err.message);
    }
}

export async function GET(req) {
    try {
        // Obtém a data de hoje no formato YYYY-MM-DD
        const today = new Date().toISOString().split('T')[0];

        // Verifica o cache antes de fazer a requisição
        const cachedData = await readCache(today);
        if (cachedData) {
            return NextResponse.json(cachedData); // Retorna a palavra e definição do cache
        }

        // Lê a lista de palavras
        const data = await fs.readFile('./public/words.json', 'utf-8');
        const palavras = JSON.parse(data).palavras;

        // Seleciona uma palavra aleatória
        const randomIndex = Math.floor(Math.random() * palavras.length);
        const word = palavras[randomIndex].word;

        const url = `https://dicionario.priberam.org/${word}/`;
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });

        const html = response.data;
        const $ = cheerio.load(html);
        const definitionElement = $('p.py-4.dp-definicao-linha').first();
        let text = definitionElement.text().trim();

        // Remove o número inicial, corta até o primeiro ponto final e remove palavras indesejadas
        text = text.replace(/^\d+\.\s*/, '')              // Remove o número inicial (como "1.")
            .replace(/CALCETA|GRILHETA/g, '')       // Remove palavras indesejadas
            .split('.')[0]                          // Corta até o primeiro ponto final
            .trim();                                // Remove espaços extras

        // Armazena a palavra e definição do dia no cache
        await writeCache(today, word, text);

        return NextResponse.json({ word, text });
    } catch (err) {
        console.error("Erro ao tentar obter a palavra:", err.message);
        return NextResponse.json({ error: "Falha ao obter a palavra" }, { status: 500 });
    }
}
