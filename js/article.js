const articleTitle = document.querySelector(".article-title")
const articleBody = document.querySelector(".article-message")
const articleDelete = document.querySelector(".article-remove")
const articleAuthor = document.querySelector(".article-author")






const articleId = new URLSearchParams(location.search.replace("?", "")).get("id")

const blogs = JSON.parse(localStorage.getItem("blogs"))

const article = blogs.find(blog => Number(blog.id) === Number(articleId))

if (!article) {
    window.alert("Article not found")
    window.location.href = "./blog.html"
}

articleDelete.addEventListener("click", e => {
    if (window.confirm("Confirm Delete?")) {
        localStorage.setItem("blogs", JSON.stringify(
            blogs.filter(blog => Number(blog.id) !== Number(articleId))
        ))

        window.location.href = "./blog.html"
    }
})

articleTitle.innerHTML = article.names
articleAuthor.innerHTML = article.email
articleBody.innerHTML = article.message



