SAPATARIA.funcionario = new Object();
	var sessao = null;
$(document).ready(function() {
		SAPATARIA.funcionario.cadastro = function(){	
			var funcionario = document.getElementById("nomeFunc").value;
			var cpf = document.getElementById("cpfFunc").value;
			var telefone = document.getElementById("telefoneFunc").value;
			var login = document.getElementById("loginFunc").value;
			var senha = document.getElementById("senhaFunc").value;
			var confirmaSenha = document.getElementById("confSenha").value; 
			
			var padraoNome = /\S+[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+/g;
			var padraoCpf = /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}/g;
			var padraoTelefone = /^\(?\d{2}\)?[\s9]?\d{5}-?\d{4}$/g;
			$('#tituloModal').html("Sucesso!");
			
			var protecao = true;
			
			//validações
			var msg = "";
					if (funcionario == ""
							|| cpf == ""
							|| telefone == ""
							|| login == ""
							|| senha == ""
							|| confirmaSenha == "") {
						msg += " ** Todos os campos são de preenchimento obrigatório! <br>"
						protecao = false;
						
						}
					if (!funcionario.match(padraoNome)) {
						msg += "** O campo nome deve conter apenas letras! <br>";
						protecao = false;
					}
					if (!telefone.match(padraoTelefone)) {
						msg += "** O campo telefone deve ter o formato (XX) XXXXX-XXXX Usando apenas numeros! <br>";
						protecao = false;
					}
					if (!cpf.match(padraoCpf)) {
						msg += "** O campo deve ser o de um CPF! <br>";
						protecao = false;
					}
					if (login.length < 4 || login.length > 14) {
						msg += ("** Seu login está com tamanho incorreto, ele deve ter entre 4 e 14 caracteres <br>");
						protecao = false;
					}
					if (senha.length < 4 || senha.length > 14) {
						msg += ("** Sua senha está com tamanho incorreto, ela deve ter entre 4 e 14 caracteres <br>");
						protecao = false;
					}
					if (senha != confirmaSenha) {
						msg += "** Senha e o confirme a senha não conferem <br>";
						protecao = false;
					}
					if (protecao == false) {
							$('#tituloModal').html("Veja esses detalhes!");
							$('#myBody').html(msg);
							$("#myModal").modal('show');
					} else {
						var novoFuncionario = new Object();
						novoFuncionario.funcionario = $("#nomeFunc").val();
						novoFuncionario.cpf = $("#cpfFunc").val();
						novoFuncionario.telefone = $("#telefoneFunc").val();
						novoFuncionario.login = $("#loginFunc").val();
						novoFuncionario.senha = $("#senhaFunc").val();
						
						var cfg = {

							url : "../rest/FuncionarioRest/save",
							data : novoFuncionario,
							success : function(msg) {
								$('#myBody').html(msg);
								$("#pe_modal").html('<button type="button" class="btn btn-default" data-dismiss="modal"> Fechar</button>');
								$("#myModal").modal('show');
								
								
							},
							error : function(err) {
								$("#msg").html("Erro ao cadastrar o funcionario ");
								$("#msg").html("Erro");
								$("#pe_modal").html('<button type="button" class="btn btn-default" data-dismiss="modal"> Fechar</button>');
								$('#myBody').html(msg);
								$("#myModal").modal('show');
							}
						};
						SAPATARIA.ajax.post(cfg);
						SAPATARIA.funcionario.limpar();
					}
				};
				SAPATARIA.funcionario.segCookie = function(funcionarios){
					sessao = funcionarios;
				};
				SAPATARIA.funcionario.editar = function(funcionarios){
					// MOLDA E ABRE O MODAL
					$('#tituloModal').html("Edite seus dados");
					$("#myBody").load('funcionario/html/modalEdicao.html');
					$("#pe_modal").html(
							'<button type="button" class="btn btn-gestor" onclick="SAPATARIA.funcionario.alteraFunc()"> Salve Alterações</button>'+
							'<button type="button" class="btn btn-default" data-dismiss="modal"> Fechar</button>');
					$("#myModal").modal('show');
					
					// CARREGA O MODAL COM OS DADOS DO CARA LOGADO
					setTimeout(function(){
						var cpf = sessao[0].cpf;
						cpf = cpf.toString();
						if (cpf.length != 11){
							cpf = 0 + cpf;
						}
						$("#cpf").val(cpf);
						$("#nome").val(sessao[0].funcionario);
						$("#rg").val(sessao[0].rg);
						$("#telefone").val(sessao[0].telefone);
						$("#login").val(document.cookie);
						//$("#senha").val("abc");
						//$("#confSenha").val("dfg");
					}, 50);
				};
				
				SAPATARIA.funcionario.alteraFunc = function(){
						//DECLARA VALIDAÇÕES
						var msg = "";
						var protecao = true;
						var funcionario = document.getElementById("nomeFunc").value;
						var cpf = document.getElementById("cpf").value;
						var telefone = document.getElementById("telefoneFunc").value;
						var login = document.getElementById("loginFunc").value;
						var senha = document.getElementById("senha").value;
						var confSenha = document.getElementById("confSenha").value;
						var padraoNome = /\S+[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+/g;
						var padraoCpf = /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}/g;
						var padraoTelefone = /^\(?\d{2}\)?[\s9]?\d{5}-?\d{4}$/g;
						
						//VALIDA OS DADOSSS
						if (!funcionario.match(padraoNome)) {
							msg += "** O campo nome deve conter apenas letras! <br>";
							protecao = false;
						}
						if (!telefone.match(padraoTelefone)) {
							msg += "** O campo telefone deve ter o formato (XX) XXXXX-XXXX Usando apenas numeros! <br>";
							protecao = false;
						}
						if (!cpf.match(padraoCpf)) {
							msg += "** O campo deve ser o de um CPF! <br>";
							protecao = false;
						}
						if (login.length < 4 || login.length > 14) {
							msg += ("** Seu login está com tamanho incorreto, ele deve ter entre 4 e 14 caracteres <br>");
							protecao = false;
						}
						if (senha.length < 4 || senha.length > 14) {
							msg += ("** Sua senha está com tamanho incorreto, ela deve ter entre 4 e 14 caracteres <br>");
							protecao = false;
						}
						if (senha != confSenha) {
							msg += "** Senha e o confirme a senha não conferem <br>";
							protecao = false;
						}
						if (protecao == false) {
								$('#tituloModal').html("Reveja os dados que voce me passou!");
								$('#myBody').html(msg);
								$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" onclick="SAPATARIA.funcionario.abreMEF()" data-dismiss="modal"> Fechar</button>');
								$("#myModal").modal('show');
								} else {
									var func = new Object();
									func.cpf = $("#cpf").val();
									func.funcionario = $("#nome").val();
									func.telefone = $("#telefone").val();
									func.login = $("#login").val();
									func.senha = $("#senha").val();	
									}
						var cfg = {
								type:"POST",
								url: "../rest/FuncionarioRest/edit",
								data: func,
								success: function (msg){
										$("#myBody").html(msg);
										$("#myModal").modal('show');
										$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" data-dismiss="modal"> Fechar</button>');
										SAPATARIA.sessao();
								},
								error : function(err) {
									$('#tituloModal').html("Erro!");
									$("#myBody").html(msg);
									$("#pe_modal").html('<button type="button" class="btn btn-default btn-gestor" onclick="SAPATARIA.funcionario.abreMEF()" data-dismiss="modal"> Fechar</button>');
									$("#myModal").modal('show');
								}
						}
						SAPATARIA.ajax.post(cfg);
				}
				SAPATARIA.funcionario.abreMEF = function(){
					SAPATARIA.funcionario.editar();
				}
				
				
				SAPATARIA.funcionario.limpar = function(){	
					var funcionario = $("#nomeFunc").val("");
					var cpf = $("#cpfFunc").val("");
					var telefone = $("#telefoneFunc").val("");
					var login = $("#loginFunc").val("");
					var senha = $("#senhaFunc").val("");
					var confirmaSenha = $("#confSenha").val("");
					
				}
});

