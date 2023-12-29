$(document).ready(function() {
  let selectedDate; // Declare selectedDate in a wider scope

  $("#saveButton").on("click", function() {
    goToRandomQuote();
    saveData();
  });

  $("#editButton").on("click", function() {
    goToPick();
  });

  function goToPick() {
    $('#calendar').hide();
    $('#pick').fadeIn(800);
    generateRandomEntries();
  }

  function goToRandomQuote() {
    $('#pick').hide();
    $('#calendar').fadeIn(800);
    generateRandomEntries(); 
  }

  function getDate() {
    const today = new Date();
    const month = today.getMonth();
    const day = today.getDate();
    const year = today.getFullYear();
    selectedDate = {
      "month": month,
      "day": day,
      "year": year
    };
    return selectedDate;
  }

  function generateRandomEntries() {
    chrome.storage.local.get(null, function (result) {
      const entryCount = Object.keys(result).length;
      console.log('Number of entries in local storage:', entryCount);
    }); 
  }

  // Function to convert image to Base64
  function getBase64Image(file, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
      callback(event.target.result);
    };
    reader.readAsDataURL(file);
  }

  function saveData() {
    const happyMoment = document.getElementById('happyInput').value;
    const quoteOfTheDay = document.getElementById('quoteInput').value;

    const bannerImage = document.getElementById('photoInput').files[0];
    getBase64Image(bannerImage, function(imgData) {
      const today = getDate();
      const dataToSave = {
        "happyMoment": happyMoment,
        "quoteOfTheDay": quoteOfTheDay,
        "uploadedPhoto": imgData
      };

      console.log(dataToSave);
      chrome.storage.local.set({ [today]: dataToSave });
    });
  }
});

 
