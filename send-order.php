<?php

/*
=========================================================
 TimberWood Furniture
 Automatic Order API
=========================================================

GET:
    Health check

POST:
    Receives order from index.html
    Sends order to:
      - Gmail
      - WhatsApp Business Cloud API

=========================================================
*/


header(
    "Content-Type: application/json; charset=UTF-8"
);


// ======================================================
// CONFIGURATION
// ======================================================

$shop_name =
    "TimberWood Furniture & Interiors";

$shop_email =
    "bbbbibek5@gmail.com";


// ======================================================
// GMAIL
// ======================================================

$smtp_host =
    "smtp.gmail.com";

$smtp_port =
    587;

$smtp_username =
    "bbbbibek5@gmail.com";

/*
IMPORTANT:

Use a Google App Password here.

DO NOT use your normal Gmail password.
*/

$smtp_password =
    "YOUR_GMAIL_APP_PASSWORD";


// ======================================================
// WHATSAPP CLOUD API
// ======================================================

$whatsapp_number =
    "9779829312825";

/*
Get this from Meta WhatsApp Cloud API.
*/

$whatsapp_access_token =
    "YOUR_WHATSAPP_ACCESS_TOKEN";


/*
This is your WhatsApp Business
Phone Number ID from Meta.
*/

$whatsapp_phone_number_id =
    "YOUR_PHONE_NUMBER_ID";


/*
Keep the API version configurable.
Update this if Meta requires a newer version.
*/

$whatsapp_api_version =
    "v23.0";


// ======================================================
// GET = HEALTH CHECK
// ======================================================

if(
    $_SERVER["REQUEST_METHOD"] === "GET"
){

    echo json_encode([

        "success" => true,

        "message" =>
            "TimberWood Order API is working.",

        "email" =>
            $shop_email,

        "whatsapp" =>
            $whatsapp_number

    ]);

    exit;

}


// ======================================================
// ONLY POST
// ======================================================

if(
    $_SERVER["REQUEST_METHOD"] !== "POST"
){

    http_response_code(405);

    echo json_encode([

        "success" => false,

        "message" =>
            "Only POST requests are allowed."

    ]);

    exit;

}


// ======================================================
// READ JSON
// ======================================================

$raw =
    file_get_contents(
        "php://input"
    );


$data =
    json_decode(
        $raw,
        true
    );


if(
    !is_array($data)
){

    http_response_code(400);

    echo json_encode([

        "success" => false,

        "message" =>
            "Invalid order data."

    ]);

    exit;

}


// ======================================================
// CUSTOMER
// ======================================================

$name =
    trim(
        $data["name"] ?? ""
    );

$phone =
    trim(
        $data["phone"] ?? ""
    );

$email =
    trim(
        $data["email"] ?? ""
    );

$address =
    trim(
        $data["address"] ?? ""
    );

$notes =
    trim(
        $data["notes"] ?? ""
    );


// ======================================================
// VALIDATION
// ======================================================

if(
    $name === "" ||
    $phone === "" ||
    $address === ""
){

    http_response_code(400);

    echo json_encode([

        "success" => false,

        "message" =>
            "Name, phone and delivery address are required."

    ]);

    exit;

}


// ======================================================
// ORDER ID
// ======================================================

$order_id =
    trim(
        $data["order_id"] ??
        (
            "TW-" .
            date("Ymd") .
            "-" .
            rand(1000,9999)
        )
    );


$order_date =
    date(
        "Y-m-d H:i:s"
    );


// ======================================================
// PRODUCTS
// ======================================================

$products =
    $data["products"] ?? [];


if(
    !is_array($products) ||
    count($products) === 0
){

    http_response_code(400);

    echo json_encode([

        "success" => false,

        "message" =>
            "No products were included in the order."

    ]);

    exit;

}


// ======================================================
// CALCULATE TOTAL
// ======================================================

$total = 0;

$product_text = "";

$product_html = "";


