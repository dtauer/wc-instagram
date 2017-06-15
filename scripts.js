 //Create an event for when the window is scrolled
window.addEventListener('scroll', function(){
    var distance = window.pageYOffset || document.documentElement.scrollTop
    var header = document.querySelector('header')

    // If the window has scrolled more that 200 pixels, add the .header--small class to the header
    // Otherwise, remove the .header--small class
    if(distance > 200){
        header.classList.add('header--small')
    } else {
        header.classList.remove('header--small')
    }
})

function addClickEvents() {
    // Add click events to all the images
    const images = document.querySelectorAll('.image')
    images.forEach(function(image, index){
        //Add a click event to the image
        //have the click event console.log(index)
        image.addEventListener('click', function(e){
            e.preventDefault() // Stop the click event from refreshing
            const source = this.querySelector('img').src
            const id = source.split('=')[1]
            showFullImage(id)
        })
    })
}

// Add Error Events to the images incase the image is not available
function addErrorEvents(){
    const images = document.querySelectorAll('.image img')
    images.forEach( (image, index) => {
        image.addEventListener('error', () => {
            image.src = `https://unsplash.it/300/?image=580`
        })
    })
}

// function showFullImage (id) {
const showFullImage = id => {
    const fullContainer = document.querySelector('.full')
    const fullImage = fullContainer.querySelector('img')
    //Set the src of the fullImage to be a bigger version
    fullImage.src = `https://unsplash.it/600/?image=${id}`
    //Remove the hidden class from the fullContainer to show it
    fullContainer.classList.remove('hidden')
}

//Add  event to the .full DIV so it adds the hidding class when clicked
// 1) Declare variable for .full DIV
// 2) Add click Event
// 3) add hidden class when clicked
const fullContainer = document.querySelector('.full')
fullContainer.addEventListener('click', function(){
    this.classList.add('hidden')
})

// Load Data from http://unsplash.it/list
// then convert to JSON
// Then grab 20 random images
// then add images to HTML and call addClickEvents()
fetch('https://unsplash.it/list')
.then( result => result.json() )
.then(result => {
    let randoms = []
    for(let i=0; i<20; i++) {
        randoms.push( Math.round(Math.random()*result.length) )
    }
    let images = result.filter(image => {
        return randoms.includes(image.id)
    })
    populateImages(images)
    addClickEvents()
    addErrorEvents()
})

// This function will add all the images we loaded remotely
// to the HTML page
function populateImages(imageArray) {
    // Need a variable for the image container
    const imageContainer = document.querySelector('.images .inner')
    //Then we need to loop through the imageArray
    // maybe just console.log somethign to make sure it working
    imageArray.forEach( (image, index) => {
        const html = `<a href="" class="image">
                        <img src="https://unsplash.it/320/?image=${image.id}" alt="${image.author}">
                        <span class="image__cover">View Image</span>
                     </a>`
        imageContainer.innerHTML += html
    })
}

/*
<a  href="" class="image"><img src="http://unsplash.it/320/?image=99" alt="">
    <span class="image__cover">View Image</span>
</a>
*/