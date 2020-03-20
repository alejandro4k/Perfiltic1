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
        document.getElementById("loadingSpinner").style.display = "block";
        var data = new FormData();
        data.append("idCatPadre",this.props.idCatPadre)
        Axios.post("https://apiperfiltic.herokuapp.com/Main/getCategorias",data).then(res=>{
           
            this.setState({
                listCategorias:res.data
            })
            document.getElementById("loadingSpinner").style.display = "none";
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
          }else{
              cardCategorias =<h1>No hay registros</h1>
          }
        return(
           
          

            <div className="row">
                <div className="col-12">

                <button type="button"  onClick={()=>this.props.onBack(1)} id="btnBack" class="btn btn-info">Atras</button>
                </div>
                <div id="loadingSpinner">
          <div class="spinner-grow text-info" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-info" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-info" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-info" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>

                {cardCategorias}
             
            </div>
            
        );
    }
}
export default Subcategorias;