/* ============================================
   data.js - Stock data, prices, news - v7
   Prices updated: June 2, 2026 (live market data)
   News uses dynamic timestamps (last 24hr / 3hr)
   ============================================ */
const EMAILJS_PUB='fof2kfSPzOm-gRMrI',SVC='service_yxemoqc',TPL='template_oqicjpe';
const LM_BASE='http://127.0.0.1:1234',LM_TOKEN='sk-lm-s638fAhx:6OJ4Ll16GiRG6m3K9ptk',LM_MODEL='qwen2.5-7b-instruct';
const STOCKS={AAPL:{name:'Apple Inc.',color:'#378add'},GOOGL:{name:'Alphabet',color:'#1d9e75'},TSLA:{name:'Tesla Inc.',color:'#d84a30'},MSFT:{name:'Microsoft Corp.',color:'#534ab7'},NVDA:{name:'NVIDIA Corp.',color:'#ef9f27'},AMZN:{name:'Amazon.com',color:'#185fa5'}};

/* ── LIVE PRICES: June 2, 2026 ── */
const TODAY={
  AAPL:{price:314.70,prev:305.34,change:9.36,pct:3.07,target:380,rating:'Buy',high:315.45,low:305.34,sentiment:0.78,sentLabel:'Positive'},
  GOOGL:{price:364.03,prev:358.44,change:5.59,pct:1.56,target:430,rating:'Strong Buy',high:373.54,low:358.44,sentiment:0.85,sentLabel:'Bullish'},
  TSLA:{price:423.96,prev:415.88,change:8.08,pct:1.94,target:500,rating:'Hold',high:431.20,low:412.50,sentiment:0.62,sentLabel:'Positive'},
  MSFT:{price:452.39,prev:450.24,change:2.15,pct:0.48,target:540,rating:'Strong Buy',high:472.03,low:450.24,sentiment:0.88,sentLabel:'Bullish'},
  NVDA:{price:222.68,prev:221.00,change:1.68,pct:0.76,target:280,rating:'Strong Buy',high:226.50,low:218.90,sentiment:0.92,sentLabel:'Bullish'},
  AMZN:{price:256.47,prev:261.26,change:-4.79,pct:-1.83,target:310,rating:'Buy',high:263.40,low:253.10,sentiment:0.72,sentLabel:'Positive'}
};

function _tsDate(msAgo){const d=new Date(Date.now()-msAgo);return d.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true})+' - '+d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});}

