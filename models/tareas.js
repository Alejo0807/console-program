const Tarea = require('./tarea');
require('colors');

class Tareas {

    _listado = {};

    get listadoArr() {
        
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor () {
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach( tarea => 
            this._listado[tarea.id] = tarea);
    }

    crearTarea(desc= '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    borrarTarea(id = '') {
        if(this._listado[id]) {
            delete this._listado[id];
        }
    }

    listadoCompleto() {

        const listado = this.listadoArr;

        listado.forEach( (tarea, index) => 
            console.log(`${(index+1).toString().green}. ${tarea.desc} :: ${tarea.completadoEn? 'Completada'.green : 'Pendiente'.red}`)
        )
    }

    listadoPendientesCompletadas(completadas = true) {

        const listado = this.listadoArr;
        let cont = 0;
        listado.forEach( tarea => {
            
            if (completadas) {
                if (tarea.completadoEn) {
                    cont += 1;
                    console.log(`${cont.toString().green}. ${tarea.desc} :: ${'Completada'.green}`)
                }   
            } else {
                if (!tarea.completadoEn) {
                    cont += 1;
                    console.log(`${cont.toString().green}. ${tarea.desc} :: ${'Pendiente'.red}`)
                }    
            }
        });
    }

    completarTarea(listId = []) {
        
        listId.forEach( id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }

        });
        
        this.listadoArr.forEach( tarea => {
            if (!listId.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}


module.exports = Tareas;
