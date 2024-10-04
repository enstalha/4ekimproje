const apiKey = 'mPPsU_Oa4sP0fi-mTBANK5Y326uPcwgQq4feF_BaWcc';
const url = "https://api.unsplash.com/search/photos?page=1&query=";

const form = document.querySelector('form');
const searchInput = document.querySelector('#searchInput');
const row = document.querySelector('.row');
const toggleBtn = document.querySelector('#toggle-btn');
const body = document.querySelector('body');
const clearBtn = document.querySelector('#clearBtn');
const select = document.querySelector('select');
const bilgiMesaji = document.querySelector('#bilgiMesaji');


// ! Gece gunduz modu
toggleBtn.addEventListener('click', function() {
    if(body.classList.contains('dark-mode')){
        body.classList.remove('dark-mode');
        toggleBtn.innerHTML = 'Light Mode'
    }else{
        body.classList.add('dark-mode');
        toggleBtn.innerHTML = 'Dark Mode'
    }
})


// ! Form Submit Oldugunda Resimleri gosterme islemmi
let resimler = [];

form.addEventListener('submit', function(e){
    e.preventDefault();

    row.innerHTML = '';
    
    let searchTerm = searchInput.value;
    let request = `${url}${searchTerm}&client_id=${apiKey}`;

    fetch(request)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data.results);
        resimler = data.results;

        if(data.results.length == 0){
            alert("Aradığınız resim yok!")
        }

        onYuzeEkle(resimler);
        searchInput.value = ''; 
    })
})


function onYuzeEkle(veriler){
    console.log(veriler)

    veriler.forEach((veri) => {
        
        // ! Tarihi düzenlemek için
        const date = new Date(veri.created_at);
        const created = date.toLocaleDateString("tr-TR",{
            month : "2-digit",
            year : "numeric",
            day : "2-digit"
        })
        
        const col = document.createElement('div');
        col.classList = 'col-4 mb-3 p-2';

        const img = document.createElement('img');
        img.style.width = '100%';
        img.style.height = '250px';
        img.style.marginBottom = '15px';
        img.style.border = '1px solid black';
        img.style.padding = '10px';
        img.src = veri.urls.small;

        const deleteBtn = document.createElement('button');
        deleteBtn.id = 'delete';
        deleteBtn.classList = 'btn btn-danger float-end';
        deleteBtn.innerHTML = 'Sil';

        const description = document.createElement("p");
        description.innerHTML = `Yüklenme tarihi : ${created}`;

        const name = document.createElement("p");
        name.innerHTML = `Kişi : ${veri.user.name[0].toLocaleUpperCase("tr-TR") + veri.user.name.slice(1).toLocaleLowerCase("tr-TR")} ${veri.user.name[veri.user.name.indexOf(" ") + 1].toLocaleUpperCase("tr-TR") + veri.user.name.slice(veri.user.name.indexOf(" ") + 2).toLocaleLowerCase("tr-TR")}`;
        

        row.append(col);
        col.append(img);
        col.append(deleteBtn);
        col.append(description);
        col.append(name);
    })

}


// ! Sil butonuna tklandığında elemanı silmek
row.addEventListener("click", function(e){
        if(e.target.id == "delete"){
            let onay = confirm("Silmek istediğine emin misin?");
            if(onay){
                let column = e.target.parentElement;
                column.style.display = "none";
            }
        } 
}) 


// ! Temizle butonuna bsınca tüm fotoğraflar silinecek
clearBtn.addEventListener("click", function(){
    row.innerHTML = "";

    // ! Bilgi mesajı döndürmek için
    bilgiMesaji.innerHTML = "Tüm içerik temizlendi!";
    bilgiMesaji.classList.add("text-white", "text-center", "fw-bold", "mt-4", "bg-primary", "py-3");
    setTimeout(() => {
        bilgiMesaji.innerHTML = "";
        bilgiMesaji.classList.remove("text-white", "text-center", "fw-bold", "mt-4", "bg-primary", "py-3")
    },1500)
})
