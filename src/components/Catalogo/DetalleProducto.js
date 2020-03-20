import React, { Component } from "react";
import "./Catalogo.css";
import Axios from "axios";
let pesos;
let dolares;
class DetalleProducto extends Component {
    constructor(props) {
        super(props);
        this.state = {
          objProducto: [],
        };
    }
  
    componentWillMount(){
        var data = new FormData();
       
        data.append("id_producto",this.props.idProducto);
        Axios.post("https://apiperfiltic.herokuapp.com/Main/getDetailProducto",data).then(res=>{
            
            this.setState({
                objProducto: res.data

            })
           

        })
    }
  render() {
    
    if(this.state.objProducto){
        pesos = new Intl.NumberFormat().format(this.state.objProducto.precio)
        dolares = new Intl.NumberFormat().format(this.state.objProducto.precioDolar)


    }
    return (
      <div className="row borderCard">

        <div className="col-6 resetMargin">
          <div
            id="carouselExampleControls"
            class="carousel slide"
            data-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src={this.state.objProducto.url1}
                  class="d-block w-100 redimensionDetail"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src={this.state.objProducto.url2}
                  class="d-block w-100 redimensionDetail"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src={this.state.objProducto.url3}
                  class="d-block w-100 redimensionDetail"
                  alt="..."
                />
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleControls"
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
              href="#carouselExampleControls"
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
        </div>
        <div className="col-6 resetMargin borderCard">
            <div className="centerContent">

          <div className="col-12">
            <h2>{this.state.objProducto.nombre}</h2>
          </div>
          <div className="col-12">
            <h3>{this.state.objProducto.descripcion}</h3>
          </div>
          <div className="col-12">
            <h5>Pesos: ${pesos}</h5>
            <h5>Dolares: ${dolares}</h5>
          </div>
          <div className="col-12">
            <button type="button" class="btn btn-info btnComprar" data-toggle="modal" data-target="#ignismyModal">
              Comprar
            </button>
            <button type="button" onClick={()=>this.props.changeSubcomponente(3,this.state.objProducto.id_categoria)}  class="btn btn-info btnComprar">
              Regresar
            </button>
          </div>
            </div>
        </div>

        <div class="modal fade" id="ignismyModal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label=""><span>×</span></button>
                     </div>
					
                    <div class="modal-body">
                       
						<div class="thank-you-pop">
							<img src="http://goactionstations.co.uk/wp-content/uploads/2017/03/Green-Round-Tick.png" alt=""/>
							<h1>Gracias por tu compra!</h1>
							<p>Tu solicitud ha sido recivida con exito.</p>
							
							
 						</div>
                         
                    </div>
					
                </div>
            </div>
        </div>
      </div>
    );
  }
}
export default DetalleProducto;
