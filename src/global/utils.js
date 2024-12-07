import { assetsImages } from '../global/importImages'

const convertName = (category, input) => {
    return category + input
        .replace(/ /g, "-")
        .split('-')
        .map(capitalize)
        .join('');
}


const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const getImage = (imageCategory, itemName) => {
    if (imageCategory === "shopCategories") return assetsImages[imageCategory][convertName("category", itemName)]
    else if (imageCategory === "shopProducts") return assetsImages[imageCategory][convertName("product", itemName)]
}


export { getImage }