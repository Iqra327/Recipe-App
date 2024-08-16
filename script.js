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

searchBox.addEventListener('input', () => {
  const inputRecipe = searchBox.value;
});

function getRecipe(){

}

searchBtn.addEventListener('click', getRecipe);

/*
      
*/
