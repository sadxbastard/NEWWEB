<?php
    $dbc = mysqli_connect('localhost', 'd982185l_popup', 'Zxc666', 'd982185l_popup');

    $data = json_decode(file_get_contents('php://input'), true);
    $last_name = $data['last_name'];
    $first_name = $data['first_name'];
    $middle_name = $data['middle_name'];
    $email = $data['email'];
    $message = $data['message'];

    $query = "INSERT INTO data_from_the_popup (last_name, first_name, middle_name, email, comment)
              VALUES ('$last_name', '$first_name', '$middle_name', '$email', '$message')";
    
    $query_count = "SELECT COUNT(*) as count FROM data_from_the_popup";
    

    $result = mysqli_query($dbc, $query);
    $result2 = mysqli_query($dbc, $query_count);
    // dd($result2);
    while($value = mysqli_fetch_row($result2)) {
        $somethg = array("count" => $value[0]);
    }
    print json_encode($somethg);

    mysqli_close($dbc);
    header('Content-type: application/json');
?>