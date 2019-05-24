package com.choupiteam.menus.back.models;

public class Unite {
	private int id;
	
	private String singulier;
	
	private String pluriel;

	public Unite(int iID, String iSingulier, String iPluriel) {
		this.setId(iID);
		this.setSingulier(iSingulier);
		this.setPluriel(iPluriel);
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSingulier() {
		return singulier;
	}

	public void setSingulier(String singulier) {
		this.singulier = singulier;
	}

	public String getPluriel() {
		return pluriel;
	}

	public void setPluriel(String pluriel) {
		this.pluriel = pluriel;
	}
	
	
}
