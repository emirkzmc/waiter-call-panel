# 🍽️ Garson Çağrı Paneli

React, TypeScript ve Firebase ile geliştirilmiş modern, gerçek zamanlı restoran/kafe garson çağırma sistemi.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-12.7.0-FFCA28?logo=firebase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.18-06B6D4?logo=tailwindcss)

## 📋 Genel Bakış

Garson Çağrı Paneli, restoranlar ve kafeler için tasarlanmış iki arayüzlü bir uygulamadır:
- **Müşteri Arayüzü**: Müşterilerin garson çağırmasına, sipariş vermesine ve hesap istemesine olanak tanır.
- **Garson Paneli**: Personelin müşteri isteklerini gerçek zamanlı olarak görmesini, yönetmesini ve yanıtlamasını sağlar.

## ✨ Özellikler

### Müşteri Tarafı
- 🎯 **Masa Seçimi**: Kolay kullanımlı masa seçici
- 📞 **Çağrı İşlemleri**: 
  - Garson çağır
  - Sipariş ver
  - Hesap iste
- ✅ **Onay Sayfası**: İsteğin gönderildikten sonra görsel geri bildirim
- 🎨 **Glassmorphism Arayüz**: Kelly Slab fontu ile modern, estetik tasarım

### Garson Paneli
- 📊 **Gerçek Zamanlı Güncellemeler**: Firebase üzerinden canlı çağrı bildirimleri
- 🎛️ **Durum Yönetimi**: 
  - Bekleyen çağrıları kabul etme
  - Tamamlandı olarak işaretleme
  - İstekleri iptal etme
- 🗂️ **Masa Yönetimi**: Dinamik olarak masa ekleme/çıkarma
- 🎭 **Animasyonlu Geçişler**: Akıcı Framer Motion animasyonları
- 📱 **Responsive Tasarım**: Tüm ekran boyutlarında çalışır

## 🛠️ Teknolojiler

### Çekirdek
- **React 19.2** - UI kütüphanesi
- **TypeScript 5.9** - Tip güvenliği
- **Vite** - Derleme aracı & geliştirme sunucusu
- **React Router 7** - İstemci tarafı yönlendirme

### Tasarım
- **TailwindCSS 4.1** - Utility-firs CSS
- **Framer Motion 12** - Animasyon kütüphanesi
- **Özel Tasarım Sistemi** - Glassmorphism & solid varyantlar

### Backend
- **Firebase Realtime Database** - Gerçek zamanlı veri senkronizasyonu
- **Firebase SDK 12.7** - Backend servisleri

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── ui/                    # Yeniden kullanılabilir UI bileşenleri
│   │   ├── Button.tsx         # Çok varyantlı buton (glassmorphism, primary, success, danger)
│   │   ├── TableLayout.tsx    # Birleştirilebilir tablo düzen sistemi
│   │   └── StatusBadge.tsx    # Durum göstergesi
│   ├── custom/                # Özelliğe özel bileşenler
│   │   ├── CallsTable.tsx     # Çağrı yönetim tablosu
│   │   ├── TablesManagement.tsx
│   │   ├── TableSelector.tsx
│   │   ├── WaiterOptionsCard.tsx
│   │   └── ConfirmationModal.tsx
│   └── backgrounds/           # Arka plan bileşenleri
│       ├── CustomerBackground.tsx
│       └── WaiterBackground.tsx
├── pages/
│   ├── CustomerPages/
│   │   ├── CustomerPage.tsx   # Ana müşteri arayüzü
│   │   └── ConfirmationPage.tsx
│   └── WaiterPages/
│       └── WaiterPage.tsx     # Garson paneli
├── hooks/                     # Özel React hook'ları
│   ├── useCalls.ts
│   ├── useCallActions.ts
│   ├── useSortedCalls.ts
│   ├── useTables.ts
│   └── useTableActions.ts
├── services/                  # Firebase & API servisleri
│   ├── firebaseCallService.ts
│   ├── firebaseTableService.ts
│   ├── callServiceInterface.ts
│   ├── tableServiceInterface.ts
│   ├── callCleanupService.ts
│   └── mockCallService.ts     # Test için
├── types/                     # TypeScript tip tanımları
│   ├── callTypes.ts
│   └── tableTypes.ts
├── constants/                 # Uygulama sabitleri
│   ├── animationVariants.ts   # Framer Motion yapılandırmaları
│   └── callStatusConstants.ts # Durum renkleri & etiketleri
├── utils/                     # Yardımcı fonksiyonlar
│   └── callHelpers.ts
└── config/                    # Yapılandırma dosyaları
    └── firebaseConfig.ts
```

## 🚀 Başlangıç

### Ön Gereksinimler
- Node.js 18+ 
- npm veya yarn
- Firebase projesi

### Kurulum

1. **Depoyu klonlayın**
```bash
git clone <repository-url>
cd WaiterCallPanel
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Firebase'i yapılandırın**

