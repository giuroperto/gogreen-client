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
import RecipeDetails from "./components/RecipeDetails";
// import Success from "./components/RecipeDetails";
// import Failure from "./components/RecipeDetails";
import AuthService from "./components/auth/auth-services";
import APIAccess from "./components/api/api-access";
// import EditRecipe from './components/EditRecipe'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
//Test
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
    this.getSearchWord = this.getSearchWord.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }
  componentDidMount() {
    this.getRecipes();
    console.log(this.state.allRecipes)
  }
  getFilters(filter, option) {
    switch (filter) {
      case "dishType":
        break;
      case "cuisine":
        break;
      case "level":
        break;
      default:
        break;
    }
  }
  getSearchWord(word) {
    console.log(word);
    this.setState({
      searchWord: word
    });
  }

  getMessage(type, apiMessage) {
    //TODO ajustar para quando for sucesso our nao

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
          allRecipes: response,
          loader: false,
        });
      })
      .catch(err => console.log(err));
  }
  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
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

  filterNavBar(){
    let givenDisplayedRecipes = this.state.allRecipes
    
    if (this.state.searchWord !== '') {
      givenDisplayedRecipes = givenDisplayedRecipes.filter(e => {
        let givenSearchWord = this.state.searchWord.toUpperCase();
        return (e.ingredients.toUpperCase().includes(givenSearchWord) || e.name.toUpperCase().includes(givenSearchWord) || e.description.toUpperCase().includes(givenSearchWord))
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

    this.setState({
      displayedRecipes: givenDisplayedRecipes
    });
  }


  render() {
    console.log(this.state.loggedInUser);
    console.log(this.state.allRecipes);
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
              getFilters={this.getFilters}
            />
            <Switch>
              <Route exact path="/" component={Home} />
              {/* <Route exact path="/success" component={Success} />
              <Route exact path="/failure" component={Failure} /> */}
              <Route
                exact
                path="/login"
                render={props => (
                  <Login
                    loggedInUser={this.state.loggedInUser}
                    getUser={this.getUser}
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
                render={props => <AddRecipe allData={this.state} {...props} />}
              />
              <Route
                exact
                path="/user/:username"
                render={props => (
                  <Profile message={this.state.message} successMessage={this.state.successMessage} allRecipes={this.state.allRecipes} {...props} />
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
                render={props => (
                  <RecipeDetails
                    allRecipes={this.state.allRecipes}
                    {...props}
                  />
                )}
              />
              {/* <Route exact path='/recipe/:id/edit' component={EditRecipe}/> */}
            </Switch>
          </>
        )}
      </div>
    );
  }
}
export default App;