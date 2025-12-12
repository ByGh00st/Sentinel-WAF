# Sentinel WAF

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)

Node.js tabanlı, hafif, yüksek performanslı ve tamamen özelleştirilebilir bir Web Uygulama Güvenlik Duvarı (WAF). Sentinel WAF, modern web uygulamalarını yaygın saldırı vektörlerine karşı korumak üzere tasarlanmıştır.

## Özellikler

* **OWASP Top 10 Koruması**: SQL Injection, XSS, Path Traversal ve diğer yaygın güvenlik açıklarına karşı koruma
* **Gerçek Zamanlı Trafik Analizi**: HTTP isteklerini anlık olarak izleme ve engelleme
* **Esnek Kural Motoru**: Regex tabanlı özelleştirilebilir kurallar
* **IP Yönetimi**: Kara liste ve beyaz liste desteği
* **Düşük Gecikme**: Optimize edilmiş middleware mimarisi
* **Gelişmiş Loglama**: Gerçek zamanlı log takibi ve analiz yetenekleri
* **Modern Dashboard**: React tabanlı yönetim arayüzü
* **Kolay Entegrasyon**: Express.js ile doğrudan kullanılabilir

## Dashboard Özellikleri

* **Canlı Trafik İzleme**: Gerçek zamanlı request/response takibi
* **İstatistiksel Analiz**: Toplam istek, engellenen tehditler, ortalama gecikme
* **Veri Görselleştirme**: Trafik grafikleri ve saldırı dağılımı
* **Kural Yönetimi**: Kuralların dinamik olarak eklenmesi, düzenlenmesi ve silinmesi
* **IP Yönetimi**: Blacklist ve whitelist kontrolü

## Kurulum

```bash
# Repository'yi klonlayın
git clone https://github.com/byghost/sentinel-waf.git

# Dizine girin
cd sentinel-waf

# Bağımlılıkları yükleyin
npm install

# Geliştirme ortamı
npm run dev

# Production build
npm run build
npm start
```

## Kullanım

### Express.js ile Temel Entegrasyon

```javascript
const express = require('express');
const sentinelWAF = require('./sentinel-waf');

const app = express();

app.use(sentinelWAF({
  ipBlacklist: ['192.168.1.100', '10.0.0.50'],
  ipWhitelist: ['127.0.0.1'],
  customRules: [
    {
      name: 'SQL Injection',
      pattern: /(\\bUNION\\b|\\bSELECT\\b.*\\bFROM\\b)/i,
      action: 'BLOCK'
    }
  ]
}));

app.get('/', (req, res) => {
  res.send('Korumalı uygulama');
});

app.listen(3000);
```

### Dashboard Erişimi

```bash
npm run dev

# Tarayıcı
http://localhost:5173
```

## Yapılandırma

### Kural Tipleri

| Action  | Açıklama                            |
| ------- | ----------------------------------- |
| `BLOCK` | İsteği engeller ve 403 döner        |
| `FLAG`  | İsteği işaretler, işleme devam eder |
| `ALLOW` | İsteğe açıkça izin verir            |

### Örnek Kurallar

```javascript
const rules = [
  {
    name: 'SQL Injection Defense',
    pattern: /(union|select|insert|update|delete|drop|create|alter)/i,
    action: 'BLOCK',
    description: 'SQL komutlarını engeller'
  },
  {
    name: 'XSS Prevention',
    pattern: /(<script|javascript:|onerror=|onload=)/i,
    action: 'BLOCK',
    description: 'XSS saldırılarını engeller'
  },
  {
    name: 'Path Traversal',
    pattern: /(\.\.\/|\.\.\\)/,
    action: 'BLOCK',
    description: 'Dizin geçişi girişimlerini engeller'
  }
];
```

## Proje Yapısı

```
sentinel-waf/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── LiveLogs.tsx
│   │   ├── Rules.tsx
│   │   ├── IPControl.tsx
│   │   └── Readme.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── index.tsx
├── middleware/
│   └── waf.js
├── package.json
└── README.md
```

## Güvenlik Kapsamı

Desteklenen saldırı tipleri:

* SQL Injection (SQLi)
* Cross-Site Scripting (XSS)
* Path Traversal / Directory Traversal
* Command Injection
* Remote Code Execution (RCE)
* Server-Side Request Forgery (SSRF)
* XML External Entity (XXE)
* Local File Inclusion (LFI)

### Rate Limiting

```javascript
app.use(sentinelWAF({
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100
  }
}));
```

## Performans

* **Ortalama Gecikme**: 2–5 ms
* **Throughput**: 10.000+ istek/saniye
* **Bellek Kullanımı**: ~50 MB
* **CPU Kullanımı**: <%5

## Geliştirme

```bash
npm run dev
npm run type-check
npm run lint
npm run test
```

## API Referansı

```typescript
interface WAFOptions {
  ipBlacklist?: string[];
  ipWhitelist?: string[];
  customRules?: Rule[];
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  enableLogging?: boolean;
  rateLimit?: {
    windowMs: number;
    max: number;
  };
}
```

## Katkıda Bulunma

1. Fork oluşturun
2. Branch açın (`git checkout -b feature/new-feature`)
3. Commit oluşturun
4. Push edin
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında sunulmaktadır. Ayrıntılar için `LICENSE` dosyasına bakabilirsiniz.

## Geliştirici

**ByGhost**

* Website: [https://byghost.tr](https://byghost.tr)
* GitHub: [https://github.com/ByGh00st](https://github.com/ByGh00st)

## Teşekkürler

* OWASP
* Express.js
* React
* Recharts

## İletişim

* GitHub Issues: [https://github.com/ByGh00st/sentinel-waf/issues](https://github.com/ByGh00st/sentinel-waf/issues)
* Email: [bygh0st@proton.me](mailto:bygh0st@proton.me)

---

Projeyi faydalı bulduysanız yıldız vermeyi değerlendirebilirsiniz.
