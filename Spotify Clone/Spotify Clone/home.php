<?php
session_start();

if(isset($_SESSION['id']) && isset($_SESSION['username'])){



?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HOME</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Hello, <?php echo $_SESSION['name'] ?></h1>
    <nav class="home-nav">
        <a href="change-password.php">Change Password</a>
        <a href="logout.php">Logout</a>
    </nav>
    
</body>
</html>

<?php
}else{
    header("Location: login.php");
    exit();
}
?>