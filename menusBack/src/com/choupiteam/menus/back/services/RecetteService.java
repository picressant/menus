package com.choupiteam.menus.back.services;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.choupiteam.menus.back.database.RecetteDAO;
import com.choupiteam.menus.back.models.IngredientAvecQuantite;
import com.choupiteam.menus.back.models.Recette;
import com.choupiteam.menus.back.models.exceptions.TechnicalException;


@Path("/recette")
@Produces(MediaType.APPLICATION_JSON)
public class RecetteService {
	
	@GET
	@Path("/{id}")
	public Recette getRecette(@PathParam("id") int iID) throws TechnicalException {
		return Recette.getRecette(iID);
	}
	
	@DELETE
	@Path("/{id}")
	public Response deleteRecette(@PathParam("id") int iID) throws TechnicalException {
		Recette.deleteRecette(iID);
		return Response.status(Status.NO_CONTENT).build();
	}
	
	@PUT
	@Path("/{id}")
	public Response updateRecette(Recette iRecette) throws TechnicalException {
		iRecette.save();
		return Response.status(Status.OK).entity(iRecette).build();
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)	
	public Response addRecette(Recette iRecette) throws TechnicalException {		
		iRecette.save();
		return Response.status(Status.OK).entity(iRecette).build();
	}
	
	@GET
	@Path("/{id}/ingredients")
	public List<IngredientAvecQuantite> getIngredients(@PathParam("id") int iID) throws TechnicalException {
		return Recette.getIngredients(iID);
	}
	
	@POST
	@Consumes(MediaType.TEXT_PLAIN)
	@Path("/search")	
	public List<Recette> searchRecette(String iSearchValue) throws TechnicalException {
		RecetteDAO lDao = new RecetteDAO();
		return lDao.searchRecette(iSearchValue);
	}

}
