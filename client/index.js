fetch("/api/words")
.then(res=>res.json())
.then(data => {

const container = document.querySelector(".word-container")

data.array.forEach(word => {


});










})
.catch(err => console.error("Failed to load words",err))
