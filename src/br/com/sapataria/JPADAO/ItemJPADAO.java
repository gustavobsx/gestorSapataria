package br.com.sapataria.JPADAO;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.com.sapataria.interfaces.ItemDAO;
import br.com.sapataria.pojo.Item;

public class  ItemJPADAO  extends JPAAbstract<Item> implements ItemDAO {
    @Override
    public String getEntityName() {
        return "Item";
    }

    @Override
    public List<Item> buscarItemNome(String nomeRegistro) {
        String jpql = "select c from Item c where idCadastro like '%" + nomeRegistro + "%'";
        Query query = super.getQuery(jpql);
        List<Item> list = query.getResultList();
        return list;
    }
    public List<Item> buscarItemEstoque(String nomeRegistro) {
        String hql =" from Item as item"
                + " WHERE item.idCadastro.nomeProduto LIKE '%" + nomeRegistro + "%'";
        Query query = super.getQueryHQL(hql);
        List<Item> list = query.getResultList();
        return list;
    }

    public List<Item> buscaAnteriorCadastro(String registro) {
        String hql = " from Item as item" + " WHERE item.idCadastro.nomeProduto LIKE '%" + registro + "%'";
        Query query = super.getQueryHQL(hql);
        List<Item> list = query.getResultList();
        return list;
    }
    @Override
    public Item buscaCodigoRegistro(int cod) {
        String hql = "from Item as item" + " WHERE item.codigoRegistro LIKE '%" + cod + "%'";
        Query query = super.getQueryHQL(hql);
        List<Item> list = query.getResultList();
        for (Item item : list) {
            return (Item) item;
        }
        return null;
    }
    @Override
    public void deletaItem(int id) {
        EntityManager em = getEntityManager();
        Item item = buscaCodigoRegistro(id);
        System.out.println(item);
        em.getTransaction().begin();
        em.remove(item);
        em.getTransaction().commit();
    }

}
