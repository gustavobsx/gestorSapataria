SAPATARIA = new Object();

$(document).ready(function() {
					SAPATARIA.home = function() {
						$("#paginas").load('pagInicial/pagina-inicial.html');
						var data = new Date();
						var dia = data.getDate();
						var mes = (data.getMonth() + 1);
						var ano = data.getFullYear();
						data = (ano+"-"+mes+"-"+dia);
						setTimeout(function(){
							SAPATARIA.ordensDia(undefined, data);
						}, 10);
					}
					SAPATARIA.ordensDia = function(listaOrdens, data) {
						var carhtml = '<div class="col-sm-3"> </div>'
							carhtml += '<div class="col-sm-6" id="ordensDia">'
							carhtml += '<div class="" id="logoSapataria"></div>'
							
						if (listaOrdens != undefined && listaOrdens.length > 0
								&& listaOrdens[0].numeroOrdem != undefined) {
							carhtml += '<div id="tabelaOrdensDia" class="div-consulta"><b>ORDENS DO DIA:</b></div>';
							carhtml += '<table class="table table-responsive tabela-consulta col-sm-6">';
							carhtml += '<tr class="negrito"><td>NÚMERO DA ORDEM</td> <td>STATUS DA ORDEM</td> <td class="col-sm-1">DETALHES</td></tr>';
							for (var i = 0; i < listaOrdens.length; i++) {
									
									carhtml += "<tr>"
									+ "<td>"
									+ listaOrdens[i].numeroOrdem
									+ "</td>"
									+ "<td>"
									+ listaOrdens[i].statusOrdem
									+ "</td>"
									+ "<td><a class = 'btn btn-form1' onclick='SAPATARIA.redDetalhes("
									+ listaOrdens[i].numeroOrdem
									+ ")'><i class='fa fa-info'></i></a></td>"
									+ "</tr>";
							}
						} else {
							if (listaOrdens == undefined || (listaOrdens != undefined && listaOrdens.length > 0)) {
								if (data == "") {
									data = null;
								}
								var cfg = {
									type : "POST",
									url : "../rest/OrdemRest/dailyOrders/" + data,
									success : function(listaOrdens) {
										SAPATARIA.ordensDia(listaOrdens);
									},
									error : function(err) {
										$('#tituloModal').html("Problemas!");
										$("#myBody").html("Erro as ordens do dia");
										$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
										$("#myModal").modal('show');
									}// FECHA O ERRO
								}
								SAPATARIA.ajax.post(cfg);
								} else {
									carhtml += '<div id="tabelaOrdensDia" class="div-consulta" '
										 	+ 'style="margin-top: 7%;margin-left: 18%;"> <b>Nada para ser entregue hoje </b></div>';
							}
						}
						carhtml += "</table></div>";
						$("#paginas").html(carhtml);
						$("#logo").html('<img id="logoSapataria" src="imagens/logo.png" width="433" height="70"/>');
						
					};
					
					SAPATARIA.redDetalhes= function(numeroOs) {
						SAPATARIA.buscaOrdens();
						setTimeout(function(){
							$("#numero_ordem").val(numeroOs);
							$("#botaoPesquisa").click();
						}, 10);
					}
					
					
					//menu Cadastros
					
					SAPATARIA.cadFuncionarios= function() {
						$("#paginas").load('funcionario/html/cad-funcionario.html');
					}
					SAPATARIA.cadClientes= function() {
						$("#paginas").load('clientes/html/cad-clientes.html');
					}
					
					//menu Transações
					
					SAPATARIA.cadOrdemServico= function() {
						$("#paginas").load('ordens/html/cad-ordem-servico.html');
						var cfg = {
								url : "../rest/OrdemRest/searchCurrentOrder",
								success : function(ordens){
									var ordemAntiga = parseInt(ordens);
									var ordemNova;
									if(isNaN(ordemAntiga)){
										ordemNova = 1;
									} else {
										ordemNova = ordemAntiga + 1; 	
									}
									$("#num-ordem").html(ordemNova);
								},
								error : function(err) {
									$("#tituloModal").html("Erro");								
									$('#myBody').html("Problemas ao obter o numero da ordem atual");
									$("#myModal").modal('show');
								}
							};
							SAPATARIA.ajax.post(cfg);
					}
					SAPATARIA.preCadastro= function() {
						$("#paginas").load('../paginas/estoque/html/pre-cadastro.html');
					}
					SAPATARIA.entEstoque= function() {
						$("#paginas").load('estoque/html/entrada-estoque.html');
						setTimeout(function(){
							SAPATARIA.estoque.carregaSelect(undefined, "");
						}, 10);
					};
					
					// menu Resultados
					SAPATARIA.buscaClientes= function() {
						$("#paginas").load('clientes/html/consulta-clientes.html');
					}
					
					SAPATARIA.buscaEstoque= function() {
						$("#paginas").load('estoque/html/consulta-estoque.html');
						//
					}
					SAPATARIA.Fornecedores= function() {
						$("#paginas").load('estoque/html/fornecedores.html');
						//
					}
					SAPATARIA.buscaOrdens= function() {
						$("#paginas").load('ordens/html/busca-ordem-servico.html');
					}
					SAPATARIA.logout = function(){
			                $.get("/LoginServlet")
					};
					SAPATARIA.limpar = function() {
						$("#paginas").load('pagInicial/pagina-inicial.html');
					};
					SAPATARIA.exibePerfil= function() {
						$("#paginas").load('funcionario/html/perfil.html');
						setTimeout(function(){
							SAPATARIA.sessao();
						}, 2);
						
					};
					
					SAPATARIA.sessao = function(){
						var atual = document.cookie;
						var cfg = {
							type : "POST",
							url : "../rest/FuncionarioRest/getSessionData/" + atual,
							success : function(funcionarios) {
								var cpf = funcionarios[0].cpf;
								cpf = cpf.toString();
								if (cpf.length != 11){
									cpf = 0 + cpf;
								}
								$("#cpfFunc").val(cpf);
								$("#nomeFunc").val(funcionarios[0].funcionario);
								$("#rgFunc").val(funcionarios[0].rg);
								$("#telefoneFunc").val(funcionarios[0].telefone);
								$("#loginFunc").val(atual);
								SAPATARIA.funcionario.segCookie(funcionarios);

								},
								error : function(err) {
									$('#tituloModal').html("Erro!");
									$("#myBody").html("Não foi possivel editar o cliente =/ ");
									$("#myModal").modal('show');
								}
							};
							SAPATARIA.ajax.post(cfg);
						
					}
					
				
});