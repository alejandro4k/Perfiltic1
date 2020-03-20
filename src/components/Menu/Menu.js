import React, { Component } from "react";
import Productos from '../Productos/Productos'
import Categoria from '../Categoria/Categoria'
import Catalogo from '../Catalogo/Catalogo'
import logo from "../../logoperfiltic.png";
import "./Menu.css";

let contenido;
let MenuContent;
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comp: 1
    };
  }
  changeComponent(value) {
    this.setState({
      comp: value
    });
  }
  componentDidMount(){
    if(this.props.rol){
      this.changeComponent(1)

    }else{
      this.changeComponent(3);
    }
  }
  logout(){
    localStorage.removeItem("id_user");

    
    window.location.reload();
  }
  render() {
    if(this.props.rol){
      MenuContent =      <div className="list-group list-group-flush">
        <a
          href="#"
          className="list-group-item list-group-item-action bg-light"
          onClick={e => this.changeComponent(1)}
        >
          Gestionar Productos
        </a>
      <a
          href="#"
          className="list-group-item list-group-item-action bg-light"
          onClick={e => this.changeComponent(3)}
        >
          Catalogo
        </a>
        <a
          href="#"
          className="list-group-item list-group-item-action bg-light"
          onClick={e => this.changeComponent(2)}
        >
          Gestionar Categorias
        </a>
        <a
          href="#"
          className="list-group-item list-group-item-action bg-light"
          onClick={e => this.logout()}
        >
          Cerrar sesion
        </a>
      </div>

    }else{
      MenuContent =      <div className="list-group list-group-flush">
      <a
          href="#"
          className="list-group-item list-group-item-action bg-light"
          onClick={e => this.changeComponent(3)}
        >
          Productos
        </a>
        <a
          href="#"
          className="list-group-item list-group-item-action bg-light"
          onClick={e => this.logout()}
        >
          Cerrar sesion
        </a>
      </div>
    }
    
    switch (this.state.comp) {
      case 1:
        contenido = <Productos validarFormulario={this.props.validarFormulario.bind(this)}/>;
        break;
        case 2:
        contenido = <Categoria validarFormulario={this.props.validarFormulario.bind(this)}/>;
        break;
        case 3:
        contenido = <Catalogo validarFormulario={this.props.validarFormulario.bind(this)}/>;
        break;

      
    }
    
    return (
      <div className="Menu">
        <div className="d-flex" id="wrapper">
          <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">
              <img className="figure-img img-fluid rounded logo" src={logo} />
            </div>
            {MenuContent}
          </div>

          <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#sidebar-wrapper"
                aria-controls="sidebar-wrapper"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </nav>

            <div className="container-fluid">{contenido}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default Menu;
