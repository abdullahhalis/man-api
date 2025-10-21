const response = require("../utils/response");
const cheerio = require("cheerio");
const { baseUrl } = require("../utils/constants");

exports.getHome = async (req, res) => {
  const { page = 1 } = req.query;
  try {
    const $ = await cheerio.fromURL(`${baseUrl}/page/${page}`, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      },
    });
    const popularToday = [];
    const latestUpdate = [];
    const newSeries = [];
    const weeklyPopular = [];
    const monthlyPopular = [];
    const alltimePopular = [];

    $(
      "#content > div.wrapper > div.hotslid > div > div.listupd.popularslider > div.popconslide div.bs"
    ).each((i, e) => {
      popularToday.push({
        title: $(e).find("a").attr("title"),
        type: $(e)
            .find("a > div.limit > span.type")
            .attr("class")
            .match(/type\s*(\w+)/i)?.[1] || '-',
          chapter: $(e).find("a > div.bigor div.epxs").text().match(/chapter\s*(.+)/i)?.[1] || '-',
        rating: $(e).find("a > div.bigor div.rt div.numscore").text(),
        image: $(e).find("a img").attr("data-lzl-src") || $(e).find("a img").attr("src"),
        slug: new URL($(e).find("a").attr("href")).pathname.match(/\/manga\/([^/]+)/)?.[1] || '-',
      });
    });

    $(
      "#content > div.wrapper > div.postbody > div:nth-child(6)  > div.listupd div.utao"
    ).each((i, e) => {
      latestUpdate.push({
        title: $(e).find("div.uta > div.imgu > a").attr("title"),
        image: $(e).find("div.uta > div.imgu > a img").attr("data-lzl-src") || $(e).find("div.uta > div.imgu > a img").attr("src"),
        chapter: $(e).find("div.uta > div.luf > ul > li:nth-child(1) > a").text(),
        slug: new URL($(e).find("div.uta > div.imgu > a").attr("href")).pathname.match(/\/manga\/([^/]+)/)?.[1] || '-',
      })
    })

    $(
      "#sidebar > div.section > span > div.serieslist > ul li"
    ).each((i, e) => {
      newSeries.push({
        title: $(e).find("div.imgseries > a > img").attr("title"),
        image: $(e).find("div.imgseries > a > img").attr("data-lzl-src") || $(e).find("div.imgseries > a > img").attr("src"),
        slug: new URL($(e).find("div.imgseries > a").attr("href")).pathname.match(/\/manga\/([^/]+)/)?.[1] || '-',
      })
    })

    $(
      "div#wpop-items > div.serieslist.pop.wpop.wpop-weekly > ul li"
    ).each((i, e) => {
      weeklyPopular.push({
        title: $(e).find("div.imgseries > a > img").attr("title"),
        image: $(e).find("div.imgseries > a > img").attr("data-lzl-src") || $(e).find("div.imgseries > a > img").attr("src"),
        rating: $(e).find("div.leftseries > div.rt div.numscore").text(),
        slug: new URL($(e).find("div.imgseries > a").attr("href")).pathname.match(/\/manga\/([^/]+)/)?.[1] || '-',
      })
    })

    $(
      "div#wpop-items > div.serieslist.pop.wpop.wpop-monthly > ul li"
    ).each((i, e) => {
      monthlyPopular.push({
        title: $(e).find("div.imgseries > a > img").attr("title"),
        image: $(e).find("div.imgseries > a > img").attr("data-lzl-src") || $(e).find("div.imgseries > a > img").attr("src"),
        rating: $(e).find("div.leftseries > div.rt div.numscore").text(),
        slug: new URL($(e).find("div.imgseries > a").attr("href")).pathname.match(/\/manga\/([^/]+)/)?.[1] || '-',
      })
    })

    $(
      "div#wpop-items > div.serieslist.pop.wpop.wpop-alltime > ul li"
    ).each((i, e) => {
      alltimePopular.push({
        title: $(e).find("div.imgseries > a > img").attr("title"),
        image: $(e).find("div.imgseries > a > img").attr("data-lzl-src") || $(e).find("div.imgseries > a > img").attr("src"),
        rating: $(e).find("div.leftseries > div.rt div.numscore").text(),
        slug: new URL($(e).find("div.imgseries > a").attr("href")).pathname.match(/\/manga\/([^/]+)/)?.[1] || '-',
      })
    })

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

    const $ = await cheerio.fromURL(
      `${baseUrl}/page/${page}/?s=${s}`,
      {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        },
      }
    );
    const manList = [];

    $("#content > div.wrapper > div.postbody > div > div.listupd div.bs").each(
      (i, e) => {
        manList.push({
          title: $(e).find("a").attr("title"),
          type: $(e)
            .find("a > div.limit > span.type")
            .attr("class")
            .match(/type\s*(\w+)/i)?.[1] || '-',
          chapter: $(e).find("a > div.bigor div.epxs").text().match(/chapter\s*(.+)/i)?.[1] || '-',
          rating: $(e).find("a > div.bigor div.rt div.numscore").text(),
          image: $(e).find("a img").attr("data-lzl-src") || $(e).find("a img").attr("src"),
          slug: new URL($(e).find("a").attr("href")).pathname.match(/\/manga\/([^/]+)/)?.[1] || '-',
        });
      }
    );

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

    const $content = $(
      "#content > div > div.terebody > div.postbody.seriestu.seriestere > article"
    );
    const $tableContent = $content.find(
      "div.seriestucon > div.seriestucontent div.seriestucont table > tbody"
    );

    const genre = [];
    $content
      .find(
        "div.seriestucon > div.seriestucontent div.seriestucont div.seriestugenre a"
      )
      .each((i, e) => {
        genre.push($(e).text());
      });

    const chapters = [];
    $content.find("div.bixbox.bxcl.epcheck > div.eplister li").each((i, e) => {
      chapters.push({
        chapter: $(e).attr("data-num"),
        slug: new URL($(e).find("div.eph-num > a").attr("href")).pathname.match(/([^/]+)/)?.[1] || '-',
        date: $(e).find("div.eph-num > a > span").last().text(),
      });
    });

    const manga = {
      title: $content.find("div.seriestucon > div.seriestuheader h1").text(),
      altTitle: $content
        .find("div.seriestucon > div.seriestuheader > div.seriestualt")
        .text()
        .trim(),
      image: $content
        .find("div.seriestucon > div.seriestucontent div.thumb img")
        .attr("data-lzl-src") || $content
        .find("div.seriestucon > div.seriestucontent div.thumb img")
        .attr("src"),
      rating: $content
        .find("div.seriestucon > div.seriestucontent div.rating.bixbox div.num")
        .text(),
      synopsis: $content
        .find("div.seriestucon > div.seriestucontent div.seriestuhead p")
        .text(),
      status: $tableContent.find("tr:nth-child(1) > td:nth-child(2)").text(),
      type: $tableContent.find("tr:nth-child(2) > td:nth-child(2)").text(),
      released: $tableContent.find("tr:nth-child(3) > td:nth-child(2)").text(),
      author: $tableContent.find("tr:nth-child(4) > td:nth-child(2)").text(),
      artist: $tableContent.find("tr:nth-child(5) > td:nth-child(2)").text(),
      updatedAt: $tableContent
        .find("tr:nth-child(9) > td:nth-child(2) > time")
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
  const slug = req.params.slug
  try {
     const $ = await cheerio.fromURL(`${baseUrl}/${slug}`, {
        scriptingEnabled: false,
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        },
      });
      const images = [];
    
      $("#content div.entry-content.entry-content-single.maincontent > div#readerarea p img").each((i, e) => {
        images.push($(e).attr("src"))
      })
    
    response(res, 200, 'success', {
      title: $("#content div.headpost > h1").text(),
      images
    })
  } catch (error) {
    response(res, 500, error.message);
  }
}