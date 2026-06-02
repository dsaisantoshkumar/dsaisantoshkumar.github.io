/* ============================================
   data.js - Stock data, prices, news - v7
   News uses dynamic timestamps (last 24hr / 3hr)
   ============================================ */
const EMAILJS_PUB='fof2kfSPzOm-gRMrI',SVC='service_yxemoqc',TPL='template_oqicjpe';
const LM_BASE='http://127.0.0.1:1234',LM_TOKEN='sk-lm-s638fAhx:6OJ4Ll16GiRG6m3K9ptk',LM_MODEL='qwen2.5-7b-instruct';
const STOCKS={AAPL:{name:'Apple Inc.',color:'#378add'},GOOGL:{name:'Alphabet',color:'#1d9e75'},TSLA:{name:'Tesla Inc.',color:'#d84a30'},MSFT:{name:'Microsoft Corp.',color:'#534ab7'},NVDA:{name:'NVIDIA Corp.',color:'#ef9f27'},AMZN:{name:'Amazon.com',color:'#185fa5'}};
const TODAY={AAPL:{price:212.30,prev:208.10,change:4.20,pct:2.02,target:260,rating:'Buy'},GOOGL:{price:185.50,prev:181.20,change:4.30,pct:2.37,target:210,rating:'Strong Buy'},TSLA:{price:268.40,prev:258.90,change:9.50,pct:3.67,target:320,rating:'Hold'},MSFT:{price:460.10,prev:452.00,change:8.10,pct:1.79,target:510,rating:'Buy'},NVDA:{price:136.80,prev:131.50,change:5.30,pct:4.03,target:165,rating:'Strong Buy'},AMZN:{price:202.60,prev:196.40,change:6.20,pct:3.16,target:235,rating:'Buy'}};


function _tsDate(msAgo){const d=new Date(Date.now()-msAgo);return d.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true})+' - '+d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});}


let NEWS={
  MARKET:[
    {h:"S&P 500 gains 1.8% as tech leads rally on strong jobs report",s:0.82,l:'Bullish',src:'Reuters',stock:'ALL',ts:Date.now()-45*60000},
    {h:"Fed signals rate pause - risk assets rally globally",s:0.75,l:'Bullish',src:'Bloomberg',stock:'ALL',ts:Date.now()-2*3600000},
    {h:"Mag 7 stocks surge 2-4% as AI infrastructure spend raised to $800B",s:0.88,l:'Bullish',src:'CNBC',stock:'ALL',ts:Date.now()-3*3600000},
    {h:"US 10-year yield falls to 4.2% - positive for tech valuations",s:0.65,l:'Bullish',src:'WSJ',stock:'ALL',ts:Date.now()-5*3600000},
    {h:"Goldman raises S&P 500 target to 5,800 on AI productivity gains",s:0.78,l:'Bullish',src:'Goldman Sachs',stock:'ALL',ts:Date.now()-12*3600000},
    {h:"China PMI disappoints - headwind for global tech supply chains",s:-0.45,l:'Bearish',src:'Reuters',stock:'ALL',ts:Date.now()-18*3600000}
  ],
  AAPL:[
    {h:"Apple WWDC 2026: iOS 20 with AI-native Siri 2.0 unveiled",s:0.90,l:'Bullish',src:'9to5Mac',stock:'AAPL',ts:Date.now()-30*60000},
    {h:"Wedbush raises AAPL target to $270 citing iPhone 17 AI supercycle",s:0.82,l:'Bullish',src:'Wedbush',stock:'AAPL',ts:Date.now()-2*3600000},
    {h:"Apple Vision Pro 2 leaks: 40% lighter design, improved eye tracking",s:0.75,l:'Bullish',src:'MacRumors',stock:'AAPL',ts:Date.now()-4*3600000},
    {h:"Apple Services hits record $28B quarterly - beats by 8%",s:0.88,l:'Bullish',src:'Apple IR',stock:'AAPL',ts:Date.now()-8*3600000},
    {h:"EU Digital Markets Act costs Apple $2.4B in European revenue",s:-0.55,l:'Bearish',src:'FT',stock:'AAPL',ts:Date.now()-16*3600000}
  ],
  GOOGL:[
    {h:"Gemini Ultra 2.0 launched - beats GPT-5 on all benchmarks",s:0.92,l:'Bullish',src:'TechCrunch',stock:'GOOGL',ts:Date.now()-20*60000},
    {h:"Alphabet Q1: YouTube ad revenue up 22% YoY to $11.2B",s:0.85,l:'Bullish',src:'Alphabet IR',stock:'GOOGL',ts:Date.now()-1*3600000},
    {h:"Google Cloud grows 28% - narrowing gap with AWS and Azure",s:0.80,l:'Bullish',src:'CNBC',stock:'GOOGL',ts:Date.now()-5*3600000},
    {h:"DOJ antitrust remedy could force Google to divest Chrome",s:-0.70,l:'Bearish',src:'Reuters',stock:'GOOGL',ts:Date.now()-14*3600000}
  ],
  TSLA:[
    {h:"Tesla Robotaxi Austin launch confirmed June 15 - 500 vehicles",s:0.92,l:'Bullish',src:'Reuters',stock:'TSLA',ts:Date.now()-15*60000},
    {h:"Tesla FSD v14.0 achieves 97.8% autonomy score in safety audit",s:0.88,l:'Bullish',src:'TechCrunch',stock:'TSLA',ts:Date.now()-3*3600000},
