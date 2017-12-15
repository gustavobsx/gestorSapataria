package br.com.sapataria.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.codec.digest.DigestUtils;
import org.codehaus.jackson.map.ObjectMapper;

import br.com.sapataria.DAO.DAOFactory;
import br.com.sapataria.JPADAO.FuncionarioJPADAO;
import br.com.sapataria.interfaces.FuncionarioDAO;
import br.com.sapataria.pojo.Funcionario;

@Path("FuncionarioRest")
public class FuncionarioRest extends UtilRest {
    public FuncionarioRest() {
    }

    @POST
    @Path("/getSessionData/{login}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response getSessionData(@PathParam("login") String login) {
        try {
            FuncionarioJPADAO func = new FuncionarioJPADAO();
            List<Funcionario> funcionarios = func.buscaPorNome(login);
            return this.buildResponse(funcionarios);
        } catch (Exception e) {
            e.printStackTrace();
            return this.buildErrorResponse(e.getMessage());
        }
    }

    @POST
    @Path("/save")
    @Consumes("application/*")

    public Response save(String params) {
        try {
            Funcionario func = new ObjectMapper().readValue(params, Funcionario.class);
            FuncionarioDAO funcionarioDAO = (FuncionarioDAO) DAOFactory.getInstanceOf(FuncionarioDAO.class);

            String msg = "Corrija os seguintes erros: <br>";
            String funcionario1 = func.getFuncionario();
            long cpf = func.getCpf();
            long telefone = func.getTelefone();
            String login = func.getLogin();
            String senha = func.getSenha();
            System.out.println(funcionario1);

            boolean validador = true;

            if (funcionario1.isEmpty() && cpf == 0 && telefone == 0 && login.isEmpty() && senha.isEmpty()) {
                System.out.println("CAMPOS VAZIOS");
                msg += "*** Todos os campos são de preenchimento obrigatório! <br>";
                validador = false;
            }
            if (senha.length() < 4 || senha.length() > 14) {
                msg += "*** Sua senha esta com tamanho incorreto <br>";
                validador = false;
            }
            // Feito o hash de login e senha

            func.setLogin(DigestUtils.md5Hex(login));
            func.setSenha(DigestUtils.md5Hex(senha));
            if (validador == true) {

                funcionarioDAO.incluir(func);

                return this.buildResponse("Funcionario cadastrado!");
            } else {

                return this.buildResponse(msg);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return this.buildErrorResponse(e.getMessage());
        }

    }

    @POST
    @Path("/edit")
    @Consumes("application/*")
    public Response edit(String params) {
        try {
            Funcionario func = new ObjectMapper().readValue(params, Funcionario.class);
            FuncionarioDAO funcionarioDAO = (FuncionarioDAO) DAOFactory.getInstanceOf(FuncionarioDAO.class);

            String msg = "Corrija os seguintes erros: <br>";
            String nome = func.getFuncionario();
            long cpf = func.getCpf();
            long telefone = func.getTelefone();
            String login = func.getLogin();
            String senha = func.getSenha();
            func.setLogin(DigestUtils.md5Hex(login));
            func.setSenha(DigestUtils.md5Hex(senha));
            boolean validador = true;

            if (nome.isEmpty() && cpf == 0 && telefone == 0 && login.isEmpty() && senha.isEmpty()) {
                System.out.println("CAMPOS VAZIOS");
                msg += "*** Preencha todos os campos!<br>";
                validador = false;
            }
            if (validador == true) {

                funcionarioDAO.altera(func);
                return this.buildResponse("Funcionario editado com sucesso!");
            } else {
                return this.buildResponse(msg);
            }
        } catch (

                Exception e) {
            return this.buildErrorResponse(e.getMessage());
        }
    }


}
