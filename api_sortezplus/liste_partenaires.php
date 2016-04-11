<?php

    $dbh = new PDO('mysql:host=localhost;dbname=sortezplbdd;charset=utf8','root','patmo11');


  $req = $dbh->prepare("SELECT * FROM sortezplbdd.sp_posts
     INNER JOIN sortezplbdd.sp_postmeta
     ON sortezplbdd.sp_posts.id = sortezplbdd.sp_postmeta.post_id
      where sortezplbdd.sp_posts.post_type = 'ait-dir-item'
       AND sortezplbdd.sp_postmeta.meta_key = '_ait-dir-item';");

     $req->execute();
     $i=0;
     while($ligne = $req->fetch())
     {
         $tabAdresse = unserialize($ligne["meta_value"]);
         //id de la sortie;
         $poi[$i]["id_sortie"]= $ligne['ID'];        // requete pour recuperer les categories
         $req2 = $dbh->prepare("SELECT * FROM sortezplbdd.sp_terms INNER JOIN sortezplbdd.sp_term_relationships ON sortezplbdd.sp_terms.term_id = sortezplbdd.sp_term_relationships.term_taxonomy_id where sortezplbdd.sp_term_relationships.object_id =". $ligne['ID']."");
         $req2->execute();
         $cat[]='';
         while($terms = $req2->fetchAll()){
           //print_r($terms);
           foreach ($terms as $key => $term) {
             //print_r($term);
             $term_id = $term['term_id'];
             $poi[$i]["categories"][$term_id] = $term['name'];
           }
         }        $poi[$i]["lat"]= $tabAdresse['gpsLatitude'];
         $poi[$i]["long"]=$tabAdresse['gpsLongitude'];
         $i++;
     }
  $tabResultats = json_encode($poi);
  echo $tabResultats;
  return $tabResultats;
 ?>
