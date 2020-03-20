import React, { Component } from "react";
import "./Catalogo.css";
import Axios from "axios";
let cardProductos;
class ProductosSubCategoria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProductos: []
    };
  }
  componentDidMount() {
    var data = new FormData();
    data.append("id_categoria", this.props.idCategoria);
    Axios.post("https://apiperfiltic.herokuapp.com/Main/getProductos", data).then(
      res => {
        this.setState({
          listProductos: res.data
        });
      }
    );
  }
  render() {
    if (this.state.listProductos) {
      cardProductos = this.state.listProductos.map(e => {
        var href = "#cardProducto" + e.id_producto;
        var id = "cardProducto" + e.id_producto;
        return (
          <div className="col-4">
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
                <div class="price">${e.precio} </div>
                <p className="txtcardDolar">Dolares:</p>
                <div class="price">${e.precioDolar} </div>

                <button
                  onClick={() =>
                    this.props.changeSubcomponente(4, e.id_producto)
                  }
                  id="btnVerProducto"
                  class="btn btn-primary"
                >
                  Ver mas
                </button>
              </div>
            </div>
          </div>
        );
      });
    } else {
      cardProductos = <h1>No hay productos.</h1>;
    }
    return (
      <div className="row">
        <div className="col-12">
          <button type="button" onClick={()=>this.props.onBack(2)} id="btnBack" class="btn btn-info">
            Atras
          </button>
        </div>
        {cardProductos}
      </div>
    );
  }
}
export default ProductosSubCategoria;
