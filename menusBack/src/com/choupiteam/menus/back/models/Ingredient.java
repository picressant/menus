package com.choupiteam.menus.back.models;

public class Ingredient {

	private int id;
	
	private String nom;
	
	private Unite unite;
	
	public Ingredient(int iID, String iNom, Unite iUnite) {
		this.setId(iID);
		this.setNom(iNom);
		this.setUnite(iUnite);
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public Unite getUnite() {
		return unite;
	}

	public void setUnite(Unite unite) {
		this.unite = unite;
	}
}
