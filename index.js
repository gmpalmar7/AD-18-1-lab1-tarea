
const itemsContainer = document.querySelector("#list-items")

function addItem(item) {
  const colourCard = document.createElement("section")
  colourCard.className = "card w-75"
  itemsContainer.append(colourCard)

  const colourCardBody = document.createElement("article")
  colourCardBody.className = "card-body"
  colourCard.append(colourCardBody)

  const colourCardTitle = document.createElement("h5")
  colourCardTitle.className = "card-title"
  colourCardTitle.innerText = item.name
  colourCardBody.append(colourCardTitle)

  const colourCardText = document.createElement("p")
  colourCardText.className = "card-text"
  colourCardText.innerText = item.pantone_value
  colourCardBody.append(colourCardText)

  const colourCardColour = document.createElement("figure")
  colourCardColour.style = "background-color: " + item.color + ";"
  colourCardColour.innerText = item.color
  colourCardBody.append(colourCardColour)

  const colourCardBreak = document.createElement("br")
  itemsContainer.append(colourCardBreak)
}

async function fetchColorsList() {
    try {
    const response = await fetch('https://reqres.in/api/unknown', {
      method: 'GET',
      headers: {'x-api-key': 'reqres-free-v1'
            }
        });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
        }
    const data = await response.json();
    const colors = data.data;
        // Guardar en localStorage (Tarea 3)
    localStorage.setItem('colorsList', JSON.stringify(colors));
    console.log('Colores guardados en localStorage');
        // Mostrar los colores (Tarea 2)
    colors.forEach(color => {
    addItem(color);
        });
        
        console.log('Colores cargados desde la API:', colors);
        
    } catch (error) {
        console.error('Error al cargar colores:', error);
    }
}

function loadColorsFromStorage() {
  try {
    const storedColors = localStorage.getItem('colorsList');
    if (storedColors) {
    const colors = JSON.parse(storedColors);
        colors.forEach(color => {
        addItem(color);
            });
console.log('Colores cargados desde localStorage:', colors);
  return true;
} else {
console.log('No hay colores guardados en localStorage');
  return false;
}
} catch (error) {
  console.error('Error al cargar desde localStorage:', error);
  return false;
    }
}


const loaded = loadColorsFromStorage();
if (!loaded) {
    fetchColorsList();
}

function reloadColors() {
    itemsContainer.innerHTML = '';
    fetchColorsList();
}

function clearColorsList() {
    itemsContainer.innerHTML = '';
    localStorage.removeItem('colorsList');
    console.log('Lista de colores borrada');
}

document.addEventListener('DOMContentLoaded', function() {
    const loadBtn = document.getElementById('loadBtn');
    if (loadBtn) {
        loadBtn.addEventListener('click', reloadColors);
    }
    
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearColorsList);
    }
});