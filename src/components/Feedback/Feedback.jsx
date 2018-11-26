import React, { Component } from 'react';
import { codificar64 } from '../../utils/Methods';
import ecocid_vermelho from '../../assets/images/bonequinho_ecocidadao_vermelho.png'
import ecocid_verde from '../../assets/images/bonequinho_ecocidadao_verde.png'
import ecocid_amarelo from '../../assets/images/bonequinho_ecocidadao_amarelo.png'
import '../../style.css'
import './feedback.css'

var firebase = require("firebase/app");


class Feedback extends Component {

  constructor(props){
    super(props);
    debugger;
    let soma = 0;
    props.pontos.map(item => {
        soma += Object.values(item)[0]
    })
    
    this.state = {        
        backTo: props.backTo,
        erros: [],
        feedbacks: null,
        resultado: soma / props.qtdPerguntas
    }
  }
  
  componentDidMount(){
    this.getErradas()
    this.getFeedbacks()
  }

  getFeedbacks(){
    debugger;
    const db = firebase.database();
    let feedbacks;
    db.ref('niveis/' + this.props.idNivel + '/subniveis' ).once('value').then((res) => {
        feedbacks = Object.values(        Object.values( res.val() )  )
        let feedbacksfinal = {}
        feedbacks.map(item =>{
            feedbacksfinal = Object.assign( feedbacksfinal, item.questoes)
        })
        this.setState({feedbacks: feedbacksfinal})
    })
  }

  getErradas(){
    debugger;
    const db = firebase.database();
    const idUser = codificar64(firebase.auth().currentUser.email)
    let erros ;
    db.ref('testes/' + idUser + '/erros/' + this.props.idNivel + '/subniveis' ).once('value').then((res) => {
        erros = Object.values( res.val() )
        let errosFinal = [];
        erros.map(item =>{
            errosFinal = errosFinal.concat( Object.values(item)[0] )
        })       
        this.setState({erros: errosFinal})
      })
  }

  render(){
    if(this.state.feedbacks === null){
        return(
            <div>Carregando...</div>
        )
    }
    else{
        console.log(this.state);
        return(
            <div className ="row  justify-content-center todo"> 
                <div className="col-4 left">
                    {this.renderResultado()}
                </div>
                <div className="col-8 right p-5">
                    <div className= "row justify-content-center">
                        {this.renderFeedbacks()}
                    </div>
                </div>
                
            </div>
            
        )
    }
  }

  renderFeedbacks(){
    const feedbacks = this.state.feedbacks;
    const erros = this.state.erros;
    return erros.map( item => {
        return(
            <div className= "col-3 m-2 rounded shadow w-100" style={{backgroundColor: this.props.cor}}>
                <p className = "m-2  w-100 font-weight-bold text-white">{feedbacks[item].feedback}</p>
            </div>
        )
    })
  }

  renderButton(){
    return (
      <button onClick={() => {
        this.state.backTo('Subnivel')
      }} className= "btn btn-primary btn-block">Voltar</button>
    )
  }

  renderResultado(){
      let img;
      let msg = `Obrigado pela participação!!

      Veja o quanto suas atitudes referentes à temática “nível” contribuem para preservação do meio ambiente:`;
      if(this.state.resultado < 0.4){
        img  = ecocid_vermelho
      }
      else if(this.state.resultado < 0.8){
        img = ecocid_amarelo
      }
      else{
        img = ecocid_verde
      }

      return(
        <div className="row align-items-center">
            <div className=" col-12 mt-4 rounded align-self-center shadow">
                <p className= "w-100" style={{fontSize: 22 }}>{msg}</p>
            </div>
            <div className="col-12 mt-4 text-center">
                <img src= {img} alt="resultado" className="img-fluid- m2 "/>
            </div>
            <div className="col-12 mt-4 text-center">
                {this.renderButton()}
            </div>
        </div>
      )
  }
}

export default Feedback
