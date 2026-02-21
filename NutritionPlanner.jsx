import { useState, useMemo } from "react";

const PROTEINS = [
  { id:"p1", name:"Œufs entiers", portion:"2 unités (100g)", kcal:143, prot:13, carb:1, fat:10, k:138, ph:172 },
  { id:"p2", name:"Blancs d'œuf", portion:"3 unités (100g)", kcal:52, prot:11, carb:1, fat:0, k:163, ph:15 },
  { id:"p3", name:"Poulet (blanc)", portion:"100g cuit", kcal:165, prot:31, carb:0, fat:4, k:256, ph:228 },
  { id:"p4", name:"Dinde (blanc)", portion:"100g cuit", kcal:147, prot:30, carb:0, fat:2, k:293, ph:213 },
  { id:"p5", name:"Cabillaud", portion:"100g cuit", kcal:105, prot:23, carb:0, fat:1, k:244, ph:138 },
  { id:"p6", name:"Saumon (conserve)", portion:"80g égoutté", kcal:130, prot:17, carb:0, fat:7, k:200, ph:170 },
  { id:"p7", name:"Thon naturel (conserve)", portion:"80g", kcal:90, prot:20, carb:0, fat:1, k:180, ph:160 },
  { id:"p8", name:"Tofu ferme", portion:"125g", kcal:110, prot:13, carb:2, fat:6, k:150, ph:120 },
  { id:"p9", name:"Crevettes cuites", portion:"80g", kcal:80, prot:18, carb:0, fat:1, k:145, ph:170 },
  { id:"p10", name:"Truite", portion:"100g cuite", kcal:140, prot:24, carb:0, fat:5, k:250, ph:200 },
  { id:"p11", name:"Merlu / Lieu", portion:"100g cuit", kcal:95, prot:22, carb:0, fat:1, k:220, ph:140 },
  { id:"p12", name:"Sardines (conserve)", portion:"60g égouttées", kcal:112, prot:13, carb:0, fat:7, k:135, ph:210 },
  { id:"p13", name:"Yaourt grec nature", portion:"150g", kcal:90, prot:15, carb:6, fat:1, k:220, ph:160 },
  { id:"p14", name:"Fromage chèvre frais", portion:"50g", kcal:100, prot:7, carb:1, fat:8, k:19, ph:75 },
  { id:"p15", name:"Ricotta (pasteurisée)", portion:"80g", kcal:110, prot:9, carb:3, fat:7, k:80, ph:120 },
];

const CARBS = [
  { id:"c1", name:"Riz basmati", portion:"150g cuit", kcal:195, prot:4, carb:43, fat:1, k:55, ph:68 },
  { id:"c2", name:"Vermicelles de riz", portion:"150g cuit", kcal:165, prot:2, carb:40, fat:0, k:7, ph:14 },
  { id:"c3", name:"Pain levain épeautre", portion:"2 tranches (60g)", kcal:160, prot:6, carb:30, fat:2, k:100, ph:80 },
  { id:"c4", name:"Tortilla de maïs", portion:"2 unités (52g)", kcal:104, prot:3, carb:21, fat:2, k:80, ph:144 },
  { id:"c5", name:"Boulgour", portion:"150g cuit", kcal:128, prot:4, carb:27, fat:1, k:124, ph:73 },
  { id:"c6", name:"Orge perlé", portion:"150g cuit", kcal:175, prot:4, carb:38, fat:1, k:146, ph:85 },
  { id:"c7", name:"Flocons d'avoine", portion:"30g sec", kcal:117, prot:4, carb:20, fat:2, k:110, ph:130 },
  { id:"c8", name:"Polenta / Semoule maïs", portion:"150g cuite", kcal:105, prot:2, carb:23, fat:1, k:30, ph:20 },
  { id:"c9", name:"Sarrasin", portion:"100g cuit", kcal:92, prot:3, carb:20, fat:1, k:88, ph:70 },
  { id:"c10", name:"Quinoa", portion:"80g cuit (½ tasse max)", kcal:96, prot:4, carb:16, fat:2, k:160, ph:140 },
  { id:"c11", name:"Myrtilles", portion:"125g (1 tasse)", kcal:72, prot:1, carb:18, fat:0, k:96, ph:15 },
  { id:"c12", name:"Fraises", portion:"100g", kcal:32, prot:1, carb:8, fat:0, k:153, ph:24 },
  { id:"c13", name:"Raisin", portion:"100g", kcal:69, prot:1, carb:18, fat:0, k:117, ph:6 },
  { id:"c14", name:"Patate douce", portion:"100g bouillie", kcal:90, prot:2, carb:21, fat:0, k:230, ph:32 },
  { id:"c15", name:"Pain de seigle", portion:"1 tranche (30g)", kcal:76, prot:3, carb:15, fat:1, k:60, ph:55 },
];

