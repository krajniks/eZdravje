
var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

var username = "ois.seminar";
var password = "ois4fri";


/**
 * Prijava v sistem z privzetim uporabnikom za predmet OIS in pridobitev
 * enolične ID številke za dostop do funkcionalnosti
 * @return enolični identifikator seje za dostop do funkcionalnosti
 */
function getSessionId() {
    var response = $.ajax({
        type: "POST",
        url: baseUrl + "/session?username=" + encodeURIComponent(username) +
                "&password=" + encodeURIComponent(password),
        async: false
    });
    return response.responseJSON.sessionId;
}


/**
 * Generator podatkov za novega pacienta, ki bo uporabljal aplikacijo. Pri
 * generiranju podatkov je potrebno najprej kreirati novega pacienta z
 * določenimi osebnimi podatki (ime, priimek in datum rojstva) ter za njega
 * shraniti nekaj podatkov o vitalnih znakih.
 * @param stPacienta zaporedna številka pacienta (1, 2 ali 3)
 * @return ehrId generiranega pacienta
 */
function generirajPodatke(stPacienta, callback) {
  ehrId = "";
  var pacient_data;
  var odvzemi_data
  switch (stPacienta){
  	case 1:
  		pacient_data = {
  			firstNames: "Janez",
            lastNames: "Primernik",
            dateOfBirth: "2000-03-12T14:20",
            gender: "MALE",
            address: {      
              address: "Policijska ulica 20, Maribor"
            },
            partyAdditionalInfo: [
                //{key: "ehrId", value: ehrId},
                {key: "obvescanje", value: false},
                {key: "krvnaSkupina", value: "AB"},
                {key: "RHFaktor", value: "Rh+"}
                ]	
  		}
  		odvzemi_data = [{
			"ctx/language": "en",
		    "ctx/territory": "SI",
		    "ctx/time": "2005-01-01T10:30",
		    "vital_signs/body_weight/any_event/body_weight": 71,
		    "vital_signs/blood_pressure/any_event/systolic": 90,
		    "vital_signs/blood_pressure/any_event/diastolic": 120,
		    "vital_signs/indirect_oximetry:0/spo2|numerator": 100,
		    "vital_signs/pulse/any_event/rate": 85
		},
		{
			"ctx/language": "en",
		    "ctx/territory": "SI",
		    "ctx/time": "2005-02-02T07:30",
		    "vital_signs/body_weight/any_event/body_weight": 72,
		    "vital_signs/blood_pressure/any_event/systolic": 90,
		    "vital_signs/blood_pressure/any_event/diastolic": 118,
		    "vital_signs/indirect_oximetry:0/spo2|numerator": 99,
		    "vital_signs/pulse/any_event/rate": 80
		},
		{	
			"ctx/language": "en",
		    "ctx/territory": "SI",
		    "ctx/time": "2005-02-04T11:30",
		    "vital_signs/body_weight/any_event/body_weight": 73,
		    "vital_signs/blood_pressure/any_event/systolic": 88,
		    "vital_signs/blood_pressure/any_event/diastolic": 110,
		    "vital_signs/indirect_oximetry:0/spo2|numerator": 98,
		    "vital_signs/pulse/any_event/rate": 75
			
		}];
  		break;
  	case 2:
  		pacient_data = {
			firstNames: "Marica",
            lastNames: "Primernik",
            dateOfBirth: "2000-11-02T17:40",
            gender: "FEMALE",
            address: {      
              address: "Gasilska ulica 7, Ljubljana"
            },
            partyAdditionalInfo: [
                //{key: "ehrId", value: ehrId},
                {key: "obvescanje", value: true},
                {key: "krvnaSkupina", value: "A"},
                {key: "RHFaktor", value: "Rh-"}
                ]
  		}
  		  		odvzemi_data = [{
			"ctx/language": "en",
		    "ctx/territory": "SI",
		    "ctx/time": "2005-10-02T08:30",
		    "vital_signs/body_weight/any_event/body_weight": 55,
		    "vital_signs/blood_pressure/any_event/systolic": 70,
		    "vital_signs/blood_pressure/any_event/diastolic": 95,
		    "vital_signs/indirect_oximetry:0/spo2|numerator": 89,
		    "vital_signs/pulse/any_event/rate": 66
		},
		{
			"ctx/language": "en",
		    "ctx/territory": "SI",
		    "ctx/time": "2005-11-10T20:22",
		    "vital_signs/body_weight/any_event/body_weight": 56,
		    "vital_signs/blood_pressure/any_event/systolic": 99,
		    "vital_signs/blood_pressure/any_event/diastolic": 118,
		    "vital_signs/indirect_oximetry:0/spo2|numerator": 91,
		    "vital_signs/pulse/any_event/rate": 83
		},
		{	
			"ctx/language": "en",
		    "ctx/territory": "SI",
		    "ctx/time": "2005-02-03T16:40",
		    "vital_signs/body_weight/any_event/body_weight": 54,
		    "vital_signs/blood_pressure/any_event/systolic": 71,
		    "vital_signs/blood_pressure/any_event/diastolic": 97,
		    "vital_signs/indirect_oximetry:0/spo2|numerator": 92,
		    "vital_signs/pulse/any_event/rate": 69
			
		}];
  		break;
	case 3:
  		pacient_data = {
			firstNames: "Joško",
            lastNames: "Bunderla",
            dateOfBirth: "1996-07-08T03:26",
            gender: "OTHER",
            address: {      
              address: "Poštarska cesta 22, Koper"
            },
            partyAdditionalInfo: [
                //{key: "ehrId", value: ehrId},
                {key: "obvescanje", value: true},
                {key: "krvnaSkupina", value: "0"},
                {key: "RHFaktor", value: "Rh-"}
                ]
  		}
  		  		odvzemi_data = [{
			"ctx/language": "en",
		    "ctx/territory": "SI",
		    "ctx/time": "2005-12-09T12:07",
		    "vital_signs/body_weight/any_event/body_weight": 88,
		    "vital_signs/blood_pressure/any_event/systolic": 95,
		    "vital_signs/blood_pressure/any_event/diastolic": 125,
		    "vital_signs/indirect_oximetry:0/spo2|numerator": 100,
		    "vital_signs/pulse/any_event/rate": 100
		},
		{
			"ctx/language": "en",
		    "ctx/territory": "SI",
		    "ctx/time": "2005-11-08T11:34",
		    "vital_signs/body_weight/any_event/body_weight": 93,
		    "vital_signs/blood_pressure/any_event/systolic": 93,
		    "vital_signs/blood_pressure/any_event/diastolic": 130,
		    "vital_signs/indirect_oximetry:0/spo2|numerator": 99,
		    "vital_signs/pulse/any_event/rate": 99
		},
		{	
			"ctx/language": "en",
		    "ctx/territory": "SI",
		    "ctx/time": "2005-07-06T11:53",
		    "vital_signs/body_weight/any_event/body_weight": 100,
		    "vital_signs/blood_pressure/any_event/systolic": 96,
		    "vital_signs/blood_pressure/any_event/diastolic": 132,
		    "vital_signs/indirect_oximetry:0/spo2|numerator": 94,
		    "vital_signs/pulse/any_event/rate": 96
			
		}];
		break;
  }
  callback(stPacienta,pacient_data,odvzemi_data);
}
function sendData(stPacienta,pacient_data,odvzemi_data){
	var sessionId = getSessionId();
  $.ajaxSetup({
	    headers: {"Ehr-Session": sessionId}
	});
	$.ajax({
	    url: baseUrl + "/ehr",
	    type: 'POST',
	    success: function (data) {
		var ehrId = data.ehrId;
		var partyData = pacient_data;
		pacient_data.partyAdditionalInfo.push({key: "ehrId", value: ehrId});
		$.ajax({
	            url: baseUrl + "/demographics/party",
	            type: 'POST',
	            contentType: 'application/json',
	            data: JSON.stringify(partyData),
	            success: function (party) {
	                sendData2(odvzemi_data,ehrId,stPacienta,function(ehrId,stPacienta){
	                  $('#generirani_podatki').append('<br><b>EhrID '+stPacienta+':</b> '+ ehrId);
	                });
	            },
	            error: function(err) {
	            	alert('Napaka ' +
	            JSON.parse(err.responseText).userMessage + "!");
	            }
	        });
	    }
	});	
}

