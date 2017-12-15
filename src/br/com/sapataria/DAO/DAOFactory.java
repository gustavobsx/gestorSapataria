package br.com.sapataria.DAO;

import br.com.sapataria.JPADAO.ClienteJPADAO;
import br.com.sapataria.JPADAO.EstoqueJPADAO;
import br.com.sapataria.JPADAO.FuncionarioJPADAO;
import br.com.sapataria.JPADAO.ItemJPADAO;
import br.com.sapataria.JPADAO.OrdemJPADAO;
import br.com.sapataria.interfaces.ClienteDAO;
import br.com.sapataria.interfaces.EstoqueDAO;
import br.com.sapataria.interfaces.FuncionarioDAO;
import br.com.sapataria.interfaces.ItemDAO;
import br.com.sapataria.interfaces.OrdemDAO;


public class DAOFactory {

    @SuppressWarnings("rawtypes")
    public static Object getInstanceOf(Class c) {
        if ( c.equals(FuncionarioDAO.class) ) {
            return new FuncionarioJPADAO();
        } else if ( c.equals(ClienteDAO.class) ) {
            return new ClienteJPADAO();
        } else if ( c.equals(OrdemDAO.class) ) {
            return new OrdemJPADAO();
        } else if ( c.equals(EstoqueDAO.class) ) {
            return new EstoqueJPADAO();
        } else if ( c.equals(ItemDAO.class) ) {
            return new ItemJPADAO();
        }
        return null;
    }
}
