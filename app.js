"use strict";

const MODULES = [
  { id: "alcanos", title: "Alcanos", icon: "C—C", color: "#00a67e", family: "Hidrocarboneto saturado", function: "Alcano", suffix: "-ano", description: "Cadeia principal, substituintes e ordem alfabética.", rule: "Escolha a maior cadeia contínua e dê os menores locantes aos substituintes.", trap: "Armadilha comum: seguir apenas a cadeia desenhada na horizontal." },
  { id: "cicloalcanos", title: "Cicloalcanos", icon: "⬡", color: "#4f7cff", family: "Hidrocarboneto cíclico", function: "Cicloalcano", suffix: "ciclo- + -ano", description: "Anéis, carbono 1 e o menor conjunto de locantes.", rule: "O anel costuma ser a cadeia principal quando tem tantos ou mais carbonos que a cadeia lateral.", trap: "Armadilha comum: escolher o sentido sem comparar os conjuntos de locantes." },
  { id: "alcenos", title: "Alcenos", icon: "C═C", color: "#f3a712", family: "Hidrocarboneto insaturado", function: "Alceno", suffix: "-eno", description: "Posição da ligação dupla e terminação -eno.", rule: "A cadeia principal precisa conter a ligação dupla, que recebe o menor locante possível.", trap: "Armadilha comum: priorizar um substituinte antes da ligação dupla." },
  { id: "alcinos", title: "Alcinos", icon: "C≡C", color: "#f97316", family: "Hidrocarboneto insaturado", function: "Alcino", suffix: "-ino", description: "Prioridade da ligação tripla e terminação -ino.", rule: "A cadeia principal precisa conter a ligação tripla e ser numerada pela extremidade mais próxima dela.", trap: "Armadilha comum: contar a posição da ligação pela extremidade mais distante." },
  { id: "alcoois", title: "Álcoois", icon: "—OH", color: "#8b5cf6", family: "Função oxigenada", function: "Álcool", suffix: "-ol", description: "Grupo hidroxila, numeração e sufixo -ol.", rule: "A cadeia principal contém o carbono ligado ao –OH, e a hidroxila recebe o menor locante.", trap: "Armadilha comum: confundir –OH ligado a carbono saturado com outra função oxigenada." },
  { id: "aldeidos", title: "Aldeídos", icon: "—CHO", color: "#e5484d", family: "Função carbonílica", function: "Aldeído", suffix: "-al", description: "Carbonila terminal e terminação -al.", rule: "O carbono do grupo –CHO pertence à cadeia principal e é sempre o carbono 1.", trap: "Armadilha comum: contar apenas os carbonos antes do grupo –CHO." },
  { id: "cetonas", title: "Cetonas", icon: ">C═O", color: "#d9468f", family: "Função carbonílica", function: "Cetona", suffix: "-ona", description: "Carbonila interna e terminação -ona.", rule: "A cadeia principal contém a carbonila, que recebe o menor locante possível.", trap: "Armadilha comum: confundir a carbonila interna com o –CHO terminal." },
  { id: "acidos", title: "Ácidos carboxílicos", icon: "—COOH", color: "#0e7490", family: "Função carboxílica", function: "Ácido carboxílico", suffix: "ácido ...-oico", description: "Carboxila como função principal e sufixo -oico.", rule: "O carbono da carboxila –COOH é o carbono 1 e faz parte da cadeia principal.", trap: "Armadilha comum: omitir a palavra “ácido” ou excluir o carbono da carboxila." },
  { id: "esteres", title: "Ésteres", icon: "COO", color: "#65a30d", family: "Derivado de ácido carboxílico", function: "Éster", suffix: "-oato de -ila", description: "Parte do ácido, parte do álcool e nome em duas partes.", rule: "Nomeie primeiro a parte ligada à carbonila como alcanoato; depois, o grupo ligado ao oxigênio.", trap: "Armadilha comum: inverter as duas partes do nome do éster." },
  { id: "aminas", title: "Aminas", icon: "—NH₂", color: "#7c3aed", family: "Função nitrogenada", function: "Amina", suffix: "-amina", description: "Grupo amino, cadeia principal e terminação -amina.", rule: "Na amina primária, escolha a maior cadeia ligada ao carbono que porta –NH₂ e dê a ele o menor locante.", trap: "Armadilha comum: tratar –NH₂ como substituinte quando a amina é a função principal." },
  { id: "integrado", title: "Desafio integrado", icon: "🏆", color: "#ff6b4a", family: "Todas as famílias", function: "Função a identificar", suffix: "depende da função", description: "Misture todas as funções e prove seu domínio.", rule: "Primeiro reconheça a função de maior prioridade; só então escolha cadeia, numeração e sufixo.", trap: "Armadilha comum: tentar nomear a cadeia antes de identificar a função principal." }
];

