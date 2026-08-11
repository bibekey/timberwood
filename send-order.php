<?php
/*
    TimberWood Furniture Shop
    Automatic Order Email API

    Upload this file to:
    public_html/send-order.php

    IMPORTANT:
    - GET request = health check
    - POST request = real order
    - No Gmail password is stored here
*/

$shop_email = "bbbbbibek5@gmail.com";
$shop_name  = "TimberWood Furniture Shop";

header("Content-Type: application/json; charset=UTF-8");

function send_json($success, $message, $extra = []) {
    echo json_encode(
        array_merge(
            ["success" => $success, "message" => $message],
            $extra
        ),
        JSON_UNESCAPED_UNICODE
    );
    exit;
}


/* =========================
   DIRECT TEST / HEALTH CHECK
========================= */

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    send_json(
        true,
        "send-order.php is working. Waiting for an order from the website.",
        [
            "method" => "GET",
            "endpoint" => "send-order.php"
        ]
    );
}


/* =========================
   ONLY POST CAN PLACE ORDER
========================= */

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    send_json(
        false,
        "Invalid request method. Please place the order from the website."
    );
}


/* =========================
   CUSTOMER DATA
========================= */

$name = trim($_POST["name"] ?? "");
$phone = trim($_POST["phone"] ?? "");
$email = trim($_POST["email"] ?? "");
$city = trim($_POST["city"] ?? "");
$address = trim($_POST["address"] ?? "");

$delivery = trim(
    $_POST["delivery"] ??
    $_POST["deliveryMethod"] ??
    "Home Delivery"
);

$payment = trim(
    $_POST["payment"] ??
    $_POST["paymentMethod"] ??
    "Cash on Delivery"
);

$order_number = trim(
    $_POST["order_number"] ??
    $_POST["orderNumber"] ??
    ""
);

$order_date = trim(
    $_POST["order_date"] ??
    $_POST["orderDate"] ??
    date("Y-m-d H:i:s")
);

$items_json = $_POST["items"] ?? "[]";

$subtotal = floatval($_POST["subtotal"] ?? 0);

$delivery_fee = floatval(
    $_POST["delivery_fee"] ??
    $_POST["deliveryFee"] ??
    0
);

$total = floatval($_POST["total"] ?? 0);


/* =========================
   VALIDATION
========================= */

if ($name === "") {
    send_json(false, "Customer name is required.");
}

if ($phone === "") {
    send_json(false, "Customer phone number is required.");
}

if ($city === "") {
    send_json(false, "Customer city is required.");
}

if ($address === "") {
    send_json(false, "Delivery address is required.");
}

if ($email !== "" && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_json(false, "Customer email address is not valid.");
}

if ($order_number === "") {
    $order_number = "ORD-" . date("Ymd-His");
}


/* =========================
   PRODUCT DATA
========================= */

$items = json_decode($items_json, true);

if (!is_array($items) || count($items) === 0) {
    send_json(false, "No products were included in the order.");
}


/* =========================
   PRODUCT DETAILS
========================= */

$product_text = "";
$product_count = 0;

foreach ($items as $index => $item) {

    $product_name = trim($item["name"] ?? "Product");
    $quantity = max(1, intval($item["quantity"] ?? 1));
    $price = max(0, floatval($item["price"] ?? 0));

    $product_total = $price * $quantity;
    $product_count += $quantity;

    $product_text .=
        ($index + 1) . ". " . $product_name . "\n";

    $product_text .=
        "   Quantity: " . $quantity . "\n";

    $product_text .=
        "   Unit Price: $" .
        number_format($price, 2) . "\n";

    $product_text .=
        "   Product Total: $" .
        number_format($product_total, 2) . "\n";

    if (!empty($item["color"])) {
        $product_text .=
            "   Color: " . trim($item["color"]) . "\n";
    }

    if (!empty($item["size"])) {
        $product_text .=
            "   Size: " . trim($item["size"]) . "\n";
    }

    if (!empty($item["sku"])) {
        $product_text .=
            "   SKU: " . trim($item["sku"]) . "\n";
    }

    $product_text .= "\n";
}


/* =========================
   EMAIL
========================= */

$subject =
    "New Furniture Order - " .
    $order_number;

$message = "";

$message .= "NEW TIMBERWOOD FURNITURE ORDER\n";
$message .= "========================================\n\n";

$message .= "Order Number: " . $order_number . "\n";
$message .= "Order Date: " . $order_date . "\n";
$message .= "Order Status: NEW ORDER\n\n";

$message .= "CUSTOMER DETAILS\n";
$message .= "----------------------------------------\n";
$message .= "Name: " . $name . "\n";
$message .= "Phone: " . $phone . "\n";
$message .= "Email: " .
    ($email !== "" ? $email : "Not provided") . "\n";
$message .= "City: " . $city . "\n";
$message .= "Address: " . $address . "\n";
$message .= "Delivery Method: " . $delivery . "\n";
$message .= "Payment Method: " . $payment . "\n\n";

$message .= "PRODUCT DETAILS\n";
$message .= "----------------------------------------\n";
$message .= $product_text;

$message .= "ORDER SUMMARY\n";
$message .= "----------------------------------------\n";
$message .= "Total Items: " . $product_count . "\n";
$message .= "Subtotal: $" . number_format($subtotal, 2) . "\n";

if ($delivery_fee > 0) {
    $message .=
        "Delivery: $" .
        number_format($delivery_fee, 2) . "\n";
} else {
    $message .= "Delivery: FREE\n";
}

$message .=
    "GRAND TOTAL: $" .
    number_format($total, 2) .
    "\n\n";

$message .= "========================================\n";
$message .= "Order submitted from the TimberWood website.\n";
$message .= "Please contact the customer to confirm the order.\n";


/* =========================
   EMAIL HEADERS
========================= */

$headers = "";

$headers .=
    "From: " .
    $shop_name .
    " <" .
    $shop_email .
    ">\r\n";

$headers .=
    "Reply-To: " .
    ($email !== "" ? $email : $shop_email) .
    "\r\n";

$headers .= "MIME-Version: 1.0\r\n";
$headers .=
    "Content-Type: text/plain; charset=UTF-8\r\n";


/* =========================
   SEND
========================= */

$sent = @mail(
    $shop_email,
    $subject,
    $message,
    $headers
);


/* =========================
   RESULT
========================= */

if ($sent) {
    send_json(
        true,
        "Order received and email sent successfully.",
        [
            "order_number" => $order_number
        ]
    );
}

send_json(
    false,
    "The order reached PHP, but the server could not send the email. Check cPanel Email Deliverability or configure SMTP/PHPMailer."
);

?>
