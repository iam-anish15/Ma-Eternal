//login & signup
const modalContainer = document.querySelector(".modal-container"),
button = document.getElementById("button"),
Create = document.getElementById("Create"),
loginhere = document.getElementById("loginhere"),
loginForm = document.querySelector(".login"),
signupForm= document.querySelector(".signup")

button.onclick = () => {
  modalContainer.classList.add("open");
};

function closeModalContainer(){
  modalContainer.classList.remove("open");
}
Create.onclick = () =>{
  loginForm.setAttribute("style","transform: translate(-500px);");
  signupForm.setAttribute("style","transform: translate(0px);");
};

loginhere.onclick = () =>{
  loginForm.removeAttribute("style");
  signupForm.removeAttribute("style");
};


//SOS
document.getElementById("sosButton").addEventListener("click", function() {
    var phoneNumber = document.getElementById("phoneNumber").value;
    const emergencyNumber = "+108"; 
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = `tel:${emergencyNumber}`;
    } else {
      
        alert(`Emergency number ${emergencyNumber} is ready to dial. Please manually call it if your device does not support calling.`);
    
    }
});

// period tracker
document.getElementById("periodForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const lastPeriodDate = new Date(document.getElementById("lastPeriod").value);
    const cycleLength = parseInt(document.getElementById("cycleLength").value);

    if (!lastPeriodDate || isNaN(cycleLength)) {
        alert("Please fill out both fields correctly.");
        return;
    }

    const nextPeriodDate = new Date(lastPeriodDate);
    nextPeriodDate.setDate(lastPeriodDate.getDate() + cycleLength);

    const resultDiv = document.getElementById("periodResult");
    resultDiv.innerHTML = `
        <p><strong>Estimated Next Period Date:</strong> ${nextPeriodDate.toDateString()}</p>
        <p>Make sure to track your health and consult your doctor if anything feels unusual.</p>
    `;
});



// ========== Pregnancy Tracker ==========
document.addEventListener("DOMContentLoaded", function () {
    const pregnancyForm = document.getElementById("pregnancyForm");
    const pregnancyResult = document.getElementById("pregnancyResult");
  
    if (pregnancyForm) {
      pregnancyForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const lastPeriodDate = document.getElementById("lastPeriodDate").value;
        if (!lastPeriodDate) {
          pregnancyResult.textContent = "Please enter your last period date.";
          return;
        }
  
        const conceptionDate = new Date(lastPeriodDate);
        const dueDate = new Date(conceptionDate);
        dueDate.setDate(dueDate.getDate() + 280); // 40 weeks = 280 days
  
        const options = { year: "numeric", month: "long", day: "numeric" };
        pregnancyResult.innerHTML = `
          <p><strong>Estimated Due Date:</strong> ${dueDate.toLocaleDateString(undefined, options)}</p>
          <p><em>This is based on the standard 40-week pregnancy.</em></p>
        `;
      });
    }
  });
  

// ========== Medication Reminder ==========
document.addEventListener("DOMContentLoaded", function () {
    const medicationForm = document.getElementById("medicationForm");
    const medicationOutput = document.getElementById("medicationOutput");
  
    if (medicationForm) {
      medicationForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const name = document.getElementById("medicationName").value.trim();
        const time = document.getElementById("medicationTime").value;
  
        if (!name || !time) {
          medicationOutput.textContent = "Please fill in both fields.";
          return;
        }
  
        // Display confirmation
        medicationOutput.innerHTML = `
          <p>✅ Reminder set for <strong>${name}</strong> at <strong>${time}</strong> daily.</p>
          <p><em>Keep this page open or enable notifications in future versions to receive alerts.</em></p>
        `;
  
        // Optionally: use localStorage to save reminder (non-Firebase version)
        localStorage.setItem("medicationReminder", JSON.stringify({ name, time }));
      });
    }
  });
  