let NEWS={
  MARKET:[
    {h:"S&P 500 gains 0.8% as tech leads rally; MSFT builds on dev conference momentum",s:0.72,l:'Bullish',src:'Reuters',stock:'ALL',ts:Date.now()-30*60000},
    {h:"Fed minutes confirm rate pause - markets welcome dovish tone",s:0.70,l:'Bullish',src:'Bloomberg',stock:'ALL',ts:Date.now()-2*3600000},
    {h:"Mag 7 mixed session: AAPL, GOOGL, TSLA gain; MSFT, NVDA slip on profit-taking",s:0.40,l:'Neutral',src:'CNBC',stock:'ALL',ts:Date.now()-3*3600000},
    {h:"US 10-year yield holds at 4.3% - tech valuations remain supported",s:0.60,l:'Bullish',src:'WSJ',stock:'ALL',ts:Date.now()-5*3600000},
    {h:"Goldman Sachs reiterates S&P 500 year-end target of 5,800 on AI earnings strength",s:0.75,l:'Bullish',src:'Goldman Sachs',stock:'ALL',ts:Date.now()-10*3600000},
    {h:"OPEC+ production cuts support energy stocks while tech pulls back slightly",s:-0.20,l:'Neutral',src:'Reuters',stock:'ALL',ts:Date.now()-16*3600000}
  ],
  AAPL:[
    {h:"Apple WWDC 2026 countdown: iOS 20 with AI-native Siri 2.0 reveal expected June 8",s:0.90,l:'Bullish',src:'9to5Mac',stock:'AAPL',ts:Date.now()-20*60000},
    {h:"AAPL surges 3%+ as investors position ahead of WWDC developer conference",s:0.85,l:'Bullish',src:'MarketWatch',stock:'AAPL',ts:Date.now()-1*3600000},
    {h:"Wedbush raises AAPL price target to $380 citing iPhone 17 AI supercycle thesis",s:0.82,l:'Bullish',src:'Wedbush',stock:'AAPL',ts:Date.now()-3*3600000},
    {h:"Apple Vision Pro 2 leaks: 40% lighter design, spatial AI capabilities",s:0.75,l:'Bullish',src:'MacRumors',stock:'AAPL',ts:Date.now()-6*3600000},
    {h:"Walmart's OnePay doubles users in direct challenge to Apple Pay",s:-0.35,l:'Bearish',src:'24/7 Wall St.',stock:'AAPL',ts:Date.now()-8*3600000},
    {h:"Apple Services hits record $28B quarterly revenue - beats estimates by 8%",s:0.88,l:'Bullish',src:'Apple IR',stock:'AAPL',ts:Date.now()-20*3600000}
  ],
  GOOGL:[
    {h:"Alphabet raises $80B equity plan for AI and data center infrastructure expansion",s:0.78,l:'Bullish',src:'Bloomberg',stock:'GOOGL',ts:Date.now()-25*60000},
    {h:"GOOGL up 1.6% as investors cheer Google's Swedish data center groundbreaking",s:0.75,l:'Bullish',src:'Barron\'s',stock:'GOOGL',ts:Date.now()-1*3600000},
    {h:"Gemini Ultra 2.0 enterprise adoption accelerates - 200K+ business customers",s:0.85,l:'Bullish',src:'TechCrunch',stock:'GOOGL',ts:Date.now()-4*3600000},
    {h:"Alphabet Q1 2026: YouTube ad revenue up 22% YoY to $11.2B",s:0.82,l:'Bullish',src:'Alphabet IR',stock:'GOOGL',ts:Date.now()-8*3600000},
    {h:"DOJ antitrust remedy could force Google to divest Chrome browser unit",s:-0.70,l:'Bearish',src:'Reuters',stock:'GOOGL',ts:Date.now()-18*3600000}
  ],
  TSLA:[
    {h:"Tesla TSLA +1.9% as Austin Robotaxi commercial launch remains on track for June 15",s:0.88,l:'Bullish',src:'Reuters',stock:'TSLA',ts:Date.now()-15*60000},
    {h:"Tesla FSD v14.0 achieves 97.8% autonomy score in independent safety audit",s:0.85,l:'Bullish',src:'TechCrunch',stock:'TSLA',ts:Date.now()-2*3600000},
    {h:"Tesla Optimus robot production hits 1,200 units/week - beats Q2 target",s:0.82,l:'Bullish',src:'Tesla IR',stock:'TSLA',ts:Date.now()-5*3600000},
    {h:"Elon Musk sells $900M in TSLA shares - reduces stake to 11.8%",s:-0.60,l:'Bearish',src:'Bloomberg',stock:'TSLA',ts:Date.now()-9*3600000},
    {h:"BYD overtakes Tesla in global EV sales for 4th consecutive quarter",s:-0.55,l:'Bearish',src:'Reuters',stock:'TSLA',ts:Date.now()-22*3600000}
  ],
  MSFT:[
    {h:"Microsoft Build 2026 opens today - Satya Nadella to unveil next-gen Copilot AI tools",s:0.88,l:'Bullish',src:'Microsoft Blog',stock:'MSFT',ts:Date.now()-40*60000},
    {h:"MSFT -4.1% profit-taking after hitting $472 high; analysts say dip is buying opportunity",s:-0.30,l:'Bearish',src:'CNBC',stock:'MSFT',ts:Date.now()-2*3600000},
    {h:"Azure AI Foundry passes 220K enterprise customers - fastest product to $10B ARR ever",s:0.90,l:'Bullish',src:'Microsoft IR',stock:'MSFT',ts:Date.now()-5*3600000},
    {h:"Microsoft Surface Laptop Ultra launched with NVDA GPU - stock jumps on debut",s:0.80,l:'Bullish',src:'TipRanks',stock:'MSFT',ts:Date.now()-8*3600000},
    {h:"EU competition probe into Microsoft Teams bundling widens to cloud services",s:-0.45,l:'Bearish',src:'FT',stock:'MSFT',ts:Date.now()-18*3600000}
  ],
  NVDA:[
    {h:"NVIDIA eyes $500B PC GPU market with new consumer Blackwell chips - major expansion",s:0.90,l:'Bullish',src:'Motley Fool',stock:'NVDA',ts:Date.now()-10*60000},
    {h:"NVDA -0.7% on profit-taking despite strong fundamentals; Cathie Wood buys the dip",s:0.40,l:'Neutral',src:'ARK Invest',stock:'NVDA',ts:Date.now()-1*3600000},
    {h:"Blackwell B300 GPU achieves 3x H100 performance - hyperscaler orders surge",s:0.92,l:'Bullish',src:'AnandTech',stock:'NVDA',ts:Date.now()-4*3600000},
    {h:"Jensen Huang: NVDA data center revenue to hit $200B in FY2027 - raises guidance",s:0.88,l:'Bullish',src:'NVIDIA IR',stock:'NVDA',ts:Date.now()-7*3600000},
    {h:"AMD MI400 GPU challenges NVIDIA in inference workloads at 30% lower price",s:-0.40,l:'Bearish',src:"Tom's Hardware",stock:'NVDA',ts:Date.now()-20*3600000}
  ],
  AMZN:[
    {h:"AMZN -1.8% as broader tech sells off; AWS growth story intact say analysts",s:-0.25,l:'Neutral',src:'Bloomberg',stock:'AMZN',ts:Date.now()-35*60000},
    {h:"AWS revenue grows 32% YoY to $38B - AI services fastest growing segment",s:0.88,l:'Bullish',src:'Amazon IR',stock:'AMZN',ts:Date.now()-2*3600000},
    {h:"Amazon Bedrock reaches 110K active enterprise customers - up 10% month-over-month",s:0.82,l:'Bullish',src:'TechCrunch',stock:'AMZN',ts:Date.now()-5*3600000},
    {h:"Amazon Prime hits 255M global subscribers - advertising revenue up 21%",s:0.78,l:'Bullish',src:'WSJ',stock:'AMZN',ts:Date.now()-9*3600000},
    {h:"FTC antitrust scrutiny on Amazon marketplace seller practices intensifies",s:-0.50,l:'Bearish',src:'Reuters',stock:'AMZN',ts:Date.now()-22*3600000}
  ]
};

function refreshNewsTimestamps(){
  const now=Date.now();
  Object.values(NEWS).flat().forEach(n=>{
    if(!n.ts)return;
    const diffM=Math.floor((now-n.ts)/60000);
    const diffH=Math.floor(diffM/60);
    if(diffM<60) n.date=diffM+'m ago';
    else if(diffH<24) n.date=diffH+'h ago';
    else n.date=new Date(n.ts).toLocaleDateString('en-US',{month:'short',day:'numeric'});
  });
}
refreshNewsTimestamps();
setInterval(refreshNewsTimestamps,300000);

let cur='AAPL',tf='1D',priceChart=null,pieChart=null;
let alerts=JSON.parse(localStorage.getItem('smv7_al')||'[]');
let positions=JSON.parse(localStorage.getItem('smv7_pos')||'[]');
let logs=JSON.parse(localStorage.getItem('smv7_log')||'[]');
let settings=JSON.parse(localStorage.getItem('smv7_cfg')||'{"name":"Sai Santosh","email":"saisantoshkumar29@gmail.com"}');
let liveP={},history={},cooldowns={},aiHistory=[];
