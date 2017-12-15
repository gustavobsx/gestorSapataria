package br.com.sapataria.JPADAO;

import java.sql.Date;
import java.util.List;

import javax.persistence.Query;

import br.com.sapataria.interfaces.OrdemDAO;
import br.com.sapataria.pojo.Ordem;

public class  OrdemJPADAO  extends JPAAbstract<Ordem> implements OrdemDAO {
    @Override
    public String getEntityName() {
        return "Funcionario";
    }

    @Override
    public List<Ordem> obterOrdemAtual() {
        String jpql = "select u.numeroOrdem from Ordem u order by u.numeroOrdem desc";
        Query query = super.getQuery(jpql);
        List<Ordem> ultima_ordem = query.getResultList();
        return ultima_ordem;
    }

    public List<Ordem> buscarOrdemOS(String numero) {
        String jpql = "select c from Ordem c where numeroOrdem like '" + numero + "'";
        Query query = super.getQuery(jpql);
        List<Ordem> ordem = query.getResultList();
        return ordem;
    }

    @Override
    public List<Ordem> buscarPorData(Date data) {
        String hql = "from Ordem as ordem"
                + " WHERE ordem.dataEntrega LIKE '" + data + "'";
        Query query = super.getQueryHQL(hql);
        List<Ordem> list = query.getResultList();
        return list;
    }

}
