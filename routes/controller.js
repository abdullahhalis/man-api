const response = require("../utils/response");
const cheerio = require("cheerio");
const { baseUrl } = require("../utils/constants");
const axios = require("axios");

exports.getHome = async (req, res) => {
  const { page = 1 } = req.query;
  try {
    const $ = await cheerio.fromURL(
      `${baseUrl}/?page=${page}&pagedfor=latest#latest-list`,
      {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        },
      }
    );
    const popularToday = [];
    const latestUpdate = [];
    const newSeries = [];
    const weeklyPopular = [];
    const monthlyPopular = [];
    const alltimePopular = [];

    $(
      `section:not([id]) > div.trending-slider > div.swiper > div.swiper-wrapper > div.swiper-slide.manga-swipe`
    ).each((_, e) => {
      popularToday.push({
        title: $(e).find("a").attr("title"),
        type: $(e).find("a > div.card > div.title > div > img").attr("alt"),
        rating: $(e)
          .find("a > div.card > div.title > div > div > p")
          .text()
          .trim(),
        image: $(e).find("a > div.card > div.h-full img").attr("src"),
        slug:
          new URL($(e).find("a").attr("href")).pathname.match(
            /\/manga\/([^/]+)/
          )?.[1] || "-",
      });
    });

    $(`section#latest-list > div#latest-list > div:not([class])`).each(
      (_, e) => {
        const $data = $(e).find(
          `div[class*="group-data-[direction=horizontal]:block"] > div`
        );
        latestUpdate.push({
          title: $data.find(`div > a:nth-child(1)`).text().trim(),
          image: $data.find(`a > div.w-full > img`).attr("src"),
          type: $data.find(`a > div.absolute.bottom-1 > img`).attr("alt"),
          chapter: $data.find(`div > a:nth-child(2) > div > p`).text().trim(),
          slug:
            new URL($data.find("a").attr("href")).pathname.match(
              /\/manga\/([^/]+)/
            )?.[1] || "-",
        });
      }
    );

    $("#sidebar > div.section > span > div.serieslist > ul li").each((_, e) => {
      newSeries.push({
        title: $(e).find("div.imgseries > a > img").attr("title"),
        image:
          $(e).find("div.imgseries > a > img").attr("data-lzl-src") ||
          $(e).find("div.imgseries > a > img").attr("src"),
        slug:
          new URL($(e).find("div.imgseries > a").attr("href")).pathname.match(
            /\/manga\/([^/]+)/
          )?.[1] || "-",
      });
    });

    $("div#wpop-items > div.serieslist.pop.wpop.wpop-weekly > ul li").each(
      (_, e) => {
        weeklyPopular.push({
          title: $(e).find("div.imgseries > a > img").attr("title"),
          image:
            $(e).find("div.imgseries > a > img").attr("data-lzl-src") ||
            $(e).find("div.imgseries > a > img").attr("src"),
          rating: $(e).find("div.leftseries > div.rt div.numscore").text(),
          slug:
            new URL($(e).find("div.imgseries > a").attr("href")).pathname.match(
              /\/manga\/([^/]+)/
            )?.[1] || "-",
        });
      }
    );

    $("div#wpop-items > div.serieslist.pop.wpop.wpop-monthly > ul li").each(
      (_, e) => {
        monthlyPopular.push({
          title: $(e).find("div.imgseries > a > img").attr("title"),
          image:
            $(e).find("div.imgseries > a > img").attr("data-lzl-src") ||
            $(e).find("div.imgseries > a > img").attr("src"),
          rating: $(e).find("div.leftseries > div.rt div.numscore").text(),
          slug:
            new URL($(e).find("div.imgseries > a").attr("href")).pathname.match(
              /\/manga\/([^/]+)/
            )?.[1] || "-",
        });
      }
    );

    $("div#wpop-items > div.serieslist.pop.wpop.wpop-alltime > ul li").each(
      (_, e) => {
        alltimePopular.push({
          title: $(e).find("div.imgseries > a > img").attr("title"),
          image:
            $(e).find("div.imgseries > a > img").attr("data-lzl-src") ||
            $(e).find("div.imgseries > a > img").attr("src"),
          rating: $(e).find("div.leftseries > div.rt div.numscore").text(),
          slug:
            new URL($(e).find("div.imgseries > a").attr("href")).pathname.match(
              /\/manga\/([^/]+)/
            )?.[1] || "-",
        });
      }
    );

    response(res, 200, "success", {
      popularToday,
      latestUpdate,
      newSeries,
      weeklyPopular,
      monthlyPopular,
      alltimePopular,
    });
  } catch (error) {
    response(res, 500, error.message);
  }
};

