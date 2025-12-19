// Contact  Function
// Wrap your code in DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function(){
  let contactForm = document.getElementById('contactForm');
  let messageList = document.getElementById('messagesList');
  // Make sure the element exists
  if (!contactForm) {
    console.error('Contact Form element not found!');
    return;
  }
contactForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const name = document.querySelector('#c_name').value.trim();
  const email = document.querySelector('#c_email').value.trim();
  const message = document.querySelector('#c_message').value.trim();
  if(!name||!email||!message){
    swal("Error!", "Please complete the form", "error");
    return;
  }
  let messageData = JSON.parse(localStorage.getItem("messageData")) ?? [];
  messageData.push({name,email,message,created:Date.now()});
  localStorage.setItem("messageData",JSON.stringify(messageData));
  contactForm.reset();
  displayMessageData();
  swal("Success!", "Booking saved locally (demo).", "success");
})
// *****************************************
// Display Message Data
function displayMessageData(){
    let messageData = JSON.parse(localStorage.getItem("messageData")) ?? [];
    messageList.innerHTML = messageData.length ? messageData.map((m,i)=>`<div class="item"><div><strong>${m.name}</strong><div class="meta">${m.email} • ${new Date(m.created).toLocaleString()}</div><div class="meta">${m.message}</div></div><div><button data-i="${i}" class="btn ghost del">Delete</button></div></div>`).join('') : '<div class="meta">No messages yet</div>'
  }     
// To delete a message data
    messageList.addEventListener('click',(e)=>{
      if(e.target.matches('.del')){
        const i = Number(e.target.dataset.i);
        let messageData = JSON.parse(localStorage.getItem("messageData")) ?? [];
        messageData.splice(i,1);
        localStorage.setItem("messageData",JSON.stringify(messageData));
        displayMessageData();
      }
})
displayMessageData();
});

// Register  Function
// Wrap your code in DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function(){
  let registerForm = document.getElementById("registerForm");
  let usersList = document.getElementById("usersList");
  // Make sure the element exist
  if(!registerForm){
    console.error('Registration Form element not found!');
    return;
  }
  registerForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    e.preventDefault();
      const name = document.querySelector('#r_name').value.trim();
      const email = document.querySelector('#r_email').value.trim();
      const password = document.querySelector('#r_password').value;
      if(!name || !email || password.length<6){ 
        alert('Please provide valid details (password min 6 chars)');
        return
      }
      let registerData = JSON.parse(localStorage.getItem("registerData")) ?? [];
      registerData.push({
        name,email,password,created:Date.now()
      })
      localStorage.setItem("registerData",JSON.stringify(registerData));
      registerForm.reset();
      displayRegisterData();
  })
  // Display register data
  function displayRegisterData(){
    let registerData = JSON.parse(localStorage.getItem("registerData")) ?? [];
    usersList.innerHTML = registerData.length ? registerData.map((u,i)=>`<div class="item"><div><strong>${u.name}</strong><div class="meta">${u.email}</div></div><div>${i+1}</div></div>`).join('') : '<div class="meta">No users yet</div>'
  }
  displayRegisterData();
});
