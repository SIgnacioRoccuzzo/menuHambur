//capturamos los elementos 
const sectionMeals = document.querySelector('#menu .meals');

/*
                        <article>
                            <figure>
                                <img src="images/t1.jpg" alt="delicious vegetable burger">
                            </figure>
                            <div>
                                <header>
                                    <h3>Chicken Burger with Cheese and Butter</h3>
                                    <span>$95</span>
                                </header>
                                <p>Vegetable and chicken burger with extra butter</p>
                                <a href="" class="boton">Borrar</a>
                            </div>
                        </article>

*/

function deleteItemArray(pId, pList) {
    //splice borrar por posicion tenemos una para saber su posicion
    //findIndex devuelve la posicion si se cumple la condicion y -1 si no cumple
    let posicionBorrar = pList.findIndex(item => item.id === pId);
    if (posicionBorrar !== -1) {
        pList.splice(posicionBorrar, 1);
    }
    console.log(pList);
}



function deleteItem(event) {
    event.preventDefault()

    let id = parseInt(event.target.dataset.id)

    //borrar fisicamente del dom
    //antes de borrar desde a tengo que recoger el article - 2 nodos
    const articleDelete = event.target.parentNode.parentNode;
    articleDelete.parentNode.removeChild(articleDelete);

    //borrar del array - saber el id el elemento 
    deleteItemArray(id, menu);
}

function printOneItem(pMenuItem, pDom) {
    const article = document.createElement('article');
    const figure = document.createElement('div');
    const img = document.createElement('img');
    img.src = pMenuItem.url;
    img.alt = pMenuItem.title;

    figure.appendChild(img);

    const div = document.createElement('div');

    const header = document.createElement('header');
    header.innerHTML = `<h3>${pMenuItem.title}</h3>
                        <span>${pMenuItem.price}€</span>`;
    const p = document.createElement('p');
    p.textContent = pMenuItem.description

    const a = document.createElement('a');
    //Creo un dataset para enviar cada vez que hagamos click el id del elemento que quiero borrar.
    a.dataset.id = pMenuItem.id;

    a.addEventListener('click', deleteItem)
    a.href = "#";
    a.classList.add('boton');
    a.textContent = 'Borrar';

    div.append(header, p, a);

    article.append(figure, div);

    pDom.appendChild(article);

}

function printMenu(pList, pDom) {
    pDom.innerHTML = "";
    pList.forEach(item => printOneItem(item, pDom));
}



function filterByCategory(pList, pCategory) {
    return pList.filter(item => item.category === pCategory);
}

//vamos capturar los botones del menu de izquierda.
function changeMenu(event) {
    let category = event.target.textContent.toLowerCase();
    const menuFiltered = filterByCategory(menu, category);
    printMenu(menuFiltered, sectionMeals);

}

const lis = document.querySelectorAll('.select-lunch-time li');
lis.forEach(li => li.addEventListener('click', changeMenu));

printMenu(menu, sectionMeals);