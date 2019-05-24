package com.choupiteam.menus.back.models;

public class IngredientAvecQuantite {
	private Ingredient ingredient;
	private int quantite;
	
	public IngredientAvecQuantite(Ingredient iIng, int iQuantite) {
		this.setIngredient(iIng);
		this.setQuantite(iQuantite);
	}
	
	public int getQuantite() {
		return quantite;
	}
	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}
	public Ingredient getIngredient() {
		return ingredient;
	}
	public void setIngredient(Ingredient ingredient) {
		this.ingredient = ingredient;
	}
}
