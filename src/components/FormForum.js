import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'
import Recaptcha from 'react-google-recaptcha'
import { UserPasswordAuthProviderClient } from "mongodb-stitch-browser-sdk";
import app from '../stitch/app'

import './Form.css'

const RECAPTCHA_KEY = '6LdwXLAUAAAAACEKolwBLmjPBSWJckkfUjoiMLaY';

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class FormForum extends React.Component {
  static defaultProps = {
    name: 'forumTopic',
    subject: '', // optional subject of the notification email
    action: '',
    successMessage: 'メッセージが送信されました。お問い合わせいただきありがとうございます。',
    errorMessage:
      '何らかのトラブルによりメッセージが送信できませんでした。記述事項を確認の上、もう一度送信してください。'
  }

  state = {
    alert: '',
    disabled: false,
    emailSignUp: '',
    passwordSignUp: ''
  }

  handleRecaptcha = value => {
    this.setState({ "g-recaptcha-response": value });
  };

  handleInput = (event) => {
      console.log('this.state: ', this.state);

    this.setState({
        [event.target.name]: event.target.value
    })
    
  }

  handleSignUp = () => {
    console.log('inside handleSignup this.state: ', this.state);
    
    const emailPassClient = App.auth
        .getProviderClient(UserPasswordAuthProviderClient.factory);

        emailPassClient.registerWithEmail(this.state.emailSignUp, this.state.passwordSignUp)
        .then(() => {
            console.log("Successfully sent account confirmation email!");
        })
        .catch(err => {
            console.log("Error registering new user:", err);
        });

  }

  // form submit
  handleSubmit = e => {
    // e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    const data = serialize(form)
    console.log('form: ', form);
    
    console.log('data: ', data);
    
    this.setState({ disabled: true })
    fetch(form.action + '?' + stringify(data), {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(res => {
        console.log('what is in res: ', res);
        
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(() => {
        form.reset()
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }
    // form submit


  render() {
    const { name, subject, action } = this.props
        

    return (
      <Fragment>
        <Helmet>
        <script src="https://www.google.com/recaptcha/api.js?render=6LdwXLAUAAAAACEKolwBLmjPBSWJckkfUjoiMLaY"></script>

        </Helmet>

        <label className="Form--Label">
            <input
            className="Form--Input Form--InputText"
            type="text"
            placeholder="Email"
            name="emailSignUp"
            onChange={this.handleInput}
            required
            />
            <span>Eメールアドレス</span>
        </label>
        <label className="Form--Label">
            <input
            className="Form--Input Form--InputText"
            type="password"
            placeholder="パスワード"
            name="passwordSignUp"
            onChange={this.handleInput}
            required
            />
            <span>パスワード</span>
        </label>

        <button
        onClick={this.handleSignUp}
        >
                Log In
        </button>

        <form
          className="Form"
          name={name}
          method="post"
          onSubmit={this.handleSubmit}
        //   netlify-honeypot="bot-field"
        //   data-netlify="true"
        //   data-netlify-recaptcha="true"
        >
          <input type="hidden" name="form-name" value={name} />
          {this.state.alert && (
            <div className="Form--Alert">{this.state.alert}</div>
          )}
          <input type="hidden" name="bot-field" />
          <div className="Form--Group">
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="氏名"
                name="lastname"
                required
              />
              <span>氏名</span>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="名前"
                name="firstname"
                required
              />
              <span>名前</span>
            </label>
          </div>
          <fieldset>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="gender"
                value="male"
                defaultChecked
              />
              <span>男性</span>
            </label>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="gender"
                value="female"
              />
              <span>女性</span>
            </label>
          </fieldset>
          <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="email"
              placeholder="Email"
              name="emailAddress"
              required
            />
            <span>Eメールアドレス</span>
          </label>
          <label className="Form--Label has-arrow">
            <select
              className="Form--Input Form--Select"
              name="type"
              defaultValue="Type of Enquiry"
              required
            >
              <option disabled hidden>
                質問項目
              </option>
              <option>サイトに関する意見と要望</option>
              <option>バグをレポート</option>
              <option>その他</option>
            </select>
          </label>
          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Message"
              name="message"
              rows="10"
              required
            />
            <span>Message</span>
          </label>
          <label className="Form--Label Form-Checkbox">
            <input
              className="Form--Input Form--Textarea Form--CheckboxInput"
              name="newsletter"
              type="checkbox"
            />
            <span>ニュースレターを受け取る</span>
          </label>
          {/* <Recaptcha
            ref="recaptcha"
            sitekey={RECAPTCHA_KEY}
            onChange={this.handleRecaptcha}
          /> */}
          <input
            className="Button Form--SubmitButton"
            type="submit"
            value="送信"
            disabled={this.state.disabled}
          />
        </form>
      </Fragment>
    )
  }
}

export default FormForum