//Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

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
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
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
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}
/*
// Ecoute de l'évènement click lors du chargement de la page


          // Après le click on lance la requête ajax pour lire les données json
        $$('#bouton').on('click',function()
        {
              // new XMLHttpRequest()=> Ce constructeur est pour tout autre navigateur incluant Firefox.
              var xmlhttp = new XMLHttpRequest();
              var url = "http://localhost/SortezPlus-F7/api_sortezplus/liste_partenaires.php";
              xmlhttp.open('GET',url);
              xmlhttp.send(null);

              //xmlhttp.onreadystatechange => On associe un traitement (une fonction anonyme en l'occurrence) à cet indicateur d'évènement.
              xmlhttp.onreadystatechange = function()
              {

                //xmlhttp.readyState == 4 => L'état 4 signifie que la réponse est envoyée par le serveur et disponible.
                //xmlhttp.status == 200 => Ce status signifie ok, sinon un code d'erreur quelconque est envoyé, 404 par exemple.
                  if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                  {

                      //myFunction(myArr);
                      var jsonData = JSON.parse(xmlhttp.responseText);
                  // console.log(jsonData);
                        for (var i = 0; i < jsonData.length; i++)
                         {
                            //liste.innerHTML=jsonData[i].id_sortie;

                             $$('#toto')addClass('item-inner').insertAfter('li');


                          /* var addBr = document.createElement('br');
                           $$("#toto").insertAfter(addBr);
                           var liste = document.createElement('li');
                           liste.setAttribute("class", 'item-inner');
                           $$("#toto").insertAfter(liste);
                            $$("#toto").insertAfter(addBr);
                        }
                  }
            };
        });*/



        $$( "#bouton" ).click(function(){
            $$.ajax({
                  // chargement du fichier externe monfichier.php
                  url      : "http://localhost/SortezPlus-F7/api_sortezplus/liste_partenaires.php",
                  // Passage des données au fichier externe (ici le nom cliqué)
                  data     : {concat: $(this).html()},
                  cache    : false,
                  dataType : "json",
                  error    : function(request, error) { // Info Debuggage si erreur
                               alert("Erreur : responseText: "+request.responseText);
                             },
                  success  : function(data) {
                              var concat = "";
                             for (var i = 0; i <data.length; i++) {
                              // J'écris le résultat
                              concat+= "<p>"+data[i].post_title +"<p>";
                              }
                              $$('#toto').html(concat);
                            }



             });
        });
