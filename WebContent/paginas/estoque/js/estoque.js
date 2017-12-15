SAPATARIA.estoque = new Object();
   padraoQT = "^\d+\d{2}$";

	$(document).ready(function() {
		SAPATARIA.estoque.entrada = function(){
			var produto = $("#produto option:selected").val();
			var medida = $("#medida option:selected").val();
			var quantidade = document.getElementById("quantidade").value;
			var quantidade1 = parseInt(quantidade);
			$('#tituloModal').html("Sucesso!");
			var protecao = true;
			var msg = "";
					if (produto == 0|| medida == 0|| quantidade == "") {
						msg += " ** Selecione e Preencha todo o formulário! <br>"
						protecao = false;
						}
					if (quantidade.match(padraoQT)) {
						msg += "** Exite letras em valor?  <br>";
						protecao = false;
					}
					if (protecao == false) {
							$('#tituloModal').html("Problemas no cadastro!");
							$('#myBody').html(msg);
							$("#myModal").modal('show');
					} else {
						var estoque = new Object();
						estoque = {};
						estoque.idCadastro = {idCadastro: $("#lista_produto").val()}; 
						
						estoque.unidadeMedida = $("#medida").val();
						estoque.quantidade = $("#quantidade").val();
						var cfg = {
							url : "../rest/EstoqueRest/save",
							data : estoque,
							success : function(msg) {
								$('#myBody').html(msg);
								$("#pe_modal").html('<button type="button" onclick="SAPATARIA.entEstoque()" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
								$("#myModal").modal('show');
							},
							error : function(err) {
								$("#msg").html("Erro ao inserir o produto no estoque");								
								$('#myBody').html(msg);
								$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
								$("#myModal").modal('show');
							}
						};
						SAPATARIA.ajax.post(cfg);
						
					}
				};
				SAPATARIA.estoque.buscaCadastros = function() {
					var nomeProduto = $("#nomeProduto").val();
					var nomeRegistro = $("#nomeRegistro").val();
					if(nomeProduto !== undefined){
						SAPATARIA.estoque.buscaProduto(undefined, nomeProduto)
					} else {
						SAPATARIA.estoque.buscaRegistro(undefined, nomeRegistro)
					};
				};
				SAPATARIA.estoque.buscaRegistro = function(listaItens, nomeRegistro) {
					var carhtml = ""
					if (listaItens != undefined && listaItens.length > 0
							&& listaItens[0].codigoRegistro != undefined) {
						carhtml = '<table class="table table-responsive table-hover tabela-consulta">';
						carhtml += '<tr><td class="col-sm-1">CÓDIGO DO REGISTRO</td> <td class="col-sm-2">NOME DO PRODUTO</td><td class="col-sm-2">COR</td><td class="col-sm-1">QUANTIDADE</td><td class="col-sm-2">UNIDADE DE MEDIDA</td> <td class="col-sm-1">SAIDA</td></tr>';
						for (var i = 0; i < listaItens.length; i++) {
							carhtml += "<tr>"
									+ "<td>"
									+ listaItens[i].codigoRegistro
									+ "</td>"
									+ "<td>"
									+ listaItens[i].idCadastro.nomeProduto
									+ "</td>"
									+ "<td style =' font-size: 18px; font-weight: 700;'>"
									+ listaItens[i].idCadastro.corProduto
									+ "</td>"
									+ "</td>"
									+ "<td id='" + i + "'" 
									+"style =' font-size: 18px; font-weight: 700;color: blue; '>"
									+ listaItens[i].quantidade
									+ "</td>"
									+ "<td>"
									+ listaItens[i].unidadeMedida
									+ "</td>"
									+ "<td><a class = 'btn btn-form1' onclick='SAPATARIA.estoque.reqModal("
									+ listaItens[i].codigoRegistro
									+ ")'><i class='fa fa-chevron-down'></i></a></td>"
						}
					} else {
						if (listaItens == undefined || (listaItens != undefined && listaItens.length > 0)) {
							if (nomeRegistro == "") {
								nomeRegistro = null;
							}
							var cfg = {
								type : "POST",
								url : "../rest/EstoqueRest/search/" + nomeRegistro,
								success : function(listaItens) {
									SAPATARIA.estoque.buscaRegistro(listaItens);
								},
								error : function(err) {
									$('#tituloModal').html("Veja esse detalhe!");
									$("#myBody").html("Erro ao obter algum item");
									$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
									$("#myModal").modal('show');
								}// FECHA O ERRO
							}
							SAPATARIA.ajax.post(cfg);
							} else {
								carhtml += '<table class="table table-responsive tabela-consulta">'
								carhtml += "<tr><td style='font-size: 18px;'>Sem Itens </td>"
											+ '</tr>'
						}
					}
					carhtml += "</table>";
					$("#listaItens").html(carhtml);
				};
				
				SAPATARIA.estoque.buscaProduto = function(listaProduto, nomeProduto) {
					var carhtml = ""
					if (listaProduto != undefined && listaProduto.length > 0
							&& listaProduto[0].idCadastro != undefined) {
						for (var i = 0; i < listaProduto.length; i++) {
							carhtml = '<table class="table table-responsive table-hover tabela-consulta">';
							carhtml += '<tr><td class="col-sm-1"><b>CÓDIGO DO REGISTRO</b></td> <td class="col-sm-2"><b>NOME DO PRODUTO</b></td><td class="col-sm-1"><b>COR</b></td><td class="col-sm-2"><b>FORNECEDOR</b></td> <td class="col-sm-1"><b>TELEFONE</b></td><td class="col-sm-1"><b>QUANTIA MINIMA</b></td><td class="col-sm-1"><b>ALTERE OS DADOS</b></td></tr>';
							carhtml += "<tr>"
									+ "<td>"
									+ listaProduto[i].idCadastro
									+ "</td>"
									+ "<td>"
									+ listaProduto[i].nomeProduto
									+ "</td>"
									+ "<td>"
									+ listaProduto[i].corProduto
									+ "</td>"
									+ "<td>"
									+ listaProduto[i].fornecedor
									+ "</td>"
									+ "<td>"
									+ listaProduto[i].telefoneFornecedor
									+ "</td>"
									+ "<td style =' font-size: 18px; font-weight: 700;color: blue; '>"
									+ listaProduto[i].quantiaMinima
									+ "</td>"
									+ "<td><a class = 'btn btn-form1' onclick='SAPATARIA.estoque.consultaPreCadastros("
									+ listaProduto[i].idCadastro
									+ ")'><i class='fa fa-pencil-square-o'></i></a></td>"
									+ "</tr>";
						}
					} else {
						if (listaProduto == undefined || (listaProduto != undefined && listaProduto.length > 0)) {
							if (nomeProduto == "") {
								nomeProduto = null;
							}
							var cfg = {
								type : "POST",
								url : "../rest/PreCadastro/search/" + nomeProduto,
								success : function(listaProduto) {
									SAPATARIA.estoque.buscaProduto(listaProduto);
								},
								error : function(err) {
									$('#tituloModal').html("Veja esse detalhe!");
									$("#myBody").html("Erro ao obter algum pré-cadastro");
									$("#myModal").modal('show');
								}// FECHA O ERRO
							}
							SAPATARIA.ajax.post(cfg);
							} else {
								carhtml += '<table class="table table-responsive tabela-consulta">'
								carhtml += "<tr><td style='font-size: 18px;'>Sem pré-cadastros </td>"
											+ '</tr>'
						}
					}
					carhtml += "</table>";
					$("#listaProduto").html(carhtml);

				};
				//ATUAL
				SAPATARIA.estoque.consumirEstoque = function(){
					var quantidade = document.getElementById("novaQuant").value;
					var padraoNumerico = /^\d+$/;
					var msg = "";
					if (!quantidade.match(padraoNumerico)) {
						msg += "Apenas quantidades numericas inteiras  <br>";
					} else {
					var estoque = new Object();
					
					estoque.codigoRegistro = cod;
					estoque.quantidade = $("#novaQuant").val();
					var cfg = {
						url : "../rest/EstoqueRest/outputInventory",
						data : estoque,
						success : function(msg) {
							$('#myBody').html(msg);
							$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
							$("#myModal").modal('show');
							$("#botaoPesquisa").click();
						},
						error : function(err) {
							$("#msg").html("Erro ao inserir o produto no estoque");								
							$('#myBody').html(msg);
							$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
							$("#myModal").modal('show');
						}
					};
					SAPATARIA.ajax.post(cfg);
					}
					$("#msg").html("Problema");								
					$('#myBody').html(msg);
					$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
					$("#myModal").modal('show');
				}	
				SAPATARIA.estoque.preCadastro = function(){
					var produto = document.getElementById("nomeProduto").value;
					var cor = document.getElementById("corProduto").value;
					var quantia = document.getElementById("quantia").value;
					var fornecedor = document.getElementById("fornecedor").value;
					var telefone = document.getElementById("telefoneFornecedor").value;
					$('#tituloModal').html("Sucesso!");
					var protecao = true;
					var msg = "";
					
					var padraoNome = /\S+[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+/g;
					var padraoTelefone = /^\(?\d{2}\)?[\s9]?\d{5}-?\d{4}$/g;
					
							if (produto == "" || cor == ""|| fornecedor == "" || telefone == "" || quantia == "") {
								msg += " ** Preencha todo o formulário! <br>"
								protecao = false;
								}
							if (!produto.match(padraoNome)) {
								msg += "** Preencha o nome do produto adequadamente  <br>";
								protecao = false;
							}
							if (!cor.match(padraoNome)) {
								msg += "** Preencha uma cor para o produto  <br>";
								protecao = false;
							}
							if (!fornecedor.match(padraoNome)) {
								msg += "** Preencha o nome do fornecedor adequadamente  <br>";
								protecao = false;
							}
							if (!telefone.match(padraoTelefone)) {
								msg += "** O campo deve ser (DD)XXXXX-XXXX Usando numeros  <br>";
								protecao = false;
							}
							if (protecao == false) {
									$('#tituloModal').html("Problemas no pré cadastro!");
									$('#myBody').html(msg);
									$("#myModal").modal('show');
							} else {
								var estoque = new Object();
								var nomeProduto = $("#nomeProduto").val();
								nomeProduto = nomeProduto + "  ";
								estoque.nomeProduto = (nomeProduto);
								estoque.corProduto = $("#corProduto").val();
								estoque.quantiaMinima = $("#quantia").val();
								estoque.fornecedor = $("#fornecedor").val();
								estoque.telefoneFornecedor = $("#telefoneFornecedor").val();
								var cfg = {
									url : "../rest/PreCadastro/save",
									data : estoque,
									success : function(msg) {
										$('#myBody').html(msg);
										$("#pe_modal").html('<button type="button" onclick="" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
										$("#myModal").modal('show');
										SAPATARIA.estoque.limpaPreCadastro();
									},
									error : function(err) {
										$("#msg").html("Erro ao inserir o produto no estoque");								
										$('#myBody').html(msg);
										$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
										$("#myModal").modal('show');
									}
								};
								SAPATARIA.ajax.post(cfg);
								
							}
						};
						var carArray = [];
						SAPATARIA.estoque.carregaSelect = function(listaProduto, pesqVazia) {
							var carhtml = '<select onchange="SAPATARIA.estoque.exibeCorr()" id="lista_produto">';
								   carhtml += '<option value="0">Escolha uma opção</option>';
								if (listaProduto != undefined && listaProduto.length > 0
										&& listaProduto[0].idCadastro != undefined) {
									for (var i = 0; i < listaProduto.length; i++) {
										carArray[listaProduto[i].idCadastro] = listaProduto[i].corProduto;
										carhtml += 
											'<option value="'
											+ listaProduto[i].idCadastro
											+ '">'
											+ listaProduto[i].nomeProduto
											+ '</option>' 
									}
								} else {
									if (listaProduto == undefined || (listaProduto != undefined && listaProduto.length > 0)) {
										if (pesqVazia == "" || pesqVazia == undefined ) {
											pesqVazia = "vazio";
										}
										var cfg = {
												type : "POST",
												url : "../rest/PreCadastro/search/"+pesqVazia,
												success : function(listaProduto) {
													SAPATARIA.estoque.carregaSelect(listaProduto);
													},
													error : function(err) {
														$("#msg").html("Erro ao pesquisar pré-cadastros, atualize a pagina");								
														$('#myBody').html(msg);
														$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
														$("#myModal").modal('show');
													}
										}
										SAPATARIA.ajax.post(cfg);
										} else {
										carhtml += '<option value="0">Sem unidades</option>'
									}
								}
								carhtml += "</select><br><br>";
								carhtml += "<div id='corBang'> Cor: ";
								carhtml +="<input id='cor' size='15'  style=' background-color: #e0e1e2; border-radius: 7px;'></input> </div>";
								$("#preCadastros").html(carhtml);
								document.getElementById("cor").readOnly = true;
							};
							SAPATARIA.estoque.exibeCorr = function() {
								var valor = $('#lista_produto').val();
								$('#cor').val(carArray[valor]);
							};
							SAPATARIA.estoque.consultaPreCadastros = function(codigoRegistro){
								$('#tituloModal').html("Veja os dados cadastrados");
								$("#myBody").load('estoque/html/modalEdicao.html');
								$("#pe_modal").html(
										'<button type="button" class="btn btn-gestor" onclick="SAPATARIA.estoque.attPreCadastros()"> Salve Alterações</button>'+
										'<button type="button" class="btn btn-default" data-dismiss="modal"> Fechar</button>');
								$("#myModal").modal('show');
								var cfg = {
										type : "POST",
										url : "../rest/PreCadastro/searchById/" + codigoRegistro,				
										success : function(preCadEstoq) {
											setTimeout(function(){
												SAPATARIA.estoque.estModal(preCadEstoq);
											}, 50);
										},
										error : function(err) {
											$('#tituloModal').html("Erro!");
											$("#myBody").html("Não foi possivel editar o cliente =/ ");
											$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
											$("#myModal").modal('show');
										}
									}; 
									SAPATARIA.ajax.post(cfg);
							}
							
							SAPATARIA.estoque.attPreCadastros = function(){
								var cod_registro = document.getElementById("novoNome").value;
								var nomeProduto = document.getElementById("novoNome").value;
								var cor = document.getElementById("novaCor").value;
								var quantia = document.getElementById("novaQuantia").value;
								var fornecedor = document.getElementById("novoFornecedor").value;
								var telefone = document.getElementById("ntelefoneFornecedor").value;
								$('#tituloModal').html("Sucesso!");
								var protecao = true;
								var msg = "";
								
								var padraoNome = /\S+[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+/g;
								var padraoTelefone = /^\(?\d{2}\)?[\s9]?\d{5}-?\d{4}$/g;
								
										if (nomeProduto == "" || cor == ""|| fornecedor == "" || telefone == "" || quantia == "") {
											msg += " ** Preencha todo o formulário! <br>"
											protecao = false;
											}
										if (!nomeProduto.match(padraoNome)) {
											msg += "** Preencha o nome do produto adequadamente  <br>";
											protecao = false;
										}
										if (!cor.match(padraoNome)) {
											msg += "** Preencha uma cor para o produto  <br>";
											protecao = false;
										}
										if (!fornecedor.match(padraoNome)) {
											msg += "** Preencha o nome do fornecedor adequadamente  <br>";
											protecao = false;
										}
										if (!telefone.match(padraoTelefone)) {
											msg += "** O campo deve ser (DD)XXXXX-XXXX Usando numeros  <br>";
											protecao = false;
										}
										if (protecao == false) {
												$('#tituloModal').html("Problemas no pré cadastro!");
												$('#myBody').html(msg);
												$("#myModal").modal('show');
										} else {
											var estoque = new Object();
											estoque.idCadastro = $("#num-ordem").text();
											var nomeProduto = $("#novoNome").val();
											nomeProduto = nomeProduto + "  ";
											estoque.nomeProduto = (nomeProduto);
											estoque.corProduto = $("#novaCor").val();
											estoque.quantiaMinima = $("#novaQuantia").val();
											estoque.fornecedor = $("#novoFornecedor").val();
											estoque.telefoneFornecedor = $("#ntelefoneFornecedor").val();
								}
								var cfg = {
										type:"POST",
										url: "../rest/PreCadastro/edit",
										data: estoque,
										success: function (msg){
												$("#myBody").html(msg);
												$("#myModal").modal('show');
												$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
												SAPATARIA.estoque.buscaCadastros();
										},
										error : function(err) {
											$('#tituloModal').html("Erro!");
											$("#myBody").html("Problemas para atualizar dados do pré-cadastro :( ");
											$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
											$("#myModal").modal('show');
										}
								}
								SAPATARIA.ajax.post(cfg);
							}
							
							
						SAPATARIA.estoque.estModal = function(preCadEstoq) {
							$("#num-ordem").html(preCadEstoq.idCadastro);
							$("#novoNome").val(preCadEstoq.nomeProduto);
							$("#novaCor").val(preCadEstoq.corProduto);
							$("#novaQuantia").val(preCadEstoq.quantiaMinima);
							$("#novoFornecedor").val(preCadEstoq.fornecedor);
							$("#ntelefoneFornecedor").val(preCadEstoq.telefoneFornecedor);
							
						}
						SAPATARIA.estoque.limpaPreCadastro = function(){
							var produto = $("#nomeProduto").val("");
							var cor = $("#corProduto").val("");
							var quantia = $("#quantia").val("");
							var fornecedor = $("#fornecedor").val("");
							var telefone = $("#telefoneFornecedor").val("");
						};
						SAPATARIA.estoque.limpaEntEstoque = function(){
							var produto = $("#novoNome").val("");
							var cor = $("#novaCor").val("");
							var quantia = $("#novaQuantia").val("");
							var fornecedor = $("#novoFornecedor").val("");
							var telefone = $("#ntelefoneFornecedor").val("");
						};
						var cod = null;
						SAPATARIA.estoque.reqModal = function(codigoRegistro){
							cod = codigoRegistro;
							$('#tituloModal').html("Requisição de item");
							$("#tamanhoModal").width(362)
							$("#myBody").load('estoque/html/modalRequisicao.html');
							$("#pe_modal").html(
									'<button type="button" class="btn btn-gestor" onclick="SAPATARIA.estoque.consumirEstoque()"> Salve Alterações</button>'+
									'<button type="button" class="btn btn-default" data-dismiss="modal"> Fechar</button>');
							$("#myModal").modal('show');
						}
						
	});

