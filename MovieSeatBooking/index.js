const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.querySelector('#count')
const total = document.querySelector('#total')
const movieSelect = document.querySelector('#movie')

populateUI();

let ticketPrice = +movieSelect.value


//Save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice',moviePrice)
}
//Update total and count
const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const selectedSeatsCount = selectedSeats.length;    
    
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}

// Get Data from localstorage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, i)=> {
            if(selectedSeats.indexOf(i) > -1){
                seat.classList.add('selected')
            }
        })
    }    
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Movie Select Event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount();
})

//Seat click event
container.addEventListener('click', (e) => {
    if(
        e.target.classList.contains('seat') && 
        !e.target.classList.contains('occupied'
    )) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

//initial count and total set
updateSelectedCount()