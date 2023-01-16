const storeKey = "blogs";

// elements
const form = document.getElementById("blog-form")
const nameInput = document.getElementById("blog-names")
const emailInput = document.getElementById("blog-email")
const messageInput = document.getElementById("blog-message")


form.addEventListener("submit", e => {
    e.preventDefault()
    addBlog()
})


let blogs = JSON.parse(localStorage.getItem(storeKey))

function addBlog() {
    const names = nameInput.value
    const email = emailInput.value
    const message = messageInput.value

    if ([names, email, message].some(value => value.trim() === "")) {
        return alert("Please fill all the fields!")
    }

    const id = Date.now()
    const blog = { id, names, email, message }

    blogs.push(blog)
    form.reset()
    alert("Blog published!")
    localStorage.setItem(storeKey, JSON.stringify(blogs))
}