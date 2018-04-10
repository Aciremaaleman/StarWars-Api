var sectionPeople = document.getElementById('starwarsPeople');
var modal = document.getElementById('exampleModal');

fetch("https://swapi.co/api/films/")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log('Request successful', data);
        let films = data.results;
        getFilms(films);
    })
    .catch(function (error) {
        console.log('Request failed', error)
    });


const getFilms = (films) => {
    let output = ``;
    films.forEach(function (element, index) {
        let titleFilm = element.title;
        let episodeFilm = element.episode_id;
        let characters = element.characters;
        let arrayFilms = ['./assets/images/episodeIV.jpg',
            './assets/images/episodeII.jpg',
            './assets/images/episodeI.jpg',
            './assets/images/episodeIII.jpg',
            './assets/images/episodeVI.jpg',
            './assets/images/episodeV.jpg',
            './assets/images/episodeVII.jpg'
        ];
        let imageFilms = arrayFilms[index];

        output +=

            `<div class="card styleFilms" style="width: 13rem;">
        <img class="card-img-top" src=${imageFilms} alt="Card image cap">
        <div>
          <div class="card-body">
            <h5 class="card-title">Title: ${titleFilm}</h5>
            <p class="card-text">Episode: ${episodeFilm}</p>
            <h5 class="card-title">Characters:</h5>
            <ul>
            <li><a data-detail="${characters[0]}" data-toggle="modal" data-target="#exampleModal"> Luke Skywalker </a></li>
            <li><a data-detail="${characters[1]}"  data-toggle="modal" data-target="#exampleModal"> CP-3O </a></li>
            <li><a data-detail="${characters[2]}"  data-toggle="modal" data-target="#exampleModal">R2-D2</a></li>
            </ul>
          </div>
        </div>
      </div>`

        sectionPeople.innerHTML = output;

        const elementosA = document.getElementsByTagName("a");

        for (let i = 0; i <= elementosA.length - 1; i++) {
            elementosA[i].onclick = function ahora() {
                let urlCharacter = this.getAttribute('data-detail');

                fetch(`${urlCharacter}`).then(function (response) {
                        return response.json();
                    })
                    .then(function (dataChar) {
                        modalInfo(dataChar);
                    })
                    .catch(function (error) {
                        console.log('Error!!!', error);
                    });
            };
        }
    }); //End of the forEach films
} //end of the function films

const modalInfo = (output) => {
    // getting the characters data
    let name = output.name;
    let birth = output.birth_year;
    let gen = output.gender;
    let height = output.height;
    let mass = output.mass;
    let hair = output.hair_color;
    let skin = output.skin_color;
    let urlChar = output.url;
    // console.log(urlChar);              
    let arrayNumA = urlChar.charAt(28);
    // console.log(typeof (arrayNumA));
    let arrayNumb = urlChar.charAt(29);
    // console.log(arrayNumb);

    let arrayNum = urlChar.charAt(28) - 1;
    // console.log(arrayNum);
    if (urlChar.charAt(28) === "1" && urlChar.charAt(29) === "0") {
        arrayNum = "9";
    }
    // console.log(arrayNum);

    let arrayImage = ['./assets/images/luke.jpg',
        './assets/images/cp3o.jpg', './assets/images/r2d2.jpg',
        './assets/images/dart.jpg', './assets/images/leia.jpg',
        './assets/images/owen.jpg', './assets/images/beru.jpg',
        './assets/images/R5-D4.jpg', './assets/images/Biggs.jpeg',
        './assets/images/obi.jpg'
    ];

    let imgSRC = arrayImage[arrayNum];

    $('#exampleModal').on('show.bs.modal', function (event) {
        let modal = $(this);
        modal.find('.modal-title').text(name);
        modal.find('#imageChar').attr("src", `${imgSRC}`);
        modal.find('#birth').text(`Birth Year: ${birth}`);
        modal.find('#gender').text(`Gender: ${gen}`);
        modal.find('#height').text(`Height: ${height}`);
        modal.find('#mass').text(`Mass: ${mass}`);
        modal.find('#hair-color').text(`Hair-color: ${hair}`);
        modal.find('#skin-color').text(`Skin-color: ${skin}`);

    });
};