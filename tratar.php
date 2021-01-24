<?php

if(!isset($_POST['grupo'])) die('<h2>Dados necessários</h2><a href="#" onclick="window.history.back()">Voltar</a>');

$table = "";

foreach($_POST['grupo'] as $grupos){ 
	$table .= "<table class=\"mb-3\">";
	foreach($grupos as $items){
		//print_r($items);
		if(is_string($items)){
			$table .= "<thead>
			<tr>
			<th>" . $items . "</th>
							<th>Pontuação</th>
							<th>Máximo</th>
							<th>Quantidade</th>
							<th>Total</th>
							</tr>
						</thead>";
						$table .= "<tbody>";
		}elseif(is_array($items)){
			$table .= "<tr>";
			foreach($items as $k => $item){
				$texto = (in_array($k, ['peso', 'totalItem']) ? number_format($item,1,',','.') : $item);
				$table .= "<td>" . $texto . "</td>"; 
			}
			$table .= "</tr>";
		}
	}
	$table .= "</tbody>";
	$table .= "</table>";
}

$head = "<head>
<meta charset=\"UTF-8\">
<title>Unilab - Resiência</title>
<link href=\"./style.css\" rel=\"stylesheet\" type=\"text/css\" />
<link href=\"./style-pdf.css\" rel=\"stylesheet\" type=\"text/css\" />
</head>";

$header = "<header class=\"d-flex-row justify-content-between p-2 bd-highlight text-center\">
		<table style=\"border: none;\">
			<tr>
				<td style=\"height:100px\"><img src=\"./images/logo-unilab.jpg\" style=\"float: left;\" width=\"150\" /></td>
				<td style=\"text-align: center\">
					<h1>Residência Agrária</h1>
					<h4>Ficha de qualificação</h4>
				</td>
			</tr>
		</table>
	</header>
	<div class=\"clear\"></div>
";
$footer = "<div id=\"rodape\">	
	<p>Campus Liberdade, Avenida da Abolição, 3 – Centro | CEP: 62.790-000 | 
	Redenção - Ceará - Brasil</p>
</div>";

$body = "<body>" . 
$header
."<div id=\"topo\" class=\"container\">
	<div class=\"nome\">
		Nome: <b>" . $_POST['nome'] . "</b>
	</div>
	<div class=\"nota\">
		Pontos: <b>" . $_POST['total'] . "</b>
	</div>
</div>" . 
$table
. "<div class=\"container assinatura\"><p class=\"text-end\">" . get_data_hoje(). "</p>	
<p class=\"small\">Obs.: Enviar esse documento em anexo na submissão da inscrição.</p>	
</div></div></body>
</html>";


$pdf = $head . $body;
$nomeSlug = slug($_POST['nome']);

 $pdf;

require_once __DIR__ . '/vendor/autoload.php';

$mpdf = new \Mpdf\Mpdf(['tempDir' => __DIR__ . '/tmp']);

$filename = "Ficha-de-qualificacao-do-candidato-". $nomeSlug . ".pdf";
$mpdf->SetTitle("Unilab - Ficha de Qualificação do Candidato");
$mpdf->setAutoTopMargin = 'stretch';
$mpdf->setAutoBottomMargin = 'stretch';
$mpdf->SetHTMLFooter($footer);
$mpdf->WriteHTML($pdf);
$mpdf->Output($filename,'D');
exit();
function get_data_hoje($cidade = null, $data = null)
{
	if($data != null){
		$d = explode("-", $data);
		$dia = $d[2];
		$mes = get_mes($d[1]);
		$ano = $d[0];
	} else {
		$dia = date('d');
		$mes = get_mes(date('n'));
		$ano = date('Y');
	}
	if($cidade == null) $cidade = "Redenção-CE";
	return $cidade . ", " . $dia . " de " . $mes . " de " . $ano;
}

function get_mes($m, $a = null)
{
	if($m < 1 AND $a != null){
		$m = $m + 12;
		$a--;
	}
	switch ($m) {
		case 1: $mes = "Janeiro"; break;
		case 2: $mes = "Fevereiro"; break;
		case 3: $mes = "Março"; break;
		case 4: $mes = "Abril"; break;
		case 5: $mes = "Maio"; break;
		case 6: $mes = "Junho"; break;
		case 7: $mes = "Julho"; break;
		case 8: $mes = "Agosto"; break;
		case 9: $mes = "Setembro"; break;
		case 10: $mes = "Outubro"; break;
		case 11: $mes = "Novembro"; break;
		case 12: $mes = "Dezembro"; break;
		default: $mes = "";
	}
	if($a==null)
		return $mes;
	else
		return $mes . "/" . $a;
}
 
function slug($text)
{
    $text = preg_replace('~[^\pL\d.]+~u', '-', $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w.]+~', '', $text);
    $text = trim($text, '-');
    $text = preg_replace('~-+~', '-', $text);
    $text = strtolower($text);
    if (empty($text)) return 'n-a';
    return $text;
}
 ?>