`src/config/firebaseConfig.ts` dosyasını oluşturun:
```typescript
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "SENIN_API_ANAHTARIN",
  authDomain: "SENIN_AUTH_DOMAIN",
  databaseURL: "SENIN_VERITABANI_URL",
  projectId: "SENIN_PROJE_ID",
  storageBucket: "SENIN_DEPOLAMA_BUCKET",
  messagingSenderId: "SENIN_MESAJLAŞMA_GÖNDERİCİ_ID",
  appId: "SENIN_UYGULAMA_ID"
};

export const app = initializeApp(firebaseConfig);
```

4. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

5. **Production için derleyin**
```bash
npm run build
```

## 🎨 Tasarım Sistemi

### Buton Varyantları
- **`glassmorphism`** - Yarı saydam ve arka plan bulanıklığı (Müşteri Arayüzü)
- **`primary`** - Gri solid (Kabul eylemleri)
- **`success`** - Yeşil solid (Tamamlama eylemleri)
- **`danger`** - Kırmızı solid (İptal eylemleri)
- **`secondary`** - Açık gri (Navigasyon)

### Animasyon Sistemi
Merkezi yay (spring) yapılandırmaları:
- **`springBase`** - Standart animasyonlar
- **`springFast`** - Hızlı etkileşimler (hover/dokunma)
- **`springModal`** - Modal giriş/çıkış
- **`springSoft`** - Yumuşak hareketler
- **`springStiff`** - Keskin, tepkisel animasyonlar

### Çağrı Durum Sistemi
```typescript
PENDING    → Bekleniyor    (Gri)
ACCEPTED   → İlgileniliyor (Mavi)
COMPLETED  → Tamamlandı    (Yeşil)
CANCELLED  → İptal Edildi  (Kırmızı)
```

## 🔥 Firebase Veritabanı Yapısı

```json
{
  "calls": {
    "call_id": {
      "table": "5",
      "type": "Garson Çağır",
      "status": "PENDING",
      "timestamp": 1704192000000,
      "id": "call_id"
    }
  },
  "tables": {
    "table_id": {
      "tableNumber": 5,
      "id": "table_id"
    }
  }
}
```

## 🧩 Temel Mimari Kararlar

### 1. Bileşen Organizasyonu
- **`ui/`** - Genel, yeniden kullanılabilir bileşenler (Button, TableLayout)
- **`custom/`** - Özelliğe özel bileşenler (CallsTable)
- **`backgrounds/`** - Düzen sarmalayıcıları ve arka planlar

### 2. Servis Katmanı Deseni
- Arayüz tabanlı tasarım (`ICallService`, `ITableService`)
- Test için kolay mocklanabilirlik
- Bağımlılık enjeksiyonu (Dependency Injection) desteği

### 3. Özel Hook'lar
- İlgi alanlarının ayrılması (veri çekme vs. eylemler)
- Yeniden kullanılabilir iş mantığı
- Temiz bileşen kodu

### 4. Sabit Tabanlı Yapılandırma
- Animasyon varyantları merkezileştirildi
- Durum renkleri/etiketleri sabitlerde
- Kolay tema değişiklikleri

## 🎯 Kullanım

### Müşteri Akışı
1. `/` adresine gidin (CustomerPage)
2. Masa numarası seçin
3. Bir eylem seçin (Garson Çağır / Sipariş / Hesap)
4. `/onay` onay sayfasına yönlendirilirsiniz

### Garson Akışı
1. `/garson` adresine gidin (WaiterPage)
2. Gösterge panelinde gerçek zamanlı çağrıları görüntüleyin
3. "Panel" ve "Masalar" sekmeleri arasında geçiş yapın
4. Çağrıları yönetin:
   - Kabul etmek için "Üstlen"e tıklayın
   - Tamamlandığında "Tamamlandı"ya tıklayın
   - İptal etmek için "İptal"e tıklayın

## 🔒 Güvenlik Hususları

⚠️ **Önemli**: Bu bir demo projesidir. Prodüksiyon için:
- Firebase Authentication ekleyin
- Güvenlik kurallarını (Security Rules) uygulayın
- Rol tabanlı erişim kontrolü ekleyin
- Tüm girdileri doğrulayın
- Hız sınırlaması (Rate limiting) ekleyin

## 🤝 Katkıda Bulunma

Katkılarınız memnuniyetle karşılanır! Lütfen:
1. Depoyu forklayın
2. Bir özellik dalı (feature branch) oluşturun
3. Değişiklikleri net mesajlarla commit'leyin
4. Bir pull request gönderin

## 📝 Komutlar

```bash
npm run dev      # Geliştirme sunucusunu başlat
npm run build    # Prodüksiyon için derle
npm run preview  # Prodüksiyon derlemesini önizle
npm run lint     # ESLint'i çalıştır
```


## 👨‍💻 Yazar

Emir Yusuf Kazmacı

---

**React, TypeScript ve Firebase ile ❤️ kullanılarak yapılmıştır**
#   w a i t e r - c a l l - p a n e l  
 