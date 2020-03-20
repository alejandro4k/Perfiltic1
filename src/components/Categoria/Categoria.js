import React, { Component } from "react";
import "./Categoria.css";
import Axios from "axios";
let optionsCategorias;
class Categoria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCategoriaP: [],
      selectedFile : null
    };
  }
  fileSelect = event => {
    this.setState({selectedFile: event.target.files[0]})
    //console.log(event.target.files[0])
  }
  listarCategoriasP(e) {
    e.preventDefault();
    Axios.get("http://localhost/ApiPerfiltic/Main/listarCategoriasPadre").then(
      res => {
        this.setState({
          listCategoriaP: res.data
        });
        if(!res.data){
            document.getElementById("btnAddCategoria").disabled = true;
        }else{
            document.getElementById("btnAddCategoria").disabled = false;
        }
      }
    );
  }

  addCategoriaPadre(e) {
    e.preventDefault();
    if (this.props.validarFormulario("formCatPadre")) {
      var dataform = new FormData();
      dataform.append(
        "categoriaP",
        document.getElementById("categoriaPadre").value
      );
      Axios.post(
        "http://localhost/ApiPerfiltic/Main/addCategoriaPadre",
        dataform
      ).then(res => {
        if (res.data.status) {
          alert("Categoria padre creada");
          document.getElementById("categoriaPadre").value = "";
        } else {
          alert(res.data.msg);
        }
      });
    }
  }
  addCategoria(e) {
    e.preventDefault();
    if (this.props.validarFormulario("formCategoria")) {
       
        
        var dataform = new FormData();
        dataform.append("categoria", document.getElementById("categoria").value);
        dataform.append("image",this.state.selectedFile, this.state.selectedFile.name)
        dataform.append("id_catPadre",document.getElementById("selectCatPadre").value);
        Axios.post(
          "http://localhost/ApiPerfiltic/Main/addCategoria",
          dataform
        ).then(res => {
          console.log(res.data);

          if(res.data){
              alert("categoria creada exitosamente.");
              document.getElementById("categoria").value="";
              document.getElementById("imgCategoria").value="";

          }else{
              alert(res.data.msj)
          }
        });
        
    }
  }
  render() {
    if (this.state.listCategoriaP) {
      optionsCategorias = this.state.listCategoriaP.map(e => {
        return <option value={e.id_categoriaPadre}>{e.nombre}</option>;
      });
      
    } else {
      
      optionsCategorias = <option value="00">No hay categorias</option>;
    }

    return (
      <div className="container margen">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Agregar Categoria Padre
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              onClick={e => this.listarCategoriasP(e)}
              aria-controls="profile"
              aria-selected="false"
            >
              Agregar Categoria
            </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <form id="formCatPadre">
              <div class="form-group">
                <label for="categoriaPadre">
                  Ingrese el nombre de la categoria padre
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="categoriaPadre"
                  placeholder="Tecnologia,Hogar"
                  required
                />
              </div>
              <button
                type="button"
                id="btnAddCategoriPadre"
                onClick={e => this.addCategoriaPadre(e)}
                class="btn btn-primary"
              >
                Agregar
              </button>
            </form>
          </div>
          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <form id="formCategoria">
              <div class="form-group">
                <label for="selectCatPadre">Categoria Padre</label>
                <select class="form-control" id="selectCatPadre" required>
                  {optionsCategorias}
                </select>
              </div>
              <div class="form-group">
                <label for="categoriaPadre">
                  Ingrese el nombre de la categoria
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="categoria"
                  placeholder="Telefonos,comida..."
                  required
                />
              </div>
              <div class="form-group">
                <label for="imgCategoria">
                  Selecciona una imagen que represente esta categoria{" "}
                </label>
                <input
                  type="file"
                  class="form-control-file"
                  id="imgCategoria"
                  name="image"
                  onChange= {this.fileSelect}
                  required
                />
              </div>
              <button
                type="button"
                id="btnAddCategoria"
                onClick={e => this.addCategoria(e)}
                class="btn btn-primary"
              >
                Agregar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Categoria;
