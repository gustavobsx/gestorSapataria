package br.com.sapataria.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class PreCadastro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cadastro")
    private int idCadastro;

    @Column(name = "nome_produto")
    private String nomeProduto;

    @Column(name = "cor_produto")
    private String corProduto;

    @Column(name = "quantia_minima")
    private int quantiaMinima;

    private String fornecedor;

    @Column(name = "tel_fornecedor")
    private long telefoneFornecedor;

    public int getIdCadastro() {
        return idCadastro;
    }

    public void setIdCadastro(int idCadastro) {
        this.idCadastro = idCadastro;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    public String getCorProduto() {
        return corProduto;
    }

    public void setCorProduto(String corProduto) {
        this.corProduto = corProduto;
    }

    public int getQuantiaMinima() {
        return quantiaMinima;
    }

    public void setQuantiaMinima(int quantiaMinima) {
        this.quantiaMinima = quantiaMinima;
    }

    public String getFornecedor() {
        return fornecedor;
    }

    public void setFornecedor(String fornecedor) {
        this.fornecedor = fornecedor;
    }

    public long getTelefoneFornecedor() {
        return telefoneFornecedor;
    }

    public void setTelefoneFornecedor(long telefoneFornecedor) {
        this.telefoneFornecedor = telefoneFornecedor;
    }

}