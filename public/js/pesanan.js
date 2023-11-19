const socket = io();
const container = document.querySelector("#container");

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("buttonHapus")) {
       const id = e.target.getAttribute("data-id");
       destroyData(id);
       socket.emit("hapusPesanan",id);
    }

});

socket.on("pesanan",createData);
socket.on("hapusPesanan",destroyData);

function createData (data) {
    container.innerHTML += `
    <div class="col-md-4 mb-2" id="pesan${data.id}">
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between ">
                    <h5 class="card-title">${XSS(data.nama)}</h5>
                    <div>
                        <button class="badge bg-danger buttonHapus" data-id="${data.id}" >X</button>
                    </div>
                </div>
                <p class="card-text">${XSS(data.pesan)}</p>
            </div>
        </div>
    </div>
`
}

function destroyData (id) {
    const pesan = document.querySelector(`#pesan${id}`);
    if(pesan) container.removeChild(pesan)
}

function XSS(text) {
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}