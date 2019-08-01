import React, { Component } from "react";
import {
  RemoteMongoClient,
} from "mongodb-stitch-browser-sdk";
import { Stitch } from "mongodb-stitch-browser-sdk";

import {
    loginAnonymous,
    getCurrentUser,
  } from "./../stitch/authentication";

import { isAuthenticated, getProfile } from "../utils/auth"
import './Form.css'


class PostTopic extends Component {
    constructor() {
      super();
      this.state = {
        title: "",
        question: "",
        user_id: "",
        value: "",
        stitch: null,
        alert: ''
      };
  
    }
    
    componentDidMount() {
        
    //   Initialize the App Client
    let APP_ID = "forumtopic-wuzgl";

    // this.state.stitch = Stitch.initializeDefaultAppClient(APP_ID);
    this.state.stitch = Stitch.hasAppClient(APP_ID)
    ? Stitch.getAppClient(APP_ID)
    : Stitch.initializeAppClient(APP_ID);
    
    }

    createTopic = (e) => {
      loginAnonymous();
      let user = getCurrentUser();
      let userAuth0 = getProfile();
      e.preventDefault();
      const form = e.target

      console.log('this.stitch: ', this.state.stitch);
      console.log('user: ', user);
      console.log('isAuthenticated: ', isAuthenticated());
      console.log('userAuth0 : ', userAuth0);
      console.log('userAuth0.email : ', userAuth0.email);
      console.log('userAuth0.updated_at : ', userAuth0.updated_at);
      
      const mongodb = this.state.stitch.getServiceClient(
        RemoteMongoClient.factory,
        "mongodb-atlas"
      );

        let topicDB = mongodb.db("forum").collection("topic");
        const newTopic = {
            "owner_id": this.state.stitch.auth.user.id,
            "title": this.state.title,
            "question": this.state.question,
            "userEmail": userAuth0.email,
            "time": userAuth0.updated_at,
            "picture": userAuth0.picture,
            "nickname": userAuth0.nickname
          };
   
        topicDB.insertOne(newTopic)
            .then(() => {
                form.reset()
                this.setState({
                  alert: 'フォーラムトピックが作成されました',
                })
              })
            .catch(console.error);
    }



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
          <form onSubmit={this.createTopic}　className="Form">
          {this.state.alert && (
            <div className="Form--Alert">{this.state.alert}</div>
          )}
            <label　className="Form--Label">
              <input
                type="text"
                className="Form--Input Form--InputText"
                // value={this.state.value}
                name="title"
                onChange={this.handleInput}
              />
              <span>質問タイトル</span>
            </label>
            <label className="Form--Label">
              <textarea 
                rows="8"
                name="question"
                placeholder="質問内容を記入してください。"
                onChange={this.handleInput}
                className="Form--Input Form--Textarea Form--InputText"
              />
              <span>質問内容</span>
            </label>
            <input type="submit" value="Submit" />
          </form>



        </div>
      );
    }
  }
  export default PostTopic;