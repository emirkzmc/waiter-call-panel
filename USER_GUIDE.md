# 📖 Garson Çağrı Paneli - Kullanım Kılavuzu

Bu kılavuz, Garson Çağrı Paneli uygulamasının hem müşteriler hem de personel tarafından nasıl kullanılacağını adım adım açıklar.

## 👥 Müşteriler İçin Kullanım

Müşteri arayüzü, restoran veya kafedeki misafirlerin garson çağırması, sipariş vermesi veya hesap istemesi için tasarlanmıştır.

### 1. Başlangıç ve Masa Seçimi
Uygulamayı açtığınızda (genellikle masadaki QR kodunu taratarak), ana ekranla karşılaşırsınız.
*   Ekranın üst kısmında bir **Masa Seçici** bulunur.
*   Lütfen oturduğunuz masanın numarasını listeden seçin veya doğrulayın.

### 2. Bir İstek Gönderme
Masa numaranız seçili durumdayken, ihtiyacınız olan butona dokunun:

*   **👋 Garson Çağır:** Genel sorular veya yardım için garsonu masanıza çağırır.
*   **📝 Sipariş Ver:** Sipariş vermek istediğinizi belirtir.
*   **💸 Hesap İste:** Yemeğiniz bittiğinde hesabı istemek için kullanılır.

### 3. Onay Ekranı
Bir butona tıkladığınızda, isteğinizin alındığına dair bir **Onay Sayfası**na yönlendirilirsiniz.
*   Bu ekranda *"Garson yolda!"* veya benzeri bir mesaj görürsünüz.
*   Bir süre sonra otomatik olarak ana ekrana dönersiniz veya "Geri Dön" butonunu kullanabilirsiniz.

---

## 🤵 Personel ve Garsonlar İçin Kullanım

Garson paneli, gelen çağrıları gerçek zamanlı olarak takip etmek ve yönetmek için kullanılır.

### 1. Panele Erişim
*   Tarayıcınızdan `/garson` sayfasına gidin (adres sonuna `/garson` ekleyin).
*   Bu ekran, restoranın operasyon merkezidir. Tablet veya bilgisayar ekranında sürekli açık tutulması önerilir.

### 2. Çağrıları Takip Etme (Panel Sekmesi)
"Panel" sekmesinde, müşterilerden gelen tüm çağrıları listelenmiş olarak görürsünüz. Çağrılar durumlarına göre renk kodlarıyla ayrılmıştır.

#### Çağrı Kartları ve Durumlar:
Her çağrı kartında masa numarası, istek tipi ve geçen süre görünür.

*   **⚪ Bekleniyor (Gri):** Yeni gelen bir çağrıdır. Henüz kimse ilgilenmemiştir.
    *   **Ne yapmalı?** Çağrıyı üstlenmek için **"Üstlen"** butonuna basın. Bu, diğer garsonlara sizin bu masaya baktığınızı gösterir.
    
*   **🔵 İlgileniliyor (Mavi):** Bir personelin şu anda ilgilendiği çağrıdır.
    *   **Ne yapmalı?** Müşterinin isteğini yerine getirdikten sonra (siparişi aldınız veya hesabı götürdünüz), işlemi kapatmak için **"Tamamlandı"** butonuna basın.

*   **🟢 Tamamlananlar:** İşlemi bitmiş çağrılar listeden otomatik olarak kaldırılır veya geçmiş bölümüne düşer (yapılandırmaya bağlı olarak).

*   **🔴 İptal (Kırmızı):** Eğer bir çağrı yanlışlıkla açıldıysa, **"İptal"** butonuna basarak çağrıyı silebilirsiniz.

### 3. Masaları Yönetme (Masalar Sekmesi)
Restoran düzeniniz değiştiğinde masaları buradan güncelleyebilirsiniz.

*   **Masa Ekleme:** 
    *   "Masalar" sekmesine geçin.
    *   Yeni bir masa eklemek için "+" butonuna veya "Masa Ekle" alanına numara girip ekle butonuna basın.
*   **Masa Silme:** 
    *   Mevcut masaların listesini göreceksiniz.
    *   Kaldırmak istediğiniz masanın yanındaki "Sil" veya "Çöp Kutusu" ikonuna tıklayın.

## 💡 İpuçları ve Sorun Giderme

*   **Bildirim Gelmiyor:** İnternet bağlantınızı kontrol edin. Sistem anlık (real-time) çalıştığı için aktif bir internet bağlantısı gerektirir.
*   **Sesli Uyarılar:** (Eğer aktifse) Tarayıcınızın sesinin açık olduğundan ve siteye otomatik oynatma izni verdiğinizden emin olun.
*   **Yanlış Masa Seçimi:** Müşteri yanlış masa seçerse, garson panelinden o çağrıyı "İptal" edip müşteriden doğru masayı seçmesini isteyebilirsiniz.
