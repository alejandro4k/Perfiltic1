import React, { Component } from "react";
import "./Catalogo.css";
import Axios from "axios";
import Subcategoria from "./Subcategorias";
import ProductosCat from "./ProductosSubCategoria";
import DetalleProducto from "./DetalleProducto";
let cardCategorias;
let CatalogoContent;
let contenido;
class Catalogo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCategorias: [],
      subcomponent: 1,
      idVar: 0,
      idCatPadre:0
    };
  }
  componentDidMount() {
    Axios.get("https://apiperfiltic.herokuapp.com/Main/listarCategoriasPadre").then(
      res => {
        
        this.setState({
          listCategorias: res.data
        });
      }
    );
  }
  changeSubcomponent(e, idVar) {
    
    this.setState({
      subcomponent: e,
      idVar: idVar
    });
  }
  getIdCategoria(e,value){
      this.setState({
          idCatPadre:value,
          subcomponent:e
      })

  }
  onBack(e){
      this.setState({
          subcomponent:e
      })
  }
  render() {
    if (this.state.listCategorias) {
      cardCategorias = this.state.listCategorias.map(e => {
        return (
          <div className="col-6">
            <div className="card cardwith colorCard">
              <div className="card-body">
                <h5 className="card-title">{e.nombre}</h5>
                <button
                  onClick={a => this.getIdCategoria(2, e.id_categoriaPadre)}
                  className="btn btn-primary"
                >
                  Ir de compras
                </button>
              </div>
            </div>
          </div>
        );
      });
      CatalogoContent = <div className="row">{cardCategorias}</div>;
    }else{
        CatalogoContent=<h1>No hay productos.</h1>
    }
    switch (this.state.subcomponent) {
      case 1:
        contenido = CatalogoContent;
        break;
      case 2:
        contenido = (
          <Subcategoria
            changeSubcomponente={this.changeSubcomponent.bind(this)}
            idCatPadre={this.state.idCatPadre}
            onBack ={this.onBack.bind(this)}
          />
        );
        break;
      case 3:
        contenido = (
          <ProductosCat
            changeSubcomponente={this.changeSubcomponent.bind(this)}
            idCategoria={this.state.idVar}
            onBack ={this.onBack.bind(this)}
          />
        );
        break;
      case 4:
        contenido = (
          <DetalleProducto
            changeSubcomponente={this.changeSubcomponent.bind(this)}
            idProducto={this.state.idVar}
            onBack ={this.onBack.bind(this)}
          />
        );
        break;
    }

    return <div className="container margen pading1">{contenido}</div>;
  }
}
export default Catalogo;
