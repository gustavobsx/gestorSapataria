package br.com.sapataria.interfaces;

import java.sql.Date;
import java.util.List;

import br.com.sapataria.pojo.Ordem;

public interface OrdemDAO {
    public void incluir(Ordem ordem);
    public List<Ordem> obterOrdemAtual();
    public List<Ordem> buscarPorData(Date data);
    public void altera(Ordem ordem);
}
