import axios from 'axios'
export const callApi = {
  getCountries,
  getByCountryTotal,
  getDataGlobal
}

async function getCountries() {
  return await axios.get('https://api.covid19api.com/countries')
}

async function getDataGlobal() {
  return await axios.get('https://api.covid19api.com/summary')
}
async function getByCountryTotal(nameCountry) {
  return await axios.get(`https://corona.lmao.ninja/v3/covid-19/historical/${nameCountry}?lastdays=30`)
}