foreach(
    $products as $index => $product
){

    $product_name =
        trim(
            $product["name"] ?? "Product"
        );

    $product_code =
        trim(
            $product["code"] ?? ""
        );

    $quantity =
        max(
            1,
            intval(
                $product["quantity"] ?? 1
            )
        );

    $price =
        floatval(
            $product["price"] ?? 0
        );

    $subtotal =
        $price *
        $quantity;


    $total +=
        $subtotal;


    /*
    Plain text email / WhatsApp
    */

    $product_text .=

        ($index + 1) .
        ". " .
        $product_name .
        "\n" .

        "   Model: " .
        $product_code .
        "\n" .

        "   Quantity: " .
        $quantity .
        "\n" .

        "   Unit Price: Rs. " .
        number_format(
            $price,
            2
        ) .
        "\n" .

        "   Subtotal: Rs. " .
        number_format(
            $subtotal,
            2
        ) .
        "\n\n";


    /*
    HTML email
    */

    $product_html .=

        "<tr>" .

        "<td style='padding:10px;border-bottom:1px solid #ddd'>" .
        htmlspecialchars(
            $product_name
        ) .
        "<br>" .
        "<small>" .
        htmlspecialchars(
            $product_code
        ) .
        "</small>" .
        "</td>" .

        "<td style='padding:10px;border-bottom:1px solid #ddd;text-align:center'>" .
        $quantity .
        "</td>" .

        "<td style='padding:10px;border-bottom:1px solid #ddd;text-align:right'>" .
        "Rs. " .
        number_format(
            $price,
            2
        ) .
        "</td>" .

        "<td style='padding:10px;border-bottom:1px solid #ddd;text-align:right'>" .
        "Rs. " .
        number_format(
            $subtotal,
            2
        ) .
        "</td>" .

        "</tr>";

}


// ======================================================
// PLAIN TEXT ORDER
// ======================================================

$order_message =

"TIMBERWOOD FURNITURE
================================

NEW ORDER

Order ID: $order_id
Date: $order_date

CUSTOMER
--------------------------------
Name: $name
Phone: $phone
Email: $email
Address: $address

PRODUCTS
--------------------------------

$product_text

TOTAL
--------------------------------
Rs. " .
number_format(
    $total,
    2
) .

"

NOTES
--------------------------------
$notes

================================
TimberWood Furniture & Interiors
";


// ======================================================
// HTML EMAIL
// ======================================================

$email_body = "

<!DOCTYPE html>

<html>

<head>

<meta charset='UTF-8'>

</head>

<body style='margin:0;padding:0;background:#f7f2ea;font-family:Arial,sans-serif'>

<div style='max-width:700px;margin:30px auto;background:#fff;border:1px solid #e5ddd3'>

<div style='background:#3b2a20;color:#fff;padding:25px'>

<h1 style='margin:0;font-family:Georgia,serif'>
TimberWood
</h1>

<p style='margin:5px 0 0;color:#d6b46a'>
FURNITURE & INTERIORS
</p>

</div>


<div style='padding:30px'>

<h2 style='color:#3b2a20'>
New Order
</h2>


<p>

<strong>Order ID:</strong>
$order_id

<br>

<strong>Date:</strong>
$order_date

</p>


<h3 style='color:#3b2a20'>
Customer Information
</h3>


<table width='100%' cellpadding='0' cellspacing='0'>

<tr>
<td style='padding:7px 0'>
<strong>Name</strong>
</td>

<td style='padding:7px 0'>
" .
htmlspecialchars(
    $name
) .
"</td>
</tr>


<tr>
<td style='padding:7px 0'>
<strong>Phone</strong>
</td>

<td style='padding:7px 0'>
" .
htmlspecialchars(
    $phone
) .
"</td>
</tr>


<tr>
<td style='padding:7px 0'>
<strong>Email</strong>
</td>

<td style='padding:7px 0'>
" .
htmlspecialchars(
    $email
) .
"</td>
</tr>


<tr>
<td style='padding:7px 0'>
<strong>Address</strong>
</td>

<td style='padding:7px 0'>
" .
htmlspecialchars(
    $address
) .
"</td>
</tr>

</table>


<h3 style='color:#3b2a20;margin-top:25px'>
Ordered Products
</h3>


<table
width='100%'
cellpadding='0'
cellspacing='0'
style='border-collapse:collapse'
>

<thead>

<tr style='background:#f7f2ea'>

<th style='padding:10px;text-align:left'>
Product
</th>

<th style='padding:10px'>
Qty
</th>

<th style='padding:10px;text-align:right'>
Price
</th>

<th style='padding:10px;text-align:right'>
Subtotal
</th>

</tr>

</thead>

<tbody>

$product_html

</tbody>

</table>


<div style='margin-top:20px;padding:18px;background:#f7f2ea;text-align:right'>

<strong style='font-size:18px;color:#3b2a20'>

TOTAL:
Rs. " .
number_format(
    $total,
    2
) .

"</strong>

</div>


<h3 style='color:#3b2a20'>
Customer Notes
</h3>

<p style='color:#555'>

" .
nl2br(
    htmlspecialchars(
        $notes
    )
) .

"</p>


</div>


<div style='padding:18px;text-align:center;border-top:1px solid #eee;color:#777;font-size:12px'>

