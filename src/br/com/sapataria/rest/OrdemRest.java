package br.com.sapataria.rest;

import java.sql.Date;
import java.util.List;
import java.util.TimeZone;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.sapataria.DAO.DAOFactory;
import br.com.sapataria.JPADAO.OrdemJPADAO;
import br.com.sapataria.interfaces.OrdemDAO;
import br.com.sapataria.pojo.Ordem;

@Path("OrdemRest")
public class OrdemRest extends UtilRest {
    public OrdemRest() {
    }

    @POST
    @Path("/searchCurrentOrder")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response searchCurrentOrder() {
        try {
            OrdemJPADAO order = new OrdemJPADAO();

            List<Ordem> orders = order.obterOrdemAtual();
            return this.buildResponse(orders);
        } catch (Exception e) {
            e.printStackTrace();
            return this.buildErrorResponse(e.getMessage());
        }
    }

    @POST
    @Path("/dailyOrders/{date}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response dailyOrders(@PathParam("date") Date date) {
        try {
            OrdemDAO ordemDAO = (OrdemDAO) DAOFactory.getInstanceOf(OrdemDAO.class);
            List<Ordem> listaOrdens = null;
            listaOrdens = ordemDAO.buscarPorData(date);
            return this.buildResponse(listaOrdens);

        } catch (Exception e) {
            e.printStackTrace();
            return this.buildErrorResponse(e.getMessage());
        }
    }

    @POST
    @Path("/searchOS/{OS}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})

    public Response buscarOrdemOS(@PathParam("OS") String OS) {
        try {
            OrdemJPADAO order = new OrdemJPADAO();
            List<Ordem> listaOrdens = order.buscarOrdemOS(OS);
            return this.buildResponse(listaOrdens);
        } catch (Exception e) {
            e.printStackTrace();
            return this.buildErrorResponse(e.getMessage());
        }
    }

    @POST
    @Path("/save")
    @Consumes("application/*")

    public Response save(String param) {
        try {
            Ordem order = new ObjectMapper().readValue(param, Ordem.class);
            OrdemDAO ordemDAO = (OrdemDAO) DAOFactory.getInstanceOf(OrdemDAO.class);
            TimeZone.setDefault(TimeZone.getTimeZone("America/Sao_Paulo"));

            String msg = "Corrija os seguintes erros: <br>";
            String cpf_cliente = order.getCpfCliente();
            String nome_cliente = order.getNomeCliente();
            long telefone_cliente = order.getTelefoneCliente();
            int quantidade = order.getQuantidade();
            String produto = order.getProduto();
            String valor = order.getValor();
            String descricao = order.getDescricao();
            String status_ordem = order.getStatusOrdem();

            boolean validador = true;

            if (cpf_cliente.isEmpty() && nome_cliente.isEmpty() && telefone_cliente == 0 && quantidade == 0
                    && produto.isEmpty() && valor.isEmpty() && descricao.isEmpty() && (null == order.getDataEntrega())
                    && status_ordem.isEmpty()) {
                msg += "*** Preencha todos os campos.<br>";
                validador = false;
            }

            if (validador == true) {

                ordemDAO.incluir(order);

                return this.buildResponse("Ordem criada com sucesso!");
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
    public Response edit(String param) {
        try {
            Ordem order = new ObjectMapper().readValue(param, Ordem.class);
            OrdemDAO ordemDAO = (OrdemDAO) DAOFactory.getInstanceOf(OrdemDAO.class);

            String msg = "Corrija os seguintes erros: <br>";
            long telefone_cliente = order.getTelefoneCliente();
            int quantidade = order.getQuantidade();
            String produto = order.getProduto();
            String valor = order.getValor();
            String descricao = order.getDescricao();
            Date data_entrega = order.getDataEntrega();
            boolean validador = true;

            if (telefone_cliente == 0 && quantidade == 0 && produto.isEmpty() && valor.isEmpty()
                    && descricao.isEmpty() && (null == data_entrega)) {
                msg += "*** Preencha todos os campos.<br>";
                validador = false;
            }
            if (validador == true) {

                ordemDAO.altera(order);
                return this.buildResponse("Ordem de servico atualizada com sucesso!");
            } else {
                return this.buildResponse(msg);
            }
        } catch (

                Exception e) {
            return this.buildErrorResponse(e.getMessage());
        }
    }

}
