const data = [

{
    name:"RTA",
    description:"Location: RTA near UMT.",
    image: "images/modeltown.jpg"
},

{
    name:"Cross Courts by FR",
    description:"In PineAvenue"
},

{
    name:"FR Valencia",
    description:"Valencia"
},

{
    name:"Massage",
    description:"Relaxing full-body massage session."
},

{
    name:"Facial",
    description:"Deep cleansing facial treatment."
}

];

const input = document.getElementById("searchInput");
const dropdown = document.getElementById("dropdown");

const card = document.getElementById("infoCard");
const title = document.getElementById("infoTitle");
const desc = document.getElementById("infoDescription");

input.addEventListener("input", function(){

    const text = this.value.toLowerCase();

    dropdown.innerHTML = "";

    if(text === ""){
        dropdown.style.display="none";
        return;
    }

    const results = data.filter(item =>
        item.name.toLowerCase().includes(text)
    );

    if(results.length===0){
        dropdown.style.display="none";
        return;
    }

    dropdown.style.display="block";

    results.forEach(item=>{

        const div=document.createElement("div");
        div.className="dropdown-item";
        div.innerText=item.name;

        div.onclick=function(){

            input.value=item.name;
            dropdown.style.display="none";

            title.innerText=item.name;
            desc.innerText=item.description;

            card.classList.remove("show");
            void card.offsetWidth;
            card.classList.add("show");

        };

        dropdown.appendChild(div);

    });

});

document.addEventListener("click",function(e){

    if(!e.target.closest(".search-container")){
        dropdown.style.display="none";
    }

});

div.onclick = function(){

    input.value = item.name;
    dropdown.style.display = "none";

    title.innerText = item.name;
    desc.innerText = item.description;

    card.classList.remove("show");
    void card.offsetWidth;
    card.classList.add("show");

    document.getElementById("confirmLocation").style.display = "block";

};