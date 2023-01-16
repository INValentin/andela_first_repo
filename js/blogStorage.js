const storeKey = "blogs";

if (localStorage.getItem(storeKey) === null) {
    localStorage.setItem(storeKey, '[]')
}

/**@type {Array} */
let blogs = JSON.parse(localStorage.getItem(storeKey))


const blogListEl = document.querySelector(".blog-list")
/**@type {HTMLTemplateElement} */
const blogTemp = document.getElementById("blog-template")

// show blogs if any
showBlogs()

function showBlogs() {
    blogListEl.innerHTML = `<h3>All blogs.</h3>`

    if (blogs.length === 0) {
        blogListEl.innerHTML += `<h3 style="color: var(--secondary)">No Blogs yet.</h3>`
        return
    }

    blogs.reverse().forEach((blog, i) => {
        let blogEl = blogTemp.content.firstElementChild.cloneNode(true)
        blogEl.querySelector(".blog-name").innerHTML = blog.names
        blogEl.querySelector(".blog-email").innerHTML = blog.email
        blogEl.querySelector(".blog-message").innerHTML = blog.message.slice(0, 100)
        blogEl.querySelector(".blog-readmore").href += blog.id
        blogEl.querySelector(".blog-remove").addEventListener("click", e => {
            if (window.confirm("Confirm Delete?")) {
                blogs.splice(i, 1)
                localStorage.setItem(storeKey, JSON.stringify(blogs))
                showBlogs()
            }
        })

        blogListEl.appendChild(blogEl)
    })
}










