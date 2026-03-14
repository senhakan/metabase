# Local Dev Notes

Bu dosya, `/root/metabase` altında yaptigimiz yerel gelistirme hazirligini kayit altina alir.

## Repo Durumu

- Calisma dizini: `/root/metabase`
- Aktif branch: `master`
- Son gorulen HEAD: `fb2d36af34b4adeb9668992b3381f1e168626d05`
- `origin`: `https://github.com/senhakan/metabase.git`
- `upstream`: `https://github.com/metabase/metabase.git`

## Git Ayarlari

- `user.name`: `senhakan`
- `user.email`: `hakan.sen@live.com`
- `gh auth login` yapildi
- `gh auth setup-git` yapildi
- HTTPS push calisiyor

## Ortam Hazirligi

`mise` kuruldu ve `~/.bashrc` icine aktivasyon eklendi.

Yeni shell acildiginda gerekirse:

```bash
source ~/.bashrc
```

Repo icin hedef arac surumleri:

- Node: `22.13.1`
- Bun: `1.3.7`
- Java: `21.0.9`
- Clojure CLI: `1.12.3`
- Babashka: `1.12.212`

Not:

- `source ~/.bashrc` yapmadan sistem `node` surumu gorunebilir
- Repo icinde dogru surumleri almak icin `mise` aktif shell kullan

## Yapilan Hazirliklar

- Repo klonlandi
- `origin` ve `upstream` remote ayarlandi
- `bun install` tamamlandi
- `./bin/mage doctor` basarili gecti
- Ornek bos commit olusturulup push edildi

## Build Olcumleri

Frontend tam build komutu:

```bash
source ~/.bashrc
bun run build
```

Olculen sureler:

- Ilk cold build: `4:40.24`
- Ikinci warm build: `3:02.36`

## Canli Gelistirme

Standart yerel kullanim:

```bash
cd /root/metabase
source ~/.bashrc
bun run dev
```

Beklenen adresler:

- Uygulama: `http://localhost:3000`
- Frontend hot server: `http://localhost:8080`

## Dis IP ile Erisim

`http://10.6.100.170:3000` uzerinden erisim icin dev modda frontend asset URL'leri `localhost:8080` yerine dis host ile uretilmeliydi.

Bunun icin env tabanli, varsayilan davranisi bozmayan patch yapildi:

- [`rspack.main.config.js`](/root/metabase/rspack.main.config.js)
- [`src/metabase/server/middleware/security.clj`](/root/metabase/src/metabase/server/middleware/security.clj)
- [`docs/developers-guide/devenv.md`](/root/metabase/docs/developers-guide/devenv.md)

Davranis:

- Varsayilan host hala `localhost`
- Sadece `MB_FRONTEND_DEV_HOST` verilirse dis host kullanilir

Dis IP ile gelistirme icin:

```bash
cd /root/metabase
source ~/.bashrc
MB_FRONTEND_DEV_HOST=10.6.100.170 bun run dev
```

Bu durumda hedef adresler:

- Uygulama: `http://10.6.100.170:3000`
- Frontend hot server: `http://10.6.100.170:8080`

## Dikkat Notlari

- `bun run dev` ilk acilista H2 migration ve sample database setup nedeniyle yavas olabilir
- Backend `3000` portu frontend'den daha gec hazir olabilir
- Dev ortam kapatmak icin calisan terminalde `Ctrl+C`
- H2 kullanim uyarisi sadece production icin onemli; gelistirme icin kabul edilebilir

## Sonraki Oturumda Hizli Baslangic

```bash
cd /root/metabase
source ~/.bashrc
git status --short --branch
MB_FRONTEND_DEV_HOST=10.6.100.170 bun run dev
```

Sadece yerel makineden calisacaksan:

```bash
cd /root/metabase
source ~/.bashrc
bun run dev
```
