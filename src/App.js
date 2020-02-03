import React, { Component, useLayoutEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AboutUs from './components/AboutUs';
import AllRecipes from './components/AllRecipes';
import AddRecipe from './components/AddRecipe';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import RecipeDetails from './components/RecipeDetails';
import AuthService from './components/auth/auth-services';
import APIAccess from './components/api/api-access';
// import EditRecipe from './components/EditRecipe'


//Test

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      dishTypesArr: ["Main Course", "Side Dish", "Dessert", "Appetizer", "Salad", "Bread", "Breakfast", "Soup", "Beverage", "Sauce", "Marinade", "Fingerfood", "Snack", "Drink"],
      cuisinesArr: ["African", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European", "European", "French", "German", "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"],
      difficultLevelArr: ['Easy', 'Medium', 'Hard'],

      //info from search and filters in Navbar
      searchWord: '',
      searchDishType: '',
      searchCuisine: '',
      searchCookingLevel: '',
      //auth info
      loggedInUser: null,
      // info from API
      allRecipes: [],
      // messages from API
      message: '',
    }
    this.service = new AuthService();
    this.apiEndpoints = new APIAccess();
    this.getUser = this.getUser.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
    this.getRecipes = this.getRecipes.bind(this);
    this.getSearchWord = this.getSearchWord.bind(this);
    this.getMessage = this.getMessage.bind(this);
  }
  
  componentDidMount() {
    this.getRecipes();
  }

  getFilters(filter, option) {
    switch (filter) {
      case 'dishType':
        break;
      case 'cuisine':
        break;
      case 'level':
        break;
      default:
        break;
    }
  }
  
  getSearchWord(word) {
    this.setState({
      searchWord: word,
    });
  }

  getMessage(apiMessage) {
    console.log(apiMessage);
    this.setState({
      message: apiMessage,
    });
  }
  
  getRecipes() {
    this.apiEndpoints.getAllRecipes()
    .then(response => {
      this.setState({
        allRecipes: response,
      })
    })
    .catch(err => console.log(err));
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service.loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser:false
          });
        });
    }
  }

  getUser(user) {
    this.setState({
      loggedInUser: user,
    });
  }

  render(){
    console.log(this.state.loggedInUser);
    console.log(this.state.allRecipes);
    console.log(this.state.searchWord);
    this.fetchUser();
    return (
      <div className="App">
        <Navbar allData={this.state} getUser={this.getUser} getSearchWord={this.getSearchWord} getFilters={this.getFilters} />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' render={(props) => <Login loggedInUser={this.state.loggedInUser} getUser={this.getUser} {...props} />} />
          <Route exact path='/signup' render={(props) => <Signup loggedInUser={this.state.loggedInUser} getUser={this.getUser} {...props} />}/>
          <Route exact path='/aboutus' component={AboutUs}/>
          <Route exact path='/allrecipes' render={(props) => <AllRecipes allRecipes={this.state.allRecipes} {...props} />} />
          <Route exact path='/addrecipe' render={(props) => <AddRecipe allData={this.state} {...props} /> } />
          <Route exact path='/user/:username' render={(props) => <Profile allRecipes={this.state.allRecipes} {...props} />} /> 
          <Route exact path='/user/:username/edit' render={(props) => <EditProfile getMessage={this.getMessage} message={this.state.message} {...props} />} /> 
          <Route exact path='/recipe/:recipeID' render={(props) => <RecipeDetails allRecipes={this.state.allRecipes} {...props} />} />
          {/* <Route exact path='/recipe/:id/edit' component={EditRecipe}/> */}
        </Switch>
      </div>
    );
  }
}

export default App;