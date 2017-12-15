package br.com.sapataria.JPADAO;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class JPAConnection {
    private static EntityManagerFactory conexao = null;
    private static EntityManager em = null;

    private EntityManagerFactory conectar() {
        if ( conexao != null && conexao.isOpen() ) {
            return conexao;
        }
        conexao = Persistence.createEntityManagerFactory("SAPATARIA"); //
        return conexao;
    }
    protected EntityManager getEntityManager() {
        if(em == null){
            em = conectar().createEntityManager();
        }

        return em;
    }

    protected Query getQuery(String jpql) {
        return this.getEntityManager().createQuery(jpql);
    }

    protected Query getQueryHQL(String hql) {
        return this.getEntityManager().createQuery(hql);
    }

}