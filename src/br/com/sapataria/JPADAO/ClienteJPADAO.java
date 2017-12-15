package br.com.sapataria.JPADAO;

import java.util.List;

import javax.persistence.Query;

import br.com.sapataria.interfaces.ClienteDAO;
import br.com.sapataria.pojo.Cliente;

public class  ClienteJPADAO  extends JPAAbstract<Cliente> implements ClienteDAO {
    @Override
    public String getEntityName() {
        return "Cliente";
    }

    public List<Cliente> buscaPorNome(String nome) {

        String jpql = "select c from Cliente c where nome_cliente like '%" + nome + "%'";
        Query query = super.getQuery(jpql);
        List<Cliente> list = query.getResultList();
        return list;
    }
    public List<Cliente> buscaPeloCPF(String cpf) {

        String jpql = "select c from Cliente c where cpf like '" + cpf + "'";
        Query query = super.getQuery(jpql);
        List<Cliente> list = query.getResultList();
        return list;
    }

}
