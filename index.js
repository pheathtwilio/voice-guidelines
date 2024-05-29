const axios = require('axios')
const cheerio = require('cheerio')

const getCountriesFromURL = async (url) => {

    try {
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)
        const countries = []

        const guidelineCountryList = '#guidelineCountryList > div > div.grid-container.three-columns.default.medium-gap'

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

const getLocaleSummary = async (url) => {

    try{

        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        const localeSummaryTable = '#guideline-tables > div > div:nth-child(1) > div > div > table > tbody'
        const localeSummary = []

        $(localeSummaryTable).find('tr').each((index, row) => {

            localeSummary.push({
                [($(row).find('td:nth-child(1)').text()).trim()]:($(row).find('td:nth-child(2)').text()).trim()
            })

        })

        return localeSummary

    }catch (error) {
        console.error(`Error: ${error}`)
    }
}

const countries = getCountriesFromURL('https://www.twilio.com/en-us/guidelines/voice')

const localeSummary = getLocaleSummary('https://www.twilio.com/en-us/guidelines/ar/voice')