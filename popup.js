
$(document).ready(function() {
  $("#saveButton").on("click", function() {
    goToRandomQuote();
  });

  $("#editButton").on("click", function() {
    goToPick();
  });

  function goToPick() {
    $('#calendar').hide();
    $('#pick').fadeIn(800);
  }

  function goToRandomQuote() {
    $('#pick').hide();
    $('#calendar').fadeIn(800);
  }
});

// function generateDate() {
//   // Get today's date
//   const today = new Date();
//   month = today.getMonth();
//   day = today.getDate();
//   year = today.getFullYear();
// }


// //background 
// function RandomToWritebg() {
//     // Change the source of bg_1 to bg_2 when saveButton is clicked
//     document.getElementById('bg').src = 'art/bg_2.png';
// }

 
// //save data document.getElementById('saveButton').addEventListener('click', function() {
 
// function saveLog() {
    
//         generateDate(); 
      
//         // Get the user's inputs
//         const happyMoment = document.getElementById('happyInput').value;
//         const quoteOfTheDay = document.getElementById('quoteInput').value;
//         const uploadedPhoto = document.getElementById('photoInput').files[0]; // For file input
      
//         const selectedDate = {
//           month: month,
//           day: day,
//           year: year
//         };
      
//         // Prepare data to save in Chrome storage (handle uploadedPhoto accordingly)
//         const dataToSave = {
//           happyMoment: happyMoment,
//           quoteOfTheDay: quoteOfTheDay,
//           uploadedPhoto: uploadedPhoto,  
//           selectedDate: selectedDate
//         };
       
//         chrome.storage.local.set({ selectedDate: dataToSave });
//         isLogPage = False; 
//         RandomToWritebg();
//       }

// //change the data
// function redo() {
//   writeToRandombg();
//   isLogPage = True; 
// }


// function getRandomLog() {

//   chrome.storage.local.get(null, function (result) {

//     const savedLogs = Object.values(result);
    

//     const randomIndex = Math.floor(Math.random() * savedLogs.length);
//     const randomEntry = savedLogs[randomIndex];
    

//     console.log('Randomly selected log:', randomEntry);
//   });
// }
 
 

 