const FATS = [
  { id:"f1", name:"Huile d'olive extra-vierge", portion:"1 c.à.s. (15ml)", kcal:120, prot:0, carb:0, fat:14, k:0, ph:0 },
  { id:"f2", name:"Huile de noix", portion:"1 c.à.s. (15ml)", kcal:120, prot:0, carb:0, fat:14, k:0, ph:0 },
  { id:"f3", name:"Noix", portion:"10 moitiés (15g)", kcal:98, prot:2, carb:2, fat:10, k:66, ph:52 },
  { id:"f4", name:"Noix de pécan", portion:"10 moitiés (15g)", kcal:104, prot:2, carb:2, fat:11, k:62, ph:42 },
  { id:"f5", name:"Graines de lin moulues", portion:"1 c.à.s. (10g)", kcal:53, prot:2, carb:3, fat:4, k:57, ph:45 },
  { id:"f6", name:"Graines de chia", portion:"1 c.à.s. (12g)", kcal:58, prot:2, carb:5, fat:4, k:48, ph:74 },
  { id:"f7", name:"Amandes", portion:"10 unités (12g)", kcal:69, prot:3, carb:3, fat:6, k:88, ph:58 },
  { id:"f8", name:"Beurre", portion:"10g", kcal:72, prot:0, carb:0, fat:8, k:2, ph:2 },
  { id:"f9", name:"Huile de colza", portion:"1 c.à.s. (15ml)", kcal:120, prot:0, carb:0, fat:14, k:0, ph:0 },
  { id:"f10", name:"Olives vertes", portion:"6 unités (24g)", kcal:35, prot:0, carb:1, fat:4, k:10, ph:1 },
  { id:"f11", name:"Avocat", portion:"30g (¼ petit)", kcal:48, prot:1, carb:3, fat:5, k:145, ph:16 },
  { id:"f12", name:"Graines de courge", portion:"10g", kcal:56, prot:3, carb:1, fat:5, k:80, ph:115 },
  { id:"f13", name:"Noisettes", portion:"8 unités (10g)", kcal:63, prot:2, carb:2, fat:6, k:68, ph:29 },
  { id:"f14", name:"Tahini", portion:"1 c.à.c. (10g)", kcal:60, prot:2, carb:2, fat:5, k:47, ph:70 },
  { id:"f15", name:"Huile de sésame", portion:"1 c.à.s. (15ml)", kcal:120, prot:0, carb:0, fat:14, k:0, ph:0 },
];

