const overlay = document.querySelector('.js-overlay');
const searchBox = document.querySelector('.js-search-box');
const searchBtn = document.querySelector('.js-search-btn');
const recipeContainer = document.querySelector('.js-recipe-container');
const recipeDetailsContainer = document.querySelector('.js-recipe-details-container');
const heading = document.querySelector('.js-heading');

async function getRecipe(recipeName){
  try {
    recipeContainer.innerHTML = ''; 
  
    if(recipeName)
    {
      heading.innerText = 'Just a few seconds, loading your recipes...';
      const data =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`);
      const response =await data.json();
  
      response.meals.forEach(meal => {
        const html = `
          <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div class="card pb-3">
              <img class="card-img-top" src="${meal.strMealThumb}" alt="Card image cap">
              <div class="card-body text-center">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strArea} Dish <br>Belongs to ${meal.strCategory} category</p>
                <a href="#" class="btn btn-view-recipe js-view-recipe-btn">View Recipe</a>
              </div>
            </div>
          </div>
        `

        const cardElement = document.createElement('div');
        cardElement.innerHTML = html;
        const viewRecipeBtn = cardElement.querySelector('.js-view-recipe-btn');
        viewRecipeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          recipeDetails(meal);
          recipeDetailsContainer.style.display = 'block';
          overlay.style.display = 'block';
        });

        recipeContainer.appendChild(cardElement.firstElementChild);

        heading.innerText = '';
      });
    }
    else{
      heading.innerText = 'Type a recipe name please!!';
    }
  } 
  catch (error) {
      heading.innerText = 'An unexpected error occur, Try again.';
  }
};

function recipeIngredients(meal){
  let ingredientsList = '';
  for(let i = 1; i<=20; i++){
    const ingredient = meal[`strIngredient${i}`]
    if(ingredient){
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    }else{
      break;
    }
  }
  return ingredientsList;
};

function recipeDetails(meal){
  const html = `
    <div class="all-recipes-detail d-flex flex-column mx-auto p-3">
      <div class="recipe-close-btn ms-auto">
        <i class="fa-solid fa-square-xmark fa-xl" style="color: #6b050a;"></i>
      </div>
      <div class="recipe-details">
        <h2 class="text-center">${meal.strMeal}</h2>
        <p class="text-center">${meal.strArea} ${meal.strCategory}</p>
        <img src="${meal.strMealThumb}" alt="Image of ${meal.strMeal}" class="img-fluid">
        <h5 class="mt-2">Ingredients</h5>
        <ul class="mt-1">${recipeIngredients(meal)}</ul>
        <h5 class="mt-2">Instructions</h5>
        <p class="text-break mealInstructions">${meal.strInstructions}</p>
      </div>
    </div>
  `
  recipeDetailsContainer.innerHTML = html; 
};

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const inputRecipe = searchBox.value.trim();
  getRecipe(inputRecipe);
});  

recipeDetailsContainer.addEventListener('click', (e) => {
  if(e.target && e.target.matches('.fa-square-xmark')){
    recipeDetailsContainer.style.display = 'none';
    overlay.style.display = 'none';
  }
});