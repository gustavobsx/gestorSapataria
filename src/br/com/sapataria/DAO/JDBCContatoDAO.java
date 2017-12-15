package br.com.sapataria.DAO;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.commons.codec.digest.DigestUtils;





public class JDBCContatoDAO {
    private Connection conexao;

    public JDBCContatoDAO(Connection conexao){
        this.conexao = conexao;
    }

    public boolean loginUsuario(String cripLogin, String cripSenha) {
        cripLogin = DigestUtils.md5Hex(cripLogin);
        cripSenha = DigestUtils.md5Hex(cripSenha);

        String comando = "select * from funcionario";
        comando += " where login like '" + cripLogin + "'";
        comando += " and senha like '" + cripSenha + "'";


        //byte loginBanco;
        String loginBanco = null;
        String senhaBanco = null;
        try {

            java.sql.Statement stmt = conexao.createStatement();
            ResultSet rs = stmt.executeQuery(comando);
            while (rs.next()) {
                loginBanco = rs.getString("login");
                senhaBanco = rs.getString("senha");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (cripLogin.equals(loginBanco) && cripSenha.equals(senhaBanco)) {
            return true;
        } else {
            return false;
        }
    }

}
