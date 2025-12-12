\# Sentinel WAF



!\[Version](https://img.shields.io/badge/version-1.0.0-blue.svg)

!\[License](https://img.shields.io/badge/license-MIT-green.svg)

!\[Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)



Web uygulamalarını yaygın siber saldırılara karşı korumak için tasarlanmış, Node.js tabanlı, hafif ve özelleştirilebilir bir Web Uygulama Güvenlik Duvarıdır (WAF).



\## 🛡️ Özellikler



\- \*\*OWASP Top 10 Koruması\*\*: SQL Injection, XSS, Path Traversal ve diğer yaygın saldırılara karşı koruma

\- \*\*Gerçek Zamanlı Trafik Analizi\*\*: Tüm HTTP isteklerini anlık olarak izleme ve engelleme

\- \*\*Özelleştirilebilir Kural Setleri\*\*: Regex tabanlı esnek kural yapılandırması

\- \*\*IP Yönetimi\*\*: Kara liste (blacklist) ve beyaz liste (whitelist) desteği

\- \*\*Düşük Gecikme\*\*: Yüksek performanslı middleware mimarisi

\- \*\*Detaylı Loglama\*\*: Gerçek zamanlı log izleme ve analiz

\- \*\*Modern Dashboard\*\*: React tabanlı görsel yönetim arayüzü

\- \*\*Kolay Entegrasyon\*\*: Express.js middleware olarak çalışır



\## 📊 Dashboard Özellikleri



\- \*\*Canlı Trafik İzleme\*\*: Gerçek zamanlı request/response monitoring

\- \*\*İstatistikler\*\*: Total request, engellenen tehditler, ortalama latency

\- \*\*Görselleştirme\*\*: Trafik grafikleri ve saldırı dağılım analizleri

\- \*\*Kural Yönetimi\*\*: WAF kurallarını dinamik olarak ekleme/düzenleme/silme

\- \*\*IP Kontrolü\*\*: Blacklist/whitelist yönetimi



\## 🚀 Kurulum



```bash

\# Repository'yi klonlayın

git clone https://github.com/byghost/sentinel-waf.git



\# Dizine girin

cd sentinel-waf



\# Bağımlılıkları yükleyin

npm install



\# Geliştirme modunda başlatın

npm run dev



\# Production build

npm run build

npm start

```



\## 💻 Kullanım



\### Express.js ile Temel Entegrasyon



```javascript

const express = require('express');

const sentinelWAF = require('./sentinel-waf');



const app = express();



// WAF middleware'ini ekleyin

app.use(sentinelWAF({

&nbsp; ipBlacklist: \['192.168.1.100', '10.0.0.50'],

&nbsp; ipWhitelist: \['127.0.0.1'],

&nbsp; customRules: \[

&nbsp;   {

&nbsp;     name: 'SQL Injection',

&nbsp;     pattern: /(\\bUNION\\b|\\bSELECT\\b.\*\\bFROM\\b)/i,

&nbsp;     action: 'BLOCK'

&nbsp;   }

&nbsp; ]

}));



// Routes

app.get('/', (req, res) => {

&nbsp; res.send('Korumalı uygulama');

});



app.listen(3000);

```



\### Dashboard'a Erişim



```bash

\# Development server başlatın

npm run dev



\# Tarayıcıda açın

http://localhost:5173

```



\## 🔧 Yapılandırma



\### Kural Tipleri



| Action | Açıklama |

|--------|----------|

| `BLOCK` | İsteği engeller ve 403 döner |

| `FLAG` | İsteği işaretler ancak geçişine izin verir |

| `ALLOW` | İsteğe açıkça izin verir |



\### Örnek Kurallar



```javascript

const rules = \[

&nbsp; {

&nbsp;   name: 'SQL Injection Defense',

&nbsp;   pattern: /(union|select|insert|update|delete|drop|create|alter)/i,

&nbsp;   action: 'BLOCK',

&nbsp;   description: 'SQL komutlarını engeller'

&nbsp; },

&nbsp; {

&nbsp;   name: 'XSS Prevention',

&nbsp;   pattern: /(<script|javascript:|onerror=|onload=)/i,

&nbsp;   action: 'BLOCK',

&nbsp;   description: 'XSS saldırılarını engeller'

&nbsp; },

&nbsp; {

&nbsp;   name: 'Path Traversal',

&nbsp;   pattern: /(\\.\\.\\/|\\.\\.\\\\)/,

&nbsp;   action: 'BLOCK',

&nbsp;   description: 'Dizin geçişi girişimlerini engeller'

&nbsp; }

];

```



\## 📁 Proje Yapısı



```

sentinel-waf/

├── src/

│   ├── components/

│   │   ├── Dashboard.tsx      # Ana dashboard

│   │   ├── LiveLogs.tsx       # Canlı log viewer

│   │   ├── Rules.tsx          # Kural yönetimi

│   │   ├── IPControl.tsx      # IP whitelist/blacklist

│   │   └── Readme.tsx         # Proje bilgisi

│   ├── types/

│   │   └── index.ts           # TypeScript tanımları

│   ├── App.tsx                # Ana uygulama

│   └── index.tsx              # Entry point

├── middleware/

│   └── waf.js                 # WAF middleware

├── package.json

└── README.md

```



\## 🔒 Güvenlik Özellikleri



\### Desteklenen Saldırı Tipleri



\- ✅ SQL Injection (SQLi)

\- ✅ Cross-Site Scripting (XSS)

\- ✅ Path Traversal / Directory Traversal

\- ✅ Command Injection

\- ✅ Remote Code Execution (RCE)

\- ✅ Server-Side Request Forgery (SSRF)

\- ✅ XML External Entity (XXE)

\- ✅ Local File Inclusion (LFI)



\### Rate Limiting



```javascript

// DDoS koruması

app.use(sentinelWAF({

&nbsp; rateLimit: {

&nbsp;   windowMs: 15 \* 60 \* 1000, // 15 dakika

&nbsp;   max: 100 // maksimum 100 istek

&nbsp; }

}));

```



\## 📊 Performans



\- \*\*Ortalama Latency\*\*: ~2-5ms

\- \*\*Throughput\*\*: 10,000+ requests/saniye

\- \*\*Memory Usage\*\*: ~50MB

\- \*\*CPU Impact\*\*: Minimal (<5%)



\## 🛠️ Geliştirme



```bash

\# Dev server

npm run dev



\# Type checking

npm run type-check



\# Linting

npm run lint



\# Test

npm run test

```



\## 📝 API Referansı



\### Middleware Seçenekleri



```typescript

interface WAFOptions {

&nbsp; ipBlacklist?: string\[];

&nbsp; ipWhitelist?: string\[];

&nbsp; customRules?: Rule\[];

&nbsp; logLevel?: 'debug' | 'info' | 'warn' | 'error';

&nbsp; enableLogging?: boolean;

&nbsp; rateLimit?: {

&nbsp;   windowMs: number;

&nbsp;   max: number;

&nbsp; };

}

```



\## 🤝 Katkıda Bulunma



1\. Fork edin

2\. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)

3\. Commit edin (`git commit -m 'Add amazing feature'`)

4\. Push edin (`git push origin feature/amazing-feature`)

5\. Pull Request açın



\## 📄 Lisans



Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için \[LICENSE](LICENSE) dosyasına bakın.



\## 👨‍💻 Geliştirici



\*\*ByGhost\*\*

\- Website: \[byghost.tr](https://byghost.tr)

\- GitHub: \[@byghost](http://github.com/ByGh00st/)



\## 🙏 Teşekkürler



\- \[OWASP](https://owasp.org/) - Güvenlik standartları için

\- \[Express.js](https://expressjs.com/) - Framework

\- \[React](https://react.dev/) - UI framework

\- \[Recharts](https://recharts.org/) - Veri görselleştirme



\## 📮 İletişim



Sorularınız veya önerileriniz için:

\- Issue açın: \[GitHub Issues](http://github.com/ByGh00st//sentinel-waf/issues)

\- Email: bygh0st@proton.me



---



⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

