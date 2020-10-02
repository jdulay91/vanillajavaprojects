const search = document.getElementById('search'),
submit = document.getElementById('submit'),
random = document.getElementById('random'),
mealsEl = document.getElementById('meals'),
resultHeading = document.getElementById('result-heading'),
single_mealEl = document.getElementById('single-meal');









//Fetch information from mealdb
function searchMeal(e){
    e.preventDefault();

    //clear meal
    single_mealEl.innerHTML= '';

    //get search value
    const term = search.value;

    //Check if there is a value to the search and display that to the dom
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {            
            resultHeading.innerHTML=`<h2>Search results for '${term}'</h2>`;
            console.log(data.meals)
            if(data.meals === null){
                resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`
            }else{
                mealsEl.innerHTML = data.meals.map((meal) => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div> `)
                .join('')
            }
        })
        search.value= '';
    } else{
        alert('Please enter a search term')
    }
}

//get mealby id
function getMealById(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        

        addMealToDOM(meal);

    })
}

//fetch random meal
function getRandomMeal(){
    //clear dom 
    mealsEl.innerHTML='';
    resultHeading.innerHTML='';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data=>{
        const meal = data.meals[0]
        addMealToDOM(meal);
    })
}
//add meal to dom
function addMealToDOM(meal){
    const ingredients = [];

    for(let i = 1; i <=20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        }else{
            break;
        }
    }

    single_mealEl.innerHTML = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="{meal.strMeal}"/>
        <div class="single-meal-info">
         ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
         ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
        </div>
        <div class="main">
          <p>${meal.strInstructions}</p>
          <h2>Ingredients</h2>
          <ul>
           ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
           </ul>
        </div>
    </div>`
}

//events
submit.addEventListener('submit',searchMeal)
submit.addEventListener('click',getRandomMeal)
mealsEl.addEventListener('click',e=>{
    const mealInfo = e.path.find(item=>{
        if(item.classList){
            return item.classList.contains('meal-info');
        }else {
            return false;
        }
    });

    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealid')
        getMealById(mealID)
    }
})