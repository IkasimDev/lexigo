'use server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import { NextResponse } from "next/server";

// async function cache() {
//     try {
//         const cache = await fs.readFile('./src/cache/cache.txt', 'utf-8');




//     } catch (err) {

//     }
// }

export async function GET(req) {
    try {
        const data = await fs.readFile('./public/words.json', 'utf-8');

        const palavras = JSON.parse(data).palavras;

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

        text = text.replace(/CALCETA|GRILHETA/g, '').trim();

        return NextResponse.json({ word, text });
    } catch (err) {
        console.error("Erro ao tentar obter a palavra:", err.message);
        return NextResponse.json({ error: "Falha ao obter a palavra" }, { status: 500 });
    }
}

