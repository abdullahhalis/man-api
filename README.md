# 🧩 Man-API
REST API to fetch Manga/Manhwa/Manhua data in Bahasa Indonesia via scraping.
Built as a web scraper–based API to collect manga details, chapters, and search results

---

## 🚀 Base URL

```
https://man-api-umber.vercel.app/
```
---

## 📚 Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | [/api-docs](https://man-api-umber.vercel.app/api-docs) | 📘 View interactive API documentation |
| GET | [/manapp](https://man-api-umber.vercel.app/manapp) | Fetch lates & popular manga |
| GET | [/manapp/search](https://man-api-umber.vercel.app/manapp/search?s=one&page=1) | Search manga by keyword |
| GET | [/manapp/detail/:slug](https://man-api-umber.vercel.app/manapp/detail/one-piece) | Fetch manga details by slug |
| GET | [/manapp/detail/chapter/:slug](https://man-api-umber.vercel.app/manapp/detail/chapter/one-piece-chapter-1162) | Fetch chapter details by chapter slug |

---

## 🧠 Notes
- Response structure follows `status` + `data` convention for consistency.  
- Some fields may return `null` depending on source availability.  
- API is read-only — no authentication or write operations supported.  
- Hosted on [Vercel](https://vercel.com) for testing & learning purposes.

---

## ⚠️ Disclaimer
This project is **an unofficial scraper API** and is **not affiliated, endorsed, or supported** by any manga/manhwa/manhua website or publisher.
It is intended **solely for personal and educational use** — for learning about web scraping, API architecture, and data structuring.

Please respect the original content owners and **do not use this API for commercial or copyright-infringing purposes**.  
All rights to the scraped content belong to their respective owners.
