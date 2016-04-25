//Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;
var tab_gps=[];
// Add view
var mainView = myApp.addView('.view-main', {
  // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

//Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('predici', function (page) {
  // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
});
});

//Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
  mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Accueil</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">Accueil</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}




 $$( "#bouton" ).click(function(){
   function compare(x, y) {
     if(parseFloat(x) > parseFloat(y)){
       return x;
     }
   }

  $$.ajax({
            // chargement du fichier externe monfichier.php
            url      : "http://localhost/SortezPlus-F7/api_sortezplus/liste_partenaires.php",
            // Passage des données au fichier externe
            data     : {concat: $(this).html()},
            cache    : false,
            dataType : "json",
            error    : function(request, error) { // Info Debuggage si erreur
                         alert("Erreur : responseText: "+request.responseText);
                   },
                   success  : function(data)
                   {
                            var tab_gps = [];

                               for (var i = 0; i <data.length; i++)
                               {
                                  tab_gps.push([data[i].lat,data[i].long,data[i].nom]);
                              }
                                var pluspres = new Array();
                                var lat = 43.246764;
                                var long = 2.8962415999999997;

                                for (var k = 0; k < tab_gps.length; k++)
                                {
                                 var Kmetres = distance(lat, long, parseFloat(tab_gps[k][0]), parseFloat(tab_gps[k][1]));

                                 pluspres[k]= Kmetres;
                               }
                               $$('#toto').html(pluspres.sort(compare));
                               console.log(pluspres.sort(compare));
                }
   });

});

//========================================== PREDICI ===================================//


//==================================== ********** =============================//

//Calcul de la distance en km d'un point par rappport à la position de l'utilisateur de l'appli
	function distance(lat_a, lon_a, lat_b, lon_b) {
				var a = Math.PI / 180;
				var lat1 = lat_a * a;
				var lat2 = lat_b * a;
				var lon1 = lon_a * a;
				var lon2 = lon_b * a;
				var t1 = Math.sin(lat1) * Math.sin(lat2);
				var t2 = Math.cos(lat1) * Math.cos(lat2);
				var t3 = Math.cos(lon1 - lon2);
				var t4 = t2 * t3;
				var t5 = t1 + t4;
				var rad_dist = Math.atan(-t5 / Math.sqrt(-t5 * t5 + 1)) + 2 * Math.atan(1);
				dist_kms=(rad_dist * 3437.74677 * 1.1508) * 1.6093470878864446;
        return dist_kms.toFixed(2);
			}
			//L'affichage des coordonnées(latitude et longitude) de l'utilisateur de l'appli
		/*	function maPosition(position) {
				var infopos = "Position déterminée :\n";
				infopos += 'Latitude : ' + "<p id='toto'>" + position.coords.latitude + "</p>" + "<br>";
				infopos += 'Longitude: ' + position.coords.longitude + "<br>";
				document.getElementById("infoposition").innerHTML = infopos;
				var a = position.coords.latitude;
				var b = position.coords.longitude;
          // var tableauDistance = [];
          //var resultats = "";
				for (var j = 0; j < tableau.length; j++) {
				alert("Vous êtes à " + distance(a, b, tableau[j][1], tableau[j][2]) + "Km de " + tableau[j][0]);
				//resultats = distance(a, b, tableau[j][1], tableau[j][2]);
                  //tableauDistance[j] = resultats;
                  //alert("Vous êtes à " + tableauDistance[j] + " km de " + tableau[j][0]);
                   // tabResult[j] = { tableau[j][0] : tableauDistance[j] };
                }
			}
 //console.log(tabResult);
			//La condition qui renseigne si l'utilisateur à accepté la géolocalisation
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(maPosition);
			}
*/