function sendData2(odvzemi_data,ehrId,stPacienta,callback){
	if(odvzemi_data.length == 0){
		callback(ehrId,stPacienta);
		return;
	}
	var sessionId = getSessionId();
	var parametriZahteve = {
	    ehrId: ehrId,
	    templateId: 'Vital Signs',
	    format: 'FLAT',
	};
	$.ajaxSetup({
	    headers: {"Ehr-Session": sessionId}
	});
	$.ajax({
	    url: baseUrl + "/composition?" + $.param(parametriZahteve),
	    type: 'POST',
	    contentType: 'application/json',
	    data: JSON.stringify(odvzemi_data.pop()),
	    success: function(temp){
	    	sendData2( odvzemi_data, ehrId, stPacienta, callback);
	    },
	    error: function(err) {
	    	alert('Napaka ' +
	    JSON.parse(err.responseText).userMessage + "!");
	    }
	});		
}


 


function generirajZacetnePodatke(){
	result = '<div class"funkcija"></div>';
	for(var i = 1;i <=3;i++){
		generirajPodatke(i,sendData);
	}
}



function kreirajEHRzaBolnika() {
	sessionId = getSessionId();

	var ime = $("#kreirajIme").val();
	var priimek = $("#kreirajPriimek").val();
	var datumRojstva = $("#kreirajDatumRojstva").val();
	var spol = $("input[name=spol]:checked","#kreirajSpol").val();
	var naslov = $("#kreirajNaslov").val();
	var obvescanje = $("#kreirajObvescajOAkcijah").is(":checked");
	var krvnaSkupina = $("input[name=krvna_skupina]:checked","#kreirajKrvnaSkupina").val();
	var RHFaktor = $("input[name=rh_faktor]:checked","#kreirajRhFaktor").val();


	if (!ime || !priimek || !datumRojstva || ime.trim().length == 0 ||
      priimek.trim().length == 0 || datumRojstva.trim().length == 0 ||
      !datumRojstva || !spol || !naslov || naslov.trim().length == 0 ) {
		$("#kreirajSporocilo").html("<span class='obvestilo label " +
      "label-warning fade-in'>Prosim vnesite zahtevane podatke!</span>");
	} else {

		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		$.ajax({
		    url: baseUrl + "/ehr",
		    type: 'POST',
		    success: function (data) {
		        var ehrId = data.ehrId;
		        var partyData = {
		            firstNames: ime,
		            lastNames: priimek,
		            dateOfBirth: datumRojstva,
		            gender: spol,
		            address: {      
                      address: naslov
                    },
		            partyAdditionalInfo: [
		                {key: "ehrId", value: ehrId},
		                {key: "obvescanje", value: obvescanje},
		                {key: "krvnaSkupina", value: krvnaSkupina},
		                {key: "RHFaktor", value: RHFaktor}
		                ]
		        };
		        console.log(partyData);
		        $.ajax({
		            url: baseUrl + "/demographics/party",
		            type: 'POST',
		            contentType: 'application/json',
		            data: JSON.stringify(partyData),
		            success: function (party) {
		                if (party.action == 'CREATE') {
		                    $("#kreirajSporocilo").html("<span class='obvestilo " +
                          "label label-success fade-in'>Uspešno kreiran EHR '" +
                          ehrId + "'.</span>");
		                    $("#preberiEHRid").val(ehrId);
		                }
		            },
		            error: function(err) {
		            	$("#kreirajSporocilo").html("<span class='obvestilo label " +
                    "label-danger fade-in'>Napaka '" +
                    JSON.parse(err.responseText).userMessage + "'!");
		            }
		        });
		    }
		});
	}
}