const VEGGIES = [
  { id:"v1", name:"Poivron rouge", portion:"75g cru", kcal:23, prot:1, carb:5, fat:0, k:157, ph:19 },
  { id:"v2", name:"Concombre", portion:"80g", kcal:12, prot:1, carb:3, fat:0, k:117, ph:19 },
  { id:"v3", name:"Carotte", portion:"60g", kcal:25, prot:1, carb:6, fat:0, k:192, ph:21 },
  { id:"v4", name:"Aubergine", portion:"75g cuite", kcal:19, prot:1, carb:4, fat:0, k:91, ph:10 },
  { id:"v5", name:"Haricots verts", portion:"80g cuits", kcal:25, prot:2, carb:5, fat:0, k:117, ph:25 },
  { id:"v6", name:"Laitue", portion:"80g", kcal:12, prot:1, carb:2, fat:0, k:116, ph:15 },
  { id:"v7", name:"Radis", portion:"60g", kcal:10, prot:0, carb:2, fat:0, k:140, ph:12 },
  { id:"v8", name:"Navet", portion:"80g cuit", kcal:18, prot:1, carb:4, fat:0, k:142, ph:18 },
  { id:"v9", name:"Courgette", portion:"65g cuite", kcal:10, prot:1, carb:2, fat:0, k:110, ph:17 },
  { id:"v10", name:"Germes de soja", portion:"50g", kcal:15, prot:2, carb:2, fat:0, k:77, ph:24 },
  { id:"v11", name:"Bok choy", portion:"75g cuit", kcal:10, prot:1, carb:2, fat:0, k:150, ph:25 },
  { id:"v12", name:"Endive", portion:"50g", kcal:8, prot:1, carb:2, fat:0, k:128, ph:13 },
  { id:"v13", name:"Fenouil", portion:"50g cru", kcal:15, prot:1, carb:3, fat:0, k:180, ph:24 },
  { id:"v14", name:"Chou chinois (napa)", portion:"75g", kcal:10, prot:1, carb:2, fat:0, k:120, ph:18 },
  { id:"v15", name:"Céleri-rave", portion:"50g cuit", kcal:21, prot:1, carb:5, fat:0, k:150, ph:44 },
];

const MEALS = [
  {
    id:"breakfast", label:"Petit-déjeuner", icon:"🌅", time:"7h00 – 7h30",
    targetKcal:645, targetP:22, targetC:80, targetF:26,
    rules:{ proteins:1, carbs:2, fats:1, veggies:1 },
    meds:"💊 CellCept 500mg · Metformine 850mg · Asaflow 80mg · Medrol 5mg",
    note:"☕ Café possible ≥ 1h après L-Thyroxine (prise à 6h00 à jeun)"
  },
  {
    id:"lunch", label:"Déjeuner", icon:"☀️", time:"12h30 – 13h00",
    targetKcal:753, targetP:27, targetC:88, targetF:33,
    rules:{ proteins:1, carbs:2, fats:1, veggies:2 },
    meds:"💊 Zanidip 20mg (15 min AVANT repas) · Moxonidine",
    note:"⚠️ Pic de résistance à l'insuline (corticoïdes) → privilégier IG bas"
  },
  {
    id:"dinner", label:"Dîner", icon:"🌙", time:"19h00 – 19h30",
    targetKcal:430, targetP:15, targetC:38, targetF:25,
    rules:{ proteins:1, carbs:1, fats:1, veggies:2 },
    meds:"💊 CellCept 250mg · Metformine 850mg",
    note:"🍽️ Repas léger — tolérance au glucose réduite en soirée"
  },
  {
    id:"snackPM", label:"Collation 16h", icon:"🍎", time:"16h00 – 17h00",
    targetKcal:215, targetP:8, targetC:28, targetF:8,
    rules:{ proteins:0, carbs:1, fats:1, veggies:0 },
    meds:"",
    note:"🔋 Recharge avant le creux de fin de journée"
  },
  {
    id:"snackEve", label:"Collation 21h", icon:"💤", time:"21h00",
    targetKcal:108, targetP:3, targetC:6, targetF:7,
    rules:{ proteins:1, carbs:0, fats:1, veggies:0 },
    meds:"💊 Atozet · Mirtazapine 15mg · Citalopram 10mg · Tramadol",
    note:"🛡️ Protéine + lipide = satiété contre fringales mirtazapine"
  }
];

const CAT_META = {
  proteins: { label:"Protéines", color:"#B83B34", bg:"#FDF2F1", items:PROTEINS, icon:"🥩" },
  carbs:    { label:"Glucides / Féculents", color:"#C77F20", bg:"#FFF8ED", items:CARBS, icon:"🌾" },
  fats:     { label:"Lipides", color:"#2D7D46", bg:"#EFF8F1", items:FATS, icon:"🫒" },
  veggies:  { label:"Légumes", color:"#3A7CA5", bg:"#EDF5FA", items:VEGGIES, icon:"🥬" },
};

