<?php
try {
    $dbh = new PDO('mysql:host=localhost;dbname=sortezplbdd;charset=utf8','root','patmo11');

    $req = $dbh->prepare("SELECT * FROM sp_posts INNER JOIN sp_postmeta
                ON sp_posts.ID = sp_postmeta.post_id
                WHERE sp_posts.post_type = 'ait-dir-item'
                AND sp_postmeta.meta_key = '_ait-dir-item';");

    $req->execute();while($ligne = $req->fetch())
    {
        $tabAdresse = unserialize($ligne["meta_value"]);
        //echo "<p>Latitude = ".$tabAdresse['gpsLatitude']." Longitude =  ".$tabAdresse['gpsLongitude']."</p>";
        var_dump($tabAdresse);
    }
}
catch(PDOException $e) {
    echo $e->getMessage();
}

 ?>
