<?php
/*
=========================================================
 TimberWood Furniture
 Automatic Order Email API
=========================================================

 POST  = Submit order
 GET   = Health check

 Upload:
 public_html/send-order.php

 IMPORTANT:
 - No Gmail password is stored here.
 - Your hosting server must support PHP mail().
=========================================================
*/

header("Content-Type: application/json; charset=UTF-8");

$shop_email = "bbbbibek5@gmail.com";
$shop_name  = "TimberWood Furniture";

/*
=========================================================
 CORS
=========================================================
*/

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}


/*
=========================================================
 HEALTH CHECK
=========================================================
*/

if ($_SERVER["REQUEST_METHOD"] === "GET") {

    echo json_encode([
        "success" => true,
        "message" => "TimberWood Order API is working."
    ]);

    exit;
}


/*
=========================================================
 ONLY POST REQUESTS
=========================================================
*/

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);

    exit;
}


/*
=========================================================
 READ JSON
=========================================================
*/

$raw = file_get_contents("php://input");

$data = json_decode($raw, true);

if (!is_array($data)) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Invalid order data."
    ]);

    exit;
}


/*
=========================================================
 CUSTOMER DETAILS
=========================================================
*/

$name = trim($data["customer"]["name"] ?? "");
$phone = trim($data["customer"]["phone"] ?? "");
$email = trim($data["customer"]["email"] ?? "");
$city = trim($data["customer"]["city"] ?? "");
$address = trim($data["customer"]["address"] ?? "");

$delivery_method =
    trim($data["customer"]["delivery_method"] ?? "home");

$payment_method =
    trim($data["customer"]["payment_method"] ?? "cod");


/*
=========================================================
 VALIDATION
=========================================================
*/

if ($name === "") {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Customer name is required."
    ]);

    exit;
}


if ($phone === "") {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Phone number is required."
    ]);

    exit;
}


if ($email !== "" && !filter_var($email, FILTER_VALIDATE_EMAIL)) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Invalid email address."
    ]);

    exit;
}


/*
=========================================================
 PRODUCTS
=========================================================
*/

$products = $data["products"] ?? [];

if (!is_array($products) || count($products) === 0) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Your cart is empty."
    ]);

    exit;
}


/*
=========================================================
 ORDER NUMBER
=========================================================
*/

$order_number =
    "ORD-" .
    date("Y") .
    "-" .
    random_int(100000, 999999);


/*
=========================================================
 ORDER DATE
=========================================================
*/

$order_date = date("d/m/Y, H:i:s");


/*
=========================================================
 CALCULATE TOTAL
=========================================================
*/

$total_items = 0;
$subtotal = 0;

$product_lines = "";

$product_number = 1;

foreach ($products as $product) {

    $product_name =
        trim($product["name"] ?? "Unknown Product");

    $product_code =
        trim($product["code"] ?? "");

    $quantity =
        max(1, intval($product["quantity"] ?? 1));

    $unit_price =
        floatval($product["price"] ?? 0);

    $product_total =
        $unit_price * $quantity;

    $total_items += $quantity;

    $subtotal += $product_total;


    /*
    -----------------------------------------------------
     EMAIL PRODUCT FORMAT
    -----------------------------------------------------
    */

    $product_lines .=
        $product_number . ". " .
        $product_name;

    if ($product_code !== "") {

        $product_lines .=
            " (" . $product_code . ")";

    }

    $product_lines .=
        "\n" .
        "   Quantity: " .
        $quantity .
        "\n" .
        "   Unit Price: RS " .
        number_format($unit_price, 2) .
        "\n" .
        "   Product Total: RS " .
        number_format($product_total, 2) .
        "\n\n";

    $product_number++;
}


/*
=========================================================
 DELIVERY
=========================================================
*/

$delivery = 0;

if ($delivery_method === "home") {

    /*
    Change this if you want a delivery charge.
    Currently FREE as requested.
    */

    $delivery = 0;
}


/*
=========================================================
 GRAND TOTAL
=========================================================
*/

$grand_total = $subtotal + $delivery;


/*
=========================================================
 SANITIZE EMAIL HEADER VALUES
=========================================================
*/

$safe_name =
    preg_replace(
        "/[\r\n]+/",
        " ",
        $name
    );

$safe_email =
    preg_replace(
        "/[\r\n]+/",
        "",
        $email
    );


/*
=========================================================
 EMAIL SUBJECT
=========================================================
*/

$subject =
    "NEW TIMBERWOOD FURNITURE ORDER - " .
    $order_number;


/*
=========================================================
 EMAIL BODY
=========================================================
*/

$message =

"NEW TIMBERWOOD FURNITURE ORDER\n" .
"========================================\n\n" .

"Order Number: " .
$order_number .
"\n" .

"Order Date: " .
$order_date .
"\n" .

"Order Status: NEW ORDER\n\n" .


"CUSTOMER DETAILS\n" .
"----------------------------------------\n" .

"Name: " .
$name .
"\n" .

"Phone: " .
$phone .
"\n" .

"Email: " .
($email !== "" ? $email : "Not provided") .
"\n" .

"City: " .
($city !== "" ? $city : "Not provided") .
"\n" .

"Address: " .
($address !== "" ? $address : "Not provided") .
"\n" .

"Delivery Method: " .
$delivery_method .
"\n" .

"Payment Method: " .
$payment_method .
"\n\n" .


"PRODUCT DETAILS\n" .
"----------------------------------------\n" .

$product_lines .


"ORDER SUMMARY\n" .
"----------------------------------------\n" .

"Total Items: " .
$total_items .
"\n" .

"Subtotal: RS " .
number_format($subtotal, 2) .
"\n" .

"Delivery: " .
(
    $delivery > 0
    ? "RS " . number_format($delivery, 2)
    : "FREE"
) .
"\n" .

"GRAND TOTAL: Rs " .
number_format($grand_total, 2) .
"\n\n" .


"========================================\n" .

"Order submitted from the TimberWood website.\n" .

"Please contact the customer to confirm the order.\n";


/*
=========================================================
 EMAIL HEADERS
=========================================================
*/

$headers = [];

$headers[] =
    "From: TimberWood Website <" .
    $shop_email .
    ">";

if ($email !== "") {

    $headers[] =
        "Reply-To: " .
        $safe_email;

}

$headers[] =
    "MIME-Version: 1.0";

$headers[] =
    "Content-Type: text/plain; charset=UTF-8";


$headers_string =
    implode("\r\n", $headers);


/*
=========================================================
 SEND EMAIL
=========================================================
*/

$mail_sent = mail(
    $shop_email,
    $subject,
    $message,
    $headers_string
);


/*
=========================================================
 RESPONSE
=========================================================
*/

if ($mail_sent) {

    http_response_code(200);

    echo json_encode([

        "success" => true,

        "message" =>
            "Order submitted successfully.",

        "order_number" =>
            $order_number,

        "total" =>
            number_format(
                $grand_total,
                2,
                ".",
                ""
            )

    ]);

    exit;

}


/*
=========================================================
 MAIL FAILED
=========================================================
*/

http_response_code(500);

echo json_encode([

    "success" => false,

    "message" =>
        "Order was received but email could not be sent. Please contact TimberWood."

]);

exit;

?>