$(document).ready(function() {
  let selectedDate;

  function checkSavedData() {
    const today = generateDate();
    chrome.storage.local.get(today, function(result) {
      if (result[today]) {
        goToRandomQuote();
        const [happyMoment, quoteOfTheDay, imgData] = result[today];
        generateEntries(happyMoment, quoteOfTheDay, imgData);
      } else {
        goToPick();
      }
    });
  }
  checkSavedData();

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
  }

  function goToRandomQuote() {
    $('#pick').hide();
    $('#calendar').fadeIn(800);
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

  function getBase64Image(file, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
      callback(event.target.result);
    };
    reader.readAsDataURL(file);
  }

  function saveData() {
    const happyMoment = $('#happyInput').val();
    const quoteOfTheDay = $('#quoteInput').val();
    const bannerImage = document.getElementById('photoInput').files[0];

    getBase64Image(bannerImage, function(imgData) {
      const today = generateDate();
      const dataToSave = [happyMoment, quoteOfTheDay, imgData];
      chrome.storage.local.set({ [today]: dataToSave }, function() {
        generateEntries(happyMoment, quoteOfTheDay, imgData);
      });
    });
  }
});
