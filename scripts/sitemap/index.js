require('dotenv').config();
const fs = require('fs');
var fetch = require('node-fetch');
var replaceall = require("replaceall");

const sitemapUrls = ["https://myrecvan.com/sitemap_index.xml", "https://myrecvan.com/post-sitemap.xml", "https://myrecvan.com/page-sitemap.xml", "https://myrecvan.com/e-landing-page-sitemap.xml", "https://myrecvan.com/category-sitemap.xml", "https://myrecvan.com/author-sitemap.xml"]
const getSitemap = async (url) => {
    const res = await fetch(url);
    // console.log({ res });
    let text = await res.text();
    let newtext = replaceall("https://myrecvan.com", process.env.NEXT_PUBLIC_HOST_URL, text)
    newtext = replaceall("//myrecvan.com", process.env.NEXT_PUBLIC_HOST_URL, newtext)
    const filename = 'public/' + url.replace('https://myrecvan.com/', '')
    fs.writeFile(filename, newtext, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(filename + ' writed!');
    });
    // console.log({ newtext });

    return newtext;
}
try {
    sitemapUrls.forEach(getSitemap)
} catch (error) {
    console.error(error)
}