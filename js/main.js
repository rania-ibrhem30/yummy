if($(".main-container").children().hasClass("meals")){
  let allMeals = [];
  async function getMealBy() {
    var meal = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );
    var mealRes = await meal.json();
    allMeals = mealRes.meals;
    displayMeals();
  }
  getMealBy();
  
  function displayMeals() {
    let cartona = ``;
    for (var i = 0; i < allMeals.length; i++) {
      cartona += `<div class="meal_card col-md-6 col-lg-3 my-3 position-relative text-center">
                 <a href="meal.html?id=${allMeals[i].idMeal}"><img src="${allMeals[i].strMealThumb}"class="w-100 img-fluid h-100 rounded">
                 <div class="name flex-column-center fw-normal">
                  <p class="font-lighter">${allMeals[i].strMeal}</p>
                 </div></a>
                 </div>`;
    }
    document.getElementById("rowData").innerHTML = cartona;
  }
}


if($(".main-container").children().hasClass("meal")){
  let params = (new URL(document.location)).searchParams;
  let param = params.get("id");
  async function getMealDetails(){
    var mealDetails = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${param}`
    );
    var mealRes = await mealDetails.json();
    var customMeal = mealRes.meals[0]
    setTimeout(() => {
      for(i=1;i<=20;i++){
      if(`${customMeal[`strIngredient${i}`]}` != ""){
        $('.recipes')[0].innerHTML += `
        <p class="text-dark alert alert-success p-1 d-inline-block mt-1">${customMeal[`strIngredient${i}`]}</p>
        
        `
      }
      }
      for(i=1;i<=20;i++){
      if(`${customMeal[`strMeasure${i}`]}` != " " && `${customMeal[`strMeasure${i}`]}` != ""){
        $('.tags')[0].innerHTML += `
        <p class="text-dark alert alert-danger p-1 d-inline-block mt-1">${customMeal[`strMeasure${i}`]}</p>
        
        `
      }
      }
    }, 0);
    meal.innerHTML = `
    <div class="col-lg-3">
        <img src="${customMeal.strMealThumb}" class="img-fluid w-100" height="150" alt="">
        <h1 class="text-center text-light fw-lighter">${customMeal.strMeal}</h1>
    </div>
    <div class="col-lg-9 text-light">
        <h2 class="fw-light">Instructions</h2>
        <p class="fw-light">${customMeal.strInstructions}</p>
        <p><span class="fw-bold fs-6">Area</span> : ${customMeal.strArea}</p>
        <p><span class="fw-bold fs-6">Category</span> : ${customMeal.strCategory}</p>
        <h2>Recipes :</h2>
        <div class="recipes d-flex flex-wrap gap-2"></div>
        <h2>Tags :</h2>
        <div class="tags d-flex flex-wrap gap-2">
        </div>
        <div class="text-start mt-5">
            <a href="${customMeal['strSource']}" target="_blank" class="m-0"><button class="btn btn-success me-2">Source</button></a>
            <a href="${customMeal['strYoutube']}" target="_blank" class="m-0"><button class="btn btn-danger">Youtube</button></a>
        </div>
    </div>
    `
  }
  getMealDetails()
}

if($(".main-container").children().hasClass("categories")){
  async function getCategories(){
    var categories = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    var categoriesRes = await categories.json();
    categoriesRes['categories'].forEach(category => {
      categories_row.innerHTML += `
      <div div class="meal_card col-md-6 col-lg-3 my-3 position-relative text-center">
          <a href="filtred_category.html?name=${category.strCategory}"><img src="${category.strCategoryThumb}"class="w-100 img-fluid h-100 rounded">
          <div class="name flex-column-center fw-normal">
          <div>
          <p class="font-lighter"><span class="d-block fs-3">${category.strCategory}</span><span class="d-block fs-6">${category.strCategoryDescription.substr(0,60)}...</span></p>
          </div>
          </div>
          </a>
        </div>
      `
    });

  }
  getCategories()
}


if($(".main-container").children().hasClass("filtered_category")){
  let params = (new URL(document.location)).searchParams;
  let param = params.get("name");

  async function get_filtered_category(){
    var filtered_category = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${param}`
    );
    var filtered_categoryRes = await filtered_category.json();
    console.log(filtered_categoryRes)
    filtered_categoryRes['meals'].forEach(category => {
      filtered_category_div.innerHTML += `<div class="meal_card col-md-6 col-lg-3 my-3 position-relative text-center">
      <a href="meal.html?id=${category.idMeal}"><img src="${category.strMealThumb}"class="w-100 img-fluid h-100 rounded">
      <div class="name flex-column-center fw-normal">
       <p class="font-lighter fs-4">${category.strMeal}</p>
      </div></a>
      </div>`;
    });
  }
  get_filtered_category()
}
if($(".main-container").children().hasClass("area")){
  async function getArea(){
    var getArea = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    var area_res = await getArea.json();
    area_res['meals'].forEach(area => {
      console.log(area['strArea'])
      area_div.innerHTML += `
      <div class="col-lg-3 text-center text-light shadow p-3">
          <div class="d-flex justify-content-center place-items-center">
            <a href="filtered_area.html?name=${area['strArea']}">
              <i class="fa fa-city fs-1 city-icon"></i>
              <h2 class="fw-lighter m-0">${area['strArea']}</h2>
            </a>
          </div>
      </div>
      `
    });
  }
  getArea()
}

