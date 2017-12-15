package br.com.sapataria.interfaces;

import java.util.List;

import br.com.sapataria.pojo.PreCadastro;

public interface EstoqueDAO {
    public void incluir(PreCadastro estoque);

    public List<PreCadastro> buscarItemNome(String nome);

    public void altera(PreCadastro estoque);

    public PreCadastro buscarPorId(int id);

    /* public void deleta(int id);
    public Cliente buscarPorId(int id);
    public void altera(Funcionario func); */


}
