import React, { Component, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Loader from "react-loader-spinner";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AboutUs from "./components/AboutUs";
import AllRecipes from "./components/AllRecipes";
import AddRecipe from "./components/AddRecipe";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import ConfirmDelete from "./components/ConfirmDelete";
import RecipeDetails from "./components/RecipeDetails";
import AuthService from "./components/auth/auth-services";
import APIAccess from "./components/api/api-access";
import EditRecipe from './components/EditRecipe'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Footer from "./components/Footer";
//Test
//Test 2
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishTypesArr: [
        "Main Course",
        "Side Dish",
        "Dessert",
        "Appetizer",
        "Salad",
        "Bread",
        "Breakfast",
        "Soup",
        "Beverage",
        "Sauce",
        "Marinade",
        "Fingerfood",
        "Snack",
        "Drink"
      ],
      cuisinesArr: [
        "African",
        "American",
        "British",
        "Cajun",
        "Caribbean",
        "Chinese",
        "Eastern European",
        "European",
        "French",
        "German",
        "Greek",
        "Indian",
        "Irish",
        "Italian",
        "Japanese",
        "Jewish",
        "Korean",
        "Latin American",
        "Mediterranean",
        "Mexican",
        "Middle Eastern",
        "Nordic",
        "Southern",
        "Spanish",
        "Thai",
        "Vietnamese"
      ],
      difficultLevelArr: ["Easy", "Medium", "Hard"],
      //info from search and filters in Navbar
      searchWord: "",
      searchDishType: "",
      searchCuisine: "",
      searchCookingLevel: "",
      searchVeganOnly: "",
      //auth info
      loggedInUser: null,
      // info from API
      allRecipes: [],
      displayedRecipes: [],
      // messages from API
      message: "",
      successMessage: false,
  
      loader: true,
    };
    this.service = new AuthService();
    this.apiEndpoints = new APIAccess();
    this.getUser = this.getUser.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
    this.getRecipes = this.getRecipes.bind(this);
    this.getVeganState = this.getVeganState.bind(this);
    this.getSearchWord = this.getSearchWord.bind(this);
    this.getFilters = this.getFilters.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.filterNavBar = this.filterNavBar.bind(this);
    this.resetNavBar = this.resetNavBar.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  resetNavBar(){
    let givenDisplayedRecipes = this.state.allRecipes
    this.setState({
      displayedRecipes: givenDisplayedRecipes
    });
  }

  filterNavBar(){
      let givenDisplayedRecipes = this.state.allRecipes
      if (this.state.searchWord !== '') {
        givenDisplayedRecipes = givenDisplayedRecipes.filter(e => {
          let givenSearchWord = this.state.searchWord.toUpperCase();
          return (
            ((e.ingredients.length > 0) ? e.ingredients[0].toUpperCase().includes(givenSearchWord) : false)
            || ((e.name.length > 0) ? e.name.toUpperCase().includes(givenSearchWord) : false)
            || ((e.description.length > 0) ? e.description.toUpperCase().includes(givenSearchWord) : false)
              )
        })
      }
    if (this.state.searchDishType !== '') {
      givenDisplayedRecipes = givenDisplayedRecipes.filter(e => {
        return (e.dishTypes.includes(this.state.searchDishType))
      })
    }
    if (this.state.searchCuisine !== '') {
      givenDisplayedRecipes = givenDisplayedRecipes.filter(e => {
        return (e.cuisines.includes(this.state.searchCuisine))
      })
    }
    if (this.state.searchVeganOnly === true) {
      givenDisplayedRecipes = givenDisplayedRecipes.filter(e => {
        return (e.vegan === true)
      })
    }
    this.setState({
      displayedRecipes: givenDisplayedRecipes
    });
}

  componentDidMount() {
    this.getRecipes();
    console.log(this.state.allRecipes)
  }
  getFilters(filter, selection) {
    switch (filter) {
      case "searchDishType":
        this.setState({
          searchDishType: selection
        });
        break;
      case "searchCuisine":
        this.setState({
          searchCuisine: selection
        });
        break;
      case "searchCookingLevel":
        this.setState({
          searchCookingLevel: selection
        });
        break;
      default:
        break;
    }
    this.getRecipes();
    this.filterNavBar();
    console.log(this.state)
  }
  getSearchWord(word) {
    console.log(word);
    this.setState({
      searchWord: word
    });
    this.getRecipes();
    this.filterNavBar();
  }
  getVeganState(boolean) {
    console.log(boolean);
    this.setState({
      searchVeganOnly: boolean
    });
    this.getRecipes();
    this.filterNavBar();
  }

  getMessage(type, apiMessage) {
    let typeOfMessage = false;

    if (type === 200) {
      typeOfMessage = true;
    } else {
      typeOfMessage = false;
    }

    this.setState({
      message: apiMessage,
      successMessage: typeOfMessage,
    });

    setTimeout(this.clearMessage, 5000);
  }

  clearMessage(){
    this.setState({
      message: '',
      successMessage: false,
    });
  }
  getRecipes() {
    this.apiEndpoints
      .getAllRecipes()
      .then(response => {
        this.setState({
          allRecipes: response.data,
          loader: false,
        });
        this.filterNavBar()
      })
      .catch(err => console.log(err));
  }
  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response.data
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }
  getUser(user) {
    this.setState({
      loggedInUser: user
    });
  }

  render() {
    console.log(this.state.loggedInUser);
    console.log(this.state.message);
    console.log(this.state);
    // console.log(this.state.successMessage);
    this.fetchUser();
    return (
      <div className="App">
        {this.state.loader ? (
          <div className='d-flex align-items-center justify-content-center' style={{ height:'80vh'}}>
            <Loader type="Puff" color="#76ff03" height={200} width={200} />
          </div>
        ) : (
          <>  
            <Navbar
              allData={this.state}
              getUser={this.getUser}
              getSearchWord={this.getSearchWord}
              getVeganState={this.getVeganState}
              getFilters={this.getFilters}
              getMessage={this.getMessage}
            />
            <Switch>
              <Route exact path="/" render={(props) => (
                <Home message={this.state.message} successMessage={this.state.successMessage} {...props} />
              )} />
              <Route
                exact
                path="/login"
                render={(props) => (
                  <Login
                    loggedInUser={this.state.loggedInUser}
                    getUser={this.getUser}
                    message={this.state.message}
                    successMessage={this.state.successMessage}
                    getMessage={this.getMessage} 
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/signup"
                render={props => (
                  <Signup
                    loggedInUser={this.state.loggedInUser}
                    getUser={this.getUser}
                    message={this.state.message}
                    successMessage={this.state.successMessage}
                    getMessage={this.getMessage} 
                    {...props}
                  />
                )}
              />
              <Route exact path="/aboutus" component={AboutUs} />
              <Route
                exact
                path="/allrecipes"
                render={props => <AllRecipes allData={this.state} {...props} />}
              />
              <Route
                exact
                path="/addrecipe"
                render={props => <AddRecipe allData={this.state} message={this.state.message} successMessage={this.state.successMessage} getMessage={this.getMessage} {...props} />}
              />
              <Route
                exact
                path="/user/:username"
                render={props => (
                  <Profile message={this.state.message} loggedInUser={this.state.loggedInUser} successMessage={this.state.successMessage} allRecipes={this.state.allRecipes} {...props} />
                )}
              />
              <Route
                exact
                path="/user/:username/edit"
                render={props => (
                  <EditProfile message={this.state.message} successMessage={this.state.successMessage} getMessage={this.getMessage} {...props} />
                )}
              />
              <Route
                exact
                path="/recipe/:recipeID"
                render={(props) => (
                  <RecipeDetails
                    allRecipes={this.state.allRecipes} message={this.state.message} successMessage={this.state.successMessage} loggedInUser={this.state.loggedInUser}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path='/recipe/:recipeID/edit'
                render={props => (
                  <EditRecipe
                    allData={this.state}
                    loggedInUser={this.state.loggedInUser}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/recipe/:recipeID/delete"
                render={(props) => (
                  <ConfirmDelete
                    loggedInUser={this.state.loggedInUser}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/user/:username/delete"
                render={(props) => (
                  <ConfirmDelete loggedInUser={this.state.loggedInUser} getMessage={this.getMessage} successMessage={this.successMessage} getUser={this.getUser} {...props} />
                )}
              />

            </Switch>
            <Footer />
          </>
        )}
      </div>
    );
  }
}
export default App;