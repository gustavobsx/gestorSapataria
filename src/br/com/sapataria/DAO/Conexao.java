package br.com.sapataria.DAO;

import java.sql.Connection;

public class Conexao {
    private Connection conexao;

    public Connection abrirConexao(){
        try{
            /*INSTRU��O QUE IDENTIFICA O TIPO DE DRIVER UTILIZADO PARA A CONEXAO
             * COM O BD
             */
            Class.forName("org.gjt.mm.mysql.Driver");
            //ENDERE�AMENTO FEITO DO SERVIDOR DE BANCO E DRIVER
            conexao = java.sql.DriverManager
                    .getConnection("jdbc:mysql://localhost:3306/sapataria",
                            "root", "root");
        } catch (Exception e){
            e.printStackTrace();
        }
        return conexao;
    }
    public void fecharConexao(){
        try{
            conexao.close();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