const QUESTIONS = [
  // Alcanos
  { id: "alk-1", module: "alcanos", structure: "CH₃—CH—CH₂—CH₃\n     │\n    CH₃", description: "Cadeia aberta, somente ligações simples.", parent: "butano · 4 carbonos", numbering: "Da esquerda para a direita, aproximando o substituinte", features: "um substituinte metil", locants: "metil no C2", name: "2-metilbutano", parentAlt: ["propano · 3 carbonos", "pentano · 5 carbonos", "etano · 2 carbonos"], numberAlt: ["Da direita para a esquerda", "A numeração é indiferente", "Começando pelo carbono ramificado como C1"], featureAlt: ["um substituinte etil", "dois substituintes metil", "nenhum substituinte"], locantAlt: ["metil no C1", "metil no C3", "etil no C2"], wrongNames: ["3-metilbutano", "2-etilpropano", "metilbutano"] },
  { id: "alk-2", module: "alcanos", structure: "CH₃—CH₂—CH—CH₂—CH₃\n         │\n        CH₃", description: "Cadeia aberta com uma ramificação central.", parent: "pentano · 5 carbonos", numbering: "Qualquer extremidade dá o mesmo locante", features: "um substituinte metil", locants: "metil no C3", name: "3-metilpentano", parentAlt: ["butano · 4 carbonos", "hexano · 6 carbonos", "propano · 3 carbonos"], numberAlt: ["Somente da esquerda", "Somente da direita", "O carbono ramificado deve ser C1"], featureAlt: ["um substituinte etil", "dois substituintes metil", "uma ligação dupla"], locantAlt: ["metil no C2", "metil no C4", "etil no C3"], wrongNames: ["2-metilpentano", "3-etilbutano", "3-metilhexano"] },
  { id: "alk-3", module: "alcanos", structure: "       CH₃\n        │\nCH₃—C—CH₂—CH₃\n    │\n   CH₃", description: "Um carbono central ligado a dois grupos metil adicionais.", parent: "butano · 4 carbonos", numbering: "A partir da esquerda, gerando 2,2", features: "dois substituintes metil", locants: "dois metis no C2", name: "2,2-dimetilbutano", parentAlt: ["pentano · 5 carbonos", "propano · 3 carbonos", "hexano · 6 carbonos"], numberAlt: ["A partir da direita, gerando 3,3", "Qualquer sentido é equivalente", "Começando no carbono central"], featureAlt: ["um substituinte etil", "um substituinte metil", "três substituintes metil"], locantAlt: ["metis nos C2 e C3", "dois metis no C3", "etil no C2"], wrongNames: ["3,3-dimetilbutano", "2-etil-2-metilpropano", "2-dimetilbutano"] },

  // Cicloalcanos
  { id: "cyc-1", module: "cicloalcanos", structure: "      CH₃\n       │\n      ⬡", description: "Anel de seis carbonos com um grupo metil.", parent: "ciclohexano · anel com 6 carbonos", numbering: "O carbono ligado ao metil é C1", features: "um substituinte metil no anel", locants: "o locante 1 pode ser omitido", name: "metilciclohexano", parentAlt: ["hexano · cadeia aberta", "ciclopentano · anel com 5 C", "cicloheptano · anel com 7 C"], numberAlt: ["O carbono oposto é C1", "O metil deve receber C2", "Não existe carbono 1 no ciclo"], featureAlt: ["um substituinte etil", "dois substituintes metil", "uma ligação dupla no anel"], locantAlt: ["metil no C2", "metil no C3", "locante obrigatório 1-"], wrongNames: ["1-metilhexano", "metilhexano", "1-metilciclohexano"] },
  { id: "cyc-2", module: "cicloalcanos", structure: "CH₂CH₃—⬡—CH₃\n(posições 1 e 3)", description: "Anel de seis carbonos com etil e metil separados por um carbono.", parent: "ciclohexano · anel com 6 carbonos", numbering: "Etil recebe C1; o sentido escolhido dá C3 ao metil", features: "um etil e um metil", locants: "etil no C1 e metil no C3", name: "1-etil-3-metilciclohexano", parentAlt: ["hexano · cadeia aberta", "ciclopentano · anel com 5 C", "heptano · cadeia aberta"], numberAlt: ["Metil recebe C1 e etil recebe C3", "Etil recebe C1 e metil recebe C5", "Comece no carbono sem substituinte"], featureAlt: ["dois substituintes etil", "dois substituintes metil", "um propil"], locantAlt: ["etil no C1 e metil no C5", "metil no C1 e etil no C3", "etil no C2 e metil no C4"], wrongNames: ["1-metil-3-etilciclohexano", "1-etil-5-metilciclohexano", "3-etil-1-metilhexano"] },
  { id: "cyc-3", module: "cicloalcanos", structure: "CH₃—⬟—CH₃\n(vizinhos)", description: "Anel de cinco carbonos com dois grupos metil vizinhos.", parent: "ciclopentano · anel com 5 carbonos", numbering: "Comece em um metil e siga até o outro pelo caminho curto", features: "dois substituintes metil", locants: "metis nos C1 e C2", name: "1,2-dimetilciclopentano", parentAlt: ["pentano · cadeia aberta", "ciclohexano · anel com 6 C", "ciclobutano · anel com 4 C"], numberAlt: ["Use o caminho longo: C1 e C5", "Comece em um carbono sem metil", "Não numere o anel"], featureAlt: ["um substituinte etil", "um substituinte metil", "dois substituintes etil"], locantAlt: ["metis nos C1 e C5", "metis nos C2 e C3", "metil no C1 apenas"], wrongNames: ["1,5-dimetilciclopentano", "2,3-dimetilciclopentano", "1-etilciclopentano"] },

  // Alcenos
  { id: "ene-1", module: "alcenos", structure: "CH₂═CH—CH₂—CH₃", description: "Cadeia de quatro carbonos com dupla terminal.", parent: "buteno · 4 carbonos com C═C", numbering: "A partir da esquerda, mais perto da dupla", features: "uma ligação dupla, sem substituintes", locants: "ligação dupla iniciando no C1", name: "but-1-eno", parentAlt: ["propano · 3 carbonos", "butano · sem dupla", "penteno · 5 carbonos"], numberAlt: ["A partir da direita", "A dupla não recebe locante", "Comece no segundo carbono"], featureAlt: ["uma ligação tripla", "uma ligação dupla e um metil", "somente ligações simples"], locantAlt: ["dupla no C2", "dupla no C3", "sem locante"], wrongNames: ["but-2-eno", "butano", "1-butileno"] },
  { id: "ene-2", module: "alcenos", structure: "CH₂═C—CH₂—CH₃\n    │\n   CH₃", description: "Dupla terminal e um grupo metil ligado ao segundo carbono.", parent: "buteno · 4 carbonos com C═C", numbering: "A partir da esquerda, dando 1 à dupla", features: "uma dupla e um substituinte metil", locants: "dupla no C1; metil no C2", name: "2-metilbut-1-eno", parentAlt: ["penteno · 5 carbonos", "butano · sem dupla", "propeno · 3 carbonos"], numberAlt: ["A partir da direita, aproximando o metil", "A dupla deve ficar no C3", "Comece pelo carbono do metil"], featureAlt: ["uma tripla e um metil", "uma dupla sem substituintes", "dois substituintes metil"], locantAlt: ["dupla no C3; metil no C3", "dupla no C2; metil no C2", "dupla no C1; metil no C3"], wrongNames: ["3-metilbut-3-eno", "2-metilbut-2-eno", "2-metilbutano"] },
  { id: "ene-3", module: "alcenos", structure: "CH₃—CH═C—CH₃\n       │\n      CH₃", description: "Dupla interna e um metil em um carbono da dupla.", parent: "buteno · 4 carbonos com C═C", numbering: "Da direita, mantendo a dupla em C2 e dando C2 ao metil", features: "uma dupla e um substituinte metil", locants: "dupla no C2; metil no C2", name: "2-metilbut-2-eno", parentAlt: ["penteno · 5 carbonos", "butano · sem dupla", "propeno · 3 carbonos"], numberAlt: ["Da esquerda, dando C3 ao metil", "A dupla deve receber C1", "A numeração é sempre indiferente"], featureAlt: ["uma ligação tripla", "duas ligações duplas", "uma dupla e um etil"], locantAlt: ["dupla no C2; metil no C3", "dupla no C1; metil no C2", "dupla no C3; metil no C2"], wrongNames: ["3-metilbut-2-eno", "2-metilbut-1-eno", "2-metilbutano"] },

  // Alcinos
  { id: "yne-1", module: "alcinos", structure: "HC≡C—CH₂—CH₃", description: "Cadeia de quatro carbonos com tripla terminal.", parent: "butino · 4 carbonos com C≡C", numbering: "A partir da esquerda, mais perto da tripla", features: "uma ligação tripla, sem substituintes", locants: "ligação tripla iniciando no C1", name: "but-1-ino", parentAlt: ["buteno · com dupla", "propino · 3 carbonos", "pentino · 5 carbonos"], numberAlt: ["A partir da direita", "A tripla não recebe locante", "Comece no segundo carbono"], featureAlt: ["uma ligação dupla", "uma tripla e um metil", "somente ligações simples"], locantAlt: ["tripla no C2", "tripla no C3", "sem locante"], wrongNames: ["but-2-ino", "but-1-eno", "1-butilino"] },
  { id: "yne-2", module: "alcinos", structure: "CH₃—C≡C—CH₂—CH₃", description: "Cadeia de cinco carbonos com tripla interna.", parent: "pentino · 5 carbonos com C≡C", numbering: "A partir da esquerda, dando 2 à tripla", features: "uma ligação tripla, sem substituintes", locants: "ligação tripla iniciando no C2", name: "pent-2-ino", parentAlt: ["butino · 4 carbonos", "penteno · com dupla", "hexino · 6 carbonos"], numberAlt: ["A partir da direita, dando 3 à tripla", "A tripla não recebe locante", "Comece no carbono central"], featureAlt: ["uma ligação dupla", "duas ligações triplas", "uma tripla e um metil"], locantAlt: ["tripla no C1", "tripla no C3", "tripla no C4"], wrongNames: ["pent-3-ino", "pent-2-eno", "2-pentino"] },
  { id: "yne-3", module: "alcinos", structure: "HC≡C—CH—CH₃\n       │\n      CH₃", description: "Tripla terminal e uma ramificação metil.", parent: "butino · 4 carbonos com C≡C", numbering: "A partir da tripla terminal", features: "uma tripla e um substituinte metil", locants: "tripla no C1; metil no C3", name: "3-metilbut-1-ino", parentAlt: ["pentino · 5 carbonos", "buteno · com dupla", "propino · 3 carbonos"], numberAlt: ["A partir do metil terminal", "A tripla deve ficar no C3", "Comece no carbono ramificado"], featureAlt: ["uma dupla e um metil", "uma tripla sem substituintes", "dois substituintes metil"], locantAlt: ["tripla no C3; metil no C2", "tripla no C1; metil no C2", "tripla no C2; metil no C3"], wrongNames: ["2-metilbut-3-ino", "2-metilbut-1-ino", "3-metilbut-1-eno"] },

  // Álcoois
  { id: "ol-1", module: "alcoois", structure: "CH₃—CH—CH₂—CH₃\n     │\n     OH", description: "Hidroxila ligada ao segundo carbono de uma cadeia com quatro carbonos.", parent: "butano · 4 carbonos contendo C—OH", numbering: "Da esquerda, dando 2 à hidroxila", features: "uma hidroxila, sem substituintes", locants: "OH no C2", name: "butan-2-ol", parentAlt: ["propano · 3 carbonos", "pentano · 5 carbonos", "buteno · com dupla"], numberAlt: ["Da direita, dando 3 ao OH", "O OH não recebe locante", "Comece no carbono do OH como C1"], featureAlt: ["uma carbonila", "uma carboxila", "duas hidroxilas"], locantAlt: ["OH no C1", "OH no C3", "OH no C4"], wrongNames: ["butan-3-ol", "2-butanol", "butanona"] },
  { id: "ol-2", module: "alcoois", structure: "CH₃—CH—CH₂OH\n     │\n    CH₃", description: "Álcool terminal em cadeia ramificada.", parent: "propano · 3 carbonos contendo C—OH", numbering: "A partir do carbono ligado ao OH", features: "uma hidroxila e um substituinte metil", locants: "OH no C1; metil no C2", name: "2-metilpropan-1-ol", parentAlt: ["butano · 4 carbonos", "etano · 2 carbonos", "propeno · com dupla"], numberAlt: ["A partir do CH₃ oposto", "Comece no carbono ramificado", "O OH não tem prioridade"], featureAlt: ["uma carbonila e um metil", "uma hidroxila sem substituinte", "duas hidroxilas"], locantAlt: ["OH no C3; metil no C2", "OH no C2; metil no C1", "OH no C1; metil no C3"], wrongNames: ["2-metilpropan-3-ol", "butan-1-ol", "2-metilpropanal"] },
  { id: "ol-3", module: "alcoois", structure: "CH₃—CH—CH—CH₃\n     │   │\n     OH  CH₃", description: "Hidroxila e metil em cadeia com quatro carbonos.", parent: "butano · 4 carbonos contendo C—OH", numbering: "Da esquerda, priorizando OH no C2", features: "uma hidroxila e um substituinte metil", locants: "OH no C2; metil no C3", name: "3-metilbutan-2-ol", parentAlt: ["pentano · 5 carbonos", "propano · 3 carbonos", "buteno · com dupla"], numberAlt: ["Da direita, priorizando metil no C2", "A numeração é indiferente", "Comece no carbono ramificado"], featureAlt: ["duas hidroxilas", "uma carbonila e um metil", "uma hidroxila e um etil"], locantAlt: ["OH no C3; metil no C2", "OH no C2; metil no C2", "OH no C1; metil no C3"], wrongNames: ["2-metilbutan-3-ol", "3-metilbutan-3-ol", "3-metilbutan-2-ona"] },

  // Aldeídos
  { id: "al-1", module: "aldeidos", structure: "CH₃—CH₂—CHO", description: "Carbonila terminal no grupo –CHO.", parent: "propano · 3 carbonos incluindo CHO", numbering: "O carbono do CHO é automaticamente C1", features: "um grupo aldeído terminal", locants: "CHO no C1, locante omitido", name: "propanal", parentAlt: ["etano · 2 carbonos", "butano · 4 carbonos", "propeno · com dupla"], numberAlt: ["Comece no CH₃", "A carbonila é C2", "O CHO não entra na numeração"], featureAlt: ["uma cetona interna", "uma hidroxila", "uma carboxila"], locantAlt: ["carbonila no C2", "CHO no C3", "aldeído no C2"], wrongNames: ["propan-1-al", "propanona", "etanal"] },
  { id: "al-2", module: "aldeidos", structure: "CH₃—CH—CHO\n     │\n    CH₃", description: "Grupo –CHO em cadeia de três carbonos com metil.", parent: "propano · 3 carbonos incluindo CHO", numbering: "CHO é C1; siga em direção à cadeia", features: "um aldeído e um substituinte metil", locants: "metil no C2", name: "2-metilpropanal", parentAlt: ["butano · 4 carbonos", "etano · 2 carbonos", "propano · sem CHO"], numberAlt: ["Comece pelo CH₃ terminal", "Metil deve ser C1", "CHO não entra na cadeia"], featureAlt: ["uma cetona e um metil", "um aldeído sem substituinte", "um aldeído e um etil"], locantAlt: ["metil no C1", "metil no C3", "etil no C2"], wrongNames: ["2-metilpropan-1-al", "3-metilpropanal", "2-metilpropanona"] },
  { id: "al-3", module: "aldeidos", structure: "CH₃—CH₂—CH—CHO\n         │\n        CH₃", description: "Grupo –CHO e um metil vizinho à carbonila.", parent: "butano · 4 carbonos incluindo CHO", numbering: "CHO é C1; o carbono vizinho é C2", features: "um aldeído e um substituinte metil", locants: "metil no C2", name: "2-metilbutanal", parentAlt: ["pentano · 5 carbonos", "propano · 3 carbonos", "butano · sem CHO"], numberAlt: ["Comece pelo CH₃ terminal", "Metil deve ser C3", "CHO deve ser C4"], featureAlt: ["uma cetona e um metil", "um aldeído sem substituinte", "uma carboxila"], locantAlt: ["metil no C3", "metil no C1", "metil no C4"], wrongNames: ["3-metilbutanal", "2-metilbutan-1-al", "2-metilbutanona"] },

  // Cetonas
  { id: "one-1", module: "cetonas", structure: "CH₃—CO—CH₂—CH₃", description: "Carbonila interna em cadeia de quatro carbonos.", parent: "butano · 4 carbonos contendo C═O", numbering: "Da esquerda, dando 2 à carbonila", features: "uma carbonila interna", locants: "carbonila no C2", name: "butan-2-ona", parentAlt: ["propano · 3 carbonos", "pentano · 5 carbonos", "buteno · com dupla C═C"], numberAlt: ["Da direita, dando 3 à carbonila", "A carbonila não recebe locante", "Comece no carbono da carbonila"], featureAlt: ["um aldeído terminal", "uma hidroxila", "uma carboxila"], locantAlt: ["carbonila no C1", "carbonila no C3", "carbonila no C4"], wrongNames: ["butan-3-ona", "butanal", "butan-2-ol"] },
  { id: "one-2", module: "cetonas", structure: "CH₃—CH₂—CO—CH₂—CH₃", description: "Carbonila central em cadeia de cinco carbonos.", parent: "pentano · 5 carbonos contendo C═O", numbering: "As duas extremidades dão carbonila no C3", features: "uma carbonila interna", locants: "carbonila no C3", name: "pentan-3-ona", parentAlt: ["butano · 4 carbonos", "hexano · 6 carbonos", "penteno · com dupla"], numberAlt: ["Somente da esquerda", "Somente da direita", "A carbonila deve ser C1"], featureAlt: ["um aldeído", "duas carbonilas", "uma hidroxila"], locantAlt: ["carbonila no C2", "carbonila no C4", "carbonila no C1"], wrongNames: ["pentan-2-ona", "pentan-3-al", "pentan-3-ol"] },
  { id: "one-3", module: "cetonas", structure: "CH₃—CO—CH—CH₃\n        │\n       CH₃", description: "Carbonila interna e metil em cadeia de quatro carbonos.", parent: "butano · 4 carbonos contendo C═O", numbering: "Da esquerda, priorizando carbonila no C2", features: "uma carbonila e um substituinte metil", locants: "carbonila no C2; metil no C3", name: "3-metilbutan-2-ona", parentAlt: ["pentano · 5 carbonos", "propano · 3 carbonos", "buteno · com dupla"], numberAlt: ["Da direita, priorizando metil", "A carbonila deve ser C3", "Comece no carbono ramificado"], featureAlt: ["um aldeído e um metil", "uma hidroxila e um metil", "uma carbonila sem substituintes"], locantAlt: ["carbonila no C3; metil no C2", "carbonila no C2; metil no C2", "carbonila no C1; metil no C3"], wrongNames: ["2-metilbutan-3-ona", "3-metilbutan-2-ol", "3-metilbutanal"] },

  // Ácidos carboxílicos
  { id: "acid-1", module: "acidos", structure: "CH₃—CH₂—COOH", description: "Carboxila terminal em cadeia de três carbonos.", parent: "propano · 3 carbonos incluindo COOH", numbering: "O carbono da carboxila é C1", features: "uma carboxila, sem substituintes", locants: "COOH no C1, locante omitido", name: "ácido propanoico", parentAlt: ["etano · 2 carbonos", "butano · 4 carbonos", "propano · sem carboxila"], numberAlt: ["Comece pelo CH₃", "A carboxila é C3", "O COOH não entra na cadeia"], featureAlt: ["um aldeído", "uma cetona", "um éster"], locantAlt: ["COOH no C2", "COOH no C3", "carboxila sem carbono"], wrongNames: ["propanoato", "ácido etanoico", "propanal"] },
  { id: "acid-2", module: "acidos", structure: "CH₃—CH—COOH\n     │\n    CH₃", description: "Carboxila e um metil no carbono vizinho.", parent: "propano · 3 carbonos incluindo COOH", numbering: "COOH é C1; o carbono vizinho é C2", features: "uma carboxila e um substituinte metil", locants: "metil no C2", name: "ácido 2-metilpropanoico", parentAlt: ["butano · 4 carbonos", "etano · 2 carbonos", "propano · sem COOH"], numberAlt: ["Comece pelo CH₃", "Metil é C1", "COOH não entra na cadeia"], featureAlt: ["um éster e um metil", "um aldeído e um metil", "uma carboxila sem substituintes"], locantAlt: ["metil no C1", "metil no C3", "etil no C2"], wrongNames: ["ácido 3-metilpropanoico", "2-metilpropanoato", "ácido 2-metilpropanal"] },
  { id: "acid-3", module: "acidos", structure: "CH₃—CH₂—CH—COOH\n         │\n        CH₃", description: "Carboxila e um metil em cadeia de quatro carbonos.", parent: "butano · 4 carbonos incluindo COOH", numbering: "COOH é C1; metil fica no C2", features: "uma carboxila e um substituinte metil", locants: "metil no C2", name: "ácido 2-metilbutanoico", parentAlt: ["pentano · 5 carbonos", "propano · 3 carbonos", "butano · sem COOH"], numberAlt: ["Comece pelo CH₃", "Metil deve ser C3", "COOH deve ser C4"], featureAlt: ["um éster e um metil", "uma cetona e um metil", "uma carboxila sem substituinte"], locantAlt: ["metil no C3", "metil no C1", "metil no C4"], wrongNames: ["ácido 3-metilbutanoico", "2-metilbutanoato", "ácido 2-metilbutanal"] },

  // Ésteres
  { id: "ester-1", module: "esteres", structure: "CH₃—COO—CH₂—CH₃", description: "Parte acila com dois carbonos; grupo etil ligado ao oxigênio.", parent: "etanoato + grupo etila", numbering: "Conte a parte da carbonila separadamente da parte após O", features: "carbonila ligada a O e a um grupo etil", locants: "não há locantes necessários", name: "etanoato de etila", parentAlt: ["propanoato + grupo metila", "etanoato + grupo metila", "metanoato + grupo propila"], numberAlt: ["Conte todos os carbonos como uma cadeia", "Comece pelo grupo etil", "Ignore o carbono da carbonila"], featureAlt: ["um ácido carboxílico", "uma cetona e um éter", "um aldeído"], locantAlt: ["carbonila no C2", "etil no C2", "O no C1"], wrongNames: ["etila de etanoato", "propanoato de metila", "ácido etanoico de etila"] },
  { id: "ester-2", module: "esteres", structure: "CH₃—CH₂—COO—CH₃", description: "Parte acila com três carbonos; grupo metil ligado ao oxigênio.", parent: "propanoato + grupo metila", numbering: "Separe no elo C(═O)—O antes de contar", features: "carbonila ligada a O e a um grupo metil", locants: "não há locantes necessários", name: "propanoato de metila", parentAlt: ["etanoato + grupo etila", "propanoato + grupo etila", "butanoato + grupo metila"], numberAlt: ["Conte tudo como quatro carbonos", "Comece pelo metil após O", "Ignore a carbonila"], featureAlt: ["um ácido carboxílico", "uma cetona", "um éter sem carbonila"], locantAlt: ["carbonila no C2", "metil no C1", "O no C3"], wrongNames: ["metila de propanoato", "etanoato de etila", "ácido propanoico de metila"] },
  { id: "ester-3", module: "esteres", structure: "CH₃—COO—CH₂—CH₂—CH₃", description: "Parte acila com dois carbonos; grupo propil ligado ao oxigênio.", parent: "etanoato + grupo propila", numbering: "Separe a parte acila da cadeia ligada ao oxigênio", features: "carbonila ligada a O e a um grupo propil", locants: "não há locantes necessários", name: "etanoato de propila", parentAlt: ["propanoato + grupo etila", "butanoato + grupo metila", "etanoato + grupo etila"], numberAlt: ["Conte tudo como cinco carbonos", "Comece pelo propil", "Ignore o carbono da carbonila"], featureAlt: ["um ácido carboxílico", "uma cetona e um álcool", "um éter sem carbonila"], locantAlt: ["propil no C2", "carbonila no C3", "O no C1"], wrongNames: ["propila de etanoato", "propanoato de etila", "ácido etanoico de propila"] },

  // Aminas
  { id: "amine-1", module: "aminas", structure: "CH₃—CH₂—NH₂", description: "Grupo amino terminal em cadeia de dois carbonos.", parent: "etano · 2 carbonos ligados a NH₂", numbering: "O carbono ligado a NH₂ recebe o menor número", features: "uma amina primária, sem substituintes", locants: "NH₂ no C1, locante dispensável aqui", name: "etanamina", parentAlt: ["metano · 1 carbono", "propano · 3 carbonos", "eteno · com dupla"], numberAlt: ["Comece pelo CH₃", "O nitrogênio é C1", "NH₂ não influencia a numeração"], featureAlt: ["uma amida", "uma nitrila", "uma amina secundária"], locantAlt: ["NH₂ no C2 obrigatório", "N no C1 da cadeia", "NH₂ no C3"], wrongNames: ["metanamina", "etanamida", "etan-2-amina"] },
  { id: "amine-2", module: "aminas", structure: "CH₃—CH—CH₃\n     │\n    NH₂", description: "Grupo amino ligado ao carbono central do propano.", parent: "propano · 3 carbonos", numbering: "Qualquer extremidade coloca NH₂ no C2", features: "uma amina primária", locants: "NH₂ no C2", name: "propan-2-amina", parentAlt: ["etano · 2 carbonos", "butano · 4 carbonos", "propeno · com dupla"], numberAlt: ["Somente da esquerda", "Somente da direita", "O nitrogênio é C2"], featureAlt: ["uma amida", "uma amina secundária", "uma nitrila"], locantAlt: ["NH₂ no C1", "NH₂ no C3", "N no C2"], wrongNames: ["propan-1-amina", "propan-2-amida", "2-aminopropanal"] },
  { id: "amine-3", module: "aminas", structure: "CH₃—CH₂—CH—CH₂NH₂\n         │\n        CH₃", description: "Amina terminal e uma ramificação metil.", parent: "butano · 4 carbonos contendo C—NH₂", numbering: "A partir do carbono ligado a NH₂", features: "uma amina primária e um substituinte metil", locants: "NH₂ no C1; metil no C2", name: "2-metilbutan-1-amina", parentAlt: ["pentano · 5 carbonos", "propano · 3 carbonos", "buteno · com dupla"], numberAlt: ["A partir do CH₃ oposto", "Comece no carbono ramificado", "NH₂ não tem prioridade"], featureAlt: ["uma amida e um metil", "uma amina sem substituinte", "uma amina secundária"], locantAlt: ["NH₂ no C4; metil no C3", "NH₂ no C1; metil no C3", "NH₂ no C2; metil no C1"], wrongNames: ["3-metilbutan-4-amina", "2-metilbutan-2-amina", "2-metilbutanamida"] }
];

