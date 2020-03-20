/* eslint-disable default-case */
import React, { Component } from "react";

import Menu from "./Menu/Menu";
import Login from "./Login/Login";
class ComponentMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeCompt: 0,
      login: false,
      id_user: 0,
      admin:false
    };
  }
  validarFormulario(idform) {
    var form = document.getElementById(idform);
    if (form.checkValidity()) {
      return true;
    } else {
      form.reportValidity();
    }
  }
  componentWillMount(){
      if(localStorage.getItem("id_user")){
          this.setState({
              changeCompt: 1,
              login:true
          })

      }
  }
  
  userLoged(value, status,rol) {
    this.setState({
      changeCompt: value,
      login: status,
      admin:rol
    });
  }
  showComponent = () => {
    switch (this.state.changeCompt) {
      case 0:
        return <Login userLogin={this.userLoged.bind(this)}  />;
        break;
      case 1:
        return <Menu validarFormulario={this.validarFormulario.bind(this)} rol={this.state.admin}/>;
        break;
    }
  };
  render() {
    return <div className="mainComponent">{this.showComponent()}</div>;
  }
}
export default ComponentMaster;
