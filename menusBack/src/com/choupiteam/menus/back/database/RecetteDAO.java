package com.choupiteam.menus.back.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.choupiteam.menus.back.models.Ingredient;
import com.choupiteam.menus.back.models.IngredientAvecQuantite;
import com.choupiteam.menus.back.models.Recette;
import com.choupiteam.menus.back.models.TypeRecetteEnum;
import com.choupiteam.menus.back.models.Unite;
import com.choupiteam.menus.back.models.exceptions.TechnicalException;


public class RecetteDAO {

	public void ajouterRecette(Recette iRecette) throws TechnicalException {
		String sql = "INSERT into Recette (Nom, TempsPreparation, TempsCuisson, NbPersonnes, Type) values (?, ?, ?, ?, ?)";

		try (PreparedStatement lStatement = DatabaseSQLiteConnection.getInstance().getCurrentConnection()
				.prepareStatement(sql)) {
			lStatement.setString(1, iRecette.getNom());
			lStatement.setInt(2, iRecette.getTempsPreparation());
			lStatement.setInt(3, iRecette.getTempsCuisson());
			lStatement.setInt(4, iRecette.getNbPersonnes());
			lStatement.setInt(5, iRecette.getType().getValue());			
			
			int lAffectedRows = lStatement.executeUpdate();

	        if (lAffectedRows == 0) {
	            throw new TechnicalException("Impossible de creer la recette", null);
	        }

	        try (ResultSet lGeneratedKeys = lStatement.getGeneratedKeys()) {
	            if (lGeneratedKeys.next()) {
	                iRecette.setId(lGeneratedKeys.getInt(1));
	            }
	            else {
	                throw new TechnicalException("Impossible de creer la recette, no ID obtained.", null);
	            }
	        }
		} catch (SQLException e) { 
			throw new TechnicalException("Impossible de créer la recette", e);
		}
	}
	
	public void updateRecette(Recette iRecette) throws TechnicalException {
		String sql = "Update Recette set Nom=?, TempsPreparation=?, TempsCuisson=?, NbPersonnes=?, Type=? where ID=?";

		try (PreparedStatement lStatement = DatabaseSQLiteConnection.getInstance().getCurrentConnection()
				.prepareStatement(sql)) {
			lStatement.setString(1, iRecette.getNom());
			lStatement.setInt(2, iRecette.getTempsPreparation());
			lStatement.setInt(3, iRecette.getTempsCuisson());
			lStatement.setInt(4, iRecette.getNbPersonnes());
			lStatement.setInt(5, iRecette.getType().getValue());	
			lStatement.setInt(6, iRecette.getId());		
			
			lStatement.executeUpdate();
			
		} catch (SQLException e) {
			throw new TechnicalException("Impossible de mettre à jour la recette", e);
		}
	}
	
	public Recette getRecette(int iID) throws TechnicalException {
		String sql = "select * from Recette where ID=?";

		try (PreparedStatement lStatement = DatabaseSQLiteConnection.getInstance().getCurrentConnection()
				.prepareStatement(sql)) {			
			lStatement.setInt(1, iID);			
			
			ResultSet lRes = lStatement.executeQuery();
			
	        if (lRes.next()) {
	        	Recette lRecette = new Recette(
	        			lRes.getInt("ID"),
	        			lRes.getString("Nom"),
	        			lRes.getInt("TempsPreparation"),
	        			lRes.getInt("TempsCuisson"),
	        			lRes.getInt("NbPersonnes"),
	        			TypeRecetteEnum.valueOf(lRes.getInt("Type")).get());
	        	
	        	return lRecette;
	        }
		} catch (SQLException e) {
			throw new TechnicalException("Erreur lors du get", e);	
		}
		
		return null;
	}
	
	public List<IngredientAvecQuantite> getIngredients(int iID) throws TechnicalException {
		List<IngredientAvecQuantite> lIngredients = new ArrayList<IngredientAvecQuantite>();
		
		String lSQL = "select "
					+ "Ingredient.ID ING_ID, "
					+ "Liste_ingredients.Quantite QUANTITE, "
					+ "Ingredient.Nom ING_NOM, "
					+ "Unite.ID UNIT_ID, "
					+ "Unite.Singulier UNIT_SING, "
					+ "Unite.Pluriel UNIT_PLUR "
				+ "from Liste_ingredients "
				+ "join Ingredient on Ingredient.ID = ID_Ingredient "
				+ "join Unite on Unite.ID = Ingredient.Unite "
				+ "where ID_Recette=?";
		
		try (PreparedStatement lStatement = DatabaseSQLiteConnection.getInstance().getCurrentConnection()
				.prepareStatement(lSQL)) {			
			lStatement.setInt(1, iID);			
			
			ResultSet lRes = lStatement.executeQuery();
			
	        if (lRes.next()) {
	        	Unite lUnite = new Unite(
	        			lRes.getInt("UNIT_ID"),
	        			lRes.getString("UNIT_SING"),
	        			lRes.getString("UNIT_PLUR"));
	        	
	        	Ingredient lIngredient = new Ingredient(
	        			lRes.getInt("ING_ID"),
	        			lRes.getString("ING_NOM"),
	        			lUnite);
	        	
	        	lIngredients.add(new IngredientAvecQuantite(lIngredient, lRes.getInt("QUANTITE")));	        	
	        }
		} catch (SQLException e) {
			throw new TechnicalException("Erreur lors du get", e);	
		}
		
		return lIngredients;
		
	}

	public List<Recette> searchRecette(String iSearchValue) throws TechnicalException {
		List<Recette> lRecettes = new ArrayList<Recette>();
		String sql = "select * from Recette where Nom like '" + iSearchValue + "%' order by Nom";

		try (PreparedStatement lStatement = DatabaseSQLiteConnection.getInstance().getCurrentConnection()
				.prepareStatement(sql)) {						
			
			ResultSet lRes = lStatement.executeQuery();
			
	        while (lRes.next()) {
	        	Recette lRecette = new Recette(
	        			lRes.getInt("ID"),
	        			lRes.getString("Nom"),
	        			lRes.getInt("TempsPreparation"),
	        			lRes.getInt("TempsCuisson"),
	        			lRes.getInt("NbPersonnes"),
	        			TypeRecetteEnum.valueOf(lRes.getInt("Type")).get());
	        	
	        	lRecettes.add(lRecette);
	        }
		} catch (SQLException e) {
			throw new TechnicalException("Erreur lors de la recherche", e);	
		}
		
		return lRecettes;
	}

	public void deleteRecette(int iID) throws TechnicalException {
		String sql = "delete from Recette where ID = ?";

		try (PreparedStatement lStatement = DatabaseSQLiteConnection.getInstance().getCurrentConnection()
				.prepareStatement(sql)) {		
			lStatement.setInt(1, iID);	
			
			lStatement.executeUpdate();
				       
		} catch (SQLException e) {
			throw new TechnicalException("Erreur lors de la suppression", e);			
		}
	}
}
