package com.choupiteam.menus.back.models;

import java.util.List;

import com.choupiteam.menus.back.database.RecetteDAO;
import com.choupiteam.menus.back.models.exceptions.TechnicalException;

public class Recette {

	/**
	 * Identifiant de la recette
	 */
	private Integer id;
	
	/**
	 * Nom de la recette
	 */
	private String nom;
	
	/**
	 * Temps de préparation
	 * En min
	 */
	private int tempsPreparation;
	
	/**
	 * Temps de cuisson
	 * En min et peut être null
	 */
	private Integer tempsCuisson;
	
	/**
	 * Nombre de personnes pour la recette
	 */
	private int nbPersonnes;
	
	/**
	 * Type de recette
	 */
	private TypeRecetteEnum type;
	
	/**
	 * Quantité de chaque ingrédient
	 */
//	private Map<Ingredient, Integer> ingredients;
//	
	
	public Recette() {}
	
	public Recette(int iID, String iNom, int iTempPrep, Integer iTempsCuisson, int iNbPers, TypeRecetteEnum iType) {
		this.setId(iID);
		this.setNom(iNom);
		this.setTempsPreparation(iTempPrep);
		this.setTempsCuisson(iTempsCuisson);
		this.setNbPersonnes(iNbPers);
		this.setType(iType);
	}
	
	public void save() throws TechnicalException {
		RecetteDAO lDao = new RecetteDAO();
		if (this.getId() == null) {
			lDao.ajouterRecette(this);
		}
		else
			lDao.updateRecette(this);
	}
	
	public static void deleteRecette(int iID) throws TechnicalException {
		RecetteDAO lDao = new RecetteDAO();
		lDao.deleteRecette(iID);
		
	}
	
	public static Recette getRecette(int iID) throws TechnicalException {
		RecetteDAO lDao = new RecetteDAO();
		return lDao.getRecette(iID);
	}
	
	public static List<IngredientAvecQuantite> getIngredients(int iID) throws TechnicalException {
		RecetteDAO lDao = new RecetteDAO();
		return lDao.getIngredients(iID);
	}	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public int getTempsPreparation() {
		return tempsPreparation;
	}

	public void setTempsPreparation(int tempsPreparation) {
		this.tempsPreparation = tempsPreparation;
	}

	public Integer getTempsCuisson() {
		return tempsCuisson;
	}

	public void setTempsCuisson(Integer tempsCuisson) {
		this.tempsCuisson = tempsCuisson;
	}

	public int getNbPersonnes() {
		return nbPersonnes;
	}

	public void setNbPersonnes(int nbPersonnes) {
		this.nbPersonnes = nbPersonnes;
	}

	public TypeRecetteEnum getType() {
		return type;
	}

	public void setType(TypeRecetteEnum type) {
		this.type = type;
	}
	
	
}
