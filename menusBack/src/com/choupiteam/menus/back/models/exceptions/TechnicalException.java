package com.choupiteam.menus.back.models.exceptions;

import java.sql.SQLException;

public class TechnicalException extends Exception {

	private String customMessage;
	
	public TechnicalException(String iCustomMessage, SQLException e) {
		super(e);
		this.setCustomMessage(iCustomMessage);
	}

	public String getCustomMessage() {
		return customMessage;
	}

	public void setCustomMessage(String customMessage) {
		this.customMessage = customMessage;
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = -5484708642193394284L;
	
	

}
