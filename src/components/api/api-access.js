import axios from 'axios';

class APIAccess {
  constructor() {
    this.APIAccess = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true,
    });
  }

  getOneUser(username) {
    return this.APIAccess.get(`/user/${username}`).then(response => response.data);
  }

  editUser(username, firstName, lastName, email, usernameForm, oldPassword, newPassword) {
    return this.APIAccess.put(`/user/${username}`, { firstName, lastName, email, usernameForm, oldPassword, newPassword }).then(response => response.data);
  }

  deleteUser(username) {
    return this.APIAccess.delete(`/user/${username}`).then(response => response.data);
  }

  //recipes endpoints

  getAllRecipes() {
    return this.APIAccess.get('/allrecipes').then(response => response.data);
  }

  editRecipe(recipeID, name, description, ingredients, dishTypes, vegan, cuisines, totalTimeMinutes, servings, instructions, picture) {
    return this.APIAccess.put(`/recipe/${recipeID}/edit`, {name, description, ingredients, dishTypes, vegan, cuisines, totalTimeMinutes, servings, instructions, picture }).then(response => response.data);
  }

  getOneRecipe(recipeID) {
    return this.APIAccess.get(`/recipe/${recipeID}`).then(response => response.data);
  }

  addNewRecipe(name, description, ingredients, dishTypes, vegan, cuisines, totalTimeMinutes, servings, instructions, picture) {
    return this.APIAccess.post('/add-a-new-recipe', { name, description, ingredients, dishTypes, vegan, cuisines, totalTimeMinutes, servings, instructions, picture }).then(response => response.data);
  }
  
  deleteRecipe(recipeID) {
    return this.APIAccess.delete(`/recipe/${recipeID}/delete`).then(response => response.data);
  }
}

export default APIAccess;