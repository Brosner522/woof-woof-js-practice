//User should be able to 
// Click on dogs in the bar to see more info about the dog.
// More info should include a dog pic, dog name, and dog   button that indicates whether it is good or bad.
// Click on good/bad button to toggle dog goodness.
// Click on "filter good dogs" button in order to just see dogs or see all dogs in dog bar.

// Getting all the poup objects. 

const dogList = document.querySelector('#dog-bar')
console.log(dogList)

fetch('http://localhost:3000/pups')
    .then((res) => res.json())
    .then((pupsArray) => {
        pupsArray.forEach(pupObj => {
            let dogName = document.createElement("span")
                if (pupObj.isGoodDog === true) {
                    dogName.classList.add("good")
                } else {
                    dogName.classList.add("bad") 
                }

            dogName.innerText = pupObj.name
            dogList.append(dogName)

            dogName.addEventListener('click', () => {
                const dogInfo = document.querySelector(`#dog-info`)
                const dogTitle = document.querySelector(`#dog-name`)
                const dogButton = document.querySelector(`#dog-button`)
                const dogPic = document.querySelector(`#dog-image`)

                dogPic.setAttribute("src", pupObj.image)
                dogPic.setAttribute("alt", pupObj.name)
                dogTitle.innerText = pupObj.name

                if (pupObj.isGoodDog === true) {
                    dogButton.innerText = "Bad"
                } else {
                    dogButton.innerText = "Good"
                }

                dogButton.addEventListener('click', () => {
                    if (pupObj.isGoodDog === true) {
                        dogButton.innerText = "Good"
                    } else {
                        dogButton.innerText = "Bad"
                    }

                    fetch(`http://localhost:3000/pups/${pupObj.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({isGoodDog: !pupObj.isGoodDog}),
                    })
                        .then((r) => r.json())
                        .then(() => {
                            pupObj.isGoodDog = !pupObj.isGoodDog 
                        });
                })
            })
        })
    })


const dogFilterButton = document.querySelector('#good-dog-filter')

let filter = false;

dogFilterButton.addEventListener('click', () => {
    const dogs = document.querySelectorAll('span')
    for (let i = 0; i< dogs.length; i += 1) {
        if (!filter) {
            if (!dogs[i].classList.contains('good')) {
                dogs[i].style.display = 'none'
            }
            dogFilterButton.innerText =' FILTER ON'
        } else {
            dogs[i].style.display = 'inline'
            dogFilterButton.innerText =' FILTER OFF'
        }
        
    } 
    filter  = !filter; 
})




