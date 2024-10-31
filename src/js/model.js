export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    if (!res.ok) throw new Error(`${data.message} , ${res.status}`);
    // console.log(res);
    const data = await res.json();
    // console.log(data);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      src: recipe.source_url,
      servings: recipe.servings,
      title: recipe.title,
    };
    // console.log(state.recipe);
  } catch (err) {
    console.log(err);
  }
};
