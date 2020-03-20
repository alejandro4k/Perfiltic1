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
        Axios.post("http://localhost/ApiPerfiltic/Main/getDetailProducto",data).then(res=>{
            
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
            <button type="button" class="btn btn-info btnComprar" data-toggle="modal" data-target="#centralModalSuccess">
              Comprar
            </button>
            <button type="button" onClick={()=>this.props.changeSubcomponente(3,this.state.objProducto.id_categoria)}  class="btn btn-info btnComprar">
              Regresar
            </button>
          </div>
            </div>
        </div>

        <div class="modal fade" id="centralModalSuccess" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
   aria-hidden="true">
   <div class="modal-dialog modal-notify modal-success" role="document">
     
     <div class="modal-content">
      
       <div class="modal-header">
         <p class="heading lead">Modal Success</p>

         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true" class="white-text">&times;</span>
         </button>
       </div>

      
       <div class="modal-body">
         <div class="text-center">
           <i class="fas fa-check fa-4x mb-3 animated rotateIn"></i>
           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit iusto nulla aperiam blanditiis
             ad consequatur in dolores culpa, dignissimos, eius non possimus fugiat. Esse ratione fuga, enim,
             ab officiis totam.</p>
         </div>
       </div>

     
       <div class="modal-footer justify-content-center">
         <a type="button" class="btn btn-success">Get it now <i class="far fa-gem ml-1 text-white"></i></a>
         <a type="button" class="btn btn-outline-success waves-effect" data-dismiss="modal">No, thanks</a>
       </div>
     </div>
 
   </div>
 </div>
      </div>
    );
  }
}
export default DetalleProducto;
