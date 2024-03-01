

const loadPhone = async(searchText , isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones); 
    displayPhones(phones , isShowAll);
}

  
const displayPhones = ( phones , isShowAll) =>{

    //   1. jekhne boshabo ore dhora
const phoneContainer = document.getElementById('phone-container');


// clear phoncontianer past info before adding new info
    phoneContainer.textContent ='';

//  display show all button if there are more than 12 phones
const showAllContainer = document.getElementById('show-all-container');
if(phones.length > 12 && !isShowAll){
    showAllContainer.classList.remove('hidden');
}else{
    showAllContainer.classList.add('hidden');
}

// console.log('lala' ,isShowAll)

//  show only 1st 12 phones if not show all
 if(!isShowAll){
    phones= phones.slice(0,12);
 }



   phones.forEach(phone => {
//    2. create a div
        //    console.log(phone)
         const phoneCard = document.createElement('div');
         phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
        //  3.set innerHtml
         phoneCard.innerHTML = ` 
         <figure><img src="${phone.image}" /></figure>
         <div class="card-body">
           <h2 class="card-title">${phone.phone_name}</h2>
           <p>If a dog chews shoes whose shoes does he choose?</p>
           <div class="card-actions justify-center">
             <button onclick="handelShowDetail('${phone.slug}')" class="btn btn-primary rounded-2xl">Show Details</button>
           </div>
        </div>
         `;
        //  4.appendchild
        phoneContainer.appendChild(phoneCard);
   });
// hide loading spinner
toggleLoadingSpinner(false);

}



const handelShowDetail =async(id) =>{
    // console.log(id)
    // load individual data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    shoWphoneDetails(phone);
}

const shoWphoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText =phone.name;


    const showdetailContainer =document.getElementById('detail-container');
    showdetailContainer.innerHTML= `
          <img  class=" flex items-center justify-center  px-7 py-4 mr-10"  src="${phone.image}" alt="" />
          <p><span>storage:</span>${phone.mainFeatures.storage}</p>
          <p><span></span>${phone.mainFeatures.chipSet}</p>
          <p><span></span>${phone.mainFeatures.displaySize}</p>
          <p><span></span>${phone.others?.Bluetooth || 'No Blutooth'}</p>
          <p><span></span>${phone.others?.GPS? phone.others.GPS : 'No GPS'}</p>

    `

    




//  show thwe modal 
shoe_details_modal.showModal();
}



// handel search button
const handelSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    console.log(searchText);
    loadPhone(searchText , isShowAll);
   
}

const  toggleLoadingSpinner = (isLoading) =>{
    
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

// handelShowAll
const handelShowAll = () =>{
    handelSearch(true);
}


loadPhone()