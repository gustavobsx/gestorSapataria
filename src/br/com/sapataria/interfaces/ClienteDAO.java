package br.com.sapataria.interfaces;

import br.com.sapataria.pojo.Cliente;

public interface ClienteDAO {
    public void incluir(Cliente cliente);
    public void deleta(int id);
    public Cliente buscarPorId(int id);
    public void altera(Cliente c);


}
