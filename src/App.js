import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import AboutUs from './components/AboutUs'
import AllRecipes from './components/AllRecipes'
import AddRecipe from './components/AddRecipe'
// import Profile from './components/Profile'
// import EditProfile from './components/EditProfile'
import RecipeDetails from './components/RecipeDetails'
// import EditRecipe from './components/EditRecipe'



//Test

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      dishTypesArr: ["Main Course", "Side Dish", "Dessert", "Appetizer", "Salad", "Bread", "Breakfast", "Soup", "Beverage", "Sauce", "Marinade", "Fingerfood", "Snack", "Drink"],
      cuisinesArr: ["African", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European", "European", "French", "German", "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"],
      difficultLevelArr: ['Easy', 'Medium', 'Hard'],
      loggedInUser: null,
    }

    this.getUser = this.getUser.bind(this);
  }

  
  
  getUser(user) {
    this.setState({
      loggedInUser: user,
    })
}


  render(){
    console.log('logged out')
    return (
      <div className="App">
        <Navbar allData={this.state} loggedInUser={this.state.loggedInUser} />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' render={(props) => <Login loggedInUser={this.state.loggedInUser} getUser={this.getUser} {...props} />} />
          <Route exact path='/signup' render={(props) => <Signup loggedInUser={this.state.loggedInUser} getUser={this.getUser} {...props} />}/>
          <Route exact path='/aboutus' component={AboutUs}/>
          <Route exact path='/allrecipes' render={(props) => <AllRecipes recipes={[{name: 'Apple Pie'}, {name: 'Banana Split'}, {name: 'Feijoada'} ]} {...props} />} />
          <Route exact path='/addrecipe' render={(props) => <AddRecipe allData={this.state} {...props} /> } />
          {/* <Route exact path='/user/:username' component={Profile}/>  */}
          {/* <Route exact path='/user/:username/edit' component={EditProfile}/>  */}
          <Route exact path='/recipe/:id' component={RecipeDetails}/>
          {/* <Route exact path='/recipe/:recipeID/edit' component={EditRecipe}/> */}
        </Switch>
      </div>
    );
  }
}

export default App;