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

const getReachability = async (url) => {

    try{

        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        const reachabilityTable = '#guidelineTable_c4 > div > div > table > tbody'
        const reachability = []

        $(reachabilityTable).find('tr').each((index, row) => {

            reachability.push({
                [($(row).find('td:nth-child(1)').text()).trim()]:{inbound:$(row).find('td:nth-child(2)').text().trim(), outbound:$(row).find('td:nth-child(3)').text().trim()}
            })

        })

        return reachability

    }catch (error) {
        console.error(`Error: ${error}`)
    }
}

const getCallerID = async (url) => {

    try{

        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        const callerTable = '#guideline-tables > div > div:nth-child(3) > div > div > table > tbody'
        const callerids = []

        $(callerTable).find('tr').each((index, row) => {

            callerids.push({
                [($(row).find('td:nth-child(1)').text()).trim()]:{inbound:$(row).find('td:nth-child(2)').text().trim(), outbound:$(row).find('td:nth-child(3)').text().trim()}
            })

        })

        console.log(callerids)

        return callerids

    }catch (error) {
        console.error(`Error: ${error}`)
    }
}

const getDTMF = async (url) => {

    try{

        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        const dtmfTable = '#guideline-tables > div > div:nth-child(4) > div > div > table > tbody'
        const dtmfs = []

        $(dtmfTable).find('tr').each((index, row) => {

            dtmfs.push({
                [($(row).find('td:nth-child(1)').text()).trim()]:($(row).find('td:nth-child(2)').text()).trim()
            })

        })

        console.log(dtmfs)

        return dtmfs

    }catch (error) {
        console.error(`Error: ${error}`)
    }
}

const getEmergencyCalling = async (url) => {

    try{

        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        const emergencyCallingTable = '#guideline-tables > div > div:nth-child(5) > div > div > table > tbody'
        const emergencies = []

        $(emergencyCallingTable).find('tr').each((index, row) => {

            emergencies.push({
                [($(row).find('td:nth-child(1)').text()).trim()]:($(row).find('td:nth-child(2)').text()).trim()
            })

        })

        console.log(emergencies)

        return emergencies

    }catch (error) {
        console.error(`Error: ${error}`)
    }
}



const countries = getCountriesFromURL('https://www.twilio.com/en-us/guidelines/voice')

const localeSummary = getLocaleSummary('https://www.twilio.com/en-us/guidelines/ar/voice')

const reachability = getReachability('https://www.twilio.com/en-us/guidelines/ar/voice')

const callerids = getCallerID('https://www.twilio.com/en-us/guidelines/ar/voice')

const dtmfs = getDTMF('https://www.twilio.com/en-us/guidelines/ar/voice')

const emergencies = getEmergencyCalling('https://www.twilio.com/en-us/guidelines/ar/voice')