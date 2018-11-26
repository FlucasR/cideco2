import React, { Component } from 'react';
import '../../style.css';
import './main.css';
import Header from '../Header/Header'
import Subnivel from '../Subnivel/Subnivel'
import {codificar64} from '../../utils/Methods'


var firebase = require("firebase/app");

class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      destiny: 'Grid',
      idDestiny: 0,
      niveis: [],
      subniveis: [],
      cor : null,
      progressos: [],
      nivel: null,
      idUser: null
    }
  }

  componentDidMount() {
    this.logado();
    const db = firebase.database();
    
    db.ref('niveis/').once('value').then((res) => {
      this.setState({niveis: Object.values(res.val() )})
    });    

  }

  logado(){
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser){
        window.location.replace('#/login')
      }
      else{
        const idUser = codificar64(firebaseUser.email);
        if(firebaseUser.email === 'admin.cideco@gmail.com') window.location.replace('#/mainAdmin')
        else{
          const db = firebase.database();
          db.ref('testes/' + idUser +'/progressos').once('value').then((res) => {
            this.setState({progressos: Object.values(res.val())})
          });

          db.ref('testes/' + idUser +'/pontos').once('value').then((res) => {
            this.setState({pontos: Object.values(res.val() )})
          });
        }

        this.setState({idUser: idUser});

      }
    })
  }


  content() {
    if (this.state.niveis.length === 0) {
      return(
        <div>Carregando...</div>
      )
    }
    switch(this.state.destiny) {
      case 'Grid':
        return (
          <React.Fragment>
            {this.renderGrid()}
            <div onClick={() => this.setState({decision: !this.state.decision})}  style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}} className="row m-3 rounded w-50">
                <p className="m-3 text-center w-100 font-weight-bold text-white">Feedback</p>
            </div>
          </React.Fragment>
        )
      case 'Subnivel':
        console.log(this.state.progressos)
        return(
          <React.Fragment>
            <Subnivel backTo = {(location) => {this.backTo(location)}} subniveis = {this.state.subniveis} 
            cor = {this.state.cor}  progressos = {this.state.progressos}  nivel = {this.state.nivel} idUser = {this.state.idUser}/>
          </React.Fragment>
        )      
    }
  }
  goTo(destiny, subniveis, cor, subProgressos){
    this.setState(
      {
        destiny: destiny,
        subniveis: subniveis ? Object.values(subniveis) : [],
        progressos: subProgressos ?  Object.values( Object.values(subProgressos)[0] ): [],
        nivel: Object.keys(subniveis)[0].toString().substring(0, 1),
        cor : cor ? cor : null
      }
      )
  }
  renderGrid() {
    const titles = this.state.niveis;
    const progressos = this.state.progressos;
    return titles.map( (item, i) => {
      return (
        <div onClick={() => this.goTo("Subnivel", item.subniveis, item.cor, progressos[i],)} 
          style={{backgroundColor: item.cor}} className="row m-3 rounded w-50 pointer">
          <p className="title m-3 text-center w-100 font-weight-bold">{item.name}</p>
        </div>
      )
    });
  }

  backTo(location) {
    debugger;
    this.getProgresso()

    this.setState(
      {
        destiny: location,
      }
      )
  }

  getProgresso(){
    let progressos;
    const db = firebase.database();
    
    db.ref('testes/' + this.state.idUser +'/progressos').once('value').then((res) => {
      progressos = Object.values( res.val() )
      this.setState({progressos: progressos})
    })
  }

  render() {
    console.log("Main", this.state)
    return(
      <React.Fragment>
        <Header/>
        <div className="container height">
          <div className="row d-flex flex-column align-items-center w-100">
            {this.content()}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Main;
