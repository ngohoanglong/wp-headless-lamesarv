var fetch = require('node-fetch');
var fs = require('fs')


let shouldPaginate = true
const getInstagramData = async (page) => {
    const data = await fetch("https://myrecvan.com/wp-admin/admin-ajax.php", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
        },
        "referrer": "https://myrecvan.com/gallery/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `action=sbi_load_more_clicked&offset=${(page - 1) * 20}&page=${page}&feed_id=sbi_17841443917890561%2320&atts=%7B%7D&location=content&post_id=91&current_resolution=150`,
        "method": "POST",
        "mode": "cors"
    })
    const jsonData = await data.json()
    shouldPaginate = jsonData.feedStatus.shouldPaginate
    const filename = `public/instagram_${page}.json`
    if (shouldPaginate) {
        await getInstagramData(page + 1)
    }
    fs.writeFile(filename, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(filename + ' writed!');
    });
}

getInstagramData(1)