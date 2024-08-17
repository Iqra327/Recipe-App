const searchBox = document.querySelector('.js-search-box');
const searchBtn = document.querySelector('.js-search-btn');
const recipeContainer = document.querySelector('.js-recipe-container');
const heading = document.querySelector('.js-heading');

async function getRecipe(recipeName){
  try {
    recipeContainer.innerHTML = ''; 
  
    if(recipeName.trim() != '')
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
        heading.innerText = '';
        recipeContainer.innerHTML += html;
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

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const inputRecipe = searchBox.value.trim();
  getRecipe(inputRecipe);
});

recipeContainer.addEventListener('click', (e) => {
  if (e.target && e.target.matches('.js-view-recipe-btn')) {
    e.preventDefault();
    
  }
});  