package com.choupiteam.menus.back.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;
import java.util.TreeMap;

import com.choupiteam.menus.back.models.Recette;
import com.choupiteam.menus.back.models.TypeRecetteEnum;
import com.choupiteam.menus.back.models.exceptions.TechnicalException;

public class WeekDAO {

	public Map<String, Recette> getWeek() throws TechnicalException {
		Map<String, Recette> lWeek = new TreeMap<String, Recette>();
		String lSQL = "select * from Semaine left outer join Recette on Semaine.ID_Recette=Recette.ID";
		
		try (PreparedStatement lStatement = DatabaseSQLiteConnection.getInstance().getCurrentConnection()
				.prepareStatement(lSQL)) {		
			
			ResultSet lRes = lStatement.executeQuery();
			
	        while (lRes.next()) {
	        	Recette lRecette;
	        	
	        	if (lRes.getObject("ID") != null) {
	        		lRecette = new Recette(
	        			lRes.getInt("ID"),
	        			lRes.getString("Nom"),
	        			lRes.getInt("TempsPreparation"),
	        			lRes.getInt("TempsCuisson"),
	        			lRes.getInt("NbPersonnes"),
	        			TypeRecetteEnum.valueOf(lRes.getInt("Type")).get());
	        	}
	        	else {
	        		lRecette = null;
	        	}
	        	
	        	lWeek.put(lRes.getString("Jour"), lRecette);
	        }
		} catch (SQLException e) {
			throw new TechnicalException("Erreur lors du get", e);	
		}
		
		return lWeek;
	}
	
	private void setDayRecette(String iDay, Recette iRecette) throws TechnicalException {
		String lSQL = "update Semaine set ID_Recette=? where Jour=?";
		
		try (PreparedStatement lStatement = DatabaseSQLiteConnection.getInstance().getCurrentConnection()
				.prepareStatement(lSQL)) {
			lStatement.setString(2, iDay);
			if (iRecette != null)
				lStatement.setInt(1, iRecette.getId());
			else
				lStatement.setObject(1, null);
			
			lStatement.executeUpdate();
		} catch (SQLException e) {
			throw new TechnicalException("Erreur lors du setDay", e);	
		}
		
		
	}
	
	public void setWeek(Map<String, Recette> iWeek) throws TechnicalException {		
		iWeek.forEach((jour, recette) -> {
			try {
				this.setDayRecette(jour, recette);
			} catch (TechnicalException e) {

			}
		});
	}	
}