function preberiEHRodBolnika() {
	sessionId = getSessionId();

	var ehrId = $("#preberiEHRid").val();

	if (!ehrId || ehrId.trim().length == 0) {
		$("#preberiSporocilo").html("<span class='obvestilo label label-warning " +
      "fade-in'>Prosim vnesite zahtevan podatek!");
	} else {
		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
			type: 'GET',
			headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
				var party = data.party;
				party.partyAdditionalInfo.forEach(function(obj){
				    switch(obj.key){
				        case 'ehrId':
				            $("#izbranEHRid").val(obj.value);
				            break;
				        case 'obvescanje':
				            $("#popraviObvescajOAkcijah").prop('checked',obj.value);
				            break;
				        case 'RHFaktor':
				            $('input[name=rh_faktor][value="'+obj.value+'"]','#popraviRhFaktor').prop('checked',true);
				            break;
				        case 'krvnaSkupina':
				            $('input[name=krvna_skupina][value="'+obj.value+'"]','#popraviKrvnaSkupina').prop('checked',true);
				            break;
				    }        
				});
				$('#popraviIme').val(party.firstNames);
				$('#popraviPriimek').val(party.lastNames);
				$('#popraviDatumRojstva').val(party.dateOfBirth.slice(0,party.dateOfBirth.length - 1));
				$('input[name=spol][value="'+party.gender+'"]','#popraviSpol').prop('checked',true);
				$('#popraviNaslov').val(party.address.address);
				
				$("#preberiSporocilo").html("<span class='obvestilo " +
	            	"label label-success fade-in'>Uspešno pridobljeni podatki za EHR '" +
	            	ehrId + "'.</span>");
			},
			error: function(err) {
				$("#preberiSporocilo").html("<span class='obvestilo label " +
          "label-danger fade-in'>Napaka '" +
          JSON.parse(err.responseText).userMessage + "'!");
			}
		});
	}
}

