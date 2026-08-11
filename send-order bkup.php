<?php
/*
    Furniture Shop - Automatic Order Email

    Upload this file to your cPanel hosting.
    Change only the settings below if needed.
*/

$shop_email = "bbbbbibek5@gmail.com";
$shop_name = "Furniture Shop";

/*
    Security:
    This PHP file does not contain your Gmail password.
    Your hosting server sends the email.

    IMPORTANT:
    For reliable delivery, your hosting should have PHP mail()
    configured. If mail() is disabled, use SMTP/PHPMailer instead.
*/

header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Only POST requests are allowed."
    ]);
    exit;
}


/* =========================
   GET FORM DATA
========================= */

$name = trim($_POST["name"] ?? "");
$phone = trim($_POST["phone"] ?? "");
$email = trim($_POST["email"] ?? "");
$city = trim($_POST["city"] ?? "");
$address = trim($_POST["address"] ?? "");
$delivery = trim($_POST["delivery"] ?? "Home Delivery");
$payment = trim($_POST["payment"] ?? "Cash on Delivery");

$order_number = trim($_POST["order_number"] ?? "");
$order_date = trim($_POST["order_date"] ?? date("Y-m-d H:i:s"));
$items_json = $_POST["items"] ?? "[]";
$subtotal = floatval($_POST["subtotal"] ?? 0);
$delivery_fee = floatval($_POST["delivery_fee"] ?? 0);
$total = floatval($_POST["total"] ?? 0);


/* =========================
   VALIDATION
========================= */

if ($name === "" || $phone === "" || $city === "" || $address === "") {
    echo json_encode([
        "success" => false,
        "message" => "Please provide name, phone, city and delivery address."
    ]);
    exit;
}

if ($email !== "" && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Please enter a valid customer email."
    ]);
    exit;
}

if ($order_number === "") {
    $order_number = "ORD-" . date("Ymd-His");
}


/* =========================
   PRODUCT DATA
========================= */

$items = json_decode($items_json, true);

if (!is_array($items)) {
    $items = [];
}


/* =========================
   CREATE EMAIL
========================= */

$subject = "New Furniture Order - " . $order_number;

$message = "";

$message .= "NEW FURNITURE ORDER\n";
$message .= "====================================\n\n";

$message .= "Order Number: " . $order_number . "\n";
$message .= "Order Date: " . $order_date . "\n";
$message .= "Order Status: Order Received\n\n";


$message .= "CUSTOMER DETAILS\n";
$message .= "------------------------------------\n";
$message .= "Name: " . $name . "\n";
$message .= "Phone: " . $phone . "\n";
$message .= "Email: " . ($email !== "" ? $email : "Not provided") . "\n";
$message .= "City: " . $city . "\n";
$message .= "Address: " . $address . "\n";
$message .= "Delivery Method: " . $delivery . "\n";
$message .= "Payment Method: " . $payment . "\n\n";


$message .= "PRODUCT DETAILS\n";
$message .= "------------------------------------\n";

if (count($items) === 0) {

    $message .= "No product information received.\n";

} else {

    foreach ($items as $index => $item) {

        $product_name = trim($item["name"] ?? "Product");
        $quantity = intval($item["quantity"] ?? 1);
        $price = floatval($item["price"] ?? 0);

        $product_total = $price * $quantity;

        $message .= ($index + 1) . ". " . $product_name . "\n";
        $message .= "   Quantity: " . $quantity . "\n";
        $message .= "   Unit Price: $" . number_format($price, 2) . "\n";
        $message .= "   Product Total: $" . number_format($product_total, 2) . "\n\n";
    }
}


$message .= "ORDER SUMMARY\n";
$message .= "------------------------------------\n";
$message .= "Subtotal: $" . number_format($subtotal, 2) . "\n";

if ($delivery_fee > 0) {
    $message .= "Delivery: $" . number_format($delivery_fee, 2) . "\n";
} else {
    $message .= "Delivery: FREE\n";
}

$message .= "Grand Total: $" . number_format($total, 2) . "\n\n";

$message .= "====================================\n";
$message .= "Thank you for the order.\n";
$message .= $shop_name . "\n";


/* =========================
   EMAIL HEADERS
========================= */

$headers = "From: " . $shop_name . " <" . $shop_email . ">\r\n";

if ($email !== "") {
    $headers .= "Reply-To: " . $email . "\r\n";
}

$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";


/* =========================
   SEND EMAIL
========================= */

$sent = mail(
    $shop_email,
    $subject,
    $message,
    $headers
);


/* =========================
   RESPONSE
========================= */

if ($sent) {

    echo json_encode([
        "success" => true,
        "message" => "Order received and email sent successfully.",
        "order_number" => $order_number
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Order was received, but the server could not send the email. Please configure email/SMTP on the hosting server."
    ]);
}

?>
