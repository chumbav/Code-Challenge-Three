let tickets_list = document.querySelector('.tickets-list')
let details = document.querySelector('.ticket-details')

fetch('http://localhost:4000/films')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        displayTickets(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

function displayTickets(films) {
    for(let film of films){
        let ticket = document.createElement('li')
        ticket.innerHTML = `
            <p>${film.title}</p>
        `
        let availableTickets = film.capacity - film.tickets_sold
        tickets_list.appendChild(ticket)
        ticket.onclick = ()=>{
            details.innerHTML=`
                <img height="500" src="${film.poster}" alt="${film.title}">
                <p>${film.description}</p>
                <p>${film.runtime}</p>
                <p>${availableTickets}</p>
                <button>Buy ticket</button>
            `
            let btn = document.querySelector('button')
            btn.onclick = ()=>{
                film.tickets_sold += 1
                availableTickets = film.capacity - film.tickets_sold
                details.innerHTML=`
                    <img height="500" src="${film.poster}" alt="${film.title}">
                    <p>${film.description}</p>
                    <p>${film.runtime}</p>
                    <p>${availableTickets}</p>
                    <button>Buy ticket</button>
                `
                let final = {tickets_sold : film.tickets_sold}
                fetch(`http://localhost:4000/films/${film.id}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(final)
                })
                .then(res=>res.json())
                .then((data)=>console.log(data))
            }
        }
    }
}
