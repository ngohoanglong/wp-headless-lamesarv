const { STORAGE_URL_2, CLOUDINARY_STORAGE_URL } = require("libs/const")

export const fixImageUrl = (url) => {
    return url.replace(STORAGE_URL_2, CLOUDINARY_STORAGE_URL)
}