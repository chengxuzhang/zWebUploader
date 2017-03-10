<?php 

$uploadPath = 'upload/a.apk';

if (!$out = @fopen($uploadPath, "wb")) {
    die('{"jsonrpc" : "2.0", "error" : {"code": 102, "message": "Failed to open output stream."}, "id" : "id"}');
}

$in = 'upload/8f12dc389410060c7d48ab47d955b110.apk';
$file = @fopen($in, "rb");

// $h = fread($file, 4096);

while ($buff = fread($file, 4096)) {
	echo ftell($file) . '=>';
    fwrite($out, $buff);
}
