//variables
const presupuestoUsuario = prompt('¿Cual es tu presupuesto semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;

//clases

//clase presupuesto    

class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante =  Number(presupuesto);//1000
    }
    //Metodo para ir restando del presupuesto actual
    presupuestoRestante(cantidad = 0){
        return this.restante -=Number(cantidad);
    }


    
}

// Clase de Interfaz maneja todo  lo relacionado al html
class Interfaz {
        
        insertarPresupuesto(cantidad){
            const presupuestoSpan= document.querySelector('span#total');
            const restanteSpan = document.querySelector('span#restante');


            // Insertar la cantidad dinamicamente

            presupuestoSpan.innerHTML = `${cantidad}`;
            restanteSpan.innerHTML = `${cantidad}`;
            //console.log(cantidad);
        }
        imprimirMensaje(mensaje, tipo){
            const divMensaje = document.createElement('div');
                  divMensaje.classList.add('text-center','alert'); 
                  
                  if(tipo==='error'){
                      divMensaje.classList.add('alert-danger');

                  }else{
                      divMensaje.classList.add('alert-success');
                  }
                  // divMensaje.innerHTML=mensaje;
                 divMensaje.appendChild(document.createTextNode(mensaje));
                 
                 //Insertar en el dom
                 document.querySelector('.primario').insertBefore(divMensaje,formulario);   
       
       
                  //quitar el alert despues de 3 segundos
                  setTimeout(function(){
                        document.querySelector('.primario .alert').remove();
                        formulario.reset();
                    },3000);
         }

         //Inserta los gastos a la lista
         agregarGastoListado(nombre,cantidad){
            const gastosListado= document.querySelector('#gastos ul');

            //crear un li
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';

            li.innerHTML =`
                ${nombre}
                <span class="badge badge-primary badge-pill">${cantidad}</span>
              `;

              gastosListado.appendChild(li);

         }
         /*Comprueba el presupuesto restante */
         presupuestoRestante(cantidad){
             /*esta variable de cantidPresupuesto ya esta instanciada cuando se carga el DOM de la pagina */
             const restante = document.querySelector('span#restante');
             // Leemos el presupuesto restante
             const presupuestoRestante=cantidadPresupuesto.presupuestoRestante(cantidad);
     
             restante.innerHTML = `
                            ${presupuestoRestante} 
             `;
             this.comprobarPresupuesto();
        }
        //cambiar de color el presupuesto restante
        comprobarPresupuesto(){
            //console.log(cantidadPresupuesto);
            const presupuestoTotal = cantidadPresupuesto.presupuesto;
            const presupuestoRestante = cantidadPresupuesto.restante;
            console.log(presupuestoRestante);
            //comprobar el 25%
            if((presupuestoTotal / 4) > presupuestoRestante){
                const restante = document.querySelector('.restante'); 
                restante.classList.remove('alert-success','alert-warning');  
                restante.classList.add('alert-danger');    

            }else if((presupuestoTotal / 2) > presupuestoRestante){
                const restante = document.querySelector('.restante'); 
                restante.classList.remove('alert-success');  
                restante.classList.add('alert-warning');    
            }

        }

}



//event listeners

document.addEventListener('DOMContentLoaded',function(){

    if(presupuestoUsuario === null || presupuestoUsuario===''){
        window.location.reload;//si el presupuesto es vacio o null recargamos la ventana
    }else{
        //Instanciar el presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);

        //Instanciar la clase Interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);


        
    }
});

formulario.addEventListener('submit', function(e){
    e.preventDefault();

    //Leer del  formulario de gastos 

    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    // Instanciar la interfaz
    const ui = new Interfaz();

    //comprobar que los campos no esten vacios 
    if(nombreGasto==='' || cantidadGasto === ''){
        // 2 parametros: mensaje y tipo
        ui.imprimirMensaje('Hubo un error', 'error');
    }else{
        //Insertar en el html
        ui.imprimirMensaje('Correcto', 'correcto');
        ui.agregarGastoListado(nombreGasto,cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }




});


/* video  6 */