const STEP_DEFS = [
  { id: "function", label: "Função", title: "Qual é a função orgânica principal?", support: "Observe o grupo característico e o tipo de ligação.", rule: "A função principal define a prioridade da numeração e o sufixo do nome." },
  { id: "parent", label: "Cadeia", title: "Qual é a cadeia principal correta?", support: "Conte o maior caminho permitido que contém a função ou a insaturação prioritária.", rule: "A cadeia principal deve conter a função principal e, quando aplicável, a insaturação." },
  { id: "numbering", label: "Numeração", title: "Como a cadeia deve ser numerada?", support: "Compare as duas extremidades ou os sentidos possíveis.", rule: "A função principal vem antes de insaturações e substituintes na escolha dos menores locantes." },
  { id: "features", label: "Elementos", title: "Quais elementos modificam o nome?", support: "Identifique insaturações, substituintes e grupos característicos.", rule: "Separe cada elemento: função, insaturação e ramificações entram em posições próprias no nome." },
  { id: "locants", label: "Locantes", title: "Quais são os locantes corretos?", support: "Relacione cada elemento ao número do carbono em que aparece.", rule: "Locantes ficam imediatamente antes da parte do nome a que se referem e são separados por vírgulas." },
  { id: "suffix", label: "Sufixo", title: "Qual terminação representa a função?", support: "Use a função principal identificada no primeiro passo.", rule: "O sufixo comunica a função orgânica principal; prefixos e infixos completam a informação." },
  { id: "name", label: "Nome", title: "Qual é o nome IUPAC completo?", support: "Organize locantes, substituintes, cadeia, insaturação e sufixo.", rule: "Use hífens entre números e palavras, vírgulas entre números e a ordem alfabética dos substituintes." }
];

