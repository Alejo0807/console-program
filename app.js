require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
// const { mostrarMenu, pause } = require('./helpers/mensajes');
const { inquirerMenu, 
        pauseInquirer,
        leerInput, 
        listadotareasBorrar,
        confirmar, 
        mostrarEstadoCheckList} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');


// console.clear();

const main = async() => {

    let opt = '';

    const tareas = new Tareas();

    const tareasDB = leerDB();

    // console.log(tareasDB);

    if(tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
        
    }

    // await pauseInquirer();
    
    do{
        opt = await inquirerMenu();
        
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listadoPendientesCompletadas(true);
                break;
            case '4':
                tareas.listadoPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarEstadoCheckList(tareas.listadoArr);
                tareas.completarTarea(ids);
                break;
            case '6':
                const idBorrar = await listadotareasBorrar(tareas.listadoArr);
                if (idBorrar !== '0') {
                    const ok = await confirmar('¿Está seguro?');
                    if (ok) {
                        tareas.borrarTarea(idBorrar);
                        console.log('Tarea borrada');
                    }
                }
                
                break;
                            
        }

        guardarDB(tareas.listadoArr);
        await pauseInquirer();

    } while( opt !== '0');
}

main();

