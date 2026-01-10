const formulario = document.getElementById('task-form');
const mensajeError = document.getElementById('error-message');

formulario.addEventListener('submit', function(event) {
    const titulo = document.getElementById('task-title').value.trim();
    const descripcion = document.getElementById('task-desc').value.trim();
    const tituloo = document.getElementById('task-title');
    const descripcion2 = document.getElementById('task-desc');
    const errorTitle = document.getElementById('error-title');
    const errorDesc = document.getElementById('error-desc');

    if (titulo === "" || descripcion === "") {
        event.preventDefault();
        if (titulo === ""){
        tituloo.style.border = "2px solid red";
        errorTitle.style.display = 'block';
        }
        if (descripcion === ""){
        descripcion2.style.border = "2px solid red";
        errorDesc.style.display = 'block';
        }
    } else {
        // Todo está bien, podemos guardar
        mensajeError.style.display = 'none';
        console.log("Datos válidos, listos para guardar en LocalStorage");

        tituloo.style.border = "";
        descripcion2.style.border = "";
        errorTitle.style.display = 'none';
        errorDesc.style.display = 'none';

        // 2. Lógica de LocalStorage
        let tareasExistentes = JSON.parse(localStorage.getItem('misTareas')) || [];
        
        const nuevaTarea = {
            titulo: titulo,
            descripcion: descripcion,
            fecha: new Date().toLocaleString()
        };

        tareasExistentes.push(nuevaTarea);
        localStorage.setItem('misTareas', JSON.stringify(tareasExistentes));

        alert("¡Tarea guardada con éxito!");
        formulario.reset();
    }
});