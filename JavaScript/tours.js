
// Booking  Function
// Wrap your code in DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
   // Replace with actual form ID
  let fromItem = document.getElementById('bookingForm');
  let listItem = document.getElementById('bookingsList');
  let btn = document.getElementsByClassName('btn');
  // Make sure the element exists
  if (!fromItem) {
    // console.error('Form element not found!');
    return;
  }


fromItem.addEventListener("submit",(e)=>{
  e.preventDefault();
  const name = document.querySelector('#b_name').value.trim();
  const email = document.querySelector('#b_email').value.trim();
  const phone = document.querySelector('#b_phone').value.trim();
  const destination = document.querySelector('#b_destination').value;
  const date = document.querySelector('#b_date').value;
  const guests = document.querySelector('#b_guests').value;
  
  if(!name||!email||!phone||!date){ 
    swal("Error!", "Please complete the form", "error");
    return 
  }
  let formData = JSON.parse(localStorage.getItem("bookingData")) ?? [];
  formData.push({
    name,email,phone,destination,date,guests,created:Date.now()
  })
  localStorage.setItem("bookingData",JSON.stringify(formData));

  fromItem.reset();
  displayData();
  // alert('Booking saved locally (demo).');
  swal("Success!", "Booking saved locally (demo).", "success");
})

// *****************************************
// Display Data 
function displayData(){
  let formData = JSON.parse(localStorage.getItem("bookingData")) ?? [];
  listItem.innerHTML = formData.length ? formData.map((b,i)=>`<div class="item"><div><strong>${b.name}</strong><div class="meta">${b.destination} • ${b.date} • ${b.guests+' guest(s)'}</div></div><div><button data-i="${i}" class="btn ghost del">Delete</button></div></div>`).join('') : '<div class="meta">No bookings yet</div>'
}
// To delete a data
  listItem.addEventListener('click',(e)=>{
    if(e.target.matches('.del')){
      const i = Number(e.target.dataset.i);
      let formData = JSON.parse(localStorage.getItem("bookingData")) ?? [];
      formData.splice(i,1);
      localStorage.setItem("bookingData",JSON.stringify(formData));
      displayData();
    }
})
displayData();
});

// Gallery  Function
// Wrap your code in DOMContentLoaded event listener
// Gallery modal
  function initGallery(){
    const imgs = document.querySelectorAll('.gallery-grid img');
    const modal = document.querySelector('#modal');
    const modalImg = document.querySelector('#modalImg');
    const close = document.querySelector('#modalClose');
    if(!modal) return;
    imgs.forEach(img=>{
      img.addEventListener('click', ()=>{
        const large = img.dataset.large || img.src;
        modalImg.src = large;
        modal.setAttribute('aria-hidden','false');
      })
    })
    close.addEventListener('click', ()=>{
      modal.setAttribute('aria-hidden','true'); modalImg.src = ''
      })
    modal.addEventListener('click', e=>{ 
      if(e.target===modal) { 
        modal.setAttribute('aria-hidden','true'); modalImg.src = '' 
      }
    })
  }
  initGallery();
