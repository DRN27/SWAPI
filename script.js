'use strict';

const url = 'https://swapi.co/api/people/';

main();

function focusOnForm(obj) {
  obj.style.borderColor = 'green'; 
  document.querySelector('#search').addEventListener( 'keyup', (event) => {
    const arrayOfFindNames = [];
    const arrayOfNames = document.querySelectorAll('.character_name');
    arrayOfNames.forEach( (element) => {
      if (element.innerHTML.toLowerCase().includes(search.value) ) {
        arrayOfFindNames.push(element);
      }
    });
    document.querySelectorAll('.character').forEach( (element) => {
      element.style.display = 'none';
    });
    arrayOfFindNames.forEach( (element) => {
      element.parentNode.style.display = 'block';
    });
  });
  document.querySelector('#search').addEventListener('blur', () => search.style.borderColor = 'black' );
}

async function main() {
  const response = await fetch(url);
  const data = await response.json();

  for (let i = 0; i < 10; i++ ) {
    const div = document.createElement('div');
    div.className = 'character';
    document.querySelector('.container').append(div);

    const expand = document.createElement('div');
    expand.className = 'expand';
    expand.innerText = '+';
    document.querySelectorAll('.character')[i].append(expand);

    const name = document.createElement('p');
    name.className = 'character_name';
    name.innerText = data.results[i].name;
    document.querySelectorAll('.character')[i].append(name);

    const parameters = document.createElement('div');
    parameters.className = 'parameters';
    document.querySelector('.container').append(parameters);

    const height = document.createElement('p');
    height.className = 'character_height';
    height.innerText = 'height:' + ' ' + data.results[i].height;
    document.querySelectorAll('.parameters')[i].append(height);

    const mass = document.createElement('p');
    mass.className = 'character_mass';
    mass.innerText = 'mass:' + ' ' + data.results[i].mass;
    document.querySelectorAll('.parameters')[i].append(mass);

    const birthYear = document.createElement('p');
    birthYear.className = 'character_birth_year';
    birthYear.innerText = 'birth year:' + ' ' + data.results[i].birth_year;
    document.querySelectorAll('.parameters')[i].append(birthYear);

    const homeworld = document.createElement('p');
    homeworld.className = 'character_homeworld';
    const response2 = await fetch(data.results[i].homeworld);
    const dataHomeworld = await response2.json();
    homeworld.innerText = 'homeworld:' + ' ' + dataHomeworld.name;
    document.querySelectorAll('.parameters')[i].append(homeworld);

    const films = document.createElement('p');
    films.className = 'character_films';
    films.innerText = 'films:' + ' ';
    const spaces = '&nbsp '+' &nbsp '+' &nbsp '+' &nbsp '+' &nbsp '+' &nbsp';
    data.results[i].films.forEach(async function(element) {
      const response3 = await fetch(element);
      const dataFilms = await response3.json();
      
      films.innerHTML += dataFilms.title + '<br>' + spaces;
    });
    document.querySelectorAll('.parameters')[i].append(films);

  }

  loading.style.zIndex = '-10';
  loading.style.transform = 'scale(0)';
  showParameters();
}

function showParameters() {
  const expend = document.querySelectorAll('.expand');
  expend.forEach( (element) => element.addEventListener('click', (event) => {
    if (event.target.parentElement.nextElementSibling.style.display == 'block') {
      document.querySelectorAll('.parameters').forEach( (element) => element.style.display = 'none');
    } else {
      document.querySelectorAll('.parameters').forEach( (element) => element.style.display = 'none');
      event.target.parentElement.nextElementSibling.style.display = 'block';
    }
  }));
}
