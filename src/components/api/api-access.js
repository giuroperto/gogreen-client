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
    console.log('editing user');
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

  addNewRecipe(owner, name, description, ingredients, dishTypes, vegan, cuisines, totalTimeMinutes, servings, instructions, picture) {
    return this.APIAccess.post('/add-a-new-recipe', { owner, name, description, ingredients, dishTypes, vegan, cuisines, totalTimeMinutes, servings, instructions, picture }).then(response => response.data);
  }
  
  deleteRecipe(recipeID) {
    return this.APIAccess.delete(`/recipe/${recipeID}/delete`).then(response => response.data);
  }

  handleUpload (theFile) {
    // console.log('file in service: ', theFile)
    return this.APIAccess.post('/upload', theFile).then(res => res.data);
  }

}

export default APIAccess;