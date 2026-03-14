# Local Dev Notes

Bu dosya, `/root/metabase` altinda yaptigimiz ortam hazirligi, rebrand, admin sadeleştirme, upsell temizligi ve dis baglanti sertlestirmelerini tekrar uygulanabilir sekilde kayit altina alir.

## Repo Ve Git

- repo: `/root/metabase`
- branch: `master`
- `origin`: `https://github.com/senhakan/metabase.git`
- `upstream`: `https://github.com/metabase/metabase.git`
- `user.name`: `senhakan`
- `user.email`: `hakan.sen@live.com`
- `gh auth login` yapildi
- HTTPS push aktif

## Toolchain

- `mise` kurulu
- shell icin:

```bash
source ~/.bashrc
eval "$(/root/.local/bin/mise activate bash)"
```

- surumler:
  - Node `22.13.1`
  - Bun `1.3.7`
  - Java `21.0.9`
  - Clojure CLI `1.12.3`
  - Babashka `1.12.212`

## Dev Komutlari

Enterprise classpath gerektiren bu fork icin ana komut:

```bash
cd /root/metabase
source ~/.bashrc
MB_FRONTEND_DEV_HOST=10.6.100.170 bun run dev-ee
```

Adresler:

- uygulama: `http://10.6.100.170:3000`
- frontend dev server: `http://10.6.100.170:8080`

Notlar:

- `bun run dev` bazen enterprise namespace hatasi uretebilir
- H2 + hot start ilk acilista yavas olabilir

## Build Olcumleri

```bash
cd /root/metabase
source ~/.bashrc
bun run build
```

- cold build: `4:40.24`
- warm build: `3:02.36`

## Dis IP Destegi

Dis IP uzerinden asset URL uretilmesi icin env tabanli patch yapildi:

- `rspack.main.config.js`
- `src/metabase/server/middleware/security.clj`
- `docs/developers-guide/devenv.md`

Davranis:

- varsayilan host `localhost`
- sadece `MB_FRONTEND_DEV_HOST` verilirse dis host kullanilir

## Rebrand

Marka `AkgunBI` olarak ayarlandi.

Uygulanan alanlar:

- `application-name`
- `site-name`
- `theme-lite-application-name`
- web manifest adi
- browser title
- bootstrap localization (`Metabase -> AkgunBI`)
- frontend English fallback localization (`Metabase -> AkgunBI`)

Baslica dosyalar:

- `src/metabase/appearance/settings.clj`
- `src/metabase/appearance/core.clj`
- `src/metabase/server/routes/index.clj`
- `frontend/src/metabase/lib/i18n.js`
- `frontend/src/metabase-types/api/mocks/settings.ts`
- `resources/frontend_client/app/assets/img/site.webmanifest`

## Theme Management

Premium appearance yerine hafif bir ic tema yonetim ekrani eklendi.

Kapsam:

- uygulama adi
- favicon
- tema renkleri

Dosyalar:

- `frontend/src/metabase/admin/settings/components/SettingsPages/ThemeManagementSettingsPage.tsx`
- `frontend/src/metabase/admin/settings/components/widgets/ThemeLiteColorSettingsWidget.tsx`
- `frontend/src/metabase/admin/settings/components/SettingsPages/AppearanceSettingsPage.tsx`
- `frontend/src/metabase/lib/colors/colors.ts`

## Admin Sadeleştirme

Kaldirilan/gizlenen alanlar:

- `Updates`
- `License`
- `Cloud`
- Store link / paid features alanlari
- trial banner
- license activation banner
- premium upsell alanlari
- `Tools -> Help` menusu ve route'u

Baslica dosyalar:

- `frontend/src/metabase/admin/settings/components/SettingsNav/SettingsNav.tsx`
- `frontend/src/metabase/admin/settingsRoutes.tsx`
- `frontend/src/metabase/common/components/AppBanner/AppBanner.tsx`
- `frontend/src/metabase/nav/components/StoreLink/StoreLink.tsx`
- `frontend/src/metabase/nav/components/TrialBanner/TrialBanner.tsx`
- `frontend/src/metabase/nav/components/LicenseTokenMissingBanner/LicenseTokenMissingBanner.tsx`
- `frontend/src/metabase/admin/tools/components/ToolsApp.tsx`
- `frontend/src/metabase/admin/routes.tsx`

## Upsell Temizligi

Ortak premium reklam yuzeyleri no-op yapildi:

- `UpsellWrapper`
- `UpgradeModal`
- `UpsellGem`
- `UpsellSdkLink`
- embedding settings upsell banner

Dosyalar:

- `frontend/src/metabase/common/components/upsells/components/UpsellWrapper.tsx`
- `frontend/src/metabase/common/components/upsells/components/UpgradeModal/UpgradeModal.tsx`
- `frontend/src/metabase/common/components/upsells/components/UpsellGem.tsx`
- `frontend/src/metabase/admin/upsells/UpsellSdkLink.tsx`
- `frontend/src/metabase/admin/settings/components/EmbeddingSettings/SharedCombinedEmbeddingSettings/SharedCombinedEmbeddingSettings.tsx`

## Dis Baglanti Ve Telemetri Sertlestirme

Urunun kendi outbound yuzeyleri kapatildi:

- backend snowplow event gonderimi
- frontend analytics bootstrap
- bug report -> Slack gonderimi
- help/store/docs/upgrade link ureticileri
- same-origin disi external linkler
- off-origin programatik navigation
- varsayilan map tile dis servisi

Session properties ile dogrulanan kapali degerler:

- `anon-tracking-enabled = false`
- `bug-reporting-enabled = false`
- `check-for-updates = false`
- `snowplow-enabled = false`
- `snowplow-url = ""`
- `analytics-uuid = ""`
- `help-link = hidden`
- `show-metabase-links = false`
- `store-url = ""`
- `map-tile-server-url = ""`

Baslica dosyalar:

- `src/metabase/analytics/settings.clj`
- `src/metabase/analytics/snowplow.clj`
- `src/metabase/channel/api/slack.clj`
- `src/metabase/cloud_migration/settings.clj`
- `src/metabase/tiles/settings.clj`
- `src/metabase/version/settings.clj`
- `src/metabase/setup_rest/api.clj`
- `frontend/src/metabase/common/components/ExternalLink/ExternalLink.tsx`
- `frontend/src/metabase/lib/dom.ts`
- `frontend/src/metabase/lib/urls/utils.ts`
- `frontend/src/metabase/lib/formatting/url.tsx`
- `frontend/src/metabase/lib/analytics-untyped.js`
- `frontend/src/metabase/common/utils/help-url.ts`
- `frontend/src/metabase/selectors/settings.ts`
- `frontend/src/metabase/nav/components/AppSwitcher/useHelpLink.ts`
- `frontend/src/metabase/embedding/embedding-hub/hooks/use-help-url.ts`

## Canli Commit Gecmisi

Toplu commit:

- `67a40a636d` `feat: rebrand and harden internal deployment`

Not:

- sonraki degisikliklerden sonra `git status --short` ile kontrol et
- bu dosya, ayni kurulumu yeniden yapmak icin ana referans olsun

## Sonraki Oturumda Hizli Baslangic

```bash
cd /root/metabase
source ~/.bashrc
git status --short --branch
MB_FRONTEND_DEV_HOST=10.6.100.170 bun run dev-ee
```

Hizli kontroller:

```bash
curl -s http://10.6.100.170:3000/api/session/properties | rg 'anon-tracking-enabled|bug-reporting-enabled|check-for-updates|snowplow-enabled|help-link|store-url|show-metabase-links|map-tile-server-url'
curl -s http://10.6.100.170:3000/ | rg 'AkgunBI|_metabaseUserLocalization|_metabaseSiteLocalization'
```