const sumNutrients = (items) => {
  const s = { kcal:0, prot:0, carb:0, fat:0, k:0, ph:0 };
  items.forEach(it => { if(it){s.kcal+=it.kcal;s.prot+=it.prot;s.carb+=it.carb;s.fat+=it.fat;s.k+=it.k;s.ph+=it.ph;}});
  return s;
};

const FoodRow = ({ item, selected, onToggle, disabled }) => (
  <tr
    onClick={disabled && !selected ? undefined : onToggle}
    style={{
      cursor: disabled && !selected ? "not-allowed" : "pointer",
      background: selected ? "#E8F5E9" : "transparent",
      opacity: disabled && !selected ? 0.4 : 1,
      transition: "all 0.15s ease",
      borderBottom: "1px solid #E8E5E0"
    }}
  >
    <td style={{ padding:"8px 10px", width:30 }}>
      <span style={{ fontSize:18, color: selected?"#2D7D46":"#ccc" }}>
        {selected ? "✅" : "⬜"}
      </span>
    </td>
    <td style={{ padding:"8px 6px", fontWeight:selected?600:400, color:"#2D3436" }}>{item.name}</td>
    <td style={{ padding:"8px 6px", color:"#666", fontSize:13 }}>{item.portion}</td>
    <td style={{ padding:"8px 6px", textAlign:"center", fontWeight:600 }}>{item.kcal}</td>
    <td style={{ padding:"8px 6px", textAlign:"center", color:"#B83B34" }}>{item.prot}</td>
    <td style={{ padding:"8px 6px", textAlign:"center", color:"#C77F20" }}>{item.carb}</td>
    <td style={{ padding:"8px 6px", textAlign:"center", color:"#2D7D46" }}>{item.fat}</td>
    <td style={{ padding:"8px 6px", textAlign:"center", color:"#666", fontSize:12 }}>{item.k}</td>
    <td style={{ padding:"8px 6px", textAlign:"center", color:"#666", fontSize:12 }}>{item.ph}</td>
  </tr>
);

