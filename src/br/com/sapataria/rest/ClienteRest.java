package br.com.sapataria.rest;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.sapataria.DAO.DAOFactory;
import br.com.sapataria.JPADAO.ClienteJPADAO;
import br.com.sapataria.interfaces.ClienteDAO;
import br.com.sapataria.pojo.Cliente;

@Path("ClienteRest")
public class ClienteRest extends UtilRest {
    public ClienteRest() {
    }

    @POST
    @Path("/searchByCpf/{cpf}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})

    public Response searchByCpf(@PathParam("cpf") String cpf) {
        try {
            ClienteJPADAO client = new ClienteJPADAO();
            List<Cliente> clients = client.buscaPeloCPF(cpf);

            return this.buildResponse(clients);
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

            Cliente client = new ObjectMapper().readValue(params, Cliente.class);
            ClienteDAO clienteDAO = (ClienteDAO) DAOFactory.getInstanceOf(ClienteDAO.class);

            String msg = "Corrija os seguintes erros: <br>";
            String nome = client.getNomeCliente();
            String cpf = client.getCpf();
            long telefone = client.getTelefone();
            int cep = client.getCep();
            String endereco = client.getEndereco();
            int numero = client.getNumero();
            boolean validador = true;

            if (nome.isEmpty() && cpf.isEmpty() && telefone == 0 && cep == 0 && endereco.isEmpty()
                    && numero  == 0) {
                System.out.println("CAMPOS VAZIOS");
                msg += "*** Preencha todos os campos!<br>";
                validador = false;
            }
            if (validador == true) {

                clienteDAO.incluir(client);
                return this.buildResponse("Cliente cadastrado!");
            }

            return this.buildResponse(msg);

        } catch (Exception e) {
            e.printStackTrace();
            return this.buildErrorResponse(e.getMessage());
        }

    }

    @POST
    @Path("/search/{param}")
    @Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })

    public Response search(@PathParam("param") String param) {
        Pattern expCPF = Pattern.compile("[0-9]+$");
        Matcher campoCPF = expCPF.matcher(param);
        ClienteJPADAO client = new ClienteJPADAO();
        try {
            if (campoCPF.matches()) {

                List<Cliente> clientes = client.buscaPeloCPF(param);
                return this.buildResponse(clientes);
            } else {
                List<Cliente> clientes = client.buscaPorNome(param);
                return this.buildResponse(clientes);

            }
        } catch (Exception e) {
            e.printStackTrace();
            return this.buildErrorResponse(e.getMessage());
        }
    }


    @POST
    @Path("/searchById/{id}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response searchById(@PathParam("id") int id) {
        try {
            ClienteDAO clienteDAO = (ClienteDAO) DAOFactory.getInstanceOf(ClienteDAO.class);
            Cliente client = clienteDAO.buscarPorId(id);
            return this.buildResponse(client);
        } catch (Exception e) {
            e.printStackTrace();
            return this.buildErrorResponse(e.getMessage());
        }
    }

    @POST
    @Path("/edit")
    @Consumes("application/*")
    public Response edit(String param) {
        try {
            Cliente client = new ObjectMapper().readValue(param, Cliente.class);
            ClienteDAO clienteDAO = (ClienteDAO) DAOFactory.getInstanceOf(ClienteDAO.class);

            String msg = "Corrija os seguintes erros: <br>";
            String nome = client.getNomeCliente();
            String cpf = client.getCpf();
            long telefone = client.getTelefone();
            int cep = client.getCep();
            String endereco = client.getEndereco();
            int numero = client.getNumero();
            boolean validador = true;

            if (nome.isEmpty() && cpf.isEmpty() && telefone == 0 && cep == 0 && endereco.isEmpty()
                    && numero == 0) {
                System.out.println("CAMPOS VAZIOS");
                msg += "*** Preencha todos os campos!<br>";
                validador = false;
            }
            if (validador == true) {
                clienteDAO.altera(client);
                return this.buildResponse("Cliente editado com sucesso!");
            } else {
                return this.buildResponse(msg);
            }
        } catch (

                Exception e) {
            return this.buildErrorResponse(e.getMessage());
        }
    }

    @POST
    @Path("/delete/{id}")
    @Consumes("application/*")
    public Response delete(@PathParam("id") int id) {
        try {
            ClienteDAO clienteDAO = (ClienteDAO) DAOFactory.getInstanceOf(ClienteDAO.class);
            clienteDAO.deleta(id);

            return this.buildResponse("Cliente Deletado com Sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
            return this.buildErrorResponse(e.getMessage());
        }
    }

}
