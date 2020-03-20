import React, { Component } from "react";
import "./Catalogo.css";
import Axios from "axios";
let cardCategorias;
class Subcategorias extends Component{
    constructor(props) {
        super(props);
        this.state = {
          listCategorias: [],
        };
      }
    componentDidMount(){
        var data = new FormData();
        data.append("idCatPadre",this.props.idCatPadre)
        Axios.post("https://apiperfiltic.herokuapp.com/Main/getCategorias",data).then(res=>{
           
            this.setState({
                listCategorias:res.data
            })
        })
    }

    render(){
        if (this.state.listCategorias) {
            cardCategorias = this.state.listCategorias.map(e => {
              return (
                <div className="col-6">
                  <div className="card cardwith">
                  <img src={e.foto} class="card-img-top "/>
                    <div className="card-body">
                      <h5 className="card-title">{e.nombre}</h5>
                      <button
                        
                        className="btn btn-primary"
                        onClick={a => this.props.changeSubcomponente(3, e.id_categoria)}
                      >
                        Ver productos
                      </button>
                    </div>
                  </div>
                </div>
              );
            });
          }
        return(
            <div className="row">
                <div className="col-12">

                <button type="button"  onClick={()=>this.props.onBack(1)} id="btnBack" class="btn btn-info">Atras</button>
                </div>

                {cardCategorias}
             
            </div>
        );
    }
}
export default Subcategorias;