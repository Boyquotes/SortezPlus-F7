<?php
try {
    $dbh = new PDO('msql:host=server;dbname=utf8_database','usr','pwd');

    $rs = $dbh->query('SELECT * FROM partenaires');
    $obj = $rs->fetchAll();

     // conversion en json
    $json_output = json_encode($obj);
}
catch(PDOException $e) {
    echo $e->getMessage();
}
 ?>
