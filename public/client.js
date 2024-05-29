const countriesListElement = window.document.getElementById('countries-list')

const getCountries = async (url) => {

    const response = await fetch('/getCountries', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({url: url})
      })

    const countryList = await response.json()

    countryList.countries.forEach(country => {
        const listElement = document.createElement('li')
        listElement.className = 'list-group-item'
        listElement.innerHTML = country.name 
        countriesListElement.appendChild(listElement)
    })
}

window.addEventListener("load", async () => {

    await getCountries('https://www.twilio.com/en-us/guidelines/voice')
    
})