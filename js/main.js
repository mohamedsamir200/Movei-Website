"user stric"
//open navbar //
$(".fa-bars").click(function () {
  $(".sideLinks").animate({ width: "250px" }, 500);
  $(".sideLinks ul li").css("display", "block");
  $(".icon-footer,.copy-right").css("display", "block");

  $(".fa-xmark").css("display", "block");
  $(".fa-bars").css("display", "none");
});

//close navbar //
$(".fa-xmark").click(function () {
  $(".sideLinks").animate({ width: "0px" }, 500);
  $(".sideLinks ul li").css("display", "none");
  $(".icon-footer,.copy-right").css("display", "none");

  $(".fa-xmark").css("display", "none");
  $(".fa-bars").css("display", "block");
});

new WOW().init();

//---------- Movies -------------- //
let movieLIst = [];

async function getMovie(movie) {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`
  );
  let trendMovie = await response.json();
  movieLIst = trendMovie.results;
  displayMovie();
}

async function trendMovie() {
  let response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`
  );
  let trendMovie = await response.json();
  movieLIst = trendMovie.results;
  displayMovie();
}

trendMovie();

document.getElementById("trendMovie").addEventListener("click", function () {
  trendMovie();
});

function displayMovie() {
  var cartona = ``;
  for (let i = 0; i < movieLIst.length; i++) {
    cartona += ` <div class="col-md-4">
    <div class="movie text-center position-relative my-3" id="movieData">
       <img src ="https://image.tmdb.org/t/p/w500${movieLIst[i].poster_path}" class = "w-100 movieImg" />
       <div class="layerImg d-flex flex-column align-items-center justify-content-center lead text-black">
       <h3>${movieLIst[i].title}</h3>
       <p>${movieLIst[i].overview}</p>
       <h3>${movieLIst[i].vote_average}</h3>
       <p>${movieLIst[i].release_date}</p>
       </div>
      </div>
   </div> 
   `;
  }
  document.getElementById("movieData").innerHTML = cartona;
}

let links = document.querySelectorAll(".sideLinks ul li");
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (e) {
    cuttrntClick = e.target.text;
    // console.log(cuttrntClick);
    getMovie(cuttrntClick);
  });
}

// searchURL = "https://api.themoviedb.org/3/search/movie?query=mad&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false",
// trendingURL = "https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
// latestURL = "https://api.themoviedb.org/3/movie/latest?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
// popularURL = "https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
// topratedURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
// upcomingURL = "https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
// NowPlayingURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44"

//---------- END Movies -------------- //

//-------search All Movie -------//
currentMovie = "";
async function searchMovie() {
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${currentMovie}&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false`
  );
  let trendMovie = await response.json();
  movieLIst = trendMovie.results;
  displayMovie();
}

let searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup", function () {
  currentMovie = searchBar.value;
  searchMovie();
});
//-------- search in same page -----//
let searchFilm = document.getElementById('searchFilm')
searchFilm.addEventListener('keyup',function(e){
  let findFilm = e.target.value
  var cartona = ``;
  for (let i = 0; i < movieLIst.length; i++) {
    // console.log(movieLIst[i].overview);
    if(movieLIst[i].title.includes(findFilm)){

      cartona += ` <div class="col-md-4">
      <div class="movie text-center position-relative my-3" id="movieData">
         <img src ="https://image.tmdb.org/t/p/w500${movieLIst[i].poster_path}" class = "w-100 movieImg" />
         <div class="layerImg d-flex flex-column align-items-center justify-content-center lead text-black">
         <h3>${movieLIst[i].title}</h3>
         <p>${movieLIst[i].overview}</p>
         <h3>${movieLIst[i].vote_average}</h3>
         <p>${movieLIst[i].release_date}</p>
         </div>
        </div>
     </div> 
     `;
    }else if(findFilm == ""){
      trendMovie();
    }
  }
  document.getElementById("movieData").innerHTML = cartona;
})

// --------------------------------------//


//----------- validation ---------------//
let submitBtn = document.getElementById("submitBtn");

// ---- Name Rejex -----//
let userName = document.getElementById("userName");
let validName = document.getElementById("validName");
userName.addEventListener("keyup", function () {
  let rejexName = /^[A-Z ][ A-za-z]{10,30}$/;
  if (rejexName.test(userName.value)) {
    // submitBtn.removeAttribute('disabled')
    userName.classList.replace("is-invalid", "is-valid");
    validName.classList.replace("d-block", "d-none");
  } else {
    submitBtn.disabled = "true";
    userName.classList.add("is-invalid");
    validName.classList.replace("d-none", "d-block");
  }
});

//--- Email Rejex -- ///
let userEmail = document.getElementById("userEmail");
let validEmail = document.getElementById("validEmail");
userEmail.addEventListener("keyup", function () {
  let rejexName = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (rejexName.test(userEmail.value)) {
    //  submitBtn.removeAttribute('disabled')
    userEmail.classList.replace("is-invalid", "is-valid");
    validEmail.classList.replace("d-block", "d-none");
  } else {
    submitBtn.disabled = "true";
    userEmail.classList.add("is-invalid");
    validEmail.classList.replace("d-none", "d-block");
  }
});

//--- phone Rejex -- //
let userPhone = document.getElementById("userPhone");
let validphone = document.getElementById("validphone");
userPhone.addEventListener("keyup", function () {
  let rejexPhone = /^(002)?01[0125][0-9]{8}$/;
  if (rejexPhone.test(userPhone.value)) {
    //  submitBtn.removeAttribute('disabled')
    userPhone.classList.replace("is-invalid", "is-valid");
    validphone.classList.replace("d-block", "d-none");
  } else {
    submitBtn.disabled = "true";
    userPhone.classList.add("is-invalid");
    validphone.classList.replace("d-none", "d-block");
  }
});

//--- Age Rejex -- //

let userAge = document.getElementById("userAge");
let validAge = document.getElementById("validAge");
userAge.addEventListener("keyup", function () {
  if (userAge.value > 16) {
    //  submitBtn.removeAttribute('disabled')
    userAge.classList.replace("is-invalid", "is-valid");
    validAge.classList.replace("d-block", "d-none");
  } else {
    submitBtn.disabled = "true";
    userAge.classList.add("is-invalid");
    validAge.classList.replace("d-none", "d-block");
  }
});

//--- password Rejex -- //

let ueserpass = document.getElementById("ueserpass");
let validpass = document.getElementById("validpass");
ueserpass.addEventListener("keyup", function () {
  let rejexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if (rejexPass.test(ueserpass.value)) {
    // submitBtn.removeAttribute('disabled')
    ueserpass.classList.replace("is-invalid", "is-valid");
    validpass.classList.replace("d-block", "d-none");
  } else {
    submitBtn.disabled = "true";
    ueserpass.classList.add("is-invalid");
    validpass.classList.replace("d-none", "d-block");
  }
});

//--- Re-password Rejex -- //
let Repassword = document.getElementById("Repassword");
let validRepass = document.getElementById("validRepass");
Repassword.addEventListener("keyup", function () {
  if (Repassword.value == ueserpass.value) {
    submitBtn.removeAttribute("disabled");
    Repassword.classList.replace("is-invalid", "is-valid");
    validRepass.classList.replace("d-block", "d-none");
  } else {
    submitBtn.disabled = "true";
    Repassword.classList.add("is-invalid");
    validRepass.classList.replace("d-none", "d-block");
  }
});

//----------- End validation ---------------//