const ERROR_INFO = {
  function: { title: "Revise a função principal", text: "Procure o grupo característico: C═C, C≡C, –OH, –CHO, >C═O, –COOH, –COO– ou –NH₂." },
  parent: { title: "Revise a cadeia principal", text: "A maior cadeia nem sempre é a mais reta; ela precisa conter o grupo prioritário ou a insaturação." },
  numbering: { title: "Revise a prioridade da numeração", text: "Compare os locantes a partir de cada extremidade e priorize função, insaturação e depois substituintes." },
  features: { title: "Revise os elementos da estrutura", text: "Conte separadamente ligações múltiplas, grupos funcionais e ramificações." },
  locants: { title: "Revise os locantes", text: "Numere carbono por carbono a partir da extremidade escolhida e associe cada elemento à sua posição." },
  suffix: { title: "Revise o sufixo", text: "O sufixo é determinado pela função principal, não pelo substituinte." },
  name: { title: "Revise a montagem do nome", text: "Confira cadeia-base, locantes, ordem dos substituintes, infixo da insaturação e sufixo." }
};

const SUFFIX_POOL = ["-ano", "ciclo- + -ano", "-eno", "-ino", "-ol", "-al", "-ona", "ácido ...-oico", "-oato de -ila", "-amina"];
const FUNCTION_POOL = MODULES.slice(0, 10).map((module) => module.function);
const STORAGE_KEY = "iupac-quest-progress-v1";
const MODE_NAMES = { learn: "Aprender", practice: "Praticar", challenge: "Desafio" };

