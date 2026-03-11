const newsContainer = document.getElementById("news-container");
const trailersContainer = document.getElementById("trailers-container");
const seasonContainer = document.getElementById("season-container");


/* limpiar html */

function limpiarHTML(texto){
return texto.replace(/<[^>]*>?/gm,"").substring(0,120);
}


/* obtener imagen correcta */

function obtenerImagen(item){

if(item.enclosure && item.enclosure.link){
return item.enclosure.link;
}

if(item.thumbnail){
return item.thumbnail;
}

return "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png";

}


/* =====================
NOTICIAS
===================== */

async function cargarNoticias(){

try{

const url="https://api.rss2json.com/v1/api.json?rss_url=https://somoskudasai.com/feed/";

const res=await fetch(url);
const data=await res.json();

newsContainer.innerHTML="";

data.items.slice(0,6).forEach(noticia=>{

const imagen=obtenerImagen(noticia);

const card=document.createElement("div");
card.className="news-card";

card.innerHTML=`

<img src="${imagen}" onerror="this.src='https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'">

<div class="news-content">

<h3>${noticia.title}</h3>

<p>${limpiarHTML(noticia.description)}...</p>

<a href="${noticia.link}" target="_blank" class="btn">Leer más</a>

</div>

`;

newsContainer.appendChild(card);

});

}catch{

newsContainer.innerHTML="No se pudieron cargar las noticias.";

}

}


/* =====================
TRAILERS
===================== */

function cargarTrailers(){

const trailers=[

{
titulo:"Chainsaw Man Reze Arc Movie",
video:"https://www.youtube.com/embed/j9sSzNmB5po"
},

{
titulo:"Solo Leveling Temporada 2",
video:"https://www.youtube.com/embed/eqy85AL70PU"
},

{
titulo:"Jujutsu Kaisen Nuevo Arco",
video:"https://www.youtube.com/embed/pkKu9hLT-t8"
},

{
titulo:"Blue Lock Temporada 2",
video:"https://www.youtube.com/embed/4Jt78n_A7jM"
}

];

trailersContainer.innerHTML="";

trailers.forEach(t=>{

const card=document.createElement("div");
card.className="news-card";

card.innerHTML=`

<iframe width="100%" height="200"
src="${t.video}"
allowfullscreen>
</iframe>

<div class="news-content">

<h3>${t.titulo}</h3>

</div>

`;

trailersContainer.appendChild(card);

});

}


/* =====================
ESTRENOS TEMPORADA
===================== */

async function cargarTemporada(){

const url="https://api.jikan.moe/v4/seasons/now";

const res=await fetch(url);
const data=await res.json();

seasonContainer.innerHTML="";

data.data.slice(0,24).forEach(anime=>{

const card=document.createElement("div");
card.className="news-card";

card.innerHTML=`

<img src="${anime.images.jpg.image_url}">

<div class="news-content">

<h3>${anime.title}</h3>

<p>⭐ Score: ${anime.score || "N/A"}</p>

<a href="${anime.url}" target="_blank" class="btn">Ver info</a>

</div>

`;

seasonContainer.appendChild(card);

});

}


/* iniciar */

cargarNoticias();
cargarTrailers();
cargarTemporada();