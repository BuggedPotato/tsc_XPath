<?php
setlocale( LC_ALL, "Polish.UTF-8" );

// $_POST[ "data" ] = '{"mode":"cities", "void_id":"12"}';
if( !isset( $_POST[ "data" ] ) )
{
    echo "No data!";
    die();
}

$data = json_decode( $_POST[ "data" ] );

$xml = simplexml_load_file( "TERC_Urzedowy.xml" );
$result;
if( $data -> mode == "voivodeships" )
{
    // wojewodztwa
    $result = $xml -> xpath( "/teryt/catalog/row/NAZWA_DOD[ text()='województwo' ]/parent::*" );
}
elseif( $data -> mode == "cities" )
{
    // miasta w województwie
    $result = $xml -> xpath( "/teryt/catalog/row[ WOJ[ text()='" . $data -> void_id . "' ] and (
        (
            NAZWA_DOD[ starts-with(text(), 'miasto') ] 
        )
        or 
        (   NAZWA_DOD[ contains( text(), 'gmina miejska' ) ] and not 
            ( preceding-sibling::*[1][ 
                NAZWA_DOD[ 
                    contains(text(), 'miasto') ] 
                    ] )
        )
    ) ]" );
}
else echo "Error";

usort( $result, "compare_names" );
echo json_encode( $result );

function compare_names( $a, $b )
{
    return strcoll( $a -> NAZWA, $b -> NAZWA );
}

?>