const $ = (selector) => document.querySelector(selector);
const els = {
  home: $("#home-view"), game: $("#game-view"), results: $("#results-view"), grid: $("#module-grid"),
  score: $("#header-score"), streak: $("#header-streak"), dialog: $("#mode-dialog"), dialogTitle: $("#dialog-title"),
  dialogIcon: $("#dialog-icon"), dialogRule: $("#dialog-rule"), dialogTrap: $("#dialog-trap"), dialogMastery: $("#dialog-mastery"),
  challengeCopy: $("#challenge-copy"), gameModule: $("#game-module"), gameMode: $("#game-mode"), sessionScore: $("#session-score"),
  timerPill: $("#timer-pill"), timerValue: $("#timer-value"), livesPill: $("#lives-pill"), livesValue: $("#lives-value"),
  roundLabel: $("#round-label"), roundFill: $("#round-progress-fill"), stepList: $("#step-list"), questionFunction: $("#question-function"),
  questionLevel: $("#question-level"), structure: $("#structure-formula"), description: $("#structure-description"), ruleCard: $("#rule-card"),
  ruleText: $("#rule-text"), stepKicker: $("#step-kicker"), questionTitle: $("#question-title"), questionSupport: $("#question-support"),
  options: $("#options"), feedback: $("#feedback"), feedbackIcon: $("#feedback-icon"), feedbackTitle: $("#feedback-title"),
  feedbackText: $("#feedback-text"), hint: $("#hint-button"), next: $("#next-button"), announcer: $("#announcer"),
  overallMastery: $("#overall-mastery"), domainList: $("#domain-list"), resultScore: $("#result-score"), resultAccuracy: $("#result-accuracy"),
  resultMastery: $("#result-mastery"), resultsTitle: $("#results-title"), resultsSummary: $("#results-summary"), resultsReview: $("#results-review"),
  resultsBadge: $("#results-badge"), resultsEyebrow: $("#results-eyebrow")
};

