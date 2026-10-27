# Glow — прототип сайта

Сайт-витрина бутика корейской косметики Glow (Баку, Instagram [@glowngo.az](https://www.instagram.com/glowngo.az/)).
Цен на сайте нет: вместо цены везде «Qiymət üçün yaz» и кнопка WhatsApp. Заказ уходит в WhatsApp, дальше его ведёт магазин.

Стек: Next.js (App Router), TypeScript, Tailwind. Без бэкенда и базы. Деплой на Vercel.

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # продакшн-сборка
npm run check:images   # проверка фото товаров
```

## Где что лежит

| Что | Файл |
|---|---|
| Переключатели `DEMO_BANNER`, `WHATSAPP_PHONE`, `SHOW_UNCONFIRMED`, контакты, номиналы карт | `src/config.ts` |
| Товары и шаги рутины | `src/data/products.ts` |
| Все строки интерфейса (азербайджанский) | `src/i18n/az.ts` |
| Фото товаров, 800×800 webp | `public/products/` |
| Источник каждого фото | `public/products/SOURCES.md` |
| Список «İstədiklərim» | localStorage, `src/lib/wishlist.tsx` |

## Страницы

- `/`: первый экран, шаги рутины, бренды, «Glow-da yenidən satışda» (только товары с `restocked: true`), подарочные карты, магазин, блок «Rutinini birlikdə quraq»
- `/shop`: каталог. Фильтры по шагу и бренду, поиск по названию и бренду, порядок по шагу рутины
- `/step/[slug]`: каталог с заранее выбранным шагом
- `/brands/[slug]`: товары бренда
- `/mehsul/[id]`: страница товара
- `/istedikerim`: список выбранного с кнопкой «WhatsApp-a göndər»
- `/magazalar`: магазин, контакты, подарочные карты

На сайт попадают только товары с фото. Шаг рутины без товаров и бренд без товаров не выводятся.

## Решения, принятые при сборке

- **Шрифт заголовков: Plus Jakarta Sans 800 вместо Bricolage Grotesque.** В Bricolage нет буквы «ə» (проверено по таблице cmap файлов Google Fonts). Plus Jakarta Sans содержит весь набор `ə ş ç ğ ı ö ü Ə Ş Ç Ğ İ Ö Ü ₼`.
- **Manrope оставлен для текста.** В нём есть «ə», но нет «Ə» и «₼». Для этих двух глифов в стеке шрифтов стоит Plus Jakarta Sans, так что они рисуются настоящим шрифтом, а не системным.
- **Salad: `#C2DF8D`.** Медиана фона аватара @glowngo.az (в брифе было `#CBE58E`).
- Латинские названия брендов, набранные капсом, помечены `lang="en"`, иначе при `lang="az"` браузер пишет «MEDİHEAL».

## TODO: уточнить у владельца

- [ ] **Шаг 01 Təmizləmə.** Подтверждённых позиций нет, шаг на сайте не выводится. Какие средства для очищения сюда поставить?
- [ ] **Официальный файл логотипа.** Сейчас логотип нарисован кодом (`src/components/Logo.tsx`).
- [ ] **Medicube PDRN Pink Collagen Exosome Shot Serum 2000.** Точное название SKU.
- [ ] **TIRTIR Cushion.** Какая модель? На фото Mask Fit Aura Cushion: в описании «parlaq bitişli», а у Aura сияющий финиш.
- [ ] **Сколько точек.** Источники дают разное, в коде всё это лежит в `UNCONFIRMED` и скрыто флагом `SHOW_UNCONFIRMED = false`:
  - шапка Instagram: 28 Mall 4 этаж и Ganjlik Mall −1 этаж
  - посты от 16 октября: плюс Metropark 3 этаж
  - 2ГИС: Azadlıq pr. 15a/4 4 этаж и Təbriz küç. 106a. Что 106a это Metropark, не подтверждено
- [ ] Полный адрес Azadlıq pr. 15a/4 (только 2ГИС)
- [ ] Часы работы 10:00–22:00 ежедневно (только 2ГИС)
- [ ] TikTok @glow.az (только 2ГИС, не совпадает с ником Instagram)
- [ ] Скидка в день рождения: условия
- [ ] **Товары без официальных фото не включены в каталог:** Dr.Ceuracle Vegan Kombucha Tea Essence, Dr.Ceuracle Vegan Kombucha Tea Gel Cream, Laka Lip Combo. Нужны фото, тогда их можно вернуть в `products.ts`.
- [ ] Фото Clio Kill Cover Founwear Cushion на официальном сайте снято на тёмном фоне. Если есть вариант на белом, лучше заменить.

## Демо

Плашка «Demo versiya, sifarişlər qəbul edilmir» стоит вверху каждой страницы. Убирается одной строкой: `DEMO_BANNER = false` в `src/config.ts`.
