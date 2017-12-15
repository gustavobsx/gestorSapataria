package br.com.sapataria.interfaces;

import java.util.List;

import br.com.sapataria.pojo.Item;

public interface ItemDAO {
    public void incluir(Item estoque);
    public List<Item> buscarItemNome(String nome);
    public void altera(Item estoque);
    public Item buscaCodigoRegistro(int cod);
    public void deletaItem(int id);

}
