package br.com.sapataria.JPADAO;

import java.util.List;

import javax.persistence.Query;

import br.com.sapataria.interfaces.EstoqueDAO;
import br.com.sapataria.pojo.PreCadastro;

public class EstoqueJPADAO extends JPAAbstract<PreCadastro> implements EstoqueDAO {
    @Override
    public String getEntityName() {
        return "PreCadastro";
    }

    @Override
    public List<PreCadastro> buscarItemNome(String nome) {
        String jpql = "select c from PreCadastro c where nome_produto like '%" + nome + "%'";
        Query query = super.getQuery(jpql);
        List<PreCadastro> list = query.getResultList();
        return list;
    }

}
