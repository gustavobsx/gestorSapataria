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
import br.com.sapataria.JPADAO.EstoqueJPADAO;
import br.com.sapataria.interfaces.EstoqueDAO;
import br.com.sapataria.pojo.PreCadastro;

@Path("PreCadastro")
public class PreCadastroRest extends UtilRest {
    public PreCadastroRest() {
    }

    @POST
    @Path("/search/{item}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})

    public Response buscarProduto(@PathParam("item") String item) {
        try {
            EstoqueJPADAO est = new EstoqueJPADAO();
            List<PreCadastro> listaProduto = null;
            String pesqVazio = " ";
            if (item.contains("vazio")) {
                listaProduto = est.buscarItemNome(pesqVazio);
            } else {
                listaProduto = est.buscarItemNome(item);
            }
            return this.buildResponse(listaProduto);

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

            PreCadastro preCad = new ObjectMapper().readValue(param, PreCadastro.class);
            EstoqueDAO estoqueDAO = (EstoqueDAO) DAOFactory.getInstanceOf(EstoqueDAO.class);

            String msg = "Corrija os seguintes erros: <br>";
            String nome_produto = preCad.getNomeProduto();
            String cor_produto = preCad.getCorProduto();
            int quantia_minima = preCad.getQuantiaMinima();
            String fornecedor = preCad.getFornecedor();
            long tel_fornecedor = preCad.getTelefoneFornecedor();
            boolean validador = true;


            if (nome_produto.isEmpty() && cor_produto.isEmpty() && quantia_minima == 0 && fornecedor.isEmpty()
                    && tel_fornecedor == 0) {
                msg += "*** Preencha todos os dados!<br>";
                validador = false;
            }
            if (validador == true) {
                estoqueDAO.incluir(preCad);
                return this.buildResponse("Produto cadastrado com sucesso!");
            }
            return this.buildResponse(msg);
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
            EstoqueDAO estoqueDAO = (EstoqueDAO) DAOFactory.getInstanceOf(EstoqueDAO.class);
            PreCadastro preCadEstoq = estoqueDAO.buscarPorId(id);
            return this.buildResponse(preCadEstoq);
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
            PreCadastro preCad = new ObjectMapper().readValue(param, PreCadastro.class);
            EstoqueDAO estoqueDAO = (EstoqueDAO) DAOFactory.getInstanceOf(EstoqueDAO.class);

            String msg = "Corrija os seguintes erros: <br>";
            String nome_produto = preCad.getNomeProduto();
            String cor_produto = preCad.getCorProduto();
            int quantia_minima = preCad.getQuantiaMinima();
            String fornecedor = preCad.getFornecedor();
            long tel_fornecedor = preCad.getTelefoneFornecedor();
            boolean validador = true;

            if (nome_produto.isEmpty() && cor_produto.isEmpty() && quantia_minima == 0 && fornecedor.isEmpty()
                    && tel_fornecedor == 0) {
                msg += "*** Preencha todos os dados!<br>";
                validador = false;
            }
            if (validador == true) {

                estoqueDAO.altera(preCad);
                return this.buildResponse("Pre-cadastro alterado!");
            } else {
                return this.buildResponse(msg);
            }
        } catch (

                Exception e) {
            return this.buildErrorResponse(e.getMessage());
        }
    }


}
