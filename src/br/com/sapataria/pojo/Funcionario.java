package br.com.sapataria.pojo;

import javax.persistence.Entity;
import javax.persistence.Id;


@Entity
public class Funcionario {
    @Id
    private long cpf;
    private String funcionario;
    private long telefone;
    private String login;
    private String senha;

    public long getCpf() {
        return cpf;
    }

    public void setCpf(long cpf) {
        this.cpf = cpf;
    }
    public String getFuncionario() {
        return funcionario;
    }
    public void setFuncionario(String funcionario) {
        this.funcionario = funcionario;
    }

    public long getTelefone() {
        return telefone;
    }

    public void setTelefone(long telefone) {
        this.telefone = telefone;
    }
    public String getLogin() {
        return login;
    }
    public void setLogin(String login) {
        this.login = login;
    }
    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }

    @Override
    public String toString() {
        return "Funcionario [cpf=" + cpf + ", funcionario=" + funcionario + ", telefone=" + telefone + ", login="
                + login + ", senha=" + senha + "]";
    }



}