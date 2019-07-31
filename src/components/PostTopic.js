import React, { Component } from "react";
import {
  RemoteMongoClient,
} from "mongodb-stitch-browser-sdk";
import { Stitch } from "mongodb-stitch-browser-sdk";

import {
    hasLoggedInUser,
    loginAnonymous,
    logoutCurrentUser,
    getCurrentUser,
  } from "./../stitch/authentication";


function callMe() {
    // loginAnonymous();
    // this.app = Stitch.initializeDefaultAppClient(this.APP_ID);
    // Get a MongoDB Service Client
    // This is used for logging in and communicating with Stitch
//     const appDefault = Stitch.hasAppClient(APP_ID)
//   ? Stitch.getAppClient(APP_ID)
//   : Stitch.initializeAppClient(APP_ID);
  
//   console.log('app from stitch folder: ', appDefault);
//   return appDefault

}


class PostTopic extends Component {
    constructor() {
      super();
      this.state = {
        title: "",
        question: "",
        user_id: "",
        value: "",
        stitch: null
      };
    //   this.handleChange = this.handleChange.bind(this);
    //   this.displayTodos = this.displayTodos.bind(this);
    //   this.addTodo = this.addTodo.bind(this);
    // this.state.stitch = callMe();
    }
    
    componentDidMount() {
        
    //   Initialize the App Client
    let APP_ID = "forumtopic-wuzgl";

    // this.state.stitch = Stitch.initializeDefaultAppClient(APP_ID);
    this.state.stitch = Stitch.hasAppClient(APP_ID)
    ? Stitch.getAppClient(APP_ID)
    : Stitch.initializeAppClient(APP_ID);
    }
    
    // displayTodos() {
    //   this.db
    //     .collection("topic")
    //     .find({}, { limit: 1000 })
    //     .asArray()
    //     .then(todos => {
    //       this.setState({todos});
    //     });
    //  }


    createTopic = (event) => {
      loginAnonymous();
      let user = getCurrentUser();
      event.preventDefault();

      console.log(this.state)
      console.log('this.stitch: ', this.state.stitch);
      console.log('user: ', user);
      

      
      const mongodb = this.state.stitch.getServiceClient(
        RemoteMongoClient.factory,
        "mongodb-atlas"
      );

        let db = mongodb.db("forum").collection("topic");
        console.log('db: ', db);
        console.log('this.state.stitch.auth.user.id: ', this.state.stitch.auth.user.id);
        
        
        db.insertOne({
            owner_id: this.state.stitch.auth.user.id,
            title: this.state.title,
            question: this.state.question
            })
            .then(console.log('success save'))
            .catch(console.error);
    }

    // handleInput(event) {
    //   this.setState({ value: event.target.value });
    // }

    handleInput = (event) => {
        console.log('this.state: ', this.state);
  
      this.setState({
          [event.target.name]: event.target.value
      })
      
    }

    
  render() {
      return (
        <div className="App">
          <h3>Create a topic</h3>
          <hr />
          <p>Add a Topic:</p>
          <form onSubmit={this.createTopic}>
            <label>
              <input
                type="text"
                // value={this.state.value}
                name="title"
                placeholder="title"
                onChange={this.handleInput}
              />
            </label>
            <label>
              <input
                type="text"
                // value={this.state.value}
                name="question"
                placeholder="write question here"
                onChange={this.handleInput}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>


        </div>
      );
    }
  }
  export default PostTopic;