const CategoryTable = ({ catKey, meal, selections, onToggle }) => {
  const meta = CAT_META[catKey];
  const maxPicks = meal.rules[catKey];
  if (maxPicks === 0) return null;
  const selected = selections[meal.id]?.[catKey] || [];
  const count = selected.filter(Boolean).length;

  return (
    <div style={{ marginBottom:20 }}>
      <div style={{
        display:"flex", alignItems:"center", gap:10, marginBottom:8,
        padding:"8px 14px", background:meta.bg, borderRadius:8,
        borderLeft:`4px solid ${meta.color}`
      }}>
        <span style={{ fontSize:20 }}>{meta.icon}</span>
        <span style={{ fontWeight:700, color:meta.color, fontSize:15 }}>{meta.label}</span>
        <span style={{
          marginLeft:"auto", background:meta.color, color:"#fff",
          padding:"2px 10px", borderRadius:12, fontSize:12, fontWeight:600
        }}>
          {count} / {maxPicks} choix
        </span>
      </div>
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:14 }}>
          <thead>
            <tr style={{ background:"#F5F3EF", fontSize:12, textTransform:"uppercase", letterSpacing:0.5 }}>
              <th style={{ padding:"6px 10px", width:30 }}></th>
              <th style={{ padding:"6px 6px", textAlign:"left" }}>Aliment</th>
              <th style={{ padding:"6px 6px", textAlign:"left" }}>Portion</th>
              <th style={{ padding:"6px 6px", textAlign:"center" }}>Kcal</th>
              <th style={{ padding:"6px 6px", textAlign:"center", color:"#B83B34" }}>P (g)</th>
              <th style={{ padding:"6px 6px", textAlign:"center", color:"#C77F20" }}>G (g)</th>
              <th style={{ padding:"6px 6px", textAlign:"center", color:"#2D7D46" }}>L (g)</th>
              <th style={{ padding:"6px 6px", textAlign:"center" }}>K (mg)</th>
              <th style={{ padding:"6px 6px", textAlign:"center" }}>P (mg)</th>
            </tr>
          </thead>
          <tbody>
            {meta.items.map((item) => {
              const isSel = selected.includes(item.id);
              const isFull = count >= maxPicks;
              return (
                <FoodRow
                  key={item.id}
                  item={item}
                  selected={isSel}
                  disabled={isFull && !isSel}
                  onToggle={() => onToggle(meal.id, catKey, item.id, maxPicks)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MealSummary = ({ meal, selections }) => {
  const cats = ["proteins","carbs","fats","veggies"];
  const allSelected = [];
  cats.forEach(cat => {
    const ids = selections[meal.id]?.[cat] || [];
    ids.forEach(id => {
      const item = CAT_META[cat].items.find(i=>i.id===id);
      if(item) allSelected.push(item);
    });
  });
  const totals = sumNutrients(allSelected);
  const pct = meal.targetKcal > 0 ? Math.round((totals.kcal / meal.targetKcal)*100) : 0;

  return (
    <div style={{
      background:"linear-gradient(135deg, #2D4739, #3A6B50)", color:"#fff",
      borderRadius:12, padding:18, marginBottom:12
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
        <span style={{ fontWeight:700, fontSize:15 }}>📊 Bilan du repas</span>
        <span style={{
          background: pct > 115 ? "#E74C3C" : pct > 90 ? "#27AE60" : "#F39C12",
          padding:"2px 10px", borderRadius:12, fontSize:12, fontWeight:600
        }}>
          {totals.kcal} / {meal.targetKcal} kcal ({pct}%)
        </span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:8 }}>
        {[
          { label:"Protéines", val:totals.prot, target:meal.targetP, unit:"g", color:"#F1948A" },
          { label:"Glucides", val:totals.carb, target:meal.targetC, unit:"g", color:"#F9E79F" },
          { label:"Lipides", val:totals.fat, target:meal.targetF, unit:"g", color:"#82E0AA" }
        ].map(m => (
          <div key={m.label} style={{ background:"rgba(255,255,255,0.12)", borderRadius:8, padding:"8px 10px", textAlign:"center" }}>
            <div style={{ fontSize:11, opacity:0.8 }}>{m.label}</div>
            <div style={{ fontSize:20, fontWeight:700 }}>{m.val}<span style={{ fontSize:12, opacity:0.7 }}>g</span></div>
            <div style={{ fontSize:11, opacity:0.6 }}>cible ~{m.target}g</div>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:8 }}>
        <div style={{ background:"rgba(255,255,255,0.08)", borderRadius:6, padding:"6px 10px", fontSize:12, textAlign:"center" }}>
          K : <strong>{totals.k} mg</strong>
        </div>
        <div style={{ background:"rgba(255,255,255,0.08)", borderRadius:6, padding:"6px 10px", fontSize:12, textAlign:"center" }}>
          Phosphore : <strong>{totals.ph} mg</strong>
        </div>
      </div>
    </div>
  );
};

const DailySummary = ({ selections }) => {
  const allItems = [];
  MEALS.forEach(meal => {
    ["proteins","carbs","fats","veggies"].forEach(cat => {
      const ids = selections[meal.id]?.[cat] || [];
      ids.forEach(id => {
        const item = CAT_META[cat].items.find(i=>i.id===id);
        if(item) allItems.push(item);
      });
    });
  });
  const t = sumNutrients(allItems);
  const TARGET = { kcal:2150, prot:75, carb:240, fat:99, k:2500, ph:1000 };

  return (
    <div style={{
      background:"linear-gradient(135deg, #1a1a2e, #16213e)", color:"#fff",
      borderRadius:14, padding:20, margin:"20px 0"
    }}>
      <h3 style={{ margin:"0 0 14px 0", fontSize:17, fontWeight:700, letterSpacing:0.5 }}>
        📋 BILAN JOURNALIER — Cible : {TARGET.kcal} kcal (déficit 10%)
      </h3>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:10, marginBottom:12 }}>
        {[
          { label:"Calories", val:t.kcal, target:TARGET.kcal, unit:"kcal", emoji:"🔥" },
          { label:"Protéines", val:t.prot, target:TARGET.prot, unit:"g", emoji:"🥩" },
          { label:"Glucides", val:t.carb, target:TARGET.carb, unit:"g", emoji:"🌾" },
          { label:"Lipides", val:t.fat, target:TARGET.fat, unit:"g", emoji:"🫒" },
          { label:"Potassium", val:t.k, target:TARGET.k, unit:"mg", emoji:"⚡" },
          { label:"Phosphore", val:t.ph, target:TARGET.ph, unit:"mg", emoji:"🦴" },
        ].map(m => {
          const pct = m.target ? Math.round((m.val/m.target)*100) : 0;
          const over = pct > 110;
          return (
            <div key={m.label} style={{
              background: over ? "rgba(231,76,60,0.2)" : "rgba(255,255,255,0.08)",
              border: over ? "1px solid rgba(231,76,60,0.5)" : "1px solid rgba(255,255,255,0.1)",
              borderRadius:10, padding:12, textAlign:"center"
            }}>
              <div style={{ fontSize:11, opacity:0.7 }}>{m.emoji} {m.label}</div>
              <div style={{ fontSize:22, fontWeight:800 }}>{m.val}</div>
              <div style={{ fontSize:11, opacity:0.6 }}>/ {m.target} {m.unit} ({pct}%)</div>
              <div style={{
                height:4, background:"rgba(255,255,255,0.15)", borderRadius:2, marginTop:6, overflow:"hidden"
              }}>
                <div style={{
                  height:"100%", width:`${Math.min(pct,100)}%`,
                  background: over ? "#E74C3C" : pct > 80 ? "#27AE60" : "#F39C12",
                  borderRadius:2, transition:"width 0.3s"
                }}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function NutritionPlanner() {
  const [activeMeal, setActiveMeal] = useState("breakfast");
  const [selections, setSelections] = useState(() => {
    const s = {};
    MEALS.forEach(m => { s[m.id] = { proteins:[], carbs:[], fats:[], veggies:[] }; });
    return s;
  });
  const [showRules, setShowRules] = useState(false);

  const handleToggle = (mealId, catKey, itemId, maxPicks) => {
    setSelections(prev => {
      const cur = [...(prev[mealId][catKey] || [])];
      const idx = cur.indexOf(itemId);
      if (idx >= 0) {
        cur.splice(idx, 1);
      } else {
        if (cur.length >= maxPicks) {
          if (maxPicks === 1) { cur[0] = itemId; }
          else return prev;
        } else {
          cur.push(itemId);
        }
      }
      return { ...prev, [mealId]: { ...prev[mealId], [catKey]: cur } };
    });
  };

  const usedIds = useMemo(() => {
    const used = {};
    MEALS.forEach(m => {
      ["proteins","carbs","fats","veggies"].forEach(cat => {
        (selections[m.id]?.[cat] || []).forEach(id => {
          if (!used[id]) used[id] = [];
          used[id].push(m.label);
        });
      });
    });
    return used;
  }, [selections]);

  const duplicates = useMemo(() => {
    return Object.entries(usedIds).filter(([,meals]) => meals.length > 1);
  }, [usedIds]);

  const meal = MEALS.find(m => m.id === activeMeal);

  return (
    <div style={{
      fontFamily:"'Segoe UI', system-ui, -apple-system, sans-serif",
      background:"#FAF9F6", minHeight:"100vh", color:"#2D3436"
    }}>
      {/* Header */}
      <div style={{
        background:"linear-gradient(135deg, #2D4739 0%, #1B6B3A 50%, #2D7D46 100%)",
        color:"#fff", padding:"24px 20px 16px", position:"relative", overflow:"hidden"
      }}>
        <div style={{ position:"absolute", top:-20, right:-20, fontSize:120, opacity:0.06 }}>🩺</div>
        <h1 style={{ margin:0, fontSize:20, fontWeight:800, letterSpacing:0.5 }}>
          DR. NUTRITIA — Plan Nutritionnel Personnalisé
        </h1>
        <p style={{ margin:"4px 0 0", fontSize:12, opacity:0.85 }}>
          Greffé rénal · Résistant à l'insuline · Low-FODMAP · 2 150 kcal/jour
        </p>
        <div style={{
          display:"flex", flexWrap:"wrap", gap:6, marginTop:10
        }}>
          {[
            "🚫 Pamplemousse", "🚫 Alcool", "🚫 Industriel",
            "⬇️ K < 2500mg/j", "⬇️ P < 1000mg/j", "⬇️ IG bas"
          ].map(tag => (
            <span key={tag} style={{
              background:"rgba(255,255,255,0.15)", padding:"2px 8px",
              borderRadius:6, fontSize:11, whiteSpace:"nowrap"
            }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Rules toggle */}
      <div style={{ padding:"10px 16px 0" }}>
        <button
          onClick={() => setShowRules(!showRules)}
          style={{
            background:"#FFF3CD", border:"1px solid #FFD93D", borderRadius:8,
            padding:"8px 14px", fontSize:13, cursor:"pointer", width:"100%",
            textAlign:"left", fontWeight:600, color:"#856404"
          }}
        >
          {showRules ? "▼" : "▶"} Règles d'utilisation & planning médicaments
        </button>
        {showRules && (
          <div style={{
            background:"#FFF", border:"1px solid #E8E5E0", borderRadius:8,
            padding:14, marginTop:8, fontSize:13, lineHeight:1.7
          }}>
            <p style={{ margin:"0 0 8px", fontWeight:700 }}>📐 Comment utiliser ce tableau :</p>
            <p style={{ margin:"0 0 4px" }}>1. Pour chaque repas, sélectionnez le nombre d'aliments indiqué dans chaque catégorie.</p>
            <p style={{ margin:"0 0 4px" }}>2. <strong>Règle de non-répétition :</strong> si vous choisissez un aliment à un repas, ne le reprenez pas à un autre. Les doublons s'affichent en orange.</p>
            <p style={{ margin:"0 0 4px" }}>3. Ajustez pour que le bilan journalier reste proche des cibles (barres vertes).</p>
            <p style={{ margin:"0 0 12px" }}>4. Toutes les viandes/poissons doivent être cuits ≥ 74°C (sécurité immunodéprimé).</p>
            <p style={{ margin:"0 0 8px", fontWeight:700 }}>⏰ Planning médicaments :</p>
            <p style={{ margin:"0 0 3px" }}>• <strong>6h00</strong> — L-Thyroxine 150μg (à jeun, eau seule)</p>
            <p style={{ margin:"0 0 3px" }}>• <strong>7h00</strong> — Petit-déjeuner + médicaments du matin</p>
            <p style={{ margin:"0 0 3px" }}>• <strong>10h30</strong> — CaCO₃ 1g + D-Cure (avec collation grasse — ≥4h après L-Thyroxine)</p>
            <p style={{ margin:"0 0 3px" }}>• <strong>12h15</strong> — Zanidip 20mg (15 min AVANT le déjeuner)</p>
            <p style={{ margin:"0 0 3px" }}>• <strong>12h30</strong> — Déjeuner + Moxonidine</p>
            <p style={{ margin:"0 0 3px" }}>• <strong>19h00</strong> — Dîner + CellCept + Metformine</p>
            <p style={{ margin:0 }}>• <strong>21h00</strong> — Collation + Atozet, Mirtazapine, Citalopram, Tramadol</p>
          </div>
        )}
      </div>

      {/* Duplicates warning */}
      {duplicates.length > 0 && (
        <div style={{
          margin:"10px 16px 0", background:"#FFF0E0", border:"1px solid #F0AD4E",
          borderRadius:8, padding:"8px 12px", fontSize:12, color:"#8a6d3b"
        }}>
          ⚠️ <strong>Aliment(s) en double :</strong>{" "}
          {duplicates.map(([id, meals]) => {
            const name = [...PROTEINS,...CARBS,...FATS,...VEGGIES].find(i=>i.id===id)?.name;
            return `${name} (${meals.join(" + ")})`;
          }).join(" · ")}
        </div>
      )}

      {/* Daily Summary */}
      <div style={{ padding:"0 16px" }}>
        <DailySummary selections={selections} />
      </div>

      {/* Meal Tabs */}
      <div style={{
        display:"flex", gap:4, padding:"0 16px", overflowX:"auto",
        WebkitOverflowScrolling:"touch", msOverflowStyle:"none"
      }}>
        {MEALS.map(m => {
          const active = m.id === activeMeal;
          return (
            <button key={m.id} onClick={() => setActiveMeal(m.id)} style={{
              padding:"10px 14px", border:"none", cursor:"pointer",
              borderRadius:"10px 10px 0 0", fontSize:13, fontWeight: active?700:400,
              background: active ? "#fff" : "#E8E5E0", color: active ? "#2D4739" : "#666",
              whiteSpace:"nowrap", transition:"all 0.15s", flexShrink:0,
              boxShadow: active ? "0 -2px 8px rgba(0,0,0,0.08)" : "none"
            }}>
              {m.icon} {m.label}
            </button>
          );
        })}
      </div>

      {/* Active Meal Content */}
      <div style={{
        background:"#fff", margin:"0 16px 20px", borderRadius:"0 10px 10px 10px",
        padding:16, boxShadow:"0 2px 12px rgba(0,0,0,0.06)"
      }}>
        {/* Meal header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
          <div>
            <h2 style={{ margin:0, fontSize:18, color:"#2D4739" }}>
              {meal.icon} {meal.label}
            </h2>
            <span style={{ fontSize:12, color:"#888" }}>⏰ {meal.time}</span>
          </div>
          <span style={{
            background:"#2D4739", color:"#fff", padding:"4px 12px",
            borderRadius:20, fontSize:13, fontWeight:700
          }}>
            Cible : {meal.targetKcal} kcal
          </span>
        </div>

        {/* Meds reminder */}
        {meal.meds && (
          <div style={{
            background:"#F0F7FF", border:"1px solid #B3D4FC", borderRadius:8,
            padding:"6px 12px", fontSize:12, color:"#31587A", marginBottom:8
          }}>
            {meal.meds}
          </div>
        )}
        {meal.note && (
          <div style={{
            background:"#FFF8E7", border:"1px solid #FFE69C", borderRadius:8,
            padding:"6px 12px", fontSize:12, color:"#856404", marginBottom:12
          }}>
            {meal.note}
          </div>
        )}

        {/* Selection rules summary */}
        <div style={{
          display:"flex", flexWrap:"wrap", gap:6, marginBottom:16, padding:"8px 0",
          borderBottom:"1px solid #E8E5E0"
        }}>
          {Object.entries(meal.rules).filter(([,v]) => v > 0).map(([cat, num]) => (
            <span key={cat} style={{
              background: CAT_META[cat].bg, border:`1px solid ${CAT_META[cat].color}33`,
              color: CAT_META[cat].color, padding:"4px 10px", borderRadius:6,
              fontSize:12, fontWeight:600
            }}>
              {CAT_META[cat].icon} {CAT_META[cat].label} : {num} choix
            </span>
          ))}
        </div>

        {/* Category Tables */}
        {["proteins","carbs","fats","veggies"].map(catKey => (
          <CategoryTable
            key={catKey}
            catKey={catKey}
            meal={meal}
            selections={selections}
            onToggle={handleToggle}
          />
        ))}

        {/* Meal Summary */}
        <MealSummary meal={meal} selections={selections} />
      </div>

      {/* Footer */}
      <div style={{
        padding:"12px 16px 30px", textAlign:"center", fontSize:11, color:"#999", lineHeight:1.6
      }}>
        <p style={{ margin:0 }}>
          ⚠️ <strong>Avertissement médical :</strong> Ce plan est un outil d'aide. Il ne remplace pas le suivi par votre néphrologue et diététicien(ne).
          Tout changement alimentaire significatif doit être validé par votre équipe médicale.
        </p>
        <p style={{ margin:"6px 0 0", opacity:0.7 }}>
          Sources : KDOQI 2020 · KDIGO 2024 · Monash University FODMAP · USDA FoodData Central · RCP EMA
        </p>
      </div>
    </div>
  );
}
