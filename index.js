const axios = require('axios')
const cheerio = require('cheerio')

const getCountriesFromURL = async (url) => {

    try {
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)
        const countries = []

        const guidelineCountryList = '#guidelineCountryList > div > div.grid-container.three-columns.default.medium-gap'

        console.log($(guidelineCountryList).children().length)

        $(guidelineCountryList).children().each((index, element) => {

            var country = {
                name: $(element).children('div').children('div').children('h4').text().trim(),
                link: $(element).children('div').children('a').attr('href')
            }

            countries.push(country)

        })

        return countries

    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

const countries = getCountriesFromURL('https://www.twilio.com/en-us/guidelines/voice')
