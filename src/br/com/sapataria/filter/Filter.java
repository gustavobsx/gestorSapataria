package br.com.sapataria.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet Filter implementation class Filter
 */
//@WebFilter("/paginas/*")
public class Filter implements javax.servlet.Filter {

    public Filter() {
    }

    @Override
    public void destroy() {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String context = request.getServletContext().getContextPath();
        try{
            HttpSession session = ((HttpServletRequest) request).getSession();
            String usuario = null;
            if(session != null){
                usuario = (String) session.getAttribute("login");
            }
            if(usuario== null){
                session.setAttribute("msg", "Faca o login");
                ((HttpServletResponse) response).sendRedirect(context);
                ((HttpServletResponse) response).setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
                ((HttpServletResponse) response).setHeader("Pragma", "no-cache"); // HTTP 1.0
            } else {
                chain.doFilter(request, response);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * @see Filter#init(FilterConfig)
     */
    @Override
    public void init(FilterConfig fConfig) throws ServletException {
        // TODO Auto-generated method stub
    }

}
