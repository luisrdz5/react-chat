import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import firebase from 'firebase';



class App extends Component {
    constructor () {
      super();
      this.state = {
        messages: [],
        user: null,
        count: 0
      };
    }
    componentWillMount () {
    const database = firebase.database().ref().child('messages')

    database.on('child_added', snap => {
      this.setState({
        messages: this.state.messages.concat(snap.val())
      })
    })

    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }
    })
    }
    handleAuth () {
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/plus.login')

      firebase.auth().signInWithPopup(provider)
        .then(result => console.log(`${result.user.email} ha iniciado sesión`))
        .catch(error => console.log(`Error ${error.code}: ${error.message}`))
    }
    handleLogout () {
      firebase.auth().signOut()
        .then(result => console.log('Te has desconectado correctamente'))
        .catch(error => console.log(`Error ${error.code}: ${error.message}`))
    }
    handleSendMessage (text) {
      // Gestionamos el mensaje que envía el usuario
      const messagesDB = firebase.database().ref().child('messages')

      let newUserMessage = messagesDB.push()
      let msg = {
        text,
        avatar: this.state.user.photoURL,
        displayName: this.state.user.displayName,
        date: Date.now()
      }
      newUserMessage.set(msg)

      // El bot responde...
      if (this.state.count < 1) {
        // Si es el primer mensaje
        this.setState({ count: this.state.count + 1 })
        this._handleBotMessage('bienvenida')
      } else {
        // Si es el siguiente y contiene alguna palabra "mágica"
        msg.text = msg.text.toLowerCase()

        if (msg.text.includes('react')) this._handleBotMessage('react')
        else if (msg.text.includes('android')) this._handleBotMessage('android')
        else if (msg.text.includes('angular')) this._handleBotMessage('angular')
        else if (msg.text.includes('javascript')) this._handleBotMessage('javascript')
        else if (msg.text.includes('polymer')) this._handleBotMessage('polymer')
        else this._handleBotMessage('default')
      }
    }
    renderMessages () {
      if (this.state.user) {
        return this.state.messages.map(msg => (<ChatMessage message={msg} />)).reverse();
      }
    }
   render () {
      return (
        <div className="App">
          <Header
            appName='Chat Real'
            user={this.state.user}
            onAuth={this.handleAuth.bind(this)}
            onLogout={this.handleLogout.bind(this)}
          />
          <div className='message-chat-list container'>
            <br/><br/>
            {this.renderMessages()}
          </div>
          <ChatInput
            onSendMessage={this.handleSendMessage.bind(this)}
          />
        </div>
      );
   }
}


export default App;
