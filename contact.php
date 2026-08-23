<?php

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("Invalid request.");
}

/* =========================
   GET FORM DATA
========================= */

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$phone = trim($_POST["phone"] ?? "");
$message = trim($_POST["message"] ?? "");


/* =========================
   VALIDATION
========================= */

if ($name === "" || $email === "" || $message === "") {
    exit("Please fill in all required fields.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit("Please enter a valid email address.");
}


/* =========================
   SAVE TO DATABASE
========================= */

$ip = $_SERVER["REMOTE_ADDR"] ?? null;

$sql = "INSERT INTO contacts
        (name, email, phone, message, ip_address)
        VALUES
        (:name, :email, :phone, :message, :ip)";

$stmt = $pdo->prepare($sql);

$stmt->execute([
    ":name" => $name,
    ":email" => $email,
    ":phone" => $phone,
    ":message" => $message,
    ":ip" => $ip
]);


/* =========================
   EMAIL NOTIFICATION
========================= */

$to = "bbbbibek5@gmail.com";

$subject = "New Contact Form Message - WebTechGhar";

$email_body = "

New Contact Form Submission
===========================

Name: $name

Email: $email

Phone: $phone

Message:
$message

===========================

IP Address: $ip

Website: WebTechGhar
";


$headers = "From: WebTechGhar <no-reply@webtechghar.com>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";


/* =========================
   SEND EMAIL
========================= */

mail($to, $subject, $email_body, $headers);


/* =========================
   SUCCESS
========================= */

header("Location: thank-you.html");
exit;

?>