TimberWood Furniture & Interiors
<br>
Premium Furniture Solutions

</div>

</div>

</body>

</html>

";


// ======================================================
// SEND EMAIL
// ======================================================

$email_sent = false;

$email_error = "";


/*
PHPMailer

Install:

composer require phpmailer/phpmailer
*/

$autoload =
    __DIR__ .
    "/vendor/autoload.php";


if(
    file_exists($autoload)
){

    require_once $autoload;


    try{

        $mail =
            new PHPMailer\PHPMailer\PHPMailer(
                true
            );


        $mail->isSMTP();

        $mail->Host =
            $smtp_host;

        $mail->SMTPAuth =
            true;

        $mail->Username =
            $smtp_username;

        $mail->Password =
            $smtp_password;

        $mail->SMTPSecure =
            PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;

        $mail->Port =
            $smtp_port;


        /*
        Sender
        */

        $mail->setFrom(
            $smtp_username,
            $shop_name
        );


        /*
        Receiver
        */

        $mail->addAddress(
            $shop_email,
            $shop_name
        );


        /*
        Customer email as Reply-To
        */

        if(
            $email !== "" &&
            filter_var(
                $email,
                FILTER_VALIDATE_EMAIL
            )
        ){

            $mail->addReplyTo(
                $email,
                $name
            );

        }


        $mail->isHTML(
            true
        );


        $mail->Subject =
            "New TimberWood Order - " .
            $order_id;


        $mail->Body =
            $email_body;


        $mail->AltBody =
            $order_message;


        $mail->send();


        $email_sent =
            true;


    }catch(
        Exception $e
    ){

        $email_error =
            $mail->ErrorInfo;

    }


}else{

    $email_error =
        "PHPMailer not installed.";

}


// ======================================================
// SEND WHATSAPP
// ======================================================

$whatsapp_sent =
    false;

$whatsapp_error =
    "";


/*
Check credentials.
*/

if(
    $whatsapp_access_token !==
        "YOUR_WHATSAPP_ACCESS_TOKEN"

    &&

    $whatsapp_phone_number_id !==
        "YOUR_PHONE_NUMBER_ID"
){

    $whatsapp_url =

        "https://graph.facebook.com/" .

        $whatsapp_api_version .

        "/" .

        $whatsapp_phone_number_id .

        "/messages";


    /*
    WhatsApp Cloud API payload.
    */

    $payload = [

        "messaging_product" =>
            "whatsapp",

        "to" =>
            $whatsapp_number,

        "type" =>
            "text",

        "text" => [

            "preview_url" =>
                false,

            "body" =>
                $order_message

        ]

    ];


    $ch =
        curl_init(
            $whatsapp_url
        );


    curl_setopt_array(
        $ch,
        [

            CURLOPT_POST =>
                true,

            CURLOPT_RETURNTRANSFER =>
                true,

            CURLOPT_HTTPHEADER =>
                [

                    "Authorization: Bearer " .
                    $whatsapp_access_token,

                    "Content-Type: application/json"

                ],

            CURLOPT_POSTFIELDS =>
                json_encode(
                    $payload
                ),

            CURLOPT_TIMEOUT =>
                30

        ]
    );


    $response =
        curl_exec(
            $ch
        );


    $http_code =
        curl_getinfo(
            $ch,
            CURLINFO_HTTP_CODE
        );


    $curl_error =
        curl_error(
            $ch
        );


    curl_close(
        $ch
    );


    if(
        $http_code >= 200 &&
        $http_code < 300
    ){

        $whatsapp_sent =
            true;

    }else{

        $whatsapp_error =
            $curl_error !== ""
            ? $curl_error
            : $response;

    }

}else{

    $whatsapp_error =
        "WhatsApp Cloud API credentials are not configured.";

}


// ======================================================
// FINAL RESULT
// ======================================================

$success =
    $email_sent ||
    $whatsapp_sent;


if(
    !$success
){

    http_response_code(500);

}


echo json_encode(

    [

        "success" =>
            $success,

        "message" =>
            $success
            ? "Order submitted successfully."
            : "Order could not be sent.",

        "order_id" =>
            $order_id,

        /*
        Useful for debugging on your server.
        These don't expose passwords/tokens.
        */

        "email" => [

            "sent" =>
                $email_sent,

            "error" =>
                $email_sent
                ? null
                : $email_error

        ],

        "whatsapp" => [

            "sent" =>
                $whatsapp_sent,

            "error" =>
                $whatsapp_sent
                ? null
                : $whatsapp_error

        ]

    ],

    JSON_PRETTY_PRINT

);

?>