function popraviEHRzaBolnika() {
	sessionId = getSessionId();

	var ime = $("#popraviIme").val();
	var priimek = $("#popraviPriimek").val();
	var datumRojstva = $("#popraviDatumRojstva").val();
	var spol = $("input[name=spol]:checked","#popraviSpol").val();
	var naslov = $("#popraviNaslov").val();
	var obvescanje = $("#popraviObvescajOAkcijah").is(":checked");
	var krvnaSkupina = $("input[name=krvna_skupina]:checked","#popraviKrvnaSkupina").val();
	var RHFaktor = $("input[name=rh_faktor]:checked","#popraviRhFaktor").val();
	var ehrId = $("#izbranEHRid").val();


	if (!ime || !priimek || !datumRojstva || ime.trim().length == 0 ||
      priimek.trim().length == 0 || datumRojstva.trim().length == 0 ||
      !datumRojstva || !spol || !naslov || naslov.trim().length == 0) {
		$("#popraviSporocilo").html("<span class='obvestilo label " +
      "label-warning fade-in'>Prosim vnesite zahtevane podatke!</span>");
	} else if(!ehrId) {
		$("#popraviSporocilo").html("<span class='obvestilo label " +
      "label-warning fade-in'>Niste izbrali krvodajalca</span>");
	} else{	
		
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		$.ajax({
		    url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
		    type: 'GET',
		    success: function (data) {
		        var partyData = {
		        	id: data.party.id,
		        	version: data.party.version,
		            firstNames: ime,
		            lastNames: priimek,
		            dateOfBirth: datumRojstva,
		            gender: spol,
		            address: {      
                      address: naslov
                    },
		            partyAdditionalInfo: [
		                {key: "ehrId", value: ehrId},
		                {key: "obvescanje", value: obvescanje},
		                {key: "krvnaSkupina", value: krvnaSkupina},
		                {key: "RHFaktor", value: RHFaktor}
		                ]
		        };

			    $.ajax({
			        url: baseUrl + "/demographics/party/",
			        type: 'PUT',
			        contentType: 'application/json',
			        data: JSON.stringify(partyData),
			        success: function (party) {
			            if (party.action == 'UPDATE') {
			                $("#popraviSporocilo").html("<span class='obvestilo " +
			              "label label-success fade-in'>Uspešno popravljen EHR '" +
			              ehrId + "'.</span>");
			                $("#preberiEHRid").val(ehrId);
			            }
			        },
			        error: function(err) {
			        	$("#popraviSporocilo").html("<span class='obvestilo label " +
			        "label-danger fade-in'>Napaka '" +
			        JSON.parse(err.responseText).userMessage + "'!");
			        }
		        });
		    }
		});
	}
}