let progress = loadProgress();
let selectedModuleId = "alcanos";
let state = null;

function blankRecord() {
  return { attempts: 0, correct: 0, sessions: 0, errors: {} };
}

function loadProgress() {
  const fallback = { score: 0, streak: 0, modules: {} };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return fallback;
    return { score: Number(saved.score) || 0, streak: Number(saved.streak) || 0, modules: saved.modules || {} };
  } catch {
    return fallback;
  }
}

function saveProgress() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch { /* Storage may be disabled; the game still works. */ }
}

function getRecord(moduleId) {
  if (!progress.modules[moduleId]) progress.modules[moduleId] = blankRecord();
  return progress.modules[moduleId];
}

function mastery(moduleId) {
  const record = getRecord(moduleId);
  if (!record.attempts) return 0;
  const accuracy = record.correct / record.attempts;
  const practice = Math.min(1, record.sessions / 4);
  return Math.round((accuracy * .78 + practice * .22) * 100);
}

function overallMastery() {
  const values = MODULES.slice(0, 10).map((module) => mastery(module.id));
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function moduleById(id) {
  return MODULES.find((module) => module.id === id);
}

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result;
}

function uniqueOptions(correct, candidates) {
  const options = [correct, ...candidates].filter((value, index, array) => value && array.indexOf(value) === index);
  return shuffle(options.slice(0, 4));
}

function answerFor(question, field) {
  if (field === "function") return moduleById(question.module).function;
  if (field === "suffix") return moduleById(question.module).suffix;
  return question[field];
}

function alternativesFor(question, field) {
  if (field === "function") return shuffle(FUNCTION_POOL.filter((item) => item !== answerFor(question, field))).slice(0, 3);
  if (field === "suffix") return shuffle(SUFFIX_POOL.filter((item) => item !== answerFor(question, field))).slice(0, 3);
  const keyMap = { parent: "parentAlt", numbering: "numberAlt", features: "featureAlt", locants: "locantAlt", name: "wrongNames" };
  return question[keyMap[field]] || [];
}

function stepsFor(question) {
  return STEP_DEFS.map((definition) => ({
    ...definition,
    correct: answerFor(question, definition.id),
    options: uniqueOptions(answerFor(question, definition.id), alternativesFor(question, definition.id))
  }));
}

function renderHome() {
  els.grid.innerHTML = MODULES.map((module, index) => {
    const value = mastery(module.id);
    return `
      <button class="module-card" type="button" style="--module-color:${module.color}" data-module="${module.id}" aria-label="Abrir módulo ${module.title}; domínio ${value}%">
        <span class="module-top"><span class="module-icon" aria-hidden="true">${module.icon}</span><span class="module-number">${String(index + 1).padStart(2, "0")}</span></span>
        <span><h3>${module.title}</h3><p>${module.description}</p></span>
        <span><span class="progress-label"><span>Domínio</span><strong>${value}%</strong></span><span class="progress-track"><span class="progress-fill" style="width:${value}%"></span></span></span>
      </button>`;
  }).join("");

  els.grid.querySelectorAll("[data-module]").forEach((button) => button.addEventListener("click", () => openModule(button.dataset.module)));
  els.score.textContent = progress.score;
  els.streak.textContent = progress.streak;
  els.overallMastery.textContent = `${overallMastery()}%`;
  els.domainList.innerHTML = MODULES.slice(0, 10).map((module) => {
    const value = mastery(module.id);
    return `<div class="domain-row"><span>${module.title}</span><span class="progress-track"><span class="progress-fill" style="width:${value}%;--module-color:${module.color}"></span></span><strong>${value}%</strong></div>`;
  }).join("");
}

