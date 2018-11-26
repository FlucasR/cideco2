import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../../style.css';
import './main.css';

var firebase = require("firebase/app");

class MainAdmin extends Component {

  constructor(props){
    super(props);
    
  }

  logado(){
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser)  window.location.replace('#/login')
      else{
        if(firebaseUser.email !== 'admin.cideco@gmail.com') window.location.replace('#/main')
      }
    })
  }

  sair(){
    firebase.auth().signOut();
  }

  render() {
    return(
      <React.Fragment>
        <div className="container d-flex flex-column align-items-center justify-content-center height">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <Link to = '/gerenciarPerguntas'>
              <div style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}} className="row m-3 rounded w-50">
                <p className="m-3 text-center w-100 font-weight-bold text-white">Gerenciar Perguntas</p>
              </div>
            </Link>
            <Link to ='/gerarRelat'>
              <div style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}} className="row m-3 rounded w-50">
                <p className="m-3 text-center w-100 font-weight-bold text-white">Gerar Relatório</p>
              </div>
            </Link>
            <div onClick={()=> this.sair()} style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}} className="row m-3 rounded w-50">
              <p className="m-3 text-center w-100 font-weight-bold text-white">Sair</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default MainAdmin;