function vnosOdvzema(){
	sessionId = getSessionId();

	var ehrId = $("#vnosOdvzemaEHR").val();
	var datumInUra = $("#vnosOdvzemaDatumInUra").val();
	var telesnaVisina = $("#vnosOdvzemaTelesnaVisina").val();
	var telesnaTeza = $("#vnosOdvzemaTelesnaTeza").val();
	var telesnaTemperatura = $("#vnosOdvzemaTelesnaTemperatura").val();
	var sistolicniKrvniTlak = $("#vnosOdvzemaKrvniTlakSistolicni").val();
	var diastolicniKrvniTlak = $("#vnosOdvzemaKrvniTlakDiastolicni").val();
	var nasicenostKrviSKisikom = $("#vnosOdvzemaNasicenostKrviSKisikom").val();
	var srcniUtrip = $("#vnosOdvzemaSrcniUtrip").val();

	if (!ehrId || ehrId.trim().length == 0) {
		$("#vnosOdvzemaSporocilo").html("<span class='obvestilo " +
      "label label-warning fade-in'>Prosim vnesite zahtevane podatke!</span>");
	} else {
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		var podatkiOdvzema = {
			"ctx/language": "en",
		    "ctx/territory": "SI",
		    "ctx/time": datumInUra,
		    "vital_signs/body_weight/any_event/body_weight": telesnaTeza,
		    "vital_signs/blood_pressure/any_event/systolic": sistolicniKrvniTlak,
		    "vital_signs/blood_pressure/any_event/diastolic": diastolicniKrvniTlak,
		    "vital_signs/indirect_oximetry:0/spo2|numerator": nasicenostKrviSKisikom,
		    "vital_signs/pulse/any_event/rate": srcniUtrip
		};
		var parametriZahteve = {
		    ehrId: ehrId,
		    templateId: 'Vital Signs',
		    format: 'FLAT',
		};
		$.ajax({
		    url: baseUrl + "/composition?" + $.param(parametriZahteve),
		    type: 'POST',
		    contentType: 'application/json',
		    data: JSON.stringify(podatkiOdvzema),
		    success: function (res) {
		        $("#vnosOdvzemaSporocilo").html(
              "<span class='obvestilo label label-success fade-in'>" +
              res.meta.href + ".</span>");
		    },
		    error: function(err) {
		    	$("#vnosOdvzemaSporocilo").html(
            "<span class='obvestilo label label-danger fade-in'>Napaka '" +
            JSON.parse(err.responseText).userMessage + "'!");
		    }
		});
	}
	
}