function openModule(moduleId) {
  selectedModuleId = moduleId;
  const module = moduleById(moduleId);
  els.dialogTitle.textContent = module.title;
  els.dialogIcon.textContent = module.icon;
  els.dialogIcon.style.color = module.color;
  els.dialogRule.textContent = module.rule;
  els.dialogTrap.textContent = module.trap;
  els.dialogMastery.textContent = `${mastery(moduleId)}%`;
  els.challengeCopy.textContent = moduleId === "integrado" ? "10 moléculas · 180 segundos e 5 vidas" : "5 moléculas · 120 segundos e 3 vidas";
  if (typeof els.dialog.showModal === "function") els.dialog.showModal();
  else els.dialog.setAttribute("open", "");
}

function closeDialog() {
  if (typeof els.dialog.close === "function") els.dialog.close();
  else els.dialog.removeAttribute("open");
}

function buildQuestionSet(moduleId, mode) {
  if (moduleId === "integrado") {
    if (mode === "learn") return shuffle(QUESTIONS).slice(0, 3);
    const onePerModule = MODULES.slice(0, 10).map((module) => shuffle(QUESTIONS.filter((question) => question.module === module.id))[0]);
    return shuffle(onePerModule);
  }
  const bank = QUESTIONS.filter((question) => question.module === moduleId);
  const count = mode === "learn" ? 2 : 5;
  const result = [];
  while (result.length < count) result.push(...shuffle(bank));
  return result.slice(0, count);
}

function startSession(moduleId, mode) {
  closeDialog();
  const questions = buildQuestionSet(moduleId, mode);
  state = {
    moduleId, mode, questions, questionIndex: 0, stepIndex: 0, steps: [], resolved: false,
    wrongOptions: new Set(), attemptsOnStep: 0, score: 0, attempts: 0, correct: 0,
    lives: moduleId === "integrado" ? 5 : 3, seconds: moduleId === "integrado" ? 180 : 120,
    timer: null, endedBy: null, errors: {}
  };
  els.home.hidden = true;
  els.results.hidden = true;
  els.game.hidden = false;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  const module = moduleById(moduleId);
  els.gameModule.textContent = module.title;
  els.gameMode.textContent = MODE_NAMES[mode];
  els.timerPill.hidden = mode !== "challenge";
  els.livesPill.hidden = mode !== "challenge";
  els.hint.hidden = mode === "challenge";
  els.ruleCard.hidden = mode === "challenge";
  if (mode === "challenge") startTimer();
  loadQuestion();
}

function startTimer() {
  clearInterval(state.timer);
  updateSessionStats();
  state.timer = setInterval(() => {
    state.seconds -= 1;
    updateSessionStats();
    if (state.seconds <= 0) {
      state.endedBy = "time";
      finishSession();
    }
  }, 1000);
}

function currentQuestion() { return state.questions[state.questionIndex]; }
function currentStep() { return state.steps[state.stepIndex]; }

function loadQuestion() {
  const question = currentQuestion();
  state.steps = stepsFor(question);
  state.stepIndex = 0;
  state.resolved = false;
  state.wrongOptions = new Set();
  state.attemptsOnStep = 0;
  els.structure.textContent = question.structure;
  els.description.textContent = question.description;
  const sourceModule = moduleById(question.module);
  els.questionFunction.textContent = sourceModule.family;
  els.questionLevel.textContent = state.mode === "learn" ? "Guiado" : state.mode === "practice" ? "Prática" : "Contra o tempo";
  renderStep();
}

function renderStep() {
  const step = currentStep();
  const question = currentQuestion();
  state.resolved = false;
  state.wrongOptions = new Set();
  state.attemptsOnStep = 0;
  els.feedback.hidden = true;
  els.feedback.className = "feedback";
  els.next.hidden = true;
  els.next.textContent = state.stepIndex === state.steps.length - 1 ? "Próxima molécula →" : "Próximo passo →";
  els.stepKicker.textContent = `Passo ${state.stepIndex + 1} · ${STEP_DEFS[state.stepIndex].label}`;
  els.questionTitle.textContent = step.title;
  els.questionSupport.textContent = step.support;
  els.ruleText.textContent = step.rule;
  els.ruleCard.hidden = state.mode === "challenge";
  els.roundLabel.textContent = `Molécula ${state.questionIndex + 1} de ${state.questions.length}`;
  const totalUnits = state.questions.length * state.steps.length;
  const completedUnits = state.questionIndex * state.steps.length + state.stepIndex;
  els.roundFill.style.width = `${Math.round(completedUnits / totalUnits * 100)}%`;
  els.stepList.innerHTML = STEP_DEFS.map((item, index) => {
    const className = index < state.stepIndex ? "is-done" : index === state.stepIndex ? "is-current" : "";
    return `<li class="${className}" aria-current="${index === state.stepIndex ? "step" : "false"}"><b>${index + 1}</b><span>${item.label}</span></li>`;
  }).join("");
  els.options.innerHTML = step.options.map((option, index) => `
    <button class="option-button" type="button" data-answer="${index}">
      <span class="option-key">${index + 1}</span><span>${option}</span>
    </button>`).join("");
  els.options.querySelectorAll(".option-button").forEach((button) => button.addEventListener("click", () => answer(Number(button.dataset.answer), button)));
  updateSessionStats();
  requestAnimationFrame(() => els.options.querySelector("button")?.focus());
  els.announcer.textContent = `${step.title} Estrutura: ${question.description}`;
}

function answer(optionIndex, button) {
  if (!state || state.resolved || button.disabled) return;
  const step = currentStep();
  const selected = step.options[optionIndex];
  const correct = selected === step.correct;
  state.attempts += 1;
  state.attemptsOnStep += 1;
  recordAttempt(state.moduleId, step.id, correct);
  if (state.moduleId === "integrado") recordAttempt(currentQuestion().module, step.id, correct);

  if (correct) {
    state.correct += 1;
    state.resolved = true;
    const firstTry = state.attemptsOnStep === 1;
    const base = state.mode === "learn" ? 5 : state.mode === "practice" ? 10 : 15;
    const earned = firstTry ? base + Math.min(progress.streak, 10) : Math.max(2, Math.floor(base / 3));
    state.score += earned;
    progress.score += earned;
    progress.streak += 1;
    button.classList.add("is-correct");
    els.options.querySelectorAll("button").forEach((item) => { item.disabled = true; });
    const finalStep = step.id === "name";
    showFeedback(true, finalStep ? "Nome construído!" : "Decisão correta", finalStep ? `${step.correct}. ${moduleById(currentQuestion().module).rule}` : `${step.correct}. ${step.rule}`);
    els.next.hidden = false;
    els.next.textContent = finalStep && state.questionIndex === state.questions.length - 1 ? "Ver resultado →" : finalStep ? "Próxima molécula →" : "Próximo passo →";
    saveProgress();
    updateSessionStats();
    els.next.focus();
    return;
  }

  progress.streak = 0;
  state.errors[step.id] = (state.errors[step.id] || 0) + 1;
  state.wrongOptions.add(selected);
  button.classList.add("is-wrong");
  button.disabled = true;
  const info = ERROR_INFO[step.id];
  showFeedback(false, info.title, `“${selected}” não se aplica aqui. ${info.text}`);

  if (state.mode === "challenge") {
    state.lives -= 1;
    state.resolved = true;
    els.options.querySelectorAll("button").forEach((item, index) => {
      item.disabled = true;
      if (step.options[index] === step.correct) item.classList.add("is-correct");
    });
    els.next.hidden = false;
    if (state.lives <= 0) {
      state.endedBy = "lives";
      els.next.textContent = "Ver resultado →";
    }
  }
  saveProgress();
  updateSessionStats();
}

