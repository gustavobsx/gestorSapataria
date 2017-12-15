package br.com.sapataria.pojo;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo_registro")
    private int codigoRegistro;

    //TODO Verificar por que est� dando detached quando coloco CascadeType.Persist
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "id_cadastro")
    private PreCadastro idCadastro;

    private int quantidade;

    @Column(name = "unidade_medida")
    private String unidadeMedida;

    public Item() {

    }

    public int getCodigoRegistro() {
        return codigoRegistro;
    }

    public void setCodigoRegistro(int codigoRegistro) {
        this.codigoRegistro = codigoRegistro;
    }

    public PreCadastro getIdCadastro() {
        return idCadastro;
    }

    public void setIdCadastro(PreCadastro idCadastro) {
        this.idCadastro = idCadastro;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public String getUnidadeMedida() {
        return unidadeMedida;
    }

    public void setUnidadeMedida(String unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    @Override
    public String toString() {
        return "Item [codigoRegistro=" + codigoRegistro + ", idCadastro=" + idCadastro + ", quantidade=" + quantidade
                + ", unidadeMedida=" + unidadeMedida + "]";
    }

}