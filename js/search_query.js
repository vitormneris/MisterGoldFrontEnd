document.addEventListener("DOMContentLoaded", function (e) {
    e.preventDefault()

    document.getElementById("searchSend").addEventListener("click", function (e) {
      let name = document.getElementById("searchName").value
      window.location.href = "/html/productsQuery.html?name=" + name
    })
  })