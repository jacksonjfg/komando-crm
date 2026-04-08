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
          e1: makeEmpresa("Camomburguer", "Food & Beverage", {
            gestao_pessoas: [0, 1], vendas_posicionamento: [0, 1],
            processos_operacionais: [0, 1, 2], performance_financeira: [0]
          }),
          e2: makeEmpresa("FitVida Academia", "Fitness", {
            vendas_posicionamento: [0], performance_financeira: [0]
          }),
          e3: makeEmpresa("Studio Marcia Hair", "Beleza", {
            gestao_pessoas: [0], vendas_posicionamento: [0, 1],
            processos_operacionais: [0], performance_financeira: [0]
          }),
          e4: makeEmpresa("MadeiraMov Marcenaria", "Indústria", {
            vendas_posicionamento: [0], processos_operacionais: [0]
          }),
          e5: makeEmpresa("Doce Encanto Confeitaria", "Alimentos", {
            gestao_pessoas: [0], vendas_posicionamento: [0, 1],
            processos_operacionais: [0, 1], performance_financeira: [0]
          })
        }
      },
      c2: {
        nome: "Rafael",
        empresas: {
          e6: makeEmpresa("TechFix Assistência", "Tecnologia", {
            gestao_pessoas: [0], vendas_posicionamento: [0],
            performance_financeira: [0], processos_operacionais: [0]
          }),
          e7: makeEmpresa("Clínica Bem Estar", "Saúde", {
            gestao_pessoas: [0, 1], vendas_posicionamento: [0],
            performance_financeira: [0], processos_operacionais: [0, 1]
          }),
          e8: makeEmpresa("Padaria Trigo & Arte", "Alimentos", {
            gestao_pessoas: [0], vendas_posicionamento: [0],
            processos_operacionais: [0]
          }),
          e9: makeEmpresa("Galeria Mosaico", "Cultura & Arte", {
            vendas_posicionamento: [0], processos_operacionais: [0]
          }),
          e10: makeEmpresa("Auto Peças Central", "Automotivo", {
            gestao_pessoas: [0], vendas_posicionamento: [0],
            performance_financeira: [0], processos_operacionais: [0]
          })
        }
      },
      c3:  { nome: "Lucas",    empresas: { e11: makeEmpresa("Empresa Demo 1","Varejo"), e12: makeEmpresa("Empresa Demo 2","Serviços"), e13: makeEmpresa("Empresa Demo 3","Saúde"), e14: makeEmpresa("Empresa Demo 4","Educação"), e15: makeEmpresa("Empresa Demo 5","Tech") } },
      c4:  { nome: "Ana",      empresas: { e16: makeEmpresa("Empresa Demo 6","Beleza"), e17: makeEmpresa("Empresa Demo 7","Food"), e18: makeEmpresa("Empresa Demo 8","Fitness"), e19: makeEmpresa("Empresa Demo 9","Moda"), e20: makeEmpresa("Empresa Demo 10","Automotivo") } },
      c5:  { nome: "Pedro",    empresas: { e21: makeEmpresa("Empresa Demo 11","Varejo"), e22: makeEmpresa("Empresa Demo 12","Ind."), e23: makeEmpresa("Empresa Demo 13","Saúde"), e24: makeEmpresa("Empresa Demo 14","Agro"), e25: makeEmpresa("Empresa Demo 15","Serviços") } },
      c6:  { nome: "Julia",    empresas: { e26: makeEmpresa("Empresa Demo 16","Edu"), e27: makeEmpresa("Empresa Demo 17","Tech"), e28: makeEmpresa("Empresa Demo 18","Food"), e29: makeEmpresa("Empresa Demo 19","Fitness"), e30: makeEmpresa("Empresa Demo 20","Beleza") } },
      c7:  { nome: "Carlos",   empresas: { e31: makeEmpresa("Empresa Demo 21","Varejo"), e32: makeEmpresa("Empresa Demo 22","Saúde"), e33: makeEmpresa("Empresa Demo 23","Moda"), e34: makeEmpresa("Empresa Demo 24","Auto"), e35: makeEmpresa("Empresa Demo 25","Food") } },
      c8:  { nome: "Fernanda", empresas: { e36: makeEmpresa("Empresa Demo 26","Serviços"), e37: makeEmpresa("Empresa Demo 27","Ind."), e38: makeEmpresa("Empresa Demo 28","Beleza"), e39: makeEmpresa("Empresa Demo 29","Tech"), e40: makeEmpresa("Empresa Demo 30","Edu") } },
      c9:  { nome: "Marcos",   empresas: { e41: makeEmpresa("Empresa Demo 31","Agro"), e42: makeEmpresa("Empresa Demo 32","Food"), e43: makeEmpresa("Empresa Demo 33","Saúde"), e44: makeEmpresa("Empresa Demo 34","Fitness"), e45: makeEmpresa("Empresa Demo 35","Auto") } },
      c10: { nome: "Beatriz",  empresas: { e46: makeEmpresa("Empresa Demo 36","Moda"), e47: makeEmpresa("Empresa Demo 37","Varejo"), e48: makeEmpresa("Empresa Demo 38","Tech"), e49: makeEmpresa("Empresa Demo 39","Ind."), e50: makeEmpresa("Empresa Demo 40","Serviços") } },
      c11: { nome: "Diego",    empresas: { e51: makeEmpresa("Empresa Demo 41","Edu"), e52: makeEmpresa("Empresa Demo 42","Saúde"), e53: makeEmpresa("Empresa Demo 43","Food"), e54: makeEmpresa("Empresa Demo 44","Auto"), e55: makeEmpresa("Empresa Demo 45","Beleza") } },
      c12: { nome: "Renata",   empresas: { e56: makeEmpresa("Empresa Demo 46","Tech"), e57: makeEmpresa("Empresa Demo 47","Varejo"), e58: makeEmpresa("Empresa Demo 48","Fitness"), e59: makeEmpresa("Empresa Demo 49","Ind."), e60: makeEmpresa("Empresa Demo 50","Agro") } }
    }
  };

  await set(ref(db, "komando"), data);
  console.log("✅ Seed concluído! Dados gravados no Firebase.");
  alert("✅ Seed concluído! Recarregue a página.");
};
