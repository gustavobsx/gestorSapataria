package br.com.sapataria.interfaces;

import java.util.List;

import br.com.sapataria.pojo.Funcionario;

public interface FuncionarioDAO {
    public void incluir(Funcionario func);
    public List<Funcionario> buscaPorNome(String login);
    public void altera(Funcionario func);
    /* public Funcionario buscarPorId (int id);
    public void deleta(int id); */
    


}
