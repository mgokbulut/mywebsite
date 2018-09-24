
<?php
session_start();

// initializing variables
$question = "";
$ans = "";

$db = mysqli_connect('localhost', 'root', '', 'generator');
if (isset($_POST['algebratic_expression']) && isset($_POST['answer']))
{
  // receive all input values from the form

  $question = $_POST['algebratic_expression'];
	$ans = $_POST['answer'];

	$query = "INSERT INTO questions (question,answer) VALUES ('$question','$ans')";
	$querywork=mysqli_query($db, $query);
}

//$data = "data budur";
//echo $data; you can reach $data var if ajax is success in javascript and can use within php

?>
