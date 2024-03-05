<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain");

if (isset($_GET["url"])) {
    $url = urldecode($_GET["url"]);

    $options = [
        "http" => [
            "header" => "Content-Type: text/plain",
            "method" => "GET"
        ]
    ];

    $context = stream_context_create($options);
    $content = file_get_contents($url, false, $context);

    if ($content === false) {
        http_response_code(400);
        echo "Error fetching URL";
    } else {
        echo $content;
    }

} else {
    http_response_code(400);
    echo "Missing 'url' parameter";
}

?>
