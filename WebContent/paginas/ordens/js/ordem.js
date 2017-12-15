SAPATARIA.ordem = new Object();
		var padraoNome = /\S+[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+/g;
		var padraoCpf = /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}/g;
		var padraoTelefone = /^\(?\d{2}\)?[\s9]?\d{5}-?\d{4}$/g;
		var padraoqt = /^[\d]+$/g;
		var padraoValor = /^\d+,\d{2}$/g;
		var padraoDesc = /^\S+[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/g;
		var padraoData = /[\d]{2}[/][\d]{2}[/][\d]{4}/g;

$(document).ready(function() {

		SAPATARIA.ordem.cadastro = function(){
			var cpfCliente = document.getElementById("cpf_cliente").value;
			var nomeCliente = document.getElementById("nome_cliente").value;
			var telefone = document.getElementById("telefone_cliente").value;
			var quantidade = document.getElementById("quantidade").value;
			var produto = document.getElementById("produto").value;
			var valor = document.getElementById("valor").value;
			var desc = document.getElementById("descricao").value;
			var dataEntrega = document.getElementById("data_entrega").value;
			var selecionado = $("#status option:selected").val();

			$('#tituloModal').html("Sucesso!");
			
			var protecao = true;
			
			//validações
			var msg = "";
					if (cpfCliente == ""
							|| nomeCliente == ""
							|| telefone == ""
							|| quantidade == ""
							|| produto == ""
							|| valor == ""
							|| desc == ""
							|| dataEntrega == ""
							|| selecionado == "") {
						msg += " ** Todos os campos são de preenchimento obrigatório! <br>"
						protecao = false;
						
						}
					if (!nomeCliente.match(padraoNome)) {
						msg += "** O campo nome deve conter apenas letras! <br>";
						protecao = false;
					}
					if (!cpfCliente.match(padraoCpf)) {
						msg += "** O campo cpf deve ser um CPF! <br>";
						protecao = false;
					}
					if (!telefone.match(padraoTelefone)) {
						msg += "** O campo telefone deve ter o formato (XX) XXXXX-XXXX Usando apenas numeros! <br>";
						protecao = false;
					}
					if (!quantidade.match(padraoqt)) {
						msg += "** O campo quantidade aceita apenas numeros! <br>";
						protecao = false;
					}
					if (!valor.match(padraoValor)) {
						msg += ("** O campo valor aceita apenas numeros <br>");
						protecao = false;
					}
					if (!desc.match(padraoDesc)) {
						msg += ("** Preencha uma descição <br>");
						protecao = false;
					}
					if (!dataEntrega.match(padraoData)) {
						msg += "** O campo deve ser uma data do tipo DD/MM/AAAA <br>";
						protecao = false;
					}
					if (selecionado == 0) {
						msg += "** Selecione um status para esta ordem de serviço <br>";
						protecao = false;
					}
					
					
					if (protecao == false) {
							$('#tituloModal').html("Problemas no cadastro!");
							$('#myBody').html(msg);
							$("#myModal").modal('show');
					} else {
						var ordem = new Object();
						ordem.cpfCliente = $("#cpf_cliente").val();
						ordem.nomeCliente = $("#nome_cliente").val();
						ordem.telefoneCliente = $("#telefone_cliente").val();
						ordem.quantidade = $("#quantidade").val();
						ordem.produto = $("#produto").val();
						ordem.valor = $("#valor").val();
						ordem.descricao = $("#descricao").val();
						ordem.statusOrdem = $("#status").val();
						
						ordem.dataEntrega = $("#data_entrega").val();						  
						dd = dataEntrega.substring(0, 2); 
						mm = dataEntrega.substring(3, 5); 
						yyy = dataEntrega.substring(6, 10);
						dataEntrega = yyy + "-" + mm + "-" + dd ; 
						ordem.dataEntrega = moment(dataEntrega).format('YYYY-MM-DDT12:00:00');
						
						var cfg = {

							url : "../rest/OrdemRest/save",
							data : ordem,
							success : function(msg) {
								$('#myBody').html(msg);
								$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
								$("#myModal").modal('show');
								SAPATARIA.cadOrdemServico();
								
								
							},
							error : function(err) {
								$("#msg").html("Erro ao abrir a ordem de serviço ");								
								$('#myBody').html(msg);
								$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
								$("#myModal").modal('show');
							}
						};
						SAPATARIA.ajax.post(cfg);
						SAPATARIA.ordem.limpar();
					}
				};
				
				SAPATARIA.ordem.limpar = function(){
					var cpfCliente = $("#cpf_cliente").val("");
					var nomeCliente = $("#nome_cliente").val("");
					var telefone = $("#telefone_cliente").val("");
					var quantidade = $("#quantidade").val("");
					var produto = $("#produto").val("");
					var valor = $("#valor").val("");
					var desc = $("#descricao").val("");
					var data_entrega = $("#dataEntrega").val("");
					var selecionado = $("#status option:selected").val("");
				}
				SAPATARIA.ordem.buscaCPF = function() {
					var cpfDigitado = document.getElementById("cpf_cliente").value;
					
					if (!cpfDigitado.match(padraoCpf) || cpfDigitado =="") {
						$('#tituloModal').html("Erro!");
						$("#myBody").html("Digite um cpf valido");
						$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
						$("#myModal").modal('show');

					}
					var cpf = new Object();
					cpf = $("#cpf_cliente").val();
					var busca = {
							url : "../rest/ClienteRest/searchByCpf/" + cpf,
							data : cpf,
							success : function(clients) {
								$("#nome_cliente").val(clients[0].nomeCliente);
								$("#telefone_cliente").val(clients[0].telefone);
							},
							error : function(err) {
								$('#tituloModal').html("Erro!");
								$("#myBody").html("Problemas para buscar o cliente");
								$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
								$("#myModal").modal('show');

							}
						};
						SAPATARIA.ajax.post(busca);
					
				}
				SAPATARIA.ordem.busca = function() {
					var numero = $("#numero_ordem").val();
					SAPATARIA.ordem.procurar(undefined, numero);
				};

				SAPATARIA.ordem.procurar = function(listaOrdens, numero) {
					var carhtml = ""
					
					if (listaOrdens != undefined && listaOrdens.length > 0
							&& listaOrdens[0].numeroOrdem != undefined) {
						for (var i = 0; i < listaOrdens.length; i++) {
							carhtml = '<table class="table table-responsive table-hover tabela-consulta">';
							carhtml += '<tr class="negrito"><td>NÚMERO DA ORDEM</td> <td>STATUS DA ORDEM</td> <td class="col-sm-1">DETALHES DA ORDEM</td></tr>';
							carhtml += "<tr>"
									+ "<td>"
									+ listaOrdens[i].numeroOrdem
									+ "</td>"
									+ "<td>"
									+ listaOrdens[i].statusOrdem
									+ "</td>"
									+ "<td><a class = 'btn btn-form1' onclick='SAPATARIA.ordem.detalhesOrdem("
									+ listaOrdens[i].numeroOrdem
									+ ")'><i class='fa fa-pencil-square-o'></i></a></td>"
									+ "</tr>"
						}
					} else {
						if (listaOrdens == undefined
								|| (listaOrdens != undefined && listaOrdens.length > 0)) {
							if (numero == "") {
								numero = null;
							}
							var cfg = {
								type : "POST",
								url : "../rest/OrdemRest/searchOS/" + numero,
								success : function(listaOrdens) {
									SAPATARIA.ordem.procurar(listaOrdens);

								},
								error : function(err) {
									$('#tituloModal').html("Veja esse detalhe!");
									$("#myBody").html("Erro ao pesquisar por uma ordem");
									$("#myModal").modal('show');
								}// FECHA O ERRO
							}
							SAPATARIA.ajax.post(cfg);
						} else {
							carhtml += '<table class="table table-responsive tabela-consulta">'
							carhtml += "<tr><td style='font-size: 18px;'>Sem ordens de serviço </td>"
										+ '</tr>'
						}
					}
					carhtml += "</table>";
					$("#listaOrdens").html(carhtml);

				};
				SAPATARIA.ordem.detalhesOrdem = function(numero) {
					var cfg = {
							type : "POST",
							url : "../rest/OrdemRest/searchOS/" + numero,	
							success : function(listaOrdens) {
								$('#tituloModal').html("Veja os detalhes da ordem");
								$("#myBody").load('ordens/html/modalDetalhes.html');
								$("#pe_modal").html(
									'<button type="button" class="btn btn-gestor" onclick="SAPATARIA.ordem.atualizaOrdem()"> Salve Alterações</button>'+
									'<button type="button" class="btn btn-default" data-dismiss="modal"> Fechar</button>');
								$("#myModal").modal('show');
								setTimeout(function(){
								 SAPATARIA.ordem.ordemModal(listaOrdens);
								}, 50);
							},
							error : function(err) {
								$('#tituloModal').html("Erro!");
								$("#myBody").html("Erro ao editar a ordem de serviço");
								$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
								$("#myModal").modal('show');
							}
						}; 
						SAPATARIA.ajax.post(cfg);
					}
				SAPATARIA.ordem.ordemModal = function(listaOrdens) {
					$("#numeroOrdem").val(listaOrdens[0].numeroOrdem);
					$("#nome").val(listaOrdens[0].nomeCliente);
					$("#cpf").val(listaOrdens[0].cpfCliente);
					$("#telefone").val(listaOrdens[0].telefoneCliente);
					$("#quantidade").val(listaOrdens[0].quantidade);
					$("#produto").val(listaOrdens[0].produto);
					$("#valor").val(listaOrdens[0].valor);
					$("#descricao").val(listaOrdens[0].descricao);
					$("#status").val(listaOrdens[0].statusOrdem);
					//formatar e tratar a data
					 data_us = (listaOrdens[0].dataEntrega);
					 ano = data_us.substring(0, 4); 
					 mes = data_us.substring(5, 7);
					 dia = data_us.substring(8, 10);
					 dataEntrega = dia + "/" + mes + "/" + ano ;
					$("#data_entrega").val(dataEntrega);
				}
				SAPATARIA.ordem.atualizaOrdem = function(){

					var numeroOrdem = $("#numero_ordem").val();
					var telefone = document.getElementById("telefone").value;
					var quantidade = document.getElementById("quantidade").value;
					var produto = document.getElementById("produto").value;
					var valor = document.getElementById("valor").value;
					var desc = document.getElementById("descricao").value;
					var dataEntrega = document.getElementById("data_entrega").value;
					var selecionado = $("#status_op option:selected").val();
					$('#tituloModal').html("Sucesso!");
					var protecao = true;
					//validações
					var msg = "";
							if (telefone == ""
									|| quantidade == ""
									|| produto == ""
									|| valor == ""
									|| desc == ""
									|| dataEntrega == ""
									|| selecionado == "") {
								msg += " ** Todos os campos são de preenchimento obrigatório! <br>"
								protecao = false;
								
								}
							if (!telefone.match(padraoTelefone)) {
								msg += "** O campo telefone deve ter o formato (XX) XXXXX-XXXX Usando apenas numeros! <br>";
								protecao = false;
							}
							if (!quantidade.match(padraoqt)) {
								msg += "** O campo quantidade aceita apenas numeros! <br>";
								protecao = false;
							}
							if (!valor.match(padraoValor)) {
								msg += ("** O campo valor aceita apenas numeros <br>");
								protecao = false;
							}
							if (!desc.match(padraoDesc)) {
								msg += ("** Preencha uma descição <br>");
								protecao = false;
							}
							if (!dataEntrega.match(padraoData)) {
								msg += "** O campo deve ser uma data do tipo DD/MM/AAAA <br>";
								protecao = false;
							}
							if (selecionado == 0) {
								msg += "** Selecione um status para esta ordem de serviço <br>";
								protecao = false;
							}
							if (protecao == false) {
									$('#tituloModal').html("Problemas na atualização!");
									$('#myBody').html(msg);
									$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" onclick="SAPATARIA.ordem.busca()" data-dismiss="modal"> Fechar</button>');
									$("#myModal").modal('show');
							} else {
								var ordem = new Object();
								ordem.numeroOrdem = $("#numero_ordem").val();
								ordem.nomeCliente = $("#nome").val();
								ordem.cpfCliente = $("#nome").val();
								ordem.telefoneCliente = $("#telefone").val();
								ordem.quantidade = $("#quantidade").val();
								ordem.produto = $("#produto").val();
								ordem.valor = $("#valor").val();
								ordem.descricao = $("#descricao").val();
								ordem.statusOrdem = $("#status_op").val();
								ordem.dataEntrega = $("#data_entrega").val();
								
								dd = dataEntrega.substring(0, 2); 
								mm = dataEntrega.substring(3, 5); 
								yyy = dataEntrega.substring(6, 10);  
								dataEntrega = yyy + "-" + mm + "-" + dd ; 
								ordem.dataEntrega = moment(dataEntrega).format('YYYY-MM-DDT12:00:00');
								var cfg = {

									url : "../rest/OrdemRest/edit",
									data : ordem,
									success : function(msg) {
										$('#myBody').html(msg);
										$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
										$("#myModal").modal('show');
										$("#botaoPesquisa").click();
									},
									error : function(err) {
										$("#msg").html("Erro ao atualizar a ordem de serviço ");								
										$('#myBody').html(msg);
										$("#pe_modal").html(
												'<button type="button" class="btn btn-gestor" onclick="SAPATARIA.ordem.atualizaOrdem()"> Salve Alterações</button>');
										$("#myModal").modal('show');
									}
								};
								SAPATARIA.ajax.post(cfg);
							}
					
					
					
				}
});

