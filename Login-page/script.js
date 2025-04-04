 let currentStep = 1;
  const steps = document.querySelectorAll('.step');

  function showStep(step) {
    steps.forEach((s, index) => {
      s.classList.toggle('active', index === step - 1);
    });
  }

  document.getElementById('next1').addEventListener('click', function() {
    document.body.className = 'bg-step2';
    currentStep++;
    showStep(currentStep);
    document.querySelector('.progress-bar').style.width = '66%';
  });

  document.getElementById('next2').addEventListener('click', function() {
    document.body.className = 'bg-step3';
    currentStep++;
    showStep(currentStep);
    document.querySelector('.progress-bar').style.width = '100%';
  });

  document.getElementById('prev1').addEventListener('click', function() {
    document.body.className = 'bg-step1';
    currentStep--;
    showStep(currentStep);
    document.querySelector('.progress-bar').style.width = '33%';
  });

  document.getElementById('prev2').addEventListener('click', function() {
    document.body.className = 'bg-step2';
    currentStep--;
    showStep(currentStep);
    document.querySelector('.progress-bar').style.width = '66%';
  });

  document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
      reg_no: document.getElementById('reg_no').value,
      name: document.getElementById('name').value,
      block: document.getElementById('block').value,
      room_no: document.getElementById('room_no').value,
      dining_mess: document.getElementById('dining_mess').value,
      mess_type: document.getElementById('mess_type').value,
      food_suggestion: document.getElementById('food_suggestion').value,
      meal_type: document.getElementById('meal_type').value,
      feasibility: document.getElementById('feasibility').value
    };

    fetch('http://localhost:3000/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.ok ? response.json() : Promise.reject('Failed to store details.'))
    .then(() => {
      alert('Stored successfully!');
      document.getElementById('studentForm').reset();
      currentStep = 1;
      showStep(currentStep);
      document.querySelector('.progress-bar').style.width = '33%';
    })
    .catch(error => {
      console.error('Error:', error);
      alert(error);
    });
  });

  showStep(currentStep);
function handleCredentialResponse(response) {
    // Decode the JWT token
    const data = parseJwt(response.credential);
    console.log("User Info:", data);

    // Display user info (Optional)
    alert("Signed in as: " + data.name);

    // You can now send this data to your backend
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

