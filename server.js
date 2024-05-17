// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// // Stel het basis endpoint in
const apiUrl = "https://fdnd-agency.directus.app/items/"
const apiFamily = (apiUrl + 'oba_family')
const apiProfile = (apiUrl + 'oba_profile')
const apiItem = (apiUrl + 'oba_item?fields=*,afbeelding.id,afbeelding.height,afbeelding.width')

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))

app.get('/', function (request, response) {
    fetchJson(apiFamily).then((apiFamily) => {
        response.render('index',{
            // apiUser: apiUser.data
        })
    })
})

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8001)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})



// Route voor individuele overview pagina.

app.get('/user-overview/:id', function(request, response) {
    const userId = request.params.id;
    fetchJson(apiProfile + `/${userId}?fields=*,linked_item.oba_item_id.*`).then((userData) => {
        response.render('user-overview', { data: userData.data });
    });
});


// Route voor overview pagina voor de familie

app.get('/user-all', function(request, response) {
    fetchJson(apiUrl + `/oba_profile?fields=id`).then((userData) => {
        const ids = userData.data.map(item => item.id);
        const users = [];
        ids.forEach(id => {
            users.push(fetchJson(apiProfile + `/${id}?fields=*,linked_item.oba_item_id.*`));
        });
        

        Promise.all(users)
            .then(linkedItemsArray => {
                linkedItemsArray.forEach(linkedItems => {
                });
                response.render('user-all', { data: linkedItemsArray });
            })      
    })
});
