package com.wb.wbbackend.verificadores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wb.wbbackend.entidades.Telefone;

@Component
public class VerificadorTelefoneNulo implements Verificador<Telefone> {
	@Autowired
	private VerificadorStringNula verificadorString;

	@Override
	public boolean verificar(Telefone objeto) {
		if (objeto == null) {
			return true; // Objeto nulo é inválido
		}
		
		boolean dddInvalido = verificadorString.verificar(objeto.getDdd());
		boolean numeroInvalido = verificadorString.verificar(objeto.getNumero());
		return dddInvalido || numeroInvalido; // Retorna true se qualquer campo for inválido
	}
}