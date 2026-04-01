# 🧩 Man-API
REST API to fetch Manga/Manhwa/Manhua data in Bahasa Indonesia powered by a custom scraping pipeline.

Man-API is a backend service built to aggregate manga data from a public source, normalize the structure, and expose it through a clean REST API for mobile applications (specifically the [Manapp](https://github.com/abdullahhalis/manapp) reader application).

This project demonstrates backend engineering skills including scraping architecture, API design, data transformation, and deployment constraints.

---

## ✨Features
- Manga metadata scraping
- Chapter list extraction
- Chapter reader image extraction
- Search functionality
- REST API architecture
- Consistent JSON responses
- Slug-based routing
- Swagger documentation
- Cloud deployment

---

## 🚀 Base URL

```
https://man-api-umber.vercel.app/
```
### API Documentaion
```
https://man-api-umber.vercel.app/api-docs
```
>⚠️ Note

>Some API endpoints may occasionally fail due to IP blocking from source websites (anti-scraping protection). The documentation endpoint remains accessible. This is a known limitation of scraper systems deployed on shared cloud infrastructure.

---

## 📚 Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | [/api-docs](https://man-api-umber.vercel.app/api-docs) | Interactive API documentation |
| GET | [/manapp](https://man-api-umber.vercel.app/manapp) | Fetch lates & popular manga |
| GET | [/manapp/search](https://man-api-umber.vercel.app/manapp/search?s=one&page=1) | Search manga by keyword |
| GET | [/manapp/detail/:slug](https://man-api-umber.vercel.app/manapp/detail/one-piece) | Fetch manga details by slug |
| GET | [/manapp/detail/:mangaSlug/:chapterSlug](https://man-api-umber.vercel.app/manapp/detail/one-piece/chapter-1163.653200) | Fetch chapter details by chapter slug |

---
## 📦 Response Format
All responses follow a consistent structure:
```json
{
  "status": "success",
  "data": {}
}
```
### Design considerations:
- Predictable structure
- Easy parsing for clients
- Error safety
- Future extensibility

---
## 🛠️ Tech Stack
### Backend
- Node.js
- Express.js

### Scraping
- Cheerio
- Axios

### Documentation
- Swagger

### Deployment
- vercel

---

## ⚙️ Design Decisions
### Why scraping instead of public APIs?
Reasons:
- Most free manga APIs are unreliable
- Data structures are inconsistent
- Limited chapter availability
- No control over schema

Scraping allows:
- Full schema control
- Data normalization
- Consistent structure
- Learning real backend problems

### Why REST instead of GraphQL?
Reasons:
- Simpler mobile integration
- Faster implementation
- Easier debugging
- Predictable responses

---

## ⚠️ Disclaimer
This project is **an unofficial scraper API** and is **not affiliated, endorsed, or supported** by any manga/manhwa/manhua website or publisher.
It is intended **solely for personal and educational use** — for learning about web scraping, API architecture, and data structuring.

Please respect the original content owners and **do not use this API for commercial or copyright-infringing purposes**.  
All rights to the scraped content belong to their respective owners.
