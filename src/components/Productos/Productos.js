import React, { Component } from "react";
import "./Productos.css";
import Axios from "axios";
let optionsCategorias;
let cardProductos;

class Productos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      listarCategorias: [],
      listProductos: []
    };
  }
  componentDidMount() {
    document.getElementById("loadingSpinner").style.display = "block";
    Axios.get("https://apiperfiltic.herokuapp.com/Main/listarCategorias").then(
      res => {
        this.setState({
          listCategoria: res.data
        });
       
      }
    );

    Axios.get("https://apiperfiltic.herokuapp.com/Main/getAllProductos").then(res => {
     
      this.setState({
        listProductos: res.data
      });
      document.getElementById("loadingSpinner").style.display = "none";
    });
  }
  fileSelect = event => {
    this.setState({ selectedFile: event.target.files });
  
  };

  transformToDolar(e) {
    e.preventDefault();
    var number = document.getElementById("precio").value;
    var valor = number / 4158;
    document.getElementById("precioDolar").value = Math.round(valor);
  }
  disableForm(idForm){
    var form = document.getElementById(idForm);
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].readOnly = true;
    }
  }
  enableForm(idForm){
    var form = document.getElementById(idForm);
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].readOnly = false;
    }
  }
  addProducto(e) {
    e.preventDefault();
    if (this.props.validarFormulario("formAddProductos")) {
      var dataform = new FormData();
      var spiner = document.getElementById("spinerMain");
      spiner.style.display="inline-block";
      this.disableForm("formAddProductos");
      dataform.append("nombre", document.getElementById("nombre").value);
      dataform.append("precio", document.getElementById("precio").value);
      dataform.append(
        "precioDolar",
        document.getElementById("precioDolar").value
      );
      dataform.append(
        "descripcion",
        document.getElementById("descripcion").value
      );
      dataform.append(
        "id_categoria",
        document.getElementById("selectCategoria").value
      );
      

      for (let i = 0; i < this.state.selectedFile.length; i++) {
        dataform.append(`images[${i}]`, this.state.selectedFile[i]);
      }

      Axios.post(
        "https://apiperfiltic.herokuapp.com/Main/addProducto",
        dataform
      ).then(res => {
        if (res.data) {
            alert("Producto Agregado exitosamente");
            
            document.getElementById("nombre").value = "";
            document.getElementById("precio").value = "";
            document.getElementById("precioDolar").value = "";
            document.getElementById("descripcion").value = "";
            document.getElementById("imgProducto").value = "";
          function eventFire(el, etype){
              if (el.fireEvent) {
                  el.fireEvent('on' + etype);
            } else {
                var evObj = document.createEvent('Events');
                evObj.initEvent(etype, true, false);
                el.dispatchEvent(evObj);
            }
        }
        eventFire(document.getElementById('btnCloseModal'), 'click');
        
        
        Axios.get("https://apiperfiltic.herokuapp.com/Main/getAllProductos").then(res => {
            
            this.setState({
                listProductos: res.data
            });
        });
    } else {
        alert("error al agregar el producto.");
        }
        spiner.style.display="none";
        this.enableForm("formAddProductos");
        
      });
    }
  }
  render() {

    if (this.state.listCategoria) {
      optionsCategorias = this.state.listCategoria.map(e => {
        return <option value={e.id_categoria}>{e.nombre}</option>;
      });
    } else {
      optionsCategorias = <option value="00">No hay categorias</option>;
    }
    if(this.state.objProducto){
       


    }

    if(this.state.listProductos){
        cardProductos =this.state.listProductos.map(e=>{
            
            var pesos = new Intl.NumberFormat().format(e.precio)
            var dolares = new Intl.NumberFormat().format(e.precioDolar)
            var href= "#cardProducto"+e.id_producto;
            var id= "cardProducto"+e.id_producto;
            return <div className="col-4">
                <div className="card cardwith">
          <div class="view overlay ">
            <div
              id={id}
              class="carousel slide card-img-top"
              data-ride="carousel"
            >
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img
                    src={e.url1}
                    class="d-block w-100 redimension"
                    alt="Card image cap"
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src={e.url2}
                    class="d-block w-100 redimension"
                    alt="Card image cap"
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src={e.url3}
                    class="d-block w-100 redimension"
                    alt="Card image cap"
                  />
                </div>
              </div>
              <a
                class="carousel-control-prev"
                href={href}
                role="button"
                data-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="carousel-control-next"
                href={href}
                role="button"
                data-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Next</span>
              </a>
            </div>

            <a href="#!">
              <div class="mask rgba-white-slight"></div>
            </a>
          </div>
          <div class="card-body">
            <h5 class="card-title font-weight-bold fuchsia-rose-text mb-0">
              {e.nombre}
            </h5>
        <p class="aqua-sky-text mb-0">{e.descripcion}</p>
            <ul class="list-unstyled list-inline my-2">
              <li class="list-inline-item mx-0">
                <i class="fas fa-star mimosa-text"></i>
              </li>
              <li class="list-inline-item mx-0">
                <i class="fas fa-star mimosa-text"></i>
              </li>
              <li class="list-inline-item mx-0">
                <i class="fas fa-star mimosa-text"></i>
              </li>
              <li class="list-inline-item mx-0">
                <i class="fas fa-star mimosa-text"></i>
              </li>
              <li class="list-inline-item mx-0">
                <i class="fas fa-star mimosa-text"></i>
              </li>
            </ul>
            <p className="txtcardDolar">Pesos:</p>
                <div class="price">${pesos} </div>
                <p className="txtcardDolar">Dolares:</p>
                <div class="price">${dolares} </div>
          </div>
        </div>

            </div>
        })

    }else{
        cardProductos=<h1>No hay productos.</h1>
    }
    return (
      <div className="container margen">
        <button
          type="button"
          id="btnAddProducto"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#productosModal"
        >
          Agregar Productos
        </button>

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
        <div className="row">
        {cardProductos}
        </div>

        <div
          class="modal fade"
          id="productosModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="productosModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="productosModalLabel">
                  Agregar Productos
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form id="formAddProductos">
                  <div className="row">
                    <div className="col-12">
                      <div class="form-group">
                        <label>Nombre del producto</label>
                        <input
                          type="text"
                          class="form-control"
                          id="nombre"
                          placeholder="Nombre"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div class="form-group">
                        <label>Precio</label>
                        <input
                          type="number"
                          class="form-control"
                          id="precio"
                          required
                          onChange={e => this.transformToDolar(e)}
                          placeholder="5000"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div class="form-group">
                        <label>Precio en dolares</label>
                        <input
                          type="number"
                          class="form-control"
                          id="precioDolar"
                          placeholder="5000"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div class="form-group">
                        <label for="selectCatPadre">Categoria</label>
                        <select
                          class="form-control"
                          id="selectCategoria"
                          required
                        >
                          {optionsCategorias}
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <div class="form-group">
                        <label>Descripcion del producto</label>
                        <textarea
                          class="form-control"
                          id="descripcion"
                          required
                          placeholder="Breve descripcion del producto"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-12">
                      <div class="form-group">
                        <label>Seleccione 3 imagenes del producto</label>
                        <input
                          type="file"
                          name="image[]"
                          multiple
                          onChange={this.fileSelect}
                          required
                          class="form-control-file"
                          id="imgProducto"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  id="btnCloseModal"
                  data-dismiss="modal"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  id="btnSaveProducto"
                  onClick={e => this.addProducto(e)}
                  class="btn btn-primary"
                >
                    <span class="spinner-border spinner-border-sm" id="spinerMain" role="status" aria-hidden="true"></span>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Productos;
