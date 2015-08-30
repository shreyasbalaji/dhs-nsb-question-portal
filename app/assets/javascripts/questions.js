// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

function submitQuestionHandler(event) {
  var t_mc = (($("#question_toss_up_class").val()) == "MC");
  var b_mc = (($("#question_bonus_class").val()) == "MC");

  if (t_mc) {
    var sometext = $("#tmctext").val();
    sometext += "**WWW**" + $("#tc1").val();
    sometext += "**XXX**" + $("#tc2").val();
    sometext += "**YYY**" + $("#tc3").val();
    sometext += "**ZZZ**" + $("#tc4").val();
    $("#question_toss_up_text").val(sometext);
    $("#question_toss_up_answer").val($("#tmcanswer").val());
  }
  else {
    $("#question_toss_up_text").val($("#tfrtext").val());
    $("#question_toss_up_answer").val($("#tfranswer").val());
  }

  if (b_mc) {
    var sometext = $("#bmctext").val();
    sometext += "**WWW**" + $("#bc1").val();
    sometext += "**XXX**" + $("#bc2").val();
    sometext += "**YYY**" + $("#bc3").val();
    sometext += "**ZZZ**" + $("#bc4").val();
    $("#question_bonus_text").val(sometext);
    $("#question_bonus_answer").val($("#bmcanswer").val());
  }
  else {
    $("#question_bonus_text").val($("#bfrtext").val());
    $("#question_bonus_answer").val($("#bfranswer").val());
  }

  return true;
}

function parseMCText(text) {
  var resultant = [];
  var ind1 = text.indexOf("**WWW**");
  resultant.push(text.slice(
        0, text.indexOf("**WWW**")
        ));
  resultant.push(text.slice(
        text.indexOf("**WWW**") + 7, text.indexOf("**XXX**")
        ));
  resultant.push(text.slice(
        text.indexOf("**XXX**") + 7, text.indexOf("**YYY**")
        ));
  resultant.push(text.slice(
        text.indexOf("**YYY**") + 7, text.indexOf("**ZZZ**")
        ));
  resultant.push(text.slice(
        text.indexOf("**ZZZ**") + 7
        ));
  return resultant;
}

function tClassChangeHandler() {
  var t_mc = (($("#question_toss_up_class").val()) == "MC");
  if (t_mc) {
    $("#toss_up_fr").addClass('unactivated');
    $("#toss_up_mc").removeClass('unactivated');
  }
  else {
    $("#toss_up_fr").removeClass('unactivated');
    $("#toss_up_mc").addClass('unactivated');
  }
}

function bClassChangeHandler() {
  var b_mc = (($("#question_bonus_class").val()) == "MC");
  if (b_mc) {
    $("#bonus_fr").addClass('unactivated');
    $("#bonus_mc").removeClass('unactivated');
  }
  else {
    $("#bonus_fr").removeClass('unactivated');
    $("#bonus_mc").addClass('unactivated');
  }
}

function populateFields() {
  if ($('form.edit_question').length) {
    var t_mc = (($("#question_toss_up_class").val()) == "MC");
    var b_mc = (($("#question_bonus_class").val()) == "MC");
    if (t_mc) {
      var sometext = $('#question_toss_up_text').val(); 
      var splitUp = parseMCText(sometext);
      $('#tmctext').val(splitUp[0]);
      $('#tc1').val(splitUp[1]);
      $('#tc2').val(splitUp[2]);
      $('#tc3').val(splitUp[3]);
      $('#tc4').val(splitUp[4]);
      $('#tmcanswer').val($('#question_toss_up_answer').val());
    }
    else {
      $('#tfrtext').val($('#question_toss_up_text').val());
      $('#tfranswer').val($('#question_toss_up_answer').val());
    }
    if (b_mc) {
      var sometext = $('#question_bonus_text').val(); 
      var splitUp = parseMCText(sometext);
      $('#bmctext').val(splitUp[0]);
      $('#bc1').val(splitUp[1]);
      $('#bc2').val(splitUp[2]);
      $('#bc3').val(splitUp[3]);
      $('#bc4').val(splitUp[4]);
      $('#bmcanswer').val($('#question_bonus_answer').val());
    }
    else {
      $('#bfrtext').val($('#question_bonus_text').val());
      $('#bfranswer').val($('#question_bonus_answer').val());
    }
  }
}

function displayMCProperly() {
  if ($('#tossUpCategory').text() == "Multiple Choice") {
    var sometext = $('#tossUpText').text();
    var splitUp = parseMCText(sometext);
    $('#tossUpText').text(splitUp[0]);
    $('#tc1').text(splitUp[1]);
    $('#tc2').text(splitUp[2]);
    $('#tc3').text(splitUp[3]);
    $('#tc4').text(splitUp[4]);
    $('#tossUpMC').removeClass('unactivated');
    tossUpSolution = $('#tossUpAnswer').text();
    switch(tossUpSolution) {
      case 'W': 
        $('#tossUpAnswer').text(tossUpSolution + ": " + splitUp[1]);
        break;
      case 'X': 
        $('#tossUpAnswer').text(tossUpSolution + ": " + splitUp[2]);
        break;
      case 'Y': 
        $('#tossUpAnswer').text(tossUpSolution + ": " + splitUp[3]);
        break;
      case 'Z': 
        $('#tossUpAnswer').text(tossUpSolution + ": " + splitUp[4]);
        break;
    }
  }
  if ($('#bonusCategory').text() == "Multiple Choice") {
    var sometext = $('#bonusText').text();
    var splitUp = parseMCText(sometext);
    $('#bonusText').text(splitUp[0]);
    $('#bc1').text(splitUp[1]);
    $('#bc2').text(splitUp[2]);
    $('#bc3').text(splitUp[3]);
    $('#bc4').text(splitUp[4]);
    $('#bonusMC').removeClass('unactivated');
    bonusSolution = $('#bonusAnswer').text();
    switch(bonusSolution) {
      case 'W': 
        $('#bonusAnswer').text(bonusSolution + ": " + splitUp[1]);
        break;
      case 'X': 
        $('#bonusAnswer').text(bonusSolution + ": " + splitUp[2]);
        break;
      case 'Y': 
        $('#bonusAnswer').text(bonusSolution + ": " + splitUp[3]);
        break;
      case 'Z': 
        $('#bonusAnswer').text(bonusSolution + ": " + splitUp[4]);
        break;
    }
  }
  $('#fixstuff').remove();
}

function startTossUpTimer() {
  var left = parseInt($("#tossUpCountdown").text());
  setInterval(function() {
    left--;
    if (left < 0) { left = 0; }
    $('#tossUpCountdown').text(left);
  }, 1000);
}

function startBonusTimer() {
  var timeleft = parseInt($("#bonusCountdown").text());
  setInterval(function() {
    timeleft--;
    if (timeleft < 0) { timeleft = 0; }
    $('#bonusCountdown').text(timeleft);
  }, 1000);
}


$(document).ready(function() {
  $("#new_question").submit(submitQuestionHandler);
  $("form.edit_question").submit(submitQuestionHandler);
  $("#question_toss_up_class").change(tClassChangeHandler);
  $("#question_bonus_class").change(bClassChangeHandler);
  tClassChangeHandler();
  bClassChangeHandler();
  populateFields();
  displayMCProperly();
  if ($('#tossUpCountdown').length) {
    $('#tossUpCountdown').click(startTossUpTimer);
    $('#bonusCountdown').click(startBonusTimer);
    MathJax.Hub.Config({
        jax: ["input/TeX","output/HTML-CSS"],
        displayAlign: "left"
    });
  }
});

