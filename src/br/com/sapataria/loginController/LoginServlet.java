package br.com.sapataria.loginController;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import br.com.sapataria.DAO.Conexao;
import br.com.sapataria.DAO.JDBCContatoDAO;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    String atualLogin = null;
    String atualSenha = null;
   

    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    private void process(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String context = request.getServletContext().getContextPath();
        Conexao conec = new Conexao();
        Connection conexao = conec.abrirConexao();
        JDBCContatoDAO jbdcContato = new JDBCContatoDAO(conexao);

        //RECEBIDO DO CLIENTE
        String login = request.getParameter("login").toString();
        String senha = request.getParameter("senha").toString();

        boolean contatos = jbdcContato.loginUsuario(login, senha);
        

        //OK VAI AQ A SESSAO

        if (contatos == true) {

            HttpSession sessao = request.getSession();
            sessao.setAttribute("login", request.getParameter("login"));
            response.sendRedirect(context + "/paginas/inicio.html");
            
        } else {
            response.sendRedirect("http://localhost:8080/GestorSapataria/");
        }
    }


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        process(request, response);

    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        process(request, response);
    }



}
