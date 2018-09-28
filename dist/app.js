$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    window.location = "#search/" + searchText;
    e.preventDefault();
  });
  window.addEventListener('popstate', callPage);
  callPage();
});

function getMovies(searchText){
  axios.get('http://www.omdbapi.com/?apikey=53727f11&s='+searchText)
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="card shadow p-3 mb-3 text-center bg-white rounded">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a class="btn" href="#movie/${movie.imdbID}">Detalhes</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(imdbID){
  axios.get('http://www.omdbapi.com/?apikey=53727f11&i='+imdbID)
  .then((response) => {
    console.log(response);
    let movie = response.data;
    let output = `
    <div class="junbotron p-3 m-3 row bg-white rounded">
      <div class="col-md-4">
        <img src="${movie.Poster}" class="poster m-2 pt-4">
      </div>
      <div class="col-md-8">
        <h2>${movie.Title}</h2>
        <ul class="list-group">
          <li class="list-group-item"><strong>Gênero:</strong> ${movie.Genre}</li>
          <li class="list-group-item"><strong>Duração:</strong> ${movie.Runtime}</li>
          <li class="list-group-item"><strong>Ano:</strong> ${movie.Year}</li>
          <li class="list-group-item"><strong>Dirigido por:</strong> ${movie.Director}</li>
          <li class="list-group-item"><strong>Escrito por:</strong> ${movie.Writer}</li>
          <li class="list-group-item"><strong>Atrizes / Atores:</strong> ${movie.Actors}</li>
          <li class="list-group-item"><strong>Prêmios:</strong> ${movie.Awards}</li>
          <li class="list-group-item"><strong>Trama:</strong> ${movie.Plot}</li>
        </ul>
      </div>
    </div>
    
    <div class="col-md-12 m-3 text-center">
      <a onclick="window.history.back()" class="btn btn-default">Voltar</a>
      <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-default">IMDB</a>
      <a href="" class="btn btn-default">Adicionar</a>
    </div>
    `;
    $('#movies').html(output);
    $('.form-control').val('');
  })
  .catch((err) => {
    console.log(err);
  }); 
}

function callPage() {
  let urlPath = window.location.hash.substr(1);
  if (urlPath.startsWith("movie/")) {
    let id = urlPath.replace("movie/", '');
    movieSelected(id);
  };
  if (urlPath.startsWith("search/")) {
    let title = urlPath.replace("search/", '');
    getMovies(title);
  };
}