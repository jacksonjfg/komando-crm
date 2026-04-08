// ============================================================
//  KØMANDO CRM — Seed de dados iniciais
//  Execute este script UMA VEZ no console do browser após
//  abrir o index.html com suas credenciais configuradas.
//
//  Como usar:
//  1. Abra o app no browser
//  2. Abra o Console (F12 > Console)
//  3. Cole e execute: await window.seedKomando()
// ============================================================

window.seedKomando = async function() {
  const { getDatabase, ref, set } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js");
  const db = getDatabase();

  const eixosTemplate = [
    {
      id: "gestao_pessoas",
      nome: "Gestão de Pessoas & Liderança",
      short: "GP",
      icon: "👥",
      cor: "#5a8a3a",
      tarefas: [
        { txt: "Mapeamento do organograma", done: false },
        { txt: "Definição de perfis de cargo", done: false },
        { txt: "Onboarding estruturado", done: false },
        { txt: "Avaliação de liderança tática", done: false },
        { txt: "Delegação de decisões de rotina", done: false }
      ]
    },
    {
      id: "vendas_posicionamento",
      nome: "Vendas & Posicionamento",
      short: "VP",
      icon: "🎯",
      cor: "#c8a84b",
      tarefas: [
        { txt: "Análise de cardápio / portfólio e precificação", done: false },
        { txt: "Mapeamento de concorrentes", done: false },
        { txt: "Engenharia de margem de lucro", done: false },
        { txt: "Estratégia de upsell e cross-sell", done: false },
        { txt: "Alavancas de crescimento de faturamento", done: false }
      ]
    },
    {
      id: "performance_financeira",
      nome: "Performance Financeira",
      short: "PF",
      icon: "📈",
      cor: "#3a6a9a",
      tarefas: [
        { txt: "Mapeamento e organização de indicadores", done: false },
        { txt: "DRE simplificado implantado", done: false },
        { txt: "Fluxo de caixa semanal", done: false },
        { txt: "Meta de faturamento definida", done: false },
        { txt: "Indicadores orientando decisões estratégicas", done: false }
      ]
    },
    {
      id: "processos_operacionais",
      nome: "Processos Operacionais",
      short: "PO",
      icon: "⚙️",
      cor: "#8a4a2a",
      tarefas: [
        { txt: "Checklist de abertura e fechamento", done: false },
        { txt: "POP de produção documentado", done: false },
        { txt: "Controle de estoque implantado", done: false },
        { txt: "Manual de atendimento criado", done: false },
        { txt: "Operação funciona sem o dono presente", done: false }
      ]
    }
  ];

  function calcPct(eixos) {
    if (!eixos || !eixos.length) return 0;
    const total = eixos.reduce((sum, e) => {
      const done = e.tarefas.filter(t => t.done).length;
      return sum + Math.round((done / e.tarefas.length) * 100);
    }, 0);
    return Math.round(total / eixos.length);
  }

  function makeEmpresa(nome, seg, overrides = {}) {
    const eixos = eixosTemplate.map(e => ({
      ...JSON.parse(JSON.stringify(e)),
      tarefas: e.tarefas.map((t, i) => ({
        ...t,
        done: (overrides[e.id] || []).includes(i)
      }))
    }));
    eixos.forEach(e => {
      const done = e.tarefas.filter(t => t.done).length;
      e.pct = Math.round((done / e.tarefas.length) * 100);
    });
    return { nome, seg, pct: calcPct(eixos), eixos };
  }

  const data = {
    consultores: {
      c1: {
        nome: "Samara",
        empresas: {
          e1: makeEmpresa("Camomburguer", "Hamburgueria", {
            gestao_pessoas: [0, 1], vendas_posicionamento: [0, 1],
            processos_operacionais: [0, 1, 2], performance_financeira: [0]
          }),
          e2: makeEmpresa("Trattoria Bella Nápoli", "Restaurante Italiano", {
            vendas_posicionamento: [0], performance_financeira: [0]
          }),
          e3: makeEmpresa("Sushi Hanami", "Restaurante Japonês", {
            gestao_pessoas: [0], vendas_posicionamento: [0, 1],
            processos_operacionais: [0], performance_financeira: [0]
          }),
          e4: makeEmpresa("Açaí do Parque", "Açaíteria / Delivery", {
            vendas_posicionamento: [0], processos_operacionais: [0]
          }),
          e5: makeEmpresa("Bistrô Dona Cida", "Restaurante por Quilo", {
            gestao_pessoas: [0], vendas_posicionamento: [0, 1],
            processos_operacionais: [0, 1], performance_financeira: [0]
          })
        }
      },
      c2: {
        nome: "Rafael",
        empresas: {
          e6: makeEmpresa("Barbearia & Boteco Raiz", "Bar e Petiscaria", {
            gestao_pessoas: [0], vendas_posicionamento: [0],
            performance_financeira: [0], processos_operacionais: [0]
          }),
          e7: makeEmpresa("Taco Loko Mexican Food", "Fast Casual / Mexicano", {
            gestao_pessoas: [0, 1], vendas_posicionamento: [0],
            performance_financeira: [0], processos_operacionais: [0, 1]
          }),
          e8: makeEmpresa("Padaria & Café Pão Quente", "Padaria e Cafeteria", {
            gestao_pessoas: [0], vendas_posicionamento: [0],
            processos_operacionais: [0]
          }),
          e9: makeEmpresa("Espetão do Zé", "Churrascaria / Delivery", {
            vendas_posicionamento: [0], processos_operacionais: [0]
          }),
          e10: makeEmpresa("Pizzaria Forno a Lenha Centrale", "Pizzaria", {
            gestao_pessoas: [0], vendas_posicionamento: [0],
            performance_financeira: [0], processos_operacionais: [0]
          })
        }
      },
      c3:  { nome: "Lucas",    empresas: { e11: makeEmpresa("Cantina do Nono","Restaurante Italiano"), e12: makeEmpresa("Hot Dog do Gordo","Lanchonete"), e13: makeEmpresa("Temaki House","Japonês / Delivery"), e14: makeEmpresa("Empório & Deli Grano","Deli e Café"), e15: makeEmpresa("Boteco Varanda","Bar e Petiscaria") } },
      c4:  { nome: "Ana",      empresas: { e16: makeEmpresa("Crepe & Cia","Creperia"), e17: makeEmpresa("Caldeirão Nordestino","Nordestino / Regional"), e18: makeEmpresa("Poke Bowl Fresh","Poke / Saudável"), e19: makeEmpresa("Taberna do Porto","Bar Português"), e20: makeEmpresa("Churros & Chocolate","Doceria / Cafeteria") } },
      c5:  { nome: "Pedro",    empresas: { e21: makeEmpresa("Frango na Brasa Rei","Assados / Delivery"), e22: makeEmpresa("Veggie Garden","Vegetariano"), e23: makeEmpresa("Massa Fresca & Vino","Bistrô Italiano"), e24: makeEmpresa("Sorveteria Gelato Arte","Sorveteria"), e25: makeEmpresa("Chopperia Bem Gelado","Bar e Chopperia") } },
      c6:  { nome: "Julia",    empresas: { e26: makeEmpresa("Yakisoba Express","Japonês / Fast Food"), e27: makeEmpresa("Restaurante Dom Pedro","Contemporâneo"), e28: makeEmpresa("Tapiocaria da Binha","Tapiocaria / Regional"), e29: makeEmpresa("Smash Burger Co.","Hamburgueria Artesanal"), e30: makeEmpresa("Café Literário","Cafeteria e Bistrô") } },
      c7:  { nome: "Carlos",   empresas: { e31: makeEmpresa("Cozinha Árabe Beirute","Culinária Árabe"), e32: makeEmpresa("Steak House Prime","Churrascaria Premium"), e33: makeEmpresa("Açaíteria Amazônica","Açaíteria"), e34: makeEmpresa("Salgaderia e Buffet Sol","Buffet e Salgaderia"), e35: makeEmpresa("Pastelaria do Mercado","Pastelaria") } },
      c8:  { nome: "Fernanda", empresas: { e36: makeEmpresa("Comida Mineira da Vó","Mineiro / Regional"), e37: makeEmpresa("Sushi Bar Kokoro","Japonês Premium"), e38: makeEmpresa("Lanchonete Escola Sabor","Lanchonete / Escola"), e39: makeEmpresa("Espresso & Co.","Cafeteria Especialidade"), e40: makeEmpresa("Rotisserie Mamma Mia","Rotisserie e Empório") } },
      c9:  { nome: "Marcos",   empresas: { e41: makeEmpresa("Bodega Tex-Mex","Mexicano / Americano"), e42: makeEmpresa("Peixaria & Frutos do Mar","Frutos do Mar"), e43: makeEmpresa("Hamburgueria Street Mob","Hamburgueria"), e44: makeEmpresa("Doçura & Afeto Confeitaria","Confeitaria"), e45: makeEmpresa("Bar da Esquina Clássico","Bar Tradicional") } },
      c10: { nome: "Beatriz",  empresas: { e46: makeEmpresa("Wok Asian Kitchen","Asiático Contemporâneo"), e47: makeEmpresa("Vitrine Bolos & Tortas","Confeitaria e Cafeteria"), e48: makeEmpresa("Bistrô Luz & Mar","Frutos do Mar / Bistrô"), e49: makeEmpresa("Pizza in Box","Pizzaria Delivery"), e50: makeEmpresa("Grill & Drinks Roof","Bar Grill / Rooftop") } },
      c11: { nome: "Diego",    empresas: { e51: makeEmpresa("Noodle House","Asiático / Noodles"), e52: makeEmpresa("Brigaderia Sweet Lab","Doceria Artesanal"), e53: makeEmpresa("Restaurante Executivo Centro","Refeição Corporativa"), e54: makeEmpresa("Mercado & Gastrobar","Gastrobar"), e55: makeEmpresa("Cevicheria Costa Rica","Peruano / Frutos do Mar") } },
      c12: { nome: "Renata",   empresas: { e56: makeEmpresa("Boulangerie Petit Paris","Padaria Francesa"), e57: makeEmpresa("Food Truck Raízes","Food Truck / Evento"), e58: makeEmpresa("Restaurante Mangalô","Contemporâneo Brasileiro"), e59: makeEmpresa("Ristorante Al Tartufo","Italiano Premium"), e60: makeEmpresa("Dark Kitchen Sabores","Cozinha Ghost / Delivery") } }
    }
  };

  await set(ref(db, "komando"), data);
  console.log("✅ Seed concluído! Dados gravados no Firebase.");
  alert("✅ Seed concluído! Recarregue a página.");
};
