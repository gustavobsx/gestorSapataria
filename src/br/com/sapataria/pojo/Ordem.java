package br.com.sapataria.pojo;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Ordem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "numero_ordem")
    private int numeroOrdem;

    @Column(name = "cpf_cliente")
    private String cpfCliente;

    @Column(name = "nome_cliente")
    private String nomeCliente;

    @Column(name = "telefone_cliente")
    private long telefoneCliente;

    private int quantidade;
    private String produto;
    private String valor;
    private String descricao;

    @Column(name = "data_entrega")
    private Date dataEntrega;

    @Column(name = "status_ordem")
    private String statusOrdem;

    public int getNumeroOrdem() {
        return numeroOrdem;
    }

    public void setNumeroOrdem(int numeroOrdem) {
        this.numeroOrdem = numeroOrdem;
    }

    public String getCpfCliente() {
        return cpfCliente;
    }

    public void setCpfCliente(String cpfCliente) {
        this.cpfCliente = cpfCliente;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public long getTelefoneCliente() {
        return telefoneCliente;
    }

    public void setTelefoneCliente(long telefoneCliente) {
        this.telefoneCliente = telefoneCliente;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public String getProduto() {
        return produto;
    }

    public void setProduto(String produto) {
        this.produto = produto;
    }

    public String getValor() {
        return valor;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Date getDataEntrega() {
        return dataEntrega;
    }

    public void setDataEntrega(Date dataEntrega) {
        this.dataEntrega = dataEntrega;
    }

    public String getStatusOrdem() {
        return statusOrdem;
    }

    public void setStatusOrdem(String statusOrdem) {
        this.statusOrdem = statusOrdem;
    }



}