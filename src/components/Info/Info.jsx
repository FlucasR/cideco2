import React, { Component } from 'react';
import '../../style.css';
import './info.css'


class Info extends Component {

    constructor(props){
      super(props);
    }


    iniciar(){
        window.location.replace('#/main');
    }
    render(){
        return(
            <React.Fragment>
            <div className =" bg heightMaior d-flex align-items-center justify-content-center">
                <div className = "container d-flex flex-column align-items-center justify-content-center mx-5">
                    <h3 className ="text-white mx-5 p-5 bg-fosco" >
                        Inspirado pelas publicações do Caderno de Educação Ambiental – Ecocidadão, realizadas pela Secretaria do Meio de
                        Ambiente do Estado de Paulo, nos anos de 2008 e 2014, este aplicativo tem por objetivo avaliar, por meio de situações problemas
                        cotidianas, o comportamento dos cidadãos quanto à preservação e manutenção do meio ambiente. Além disso, despertar hábitos e
                        práticas ecologicamente corretos visando diminuir o impacto ambiental, tornando-se, dessa forma, "ecocidadãos"
                    </h3>
                    <form className= "form p-5 d-flex justify-content-center" >
                        <button className= "bg-botao btn btn-lg m-5 p-3" onClick = { ()=> this.iniciar() }>Iniciar Testes</button>
                    </form>
                </div> 
            </div>
            </React.Fragment>
        )
    }
}

export default Info;    