function zgodovinaOdvzemov() {
	sessionId = getSessionId();

	var ehrId = $("#zgodovinaOdvzemovEHRid").val();
	$("#rezultatZgodovinaOdvzemov").html('');
	if (!ehrId || ehrId.trim().length == 0) {
		$("#zgodovinaOdvzemovSporocilo").html("<span class='obvestilo " +
      "label label-warning fade-in'>Prosim vnesite zahtevan podatek!");
	} else {
		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
	    	type: 'GET',
	    	headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
				var party = data.party;
				var RHFaktor;
				var krvnaSkupina;
				party.partyAdditionalInfo.forEach(function(obj){
				    switch(obj.key){
				        case 'RHFaktor':
				             RHFaktor = obj.value;
				            break;
				        case 'krvnaSkupina':
				            krvnaSkupina = obj.value;
				            break;
				    } 
				});
				$("#zgodovinaOdvzemovZnakov").html("<br/><span>Pridobivanje " +
		          "podatkov za krvodajalca <b>'" + party.firstNames +
		          " " + party.lastNames + "'</b>s krvno skupino <b>" +krvnaSkupina+ "</b> in RH faktorjem <b>" + RHFaktor +"</b>.</span><br/><br/>");

				var AQL =
					"select " +
					"bp/data[at0001]/events[at0006 and name/value='Any event']/data[at0003]/items[at0004]/value/magnitude as sistolicniKrvniTlak, "+ 
					"bp/data[at0001]/events[at0006 and name/value='Any event']/data[at0003]/items[at0005]/value/magnitude as diastolicniKrvniTlak, "+
					"bw/data[at0002]/events[at0003 and name/value='Any event']/data[at0001]/items[at0004]/value/magnitude as telesnaTeza, " +
					"hr/data[at0002]/events[at0003 and name/value='Any event']/data[at0001]/items[at0004]/value/magnitude as srcniUtrip, " +
					"k/data[at0001]/events[at0002]/data[at0003]/items[at0006]/value/numerator as nasicenostKrviSKisikom, " +
					"c/context/start_time/value as datumInUra " +
					"from EHR[ehr_id/value='" + ehrId +"'] CONTAINS " +
					"COMPOSITION c [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS " +
					"(OBSERVATION bp [openEHR-EHR-OBSERVATION.blood_pressure.v1] AND " +
					"OBSERVATION bw [openEHR-EHR-OBSERVATION.body_weight.v1] AND " +
					"OBSERVATION hr [openEHR-EHR-OBSERVATION.heart_rate-pulse.v1] AND "+
					"OBSERVATION k [openEHR-EHR-OBSERVATION.indirect_oximetry.v1]) " +
					"ORDER BY datumInUra";
					
						
				$.ajax({
				    url: baseUrl + "/query?" + $.param({"aql": AQL}),
				    type: 'GET',
				    headers: {"Ehr-Session": sessionId},
				    success: function (res) {
				    	var results = "<table>" +
		                  "<tr><th>Datum in ura</th><th>Telesna teža</th><th>Sistolični tlak</th><th>Diastolični trak</th><th>Srčni utrip</th><th>sp02</th></tr>";
				    	if (res) {
				    		var rows = res.resultSet;
					        for (var i in rows) {
					            results += "<tr><td>" + rows[i].datumInUra + "</td>" +
									"<td style='text-align: right;'>" + rows[i].telesnaTeza + "</td>" +
									"<td style='text-align: right;'>" + rows[i].sistolicniKrvniTlak + "</td>" +
									"<td style='text-align: right;'>" + rows[i].diastolicniKrvniTlak + "</td>" +
									"<td style='text-align: right;'>" + rows[i].srcniUtrip + "</td>" +
		                        	"<td style='text-align: right;'>" + rows[i].nasicenostKrviSKisikom + "</td></tr>";
					        }
					        results += "</table>";
					        $("#rezultatZgodovinaOdvzemov").append(results);
				    	} else {
				    		$("#zgodovinaOdvzemovSporocilo").html(
			                    "<span class='obvestilo label label-warning fade-in'>" +
			                    "Ni podatkov!</span>");
				    	}

				    },
				    error: function(err) {
				    	$("#zgodovinaOdvzemovSporocilo").html(
              "<span class='obvestilo label label-danger fade-in'>Napaka '" +
              JSON.parse(err.responseText).userMessage + "'!");
				    }
				});
				
	    	},
	    	error: function(err) {
	    		$("#preberiMeritveVitalnihZnakovSporocilo").html(
            "<span class='obvestilo label label-danger fade-in'>Napaka '" +
            JSON.parse(err.responseText).userMessage + "'!");
	    	}
		});
	}
}
