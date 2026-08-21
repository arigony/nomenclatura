import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [html, css, app, manifest, workflow] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../styles.css", import.meta.url), "utf8"),
  readFile(new URL("../app.js", import.meta.url), "utf8"),
  readFile(new URL("../manifest.webmanifest", import.meta.url), "utf8"),
  readFile(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8")
]);

for (const id of ["home-view", "game-view", "results-view", "mode-dialog", "module-grid", "options", "feedback"]) {
  assert.match(html, new RegExp(`id=["']${id}["']`), `Elemento #${id} ausente`);
}

assert.equal((app.match(/id: "(?:alcanos|cicloalcanos|alcenos|alcinos|alcoois|aldeidos|cetonas|acidos|esteres|aminas|integrado)"/g) || []).length, 11, "A trilha deve conter 11 módulos");
assert.equal((app.match(/module: "(?:alcanos|cicloalcanos|alcenos|alcinos|alcoois|aldeidos|cetonas|acidos|esteres|aminas)"/g) || []).length, 30, "O banco deve conter 30 moléculas");
assert.match(app, /const STEP_DEFS = \[/, "Etapas pedagógicas ausentes");
assert.match(app, /const ERROR_INFO = \{/, "Feedback por tipo de erro ausente");
assert.match(app, /const DIAGRAMS = \{/, "Diagramas estruturais ancorados ausentes");
assert.match(app, /type: "cycle"/, "Representação geométrica de ciclos ausente");
assert.match(app, /localStorage/, "Persistência de progresso ausente");
assert.match(app, /keydown/, "Navegação por teclado ausente");
assert.match(css, /@media \(min-width: 700px\)/, "Breakpoint de tablet ausente");
assert.match(css, /@media \(min-width: 980px\)/, "Breakpoint de desktop ausente");
assert.match(css, /min-height: 56px/, "Alvos de toque grandes ausentes");
assert.match(css, /\.chem-cycle/, "Estilos de anel químico ausentes");
assert.doesNotMatch(html, /<(?:script|link)[^>]+https?:\/\//, "A aplicação não deve depender de recursos externos");
assert.equal(JSON.parse(manifest).start_url, "./");
assert.match(workflow, /actions\/deploy-pages@v4/, "Workflow do GitHub Pages ausente");

console.log("✓ Estrutura, conteúdo, acessibilidade básica e configuração do Pages validados.");
