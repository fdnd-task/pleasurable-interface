// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }))

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8009)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
    // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get('port')}`)
})

// Stel het basis endpoint in
const apiUrl = 'https://fdnd-agency.directus.app/items'

const sdgData = await fetchJson(apiUrl + '/hf_sdgs?fields=*,icon.id,icon.height,icon.width'),
    stakeholdersData = await fetchJson(apiUrl + '/hf_stakeholders?filter={"company_id":2}'),
    scoresData = await fetchJson(apiUrl + '/hf_scores'),
    companiesData = await fetchJson(apiUrl + '/hf_companies/2')

console.log(companiesData.data.name)

// ROUTES -----------------------------------------------------------
app.get('/', function (request, response) {
    response.render('index', {
        sdgs: sdgData.data,
        stakeholder: stakeholdersData.data,
        score: scoresData.data,
        company: companiesData.data,
    })
})

// @ruben: verander wat je moet veranderen, denk niet dat ik die routes goed heb gedaan.

app.get('/dashboard/:id', function (request, response) { // @ruben: Moet dit :id zijn of kan :company_id ook ?
    response.render('dashboard', {
        sdgs: sdgData.data,
        stakeholder: stakeholdersData.data,
        score: scoresData.data,
        company: companiesData.data,
    })
})

// VRAGENLIJST -----------------------------------------------------
app.get('/gegevens-form/:id', function (request, response) { // @ruben: Moet dit :id zijn of kan :stakeholder_type ook ?
    response.render('dashboard', {
        sdgs: sdgData.data,
        stakeholder: stakeholdersData.data,
        score: scoresData.data,
        company: companiesData.data,
    })
})

app.get('/sdg-form', function (request, response) { // @ruben: Geen idee of hier ook :id moet staan ben lost
    response.render('dashboard', {
        sdgs: sdgData.data,
        stakeholder: stakeholdersData.data,
        score: scoresData.data,
        company: companiesData.data,
    })
})

app.get('/score-form', function (request, response) { // @ruben: etc.
    response.render('dashboard', {
        sdgs: sdgData.data,
        stakeholder: stakeholdersData.data,
        score: scoresData.data,
        company: companiesData.data,
    })
})

app.get('/done', function (request, response) {// @ruben: etc.
    response.render('dashboard', {
        sdgs: sdgData.data,
        stakeholder: stakeholdersData.data,
        score: scoresData.data,
        company: companiesData.data,
    })
})

