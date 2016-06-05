
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
function generirajPodatke(stPacienta) {
  ehrId = "";

  // TODO: Potrebno implementirati

  return ehrId;
}


// TODO: Tukaj implementirate funkcionalnost, ki jo podpira vaša aplikacija


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
				console.log(data);
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
		    "vital_signs/context/time/start_time": datumInUra,
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

function preberiMeritveVitalnihZnakov() {
	sessionId = getSessionId();

	var ehrId = $("#zgodovinaOdvzemovEHRid").val();

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
				$("#rzgodovinaOdvzemovZnakov").html("<br/><span>Pridobivanje " +
		          "podatkov za krvodajalca <b>'" + party.firstNames +
		          " " + party.lastNames + "'</b>s krvno skupino <b>" +krvnaSkupina+ "</b> in RH faktorjem <b>" + RHFaktor +"</b>.</span><br/><br/>");

				var AQL =
					"select " +
					"bp/data[at0001]/events[at0006 and name/value='Any event']/data[at0003]/items[at0004]/value/magnitude as systolic, "+ 
					"bp/data[at0001]/events[at0006 and name/value='Any event']/data[at0003]/items[at0005]/value/magnitude as diastolic, "+
					"bw/data[at0002]/events[at0003 and name/value='Any event']/data[at0001]/items[at0004]/value/magnitude as weight " +
					"from EHR[ehr_id/value='" + ehrId +"'] CONTAINS " +
					"(OBSERVATION bp [openEHR-EHR-OBSERVATION.blood_pressure.v1] AND " +
					"OBSERVATION bw [openEHR-EHR-OBSERVATION.body_weight.v1] )";
					
					    
						
				$.ajax({
				    url: baseUrl + "/query?" + $.param({"aql": AQL}),
				    type: 'GET',
				    headers: {"Ehr-Session": sessionId},
				    success: function (res) {
				    	console.log(res);
				    	/*var results = "<table class='table table-striped table-hover'>" +
		                  "<tr><th>Datum in ura</th><th class='text-right'>" +
		                  "Telesna temperatura</th></tr>";
				    	if (res) {
				    		var rows = res.resultSet;
					        for (var i in rows) {
					            results += "<tr><td>" + rows[i].cas +
		                          "</td><td class='text-right'>" +
		                          rows[i].temperatura_vrednost + " " 	+
		                          rows[i].temperatura_enota + "</td>";
					        }
					        results += "</table>";
					        $("#rezultatMeritveVitalnihZnakov").append(results);
				    	} else {
				    		$("#preberiMeritveVitalnihZnakovSporocilo").html(
			                    "<span class='obvestilo label label-warning fade-in'>" +
			                    "Ni podatkov!</span>");
				    	}*/

				    },
				    error: function(err) {
				    	$("#preberiMeritveVitalnihZnakovSporocilo").html(
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
