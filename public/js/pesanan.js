const socket = io();
const container = document.querySelector("#container");
const formPesanan = document.querySelector("#formPesanan");

socket.on("pesanan",createData);
socket.on("hapusPesanan",destroyData);
socket.on("editPesanan",(data,id) => editPesan(data,id))

formPesanan.addEventListener("submit",(e) => {
    e.preventDefault();
    const id = formPesanan.getAttribute("id");
    const dataForm = new FormData(e.target);
    let data = {};
    for(dt of dataForm) data[dt[0]] = dt[1];
    socket.emit("editPesanan",data,id)
    editPesan(data,id);
})

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("buttonHapus")) {
       const id = e.target.getAttribute("data-id");
       destroyData(id);
       socket.emit("hapusPesanan",id);
    }

    if(e.target.classList.contains("buttonEdit")){
        const pesan = JSON.parse(e.target.getAttribute("data-pesan"));
        const input = formPesanan.querySelector("input");
        const textarea = formPesanan.querySelector("textarea");
        formPesanan.setAttribute("id",e.target.getAttribute("data-id"));
        input.value = pesan[input.name];
        textarea.value = pesan[textarea.name];
    }

});


function createData (data) {
    container.innerHTML += `
    <div class="col-md-4 mb-2" id="pesan${data.id}" >
        <div class="card shadow">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                <h4 class="card-title">${XSS(data.nama)}</h4>
                <div>
                    <button class="badge bg-primary border-0 buttonEdit" data-pesan='${JSON.stringify(data)}' data-bs-toggle="modal" data-bs-target="#editModal" data-id="${data.id}" ><i data-pesan='${JSON.stringify(data)}' data-bs-toggle="modal" data-bs-target="#editModal" data-id="${data.id}" class="buttonEdit bi bi-pencil-square"></i></button>
                    <button class="badge bg-danger border-0 buttonHapus" data-id="${data.id}" ><i data-id="${data.id}" class="buttonHapus bi bi-trash3"></i></button>
                </div>
                </div>
                <p class="card-text">${XSS(data.pesan)}</p>
            </div>
        </div>
    </div>
    `
}

function editPesan (data,id) {
    const pesan = document.querySelector(`#pesan${id}`);
    pesan.innerHTML = `
    <div class="card shadow">
        <div class="card-body">
            <div class="d-flex justify-content-between">
            <h4 class="card-title">${XSS(data.nama)}</h4>
            <div>
                <button class="badge bg-primary border-0 buttonEdit" data-pesan='${JSON.stringify(data)}' data-bs-toggle="modal" data-bs-target="#editModal" data-id="${id}" ><i data-pesan='   ${JSON.stringify(data)}' data-bs-toggle="modal" data-bs-target="#editModal" data-id="${id}" class="buttonEdit bi bi-pencil-square"></i></button>
                <button class="badge bg-danger border-0 buttonHapus" data-id="${id}" ><i data-id="${id}" class="buttonHapus bi bi-trash3"></i></button>
            </div>
            </div>
            <p class="card-text">${XSS(data.pesan)}</p>
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