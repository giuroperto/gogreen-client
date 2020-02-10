import axios from 'axios';

class APIAccess {
  constructor() {
    this.APIAccess = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  }

  getOneUser(username) {
    return this.APIAccess.get(`/user/${username}`).then(response => response);
  }

  editUser(username, firstName, lastName, email, usernameForm, oldPassword, newPassword, picture) {
    return this.APIAccess.put(`/user/${username}`, { firstName, lastName, email, usernameForm, oldPassword, newPassword, picture });
  }

  deleteUser(username) {
    return this.APIAccess.delete(`/user/${username}`).then(response => response);
  }

  //recipes endpoints

  getAllRecipes() {
    console.log('getrecipessss');
    return this.APIAccess.get('/allrecipes').then(response => response);
  }

  editRecipe(recipeID, name, description, ingredients, dishTypes, vegan, cuisines, totalTimeMinutes, servings, instructions, picture) {
    return this.APIAccess.put(`/recipe/${recipeID}/edit`, {name, description, ingredients, dishTypes, vegan, cuisines, totalTimeMinutes, servings, instructions, picture }).then(response => response);
  }

  getOneRecipe(recipeID) {
    return this.APIAccess.get(`/recipe/${recipeID}`).then(response => response);
  }

  addNewRecipe(owner, name, description, ingredients, dishTypes, vegan, cuisines, totalTimeMinutes, servings, instructions, picture) {
    return this.APIAccess.post('/add-a-new-recipe', { owner, name, description, ingredients, dishTypes, vegan, cuisines, totalTimeMinutes, servings, instructions, picture }).then(response => response);
  }
  
  deleteRecipe(recipeID) {
    return this.APIAccess.delete(`/recipe/${recipeID}/delete`).then(response => response);
  }

  handleUpload (theFile) {
    return this.APIAccess.post('/upload', theFile).then(res => res);
  }

  //reviews endpoints

  getOneReview(reviewID) {
    return this.APIAccess.get(`/review/${reviewID}`).then(response => response);
  }

  addReview(owner, score, difficulty, comment) {
    return this.APIAccess.post('/addreview', { owner, score, difficulty, comment }).then(response => response);
  }

  editReview(reviewID, score, difficulty, comment) {
    return this.APIAccess.put(`/review/${reviewID}`, { score, difficulty, comment}).then(response => response);
  }

  deleteReview(reviewID) {
    return this.APIAccess.delete(`/review/${reviewID}`).then(response => response);
  }

}

export default APIAccess;