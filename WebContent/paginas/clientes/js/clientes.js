SAPATARIA.cliente = new Object();

$(document)
		.ready(
				function() {
					SAPATARIA.cliente.cadastro = function() {
						var nome = document.getElementById("nomeCliente").value;
						var cpf = document.getElementById("cpfCliente").value;
						var telefone = document.getElementById("telCliente").value;
						var cep = document.getElementById("cepCliente").value;
						var endereco = document.getElementById("enderecoCliente").value;
						var numero = document.getElementById("numeroCliente").value;
						var padraoNome = /\S+[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+/g;
						var padraoCpf = /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}/g;
						var padraoCep = /\d{2}\.?\d{3}\-?\d{3}/g;
						var padraoTelefone = /^\(?\d{2}\)?[\s9]?\d{5}-?\d{4}$/g;
						$('#tituloModal').html("Sucesso!");

						var protecao = true;

						// validações
						var msg = "";
						if (nome == "" || cpf == "" || telefone == ""
								|| cep == "" || endereco == "" || numero == "") {
							msg += " ** Todos os campos são de preenchimento obrigatório! <br>"
							protecao = false;

						}
						if (!nome.match(padraoNome)) {
							msg += "** O campo nome deve conter apenas letras! <br>";
							protecao = false;
						}
						if (!telefone.match(padraoTelefone)) {
							msg += "** O campo telefone deve ter o formato (XX) XXXXX-XXXX Usando apenas numeros! <br>";
							protecao = false;
						}
						if (!cpf.match(padraoCpf)) {
							msg += "** O campo deve ser um CPF! <br>";
							protecao = false;
						}
						if (!cep.match(padraoCep)) {
							msg += ("** O campo deve ser um CEP! <br>");
							protecao = false;
						}
						if (protecao == false) {
							$('#tituloModal').html("Veja esses detalhes!");
							$('#myBody').html(msg);
							$("#myModal").modal('show');
						} else {
							var novoCliente = new Object();
							novoCliente.id = $("#idCliente").val();
							novoCliente.nomeCliente = $("#nomeCliente").val();
							novoCliente.cpf = $("#cpfCliente").val();
							novoCliente.telefone = $("#telCliente").val();
							novoCliente.cep = $("#cepCliente").val();
							novoCliente.endereco = $("#enderecoCliente").val();
							novoCliente.numero = $("#numeroCliente").val();

							var cfg = {

								url : "../rest/ClienteRest/save",
								data : novoCliente,
								success : function(msg) {
									$('#myBody').html(msg);
									$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
									$("#myModal").modal('show');
								},
								error : function(err) {
									$('#tituloModal')
											.html("Veja esse detalhe!");
									$("#myBody").html("Erro ao cadastrar o cliente ");
									$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
									$("#myModal").modal('show');

								}
							};
							SAPATARIA.ajax.post(cfg);
							SAPATARIA.cliente.limpar();
						}
					};

					SAPATARIA.cliente.busca = function() {
						var nomeCliente = $("#nomeCliente").val();
						var cpfCliente = $("#cpfCliente").val();
						
						
						if(cpfCliente !== ""){
							SAPATARIA.cliente.procurarCpf(undefined, cpfCliente);
						} else if (cpfCliente == "" || nomeCliente !== "") {
							SAPATARIA.cliente.procurar(undefined, nomeCliente);
						};
					};
					SAPATARIA.cliente.procurarCpf = function(lClientes, valorBusca) {
						var cfg = {
								type : "POST",
								url : "../rest/ClienteRest/buscarClientes/"
										+ valorBusca,
								success : function(lClientes) {
									SAPATARIA.cliente.procurar(lClientes);
									var nome = $("#nomeCliente").val("");
									var cpf = $("#cpfCliente").val("");

								},
								error : function(err) {
									$('#tituloModal').html(
											"Veja esse detalhe!");
									$("#myBody").html("Erro ao pesquisar por clientes");
									$("#myModal").modal('show');
								}// FECHA O ERRO
							}
							SAPATARIA.ajax.post(cfg);
						
					}
					
					SAPATARIA.cliente.procurar = function(lClientes, valorBusca) {
						var carhtml = ""
						if (lClientes != undefined && lClientes.length > 0
								&& lClientes[0].idCliente != undefined) {
							carhtml = ('<table class="table table-responsive table-hover tabela-consulta">');
							carhtml += '<tr class="negrito"><td>NOME</td> <td>CPF</td> <td>TELEFONE</td> <td class="col-sm-1">ALTERAR</td> <td class="col-sm-1">EXCLUIR</td></tr>';
							for (var i = 0; i < lClientes.length; i++) {
								
								var cpf = lClientes[i].cpf;
								cpf = cpf.toString();
								if (cpf.length != 11){
									cpf = 0 + cpf;
								}
								
								carhtml += "<tr>"
										+ "<td>"
										+ lClientes[i].nomeCliente
										+ "</td>"
										+ "<td>"
										+ cpf
										+ "</td>"
										+ "<td>"
										+ lClientes[i].telefone
										+ "</td>"
										+ "<td><a class = 'btn btn-form1' onclick='SAPATARIA.cliente.editaCliente("
										+ lClientes[i].idCliente
										+ ")'><i class='fa fa-pencil-square-o'></i></a></td>"
										+ "<td><a class = 'btn btn-form1' onclick='SAPATARIA.cliente.deletaCliente("
										+ lClientes[i].idCliente
										+ ")'><i class='fa fa-trash-o'></i></a></td>"
										+ "</tr>"
							}
						} else {
							if (lClientes == undefined
									|| (lClientes != undefined && lClientes.length > 0)) {
								if (valorBusca == "") {
									valorBusca = null;
								}
								var cfg = {
									type : "POST",
									url : "../rest/ClienteRest/search/"
											+ valorBusca,
									success : function(lClientes) {
										SAPATARIA.cliente.procurar(lClientes);
										var nome = $("#nomeCliente").val("");
										var cpf = $("#cpfCliente").val("");

									},
									error : function(err) {
										$('#tituloModal').html(
												"Veja esse detalhe!");
										$("#myBody").html("Erro ao pesquisar por clientes");
										$("#myModal").modal('show');
									}// FECHA O ERRO
								}
								SAPATARIA.ajax.post(cfg);
							} else {
								carhtml += '<table class="table table-responsive tabela-consulta">'
								carhtml += "<tr><td style='font-size: 18px;'>Cadastre Clientes </td>"
										+ '</tr>'
							}
						}
						carhtml += "</table>";
						$("#listaClientes").html(carhtml);

					};
					SAPATARIA.cliente.deletaCliente = function(id) {
						var cfg = {
							type : "POST",
							url : "../rest/ClienteRest/delete/" + id,
							success : function(msg) {
								$('#tituloModal').html("Sucesso");
								$('#myBody').html(msg);
								$("#myModal").modal('show');
								// ATIALIZA A TABELA DE CONTATOS
								SAPATARIA.cliente.busca();
							},
							error : function(err) {
								$('#tituloModal').html("Veja esse detalhe!");
								$("#myBody").html(
										"Erro ao deletar um cliente =/ ");
								$("#myModal").modal('show');
							}// FECHA O ERRO
						};
						SAPATARIA.ajax.post(cfg);
					};

					SAPATARIA.cliente.editaCliente = function(id) { 
						var cfg = {
							type : "POST",
							url : "../rest/ClienteRest/searchById/" + id,				
							success : function(cliente) {
								$('#tituloModal').html("Edição do cliente");
								$("#myBody").load('clientes/html/modalEdicao.html');
								$("#pe_modal").html(
									'<button type="button" class="btn btn-gestor" onclick="SAPATARIA.cliente.editar()"> Salve Alterações</button>'+
									'<button type="button" class="btn btn-default" data-dismiss="modal"> Fechar</button>');
								$("#myModal").modal('show');

								setTimeout(function(){
									SAPATARIA.cliente.eModal(cliente);
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
					SAPATARIA.cliente.eModal = function(cliente) {
						var cpf = cliente.cpf;
						cpf = cpf.toString();
						if (cpf.length != 11){
							cpf = 0 + cpf;
						}
						var cep = cliente.cep;
						cep = cep.toString();
						if (cep.length != 8){
							cep = 0 + cep;
						}
						$("#nome").val(cliente.nomeCliente);
						$("#cpf").val(cpf);
						$("#telefone").val(cliente.telefone);
						$("#cep").val(cep);
						$("#idC").val(cliente.idCliente);
						$("#endereco").val(cliente.endereco);
						$("#numero").val(cliente.numero);
					}
					
					SAPATARIA.cliente.editar = function(){
						var nome = document.getElementById("nome").value;
						var cpf = document.getElementById("cpf").value;
						var telefone = document.getElementById("telefone").value;
						var cep = document.getElementById("cep").value;
						var endereco = document.getElementById("endereco").value;
						var numero = document.getElementById("numero").value;
						

						var padraoNome = /\S+[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+/g;
						var padraoCpf = /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}/g;
						var padraoCep = /\d{2}\.?\d{3}\-?\d{3}/g;
						var padraoTelefone = /^\(?\d{2}\)?[\s9]?\d{5}-?\d{4}$/g;
						$('#tituloModal').html("Sucesso!");

						var protecao = true;

						// validações
						var msg = "";
						if (nome == "" || cpf == "" || telefone == ""
								|| cep == "" || endereco == "" || numero == "") {
							msg += " ** Todos os campos são de preenchimento obrigatório! <br>"
							protecao = false;

						}
						if (!nome.match(padraoNome)) {
							msg += "** O campo nome deve conter apenas letras! <br>";
							protecao = false;
						}
						if (!telefone.match(padraoTelefone)) {
							msg += "** O campo telefone deve ter o formato (XX) XXXXX-XXXX Usando apenas numeros! <br>";
							protecao = false;
						}
						if (!cpf.match(padraoCpf)) {
							msg += "** O campo deve ser um CPF! <br>";
							protecao = false;
						}
						if (!cep.match(padraoCep)) {
							msg += ("** O campo deve ser um CEP! <br>");
							protecao = false;
						}
						if (protecao == false) {
							$('#tituloModal').html("Erro!");
							$('#myBody').html(msg);
							$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
							$("#myModal").modal('show');
						} else {
						var cliente = new Object();
						cliente.idCliente = $("#idC").val();
						cliente.nomeCliente = $("#nome").val();
						cliente.cpf = $("#cpf").val();
						cliente.telefone = $("#telefone").val();
						cliente.cep = $("#cep").val();
						cliente.endereco = $("#endereco").val();
						cliente.numero = $("#numero").val();
						}
						var cfg = {
								type:"POST",
								url: "../rest/ClienteRest/edit",
								data: cliente,
								success: function (msg){
										$("#myBody").html(msg);
										$("#myModal").modal('show');
										$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
										SAPATARIA.cliente.busca();
								},
								error : function(err) {
									$('#tituloModal').html("Erro!");
									$("#myBody").html("Problemas para atualizar dados do cliente :( ");
									$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
									$("#myModal").modal('show');
								}
						}
						SAPATARIA.ajax.post(cfg);
					}
					
					
					
					SAPATARIA.cliente.limpar = function() {
						var cliente = $("#nomeCliente").val("");
						var cpf = $("#cpfCliente").val("");
						var telefone = $("#telCliente").val("");
						var cep = $("#cepCliente").val("");
						var endereco = $("#enderecoCliente").val("");
						var numero = $("#numeroCliente").val("");

					};

				});
