package br.com.sapataria.JPADAO;

import java.util.List;

import javax.persistence.Query;

import br.com.sapataria.interfaces.FuncionarioDAO;
import br.com.sapataria.pojo.Funcionario;

public class  FuncionarioJPADAO  extends JPAAbstract<Funcionario> implements FuncionarioDAO {
    @Override
    public String getEntityName() {
        return "Funcionario";
    }

    @Override
    public List<Funcionario> buscaPorNome(String nome) {
        String jpql = "select c from Funcionario c where funcionario like '%" + nome + "%'";
        Query query = super.getQuery(jpql);
        List <Funcionario> list = query.getResultList();
        return list;
    }

}
