$(document).ready(function() {
  let selectedDate;

  function checkSavedData() {
    const today = generateDate();
    chrome.storage.local.get(today, function(result) {
      if (result[today]) {
        goToRandomQuote();
        const [happyMoment, quoteOfTheDay, imgData] = result[today];
        generateEntries(happyMoment, quoteOfTheDay, imgData);
        updateDate();
      } else {
        $('#today').fadeIn(0);
        updateDate();
      }
    });
  }
  checkSavedData();

  $("#saveButton").on("click", function() {
    goToRandomQuote();
    saveData();
    updateDate();
  });

  $("#editButton").on("click", function() {
    goToPick();
    updateDate();
  });

  function goToPick() {
    $('#today').hide();
    $('#pick').fadeIn(800);
  }

  function goToRandomQuote() {
    $('#pick').hide();
    $('#today').fadeIn(800);
  }

  function generateDate() {
    const d = new Date();
    const dMonth = d.getMonth() + 1; // Adding 1 because getMonth() returns a zero-based month index
    const dDay = d.getDate();
    const dYear = d.getFullYear();
    const dTail = `${dMonth}/${dDay}/${dYear}`;
    return dTail;
  }

  function generateEntries(happyMoment, quoteOfTheDay, imgData) {
    $('#my_happiness').text(happyMoment); 
    $('#favorite_quote').text(quoteOfTheDay);
    $('#favorite_image').attr('src', imgData); 
  }
  function getCurrentDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString(undefined, options);
  }
  
  // Update the HTML with the current date
  function updateDate() {
    const dateElement = document.getElementById('dateDisplay');
    const currentDate = getCurrentDate();
    dateElement.textContent = `${currentDate}`;
    const dateElement2 = document.getElementById('dateDisplay2');
    dateElement2.textContent = `${currentDate}`;
  }

  function getBase64Image(file, callback) {
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = function(event) {
        callback(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      // Handle the case where the input is not a Blob
      console.error('Invalid file format or no file selected.');
      callback(null);
    }
  }

  function saveData() {
    const happyMoment = $('#happyInput').val();
    const quoteOfTheDay = $('#quoteInput').val();
    const bannerImage = document.getElementById('photoInput').files[0];
  
    if (bannerImage && bannerImage instanceof File) {
      getBase64Image(bannerImage, function(imgData) {
        const today = generateDate();
        const dataToSave = [happyMoment, quoteOfTheDay, imgData];
        chrome.storage.local.set({ [today]: dataToSave }, function() {
          generateEntries(happyMoment, quoteOfTheDay, imgData);
        });
      });
    }
  }
});