if($(".main-container").children().hasClass("filtered_area")){
  let params = (new URL(document.location)).searchParams;
  let param = params.get("name");

  async function get_filtered_area(){
    var filtered_category = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${param}`
    );
    var filtered_categoryRes = await filtered_category.json();
    console.log(filtered_categoryRes)
    filtered_categoryRes['meals'].forEach(category => {
      filtered_area_div.innerHTML += `<div class="meal_card col-md-6 col-lg-3 my-3 position-relative text-center">
      <a href="meal.html?id=${category.idMeal}"><img src="${category.strMealThumb}"class="w-100 img-fluid h-100 rounded">
      <div class="name flex-column-center fw-normal">
       <p class="font-lighter fs-4">${category.strMeal}</p>
      </div></a>
      </div>`;
    });
  }
  get_filtered_area()
}


if($(".main-container").children().hasClass("ingredients")){
  async function getingredients(){
    var getIngredients = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    var ingredients_res = await getIngredients.json();
    for(i=0;i<ingredients_res['meals'].length - 550;i++){
      ingredients_div.innerHTML += `
      <div class="col-lg-3 text-center text-light shadow p-3">
          <div class="d-flex justify-content-center place-items-center">
            <a href="filtered_ingredients.html?name=${ingredients_res['meals'][i]['strIngredient']}">
              <i class="fa fa-bowl-food fs-1 text-success city-icon"></i>
              <h2 class="fw-lighter m-0">${ingredients_res['meals'][i]['strIngredient']}</h2>
            </a>
          </div>
      </div>
      `
    }
    ingredients_res['meals'].forEach(ingredient => {

    });
  }
  getingredients()
}

if($(".main-container").children().hasClass("filtered_ingredients")){
  let params = (new URL(document.location)).searchParams;
  let param = params.get("name");

  async function get_filtered_area(){
    var filtered_category = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${param}`
    );
    var filtered_categoryRes = await filtered_category.json();
    filtered_categoryRes['meals'].forEach(category => {
      filtered_ingredients_div.innerHTML += `<div class="meal_card col-md-6 col-lg-3 my-3 position-relative text-center">
      <a href="meal.html?id=${category.idMeal}"><img src="${category.strMealThumb}"class="w-100 img-fluid h-100 rounded">
      <div class="name flex-column-center fw-normal">
       <p class="font-lighter fs-4">${category.strMeal}</p>
      </div></a>
      </div>`;
    });
  }
  get_filtered_area()
}

// https://www.themealdb.com/api/json/v1/1/search.php?s

// https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken
// https://www.themealdb.com/api/json/v1/1/filter.php?a=British




//   let allcate =[];
// async function getMealBycate() {
//   var meal = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
//   var mealRes = await meal.json();
//   console.log(mealRes);

//   allcate= mealRes.categories;
//   console.log(allcate)

//   displayMealscat();
// }
//   getMealBycate ();

// function displayMealscat(){
//   let cartona =``;
//   for(var i = 0; i<allcate.length; i++){
//     cartona +=`<div div class="meal_card col-md-6 col-lg-3 my-3 position-relative text-center">
//                <img src="${allcate[i].strCategoryThumb}class="w-75 rounded">
//                <div class=" name flex-column-center">
//                 <h4 class="text-black">${allcate[i].strCategory}</h4>
//                </div>
//                </div>`
//  }
//  document.getElementById('rowData').innerHTML = cartona

//   }

$(function () {
  ("use strict");
  $(".open-btn i").on("click", function () {
    
    $(".aside-nav").toggleClass("active");

  });
});
