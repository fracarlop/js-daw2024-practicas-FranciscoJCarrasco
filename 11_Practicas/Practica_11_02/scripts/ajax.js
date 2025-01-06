const BASE_URL = 'https://reqres.in/api/users/';
const POSTMAN_URL = 'https://httpbin.org/post';

//Código principal dentro del evento load
// para asegurar la carga de los componentes
window.addEventListener('load', (ev) => {
  let numsecs = document.getElementById('numsecs');
  let user = document.getElementById('user');
  let boton = document.querySelector('button');

  boton.addEventListener('click', (ev) => {
    ev.preventDefault();
    clearFields();
    procesarFetch(numsecs.value, user.value);
  });
});

function clearFields() {
  document.querySelectorAll('span').forEach((element) => {
    element.innerHTML = '';
    console.log(element);
  });
}

function procesarFetch(numsecs, user) {

  fetch(`${BASE_URL}${user}?delay=${numsecs}`) 
    .then((response) => {

      if (response.ok) {

        document.getElementById('status').innerHTML = response.status;
        return response.json();

      } else {

        
        throw new Error(response.status);

      }
    })
    .then((user) => {

      console.log('Datos recibidos:', user);

      document.getElementById('id').innerHTML = user.data.id;
      document.getElementById('email').innerHTML = user.data.email;

      saveUser(user.data);

    })
    .catch((error) => {
      console.error('Error en la petición de usuario:', error);
      document.getElementById('status').innerHTML = error;
    });

}

function saveUser(userData) {

  fetch(POSTMAN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          let user = JSON.parse(data.data);
          console.log(`Usuario grabado: ${data.data}`);
          document.getElementById('name').innerHTML = user.first_name;

        })
        .catch((error) => {

          console.error('Error al grabar usuario: ', error);
          document.getElementById('status').innerHTML = error;

        });
    
}