// ========== SOS Alert ==========
document.addEventListener("DOMContentLoaded", function () {
    const sosButton = document.getElementById("sosButton");
    const sosStatus = document.getElementById("sosStatus");
  
    if (sosButton) {
      sosButton.addEventListener("click", function () {
        // Simulate sending SOS
        sosStatus.innerHTML = `<p>🚨 SOS Alert Sent! Help is on the way.</p>`;
        sosButton.disabled = true;
        sosButton.textContent = "SOS Sent";
  
        // Reset after 10 seconds for demo
        setTimeout(() => {
          sosStatus.innerHTML = "";
          sosButton.disabled = false;
          sosButton.textContent = "🚨 Send SOS Alert";
        }, 10000);
      });
    }
  });
  

  // ========== Postpartum Tracker ==========
document.addEventListener("DOMContentLoaded", function () {
    const postpartumForm = document.getElementById("postpartumForm");
    const postpartumResult = document.getElementById("postpartumResult");
  
    if (postpartumForm) {
      postpartumForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const mood = document.getElementById("mood").value;
        const sleep = document.getElementById("sleep").value;
        const recovery = document.getElementById("recovery").value;
  
        postpartumResult.innerHTML = `
          <h4>✅ Log Summary:</h4>
          <ul>
            <li><strong>Mood:</strong> ${mood}</li>
            <li><strong>Sleep:</strong> ${sleep}</li>
            <li><strong>Physical Recovery:</strong> ${recovery}</li>
          </ul>
          <p><em>Well done! Keep tracking your progress. Consider reaching out to a doctor if things don't improve.</em></p>
        `;
  
        // Optional: Save to localStorage for now
        const today = new Date().toLocaleDateString();
        localStorage.setItem(`postpartum_${today}`, JSON.stringify({ mood, sleep, recovery }));
      });
    }
  });
  

  // ========== AI Chatbot (Mock) ==========
document.addEventListener("DOMContentLoaded", function () {
    const chatLog = document.getElementById("chatLog");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");
  
    if (chatLog && sendBtn) {
      sendBtn.addEventListener("click", handleChat);
      userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") handleChat();
      });
  
      function handleChat() {
        const question = userInput.value.trim();
        if (!question) return;
  
        appendMessage("user", question);
        userInput.value = "";
  
        // Simulate AI response
        setTimeout(() => {
          const answer = generateMockResponse(question);
          appendMessage("bot", answer);
        }, 700);
      }
  
      function appendMessage(sender, message) {
        const p = document.createElement("p");
        p.className = sender === "user" ? "user-msg" : "bot-msg";
        p.textContent = message;
        chatLog.appendChild(p);
        chatLog.scrollTop = chatLog.scrollHeight;
      }
  
      function generateMockResponse(question) {
        question = question.toLowerCase();
  
        if (question.includes("diet")) return "Eat iron-rich, protein-packed, and fiber-loaded meals.";
        if (question.includes("feeling sad")) return "You're not alone. It’s okay to feel this way. Try deep breathing or journaling.";
        if (question.includes("baby") && question.includes("care")) return "Ensure regular feeding, sleep, and diaper changes.";
        if (question.includes("when to see a doctor")) return "If you're in pain, bleeding heavily, or feeling extreme sadness, seek help immediately.";
  
        return "That's a great question! Please consult your healthcare provider for personalized advice.";
      }
    }
  });


  
  //Diet chart

  document.getElementById("dietForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const stage = document.getElementById("stage").value;
    const dietType = document.getElementById("dietType").value;
    const dietResult = document.getElementById("dietResult");
    const dietList = document.getElementById("dietList");
  
    // Sample AI-generated meal plan logic
    const meals = {
      breakfast: "Oats with banana & almonds",
      lunch: "Grilled veggies + lentil soup",
      dinner: "Quinoa salad with chickpeas",
      snack: "Fruit bowl or yogurt"
    };
  
    // Clear existing
    dietList.innerHTML = "";
  
    // Generate dummy list
    for (const [meal, desc] of Object.entries(meals)) {
      const li = document.createElement("li");
      li.textContent = `${meal.charAt(0).toUpperCase() + meal.slice(1)}: ${desc}`;
      dietList.appendChild(li);
    }
  
    dietResult.classList.remove("d-none");
  });
  