window.addEventListener('DOMContentLoaded', e => {
    const form = document.getElementById('signup-form')

    form.addEventListener('submit', e => {
        e.preventDefault()
        const fullName = form.querySelector("#fullname")?.value
        const username = form.querySelector("#username")?.value
        const password = form.querySelector("#password")?.value

        if (!Boolean(fullName) || !Boolean(username) || !Boolean(password)) {
            return alert('Full Name, username & password are required!')
        }

        API.request(
            () => API.users.create(JSON.stringify({ fullName, username, password })),
            (user) => {
                confirm("User created: Login now?") && window.location.href("/login.html")
                console.log("User created", { user });
            },
            error => {
                console.error("User not created", { error });
            }
        )
    })
})