exports.getManSearch = async (req, res) => {
  try {
    const { s, page = 1 } = req.query;

    const resp = await axios.post(
      `${baseUrl}/wp-admin/admin-ajax.php?action=advanced_search`,
      new URLSearchParams({
        action: "advanced_search",
        query: s,
        page: page,
        order: "desc",
        orderby: "popular",
      })
    );

    const $ = cheerio.load(resp.data);

    const manList = [];

    $(`body > div:not([class])`).each((_, e) => {
      manList.push({
        title: $(e).find("div > a > img").attr("alt"),
        chapter: $(e)
          .find("div > div > div > div > div > span:nth-child(1)")
          .text()
          .match(/chapter\s*(.+)/i)?.[1],
        rating: $(e)
          .find("div > div > div > div > div > div:nth-child(1) > span")
          .text()
          .trim(),
        image: $(e).find("div > a > img").attr("src"),
        slug:
          new URL($(e).find("div > a").attr("href")).pathname.match(
            /\/manga\/([^/]+)/
          )?.[1] || "-",
      });
    });

    response(res, 200, "success", manList);
  } catch (error) {
    response(res, 500, error.message);
  }
};

exports.getManDetails = async (req, res) => {
  const slug = req.params.slug;

  try {
    const $ = await cheerio.fromURL(`${baseUrl}/manga/${slug}`, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      },
    });

    const $content = $("main > article > section > div");

    const chapterUrl = $("div#chapter-list").attr("hx-get");

    const resp = await axios.get(chapterUrl);

    const $chapter = cheerio.load(resp.data);

    const genre = [];
    $(`div#tabpanel-description [itemprop="genre"]`).each((_, e) => {
      genre.push($(e).find("span").text().trim());
    });

    const chapters = [];
    $chapter("div#chapter-list > div").each((_, e) => {
      chapters.push({
        chapter: $(e).attr("data-chapter-number"),
        slug:
          new URL($(e).find("a").attr("href")).pathname.match(
            /\/manga\/([^/]+)\/([^/]+)/
          )?.[2] || "-",
        date: $(e).find("a time").attr("datetime"),
        relativeDate: $(e).find("a time").text(),
      });
    });

    const manga = {
      slug,
      title: $content
        .find("div:nth-child(2) > div:nth-child(1) > h1")
        .text()
        .trim(),
      altTitle: $content
        .find("div:nth-child(2) > div:nth-child(1) > div.block.text-sm")
        .text()
        .trim(),
      image: $content
        .find("div:nth-child(1) > div.relative.contents > img")
        .attr("src"),
      rating: $content
        .find(
          "div:nth-child(1) > div:nth-child(3) > li:nth-child(1) > div > span"
        )
        .text()
        .trim(),
      synopsis: $(
        `div#tabpanel-description [itemprop="description"][data-show="true"]`
      )
        .text()
        .trim(),
      type: $content
        .find(
          "div:nth-child(1) > div.space-y-2 > div:nth-child(1) > div.inline > p"
        )
        .text()
        .trim(),
      released: $content
        .find(
          "div:nth-child(1) > div.space-y-2 > div:nth-child(3) > div.inline > p"
        )
        .text(),
      genre,
      chapters,
    };
    response(res, 200, "success", manga);
  } catch (error) {
    response(res, 500, error.message);
  }
};

exports.getChapter = async (req, res) => {
  const { mangaSlug, chapterSlug } = req.params;
  try {
    const $ = await cheerio.fromURL(`${baseUrl}/manga/${mangaSlug}/${chapterSlug}`, {
      scriptingEnabled: false,
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      },
    });
    const images = [];

    $(
      "div.relative section.w-full > img"
    ).each((_, e) => {
      images.push($(e).attr("src"));
    });

    response(res, 200, "success", {
      title: $("a.text-white h1").text(),
      images,
    });
  } catch (error) {
    response(res, 500, error.message);
  }
};
