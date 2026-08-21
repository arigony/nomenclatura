# IUPAC Quest

Jogo educativo, responsivo e mobile-first para aprender nomenclatura orgânica IUPAC por meio de um algoritmo de sete decisões:

**função principal → cadeia principal → numeração → insaturações/substituintes → locantes → sufixo → nome IUPAC**

## O que está incluído

- 10 módulos: alcanos, cicloalcanos, alcenos, alcinos, álcoois, aldeídos, cetonas, ácidos carboxílicos, ésteres e aminas;
- desafio integrado com uma molécula de cada módulo;
- 30 estruturas condensadas e 210 decisões pedagógicas possíveis por rodada completa do banco;
- modos **Aprender**, **Praticar** e **Desafio**;
- feedback formativo separado por erro de função, cadeia, numeração, elementos, locantes, sufixo e montagem do nome;
- pontuação, sequência de acertos, precisão e domínio por módulo;
- progresso salvo no próprio dispositivo com `localStorage`;
- interface acessível por toque e teclado (`1`–`4`, `Enter`, `H` e `Esc`);
- funcionamento offline após a primeira visita;
- zero dependências de execução e compatibilidade direta com GitHub Pages.

## Executar localmente

Por ser um site estático, basta servir a pasta do projeto com qualquer servidor HTTP. Exemplo com Python:

```bash
python -m http.server 4173
```

Depois acesse `http://localhost:4173`.

Também é possível abrir `index.html` diretamente, mas um servidor local é recomendado para testar o modo offline.

## Validar

Com Node.js 18 ou superior:

```bash
node --check app.js
node tests/smoke.mjs
```

O teste confere os módulos, o banco de moléculas, as sete etapas, feedback formativo, atalhos, breakpoints responsivos, ausência de recursos externos e o fluxo de publicação.

## Publicar no GitHub Pages

O workflow `.github/workflows/pages.yml` publica automaticamente a branch `main`.

1. No GitHub, abra **Settings → Pages**.
2. Em **Build and deployment → Source**, escolha **GitHub Actions**.
3. Envie as alterações para `main` ou execute manualmente **Actions → Publicar no GitHub Pages → Run workflow**.
4. A publicação ficará disponível em `https://arigony.github.io/nomenclatura/`.

Nenhum caminho absoluto é usado pela aplicação; por isso CSS, JavaScript, manifesto, cache offline e imagens funcionam no subdiretório do GitHub Pages.

## Arquitetura

```text
index.html                 interface e telas do jogo
styles.css                 design system e responsividade
app.js                     banco de questões, motor pedagógico e progresso
manifest.webmanifest       instalação como web app
service-worker.js          cache offline
assets/og.png              prévia para compartilhamento
tests/smoke.mjs            validação estrutural sem dependências
.github/workflows/pages.yml publicação automática
```

## Licença

[MIT](LICENSE)
