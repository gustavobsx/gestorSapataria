package br.com.sapataria.JPADAO;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

public abstract class JPAAbstract<T> extends JPAConnection {
    public abstract String getEntityName();

    public void incluir (T t)  {
        EntityManager em = getEntityManager();
        em.getTransaction().begin();
        em.persist(t);
        em.getTransaction().commit();
        em.clear(); // limpar cache do hibernate
    }
    public void deleta(int id){
        EntityManager em = getEntityManager();
        Object t1 = buscarPorId(id);
        em.getTransaction().begin();
        em.remove(t1);
        em.getTransaction().commit();
    }
    public void altera (T t){
        EntityManager em = getEntityManager();
        em.getTransaction().begin();
        em.merge(t);
        em.getTransaction().commit();
    }

    public T buscarPorId(int id) {
        String jpql = "select c from " + getEntityName() + " c where id =" + id;
        Query query = super.getQuery(jpql);
        List <T> list = query.getResultList();
        for (T t:list){
            return (T)t;
        }
        return null;
    }
}