# Stock Monitor Pro - v7

A full-featured personal stock monitoring dashboard for Mag 7 stocks (AAPL, GOOGL, TSLA, MSFT, NVDA, AMZN).

## Features

| Feature | Details |
|---|---|
| Live prices | Yahoo Finance API - auto-refresh every 5 min |
| Detail pages | Separate page per stock with full chart, AI analysis, news |
| Apify news scraping | Yahoo Finance, X/Twitter posts, CNBC |
| LM Studio AI chat | Qwen2.5 7B Instruct - local inference at 127.0.0.1:1234 |
| EmailJS alerts | service_3rss6un to saisantoshkumar29@gmail.com |
| Portfolio tracker | P&L, allocation pie chart |
| Technical signals | RSI, MA5/MA20, 20-day forecast, sentiment |

## File Structure

stock-monitor-pro/
- index.html (Main dashboard)
- css/style.css (All styling)
- js/data.js (Stock data, prices, news)
- js/signals.js (RSI, MA, technical analysis)
- js/email.js (EmailJS integration)
- js/apify.js (Apify live news scraper)
- js/lmstudio.js (LM Studio AI chat)
- js/app.js (Main UI, navigation, alerts)
- pages/aapl.html (Apple detail view)
- pages/googl.html (Google detail view)
- pages/tsla.html (Tesla detail view)
- pages/msft.html (Microsoft detail view)
- pages/nvda.html (NVIDIA detail view)
- pages/amzn.html (Amazon detail view)

## Setup

### EmailJS (configured)
- Service ID: service_3rss6un
- Template: template_oqicjpe

### LM Studio AI
1. Install LM Studio at lmstudio.ai
2. Load model: qwen2.5-7b-instruct
3. Start server - Status: Running (port 1234)
4. API token: sk-lm-s638fAhx:6OJ4Ll16GiRG6m3K9ptk

### Apify news
Go to Settings tab, enter your Apify token, click Save.
Then go to News tab and click Scrape Apify.

Built by Sai Santosh Kumar Devarasetty | SAP ABAP Consultant | AI/ML Engineer
