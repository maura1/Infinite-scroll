const mykey = config.MY_KEY;
const secretkey = config.SECRET_KEY;

const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad  = true;
// Usplash API
let count = 5;
const apiKey = "RuO2UChnYixy34uS-IvisilhFiSBL5XMgflUOf6XQIY";
const apiUrl =  `https://api.unsplash.com/photos/random/?client_id=${mykey}&count=${count}`;


//Check if all images were loaded
function imageLoaded(){    
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
    }

}

/*//Helper Function to set attribute on Dom Element
function setAttribute(element ,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}


//Create Element for links & Photos , ADD to DOM
function displayPhotos(){
   //Run function forEach object in photosArray
   photosArray.forEach((photo)=>{
       //Create <a> to link to Unsplash 
       const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
       //Put <img> inside <a>, then put both inside imageContainer Element
       item.appendChild(img);
       imageContainer.appendChild(item);
   });
}*/

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;    
    photosArray.forEach(photo => {
        let link = document.createElement('a');
            link.href = photo.links.html;
            link.target = '_blank'
        let img = document.createElement('img');
            img.src = photo.urls.regular;
            img.alt = photo.alt_description;
            img.title = photo.alt_description;

        imageContainer.appendChild(link).appendChild(img);
        img.addEventListener('load',imageLoaded)
        
    })
}

// Get Photos from Unsplash API
async function getPhotos(){
    try{
       const response =await fetch(apiUrl);
       photosArray = await response.json();       
       displayPhotos();
    }catch(error){
       //Catch Error
    }

}
//Check to see if scrolling near the bottom of the paege, Load more photos
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&ready){
        ready = false;
        getPhotos();
    }
})

getPhotos()
