package br.com.sapataria.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.sapataria.DAO.DAOFactory;
import br.com.sapataria.JPADAO.ItemJPADAO;
import br.com.sapataria.interfaces.ItemDAO;
import br.com.sapataria.pojo.Item;
import br.com.sapataria.pojo.PreCadastro;

@Path("EstoqueRest")
public class EstoqueRest extends UtilRest {
    public EstoqueRest() {
    }

    @POST
    @Path("/save")
    @Consumes("application/*")

    public Response save(String param) {
        try {
            Item item = new ObjectMapper().readValue(param, Item.class);
            ItemDAO itemDAO = (ItemDAO) DAOFactory.getInstanceOf(ItemDAO.class);

            String msg = "Corrija os seguintes erros: <br>";

            PreCadastro produto = item.getIdCadastro();
            int quantidade = item.getQuantidade();
            String medida = item.getUnidadeMedida();
            boolean validador = true;
            if (produto == null && quantidade == 0 && medida.isEmpty()) {
                msg += "*** Preencha todos os dados!<br>";
                validador = false;
            }
            if (validador == true) {

                itemDAO.incluir(item);
                return this.buildResponse("Produto cadastrado com sucesso!");
            }
            return this.buildResponse(msg);
        } catch (Exception e) {
            e.printStackTrace();
            return this.buildErrorResponse(e.getMessage());
        }

    }

    @POST
    @Path("/search/{item}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})

    public Response search(@PathParam("item") String item) {
        try {
            ItemJPADAO coisa = new ItemJPADAO();
            List<Item> listaProduto = null;

            listaProduto = coisa.buscarItemEstoque(item);
            return this.buildResponse(listaProduto);

        } catch (Exception e) {
            e.printStackTrace();
            return this.buildErrorResponse(e.getMessage());
        }
    }

    @POST
    @Path("/outputInventory")
    @Consumes("application/*")
    public Response outputInventory(String param) {
        String msg = "";
        try {
            Item item = new ObjectMapper().readValue(param, Item.class);
            ItemDAO itemDAO = (ItemDAO) DAOFactory.getInstanceOf(ItemDAO.class);
            //pega id e qt que veio
            int novaQt = item.getQuantidade();
            int codigoRegistro = item.getCodigoRegistro();
            //carrega o obj e pega qt antiga
            item = itemDAO.buscaCodigoRegistro(codigoRegistro);
            int qtAntiga = item.getQuantidade();
            // faz a nova qt
            int meioTermo = (qtAntiga - novaQt);
            if (meioTermo < 0) {
                return this.buildResponse("Estoque insulficiente para a sua solicitação");
            } else if (meioTermo == 0) {
                itemDAO.deletaItem(codigoRegistro);
                return this.buildResponse("Material retirado com sucesso!");
            } else if (meioTermo > 0) {
                item.setQuantidade(meioTermo);
                itemDAO.altera(item);
                return this.buildResponse("Material retirado com sucesso!");
            }
            return this.buildResponse("Problema para dar baixa ao estoque");
        } catch (Exception e) {
            e.printStackTrace();
            return this.buildErrorResponse(msg);
        }
    }

}