function showFeedback(correct, title, text) {
  els.feedback.hidden = false;
  els.feedback.className = `feedback ${correct ? "is-correct" : "is-wrong"}`;
  els.feedbackIcon.textContent = correct ? "✓" : "!";
  els.feedbackTitle.textContent = title;
  els.feedbackText.textContent = text;
  els.announcer.textContent = `${title}. ${text}`;
}

function showHint() {
  if (!state || state.mode === "challenge" || state.resolved) return;
  const step = currentStep();
  showFeedback(true, "Dica de raciocínio", `${step.rule} Procure a alternativa que leva a: ${step.correct}.`);
}

function nextStep() {
  if (!state || !state.resolved) return;
  if (state.endedBy === "lives") return finishSession();
  if (state.stepIndex < state.steps.length - 1) {
    state.stepIndex += 1;
    renderStep();
    return;
  }
  if (state.questionIndex < state.questions.length - 1) {
    state.questionIndex += 1;
    loadQuestion();
    return;
  }
  finishSession();
}

function recordAttempt(moduleId, stepId, correct) {
  const record = getRecord(moduleId);
  record.attempts += 1;
  if (correct) record.correct += 1;
  else record.errors[stepId] = (record.errors[stepId] || 0) + 1;
}

function updateSessionStats() {
  els.score.textContent = progress.score;
  els.streak.textContent = progress.streak;
  if (!state) return;
  els.sessionScore.textContent = state.score;
  els.timerValue.textContent = Math.max(0, state.seconds);
  els.livesValue.textContent = Math.max(0, state.lives);
  els.timerPill.classList.toggle("is-low", state.seconds <= 20);
}

function finishSession() {
  if (!state) return;
  clearInterval(state.timer);
  const record = getRecord(state.moduleId);
  record.sessions += 1;
  if (state.moduleId === "integrado") {
    new Set(state.questions.map((question) => question.module)).forEach((moduleId) => { getRecord(moduleId).sessions += 1; });
  }
  saveProgress();
  els.game.hidden = true;
  els.results.hidden = false;
  const accuracy = state.attempts ? Math.round(state.correct / state.attempts * 100) : 0;
  const value = mastery(state.moduleId);
  const endedEarly = Boolean(state.endedBy);
  els.resultsEyebrow.textContent = endedEarly ? "Desafio encerrado" : "Sessão concluída";
  els.resultsBadge.textContent = endedEarly ? "↻" : accuracy >= 85 ? "★" : "✓";
  els.resultsBadge.style.background = endedEarly ? "#ff6b4a" : accuracy >= 85 ? "#00a67e" : "#4f7cff";
  els.resultsTitle.textContent = endedEarly ? (state.endedBy === "time" ? "O tempo terminou" : "Suas vidas acabaram") : accuracy >= 85 ? "Domínio em alta!" : "Bom treino!";
  els.resultsSummary.textContent = endedEarly ? "Revise os passos com mais erros e tente novamente. O progresso desta tentativa já foi salvo." : "Você percorreu o algoritmo completo e fortaleceu as regras deste módulo.";
  els.resultScore.textContent = state.score;
  els.resultAccuracy.textContent = `${accuracy}%`;
  els.resultMastery.textContent = `${value}%`;
  const review = STEP_DEFS.map((step) => ({ label: step.label, errors: state.errors[step.id] || 0 })).filter((item) => item.errors > 0).sort((a, b) => b.errors - a.errors);
  els.resultsReview.innerHTML = review.length ? review.slice(0, 3).map((item) => `<div class="review-row needs-work"><span>Revisar: ${item.label}</span><strong>${item.errors} ${item.errors === 1 ? "erro" : "erros"}</strong></div>`).join("") : `<div class="review-row"><span>Nenhum tipo de erro recorrente</span><strong>Excelente</strong></div>`;
  renderHome();
  window.scrollTo({ top: 0, behavior: "smooth" });
  $("#play-again").focus();
}

function exitSession() {
  if (!state) return showHome();
  clearInterval(state.timer);
  state = null;
  showHome();
}

function showHome() {
  if (state?.timer) clearInterval(state.timer);
  state = null;
  els.game.hidden = true;
  els.results.hidden = true;
  els.home.hidden = false;
  renderHome();
  window.scrollTo({ top: 0, behavior: "smooth" });
  $("#continue-button").focus();
}

function resetProgress() {
  if (!window.confirm("Reiniciar pontos, sequência e domínio de todos os módulos?")) return;
  progress = { score: 0, streak: 0, modules: {} };
  saveProgress();
  renderHome();
  els.announcer.textContent = "Progresso reiniciado.";
}

$("#continue-button").addEventListener("click", () => openModule("alcanos"));
$("#integrated-button").addEventListener("click", () => openModule("integrado"));
$(".close-dialog").addEventListener("click", closeDialog);
$("#mode-options").addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]");
  if (button) startSession(selectedModuleId, button.dataset.mode);
});
$("#exit-game").addEventListener("click", exitSession);
els.hint.addEventListener("click", showHint);
els.next.addEventListener("click", nextStep);
$("#play-again").addEventListener("click", () => startSession(state.moduleId, state.mode));
$("#back-home").addEventListener("click", showHome);
$("#brand-link").addEventListener("click", (event) => { if (!els.home.hidden) return; event.preventDefault(); exitSession(); });
$("#reset-progress").addEventListener("click", resetProgress);

els.dialog.addEventListener("click", (event) => {
  const rect = els.dialog.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outside) closeDialog();
});

document.addEventListener("keydown", (event) => {
  if (!state || els.game.hidden) return;
  const keyNumber = Number(event.key);
  if (keyNumber >= 1 && keyNumber <= 4) {
    const button = els.options.querySelectorAll("button")[keyNumber - 1];
    if (button && !button.disabled) { event.preventDefault(); button.click(); }
  } else if (event.key === "Enter" && !els.next.hidden) {
    event.preventDefault(); nextStep();
  } else if (event.key.toLowerCase() === "h" && state.mode !== "challenge") {
    event.preventDefault(); showHint();
  } else if (event.key === "Escape") {
    event.preventDefault(); exitSession();
  }
});

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
}

renderHome();
