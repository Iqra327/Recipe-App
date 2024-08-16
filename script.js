const searchBox = document.querySelector('.js-search-box');
const searchBtn = document.querySelector('.js-search-btn');
const viewRecipeBtn = document.querySelector('.js-view-recipe-btn');
const recipeContainer = document.querySelector('.js-recipe-container');

const html = `
  <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
    <div class="card">
      <img class="card-img-top" src="" alt="Card image cap">
      <div class="card-body text-center">
        <h5 class="card-title"></h5>
        <p class="card-text"></p>
        <a href="#" class="btn btn-view-recipe js-view-recipe-btn">View Recipe</a>
      </div>
    </div>
  </div>
`

async function getRecipe(recipeName){
  try {
    if(recipeName.trim() != '')
    {
      console.log('fetching');
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
        recipeContainer.innerHTML += html;       
      console.log(meal);
      });
    }else{
      console.log('type something');
    }
  } catch (error) {
      console.log('failed');
  }

}

searchBtn.addEventListener('click', () => {
  const inputRecipe = searchBox.value.trim();
  getRecipe(inputRecipe);
});

/*
      
*/
