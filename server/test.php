<?php 

$uploadPath = 'upload/a.zip';

if (!$out = @fopen($uploadPath, "wb")) {
    die('{"jsonrpc" : "2.0", "error" : {"code": 102, "message": "Failed to open output stream."}, "id" : "id"}');
}

$in = 'upload/test.zip';
$file = @fopen($in, "rb");

// $h = fread($file, 4096);

while ($buff = fread($file, 4096)) {
    fwrite($out, $buff);
}
