package com.choupiteam.menus.back.services;

import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.choupiteam.menus.back.database.WeekDAO;
import com.choupiteam.menus.back.models.Recette;
import com.choupiteam.menus.back.models.exceptions.TechnicalException;

@Path("/week")
@Produces(MediaType.APPLICATION_JSON)
public class WeekService {

	@GET	
	public Map<String, Recette> getWeek() throws TechnicalException {
		WeekDAO lDao = new WeekDAO();
		return lDao.getWeek();
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public Response setWeek(Map<String, Recette> iWeek) throws TechnicalException {
		WeekDAO lDao = new WeekDAO();
		lDao.setWeek(iWeek);
		return Response.status(Status.NO_CONTENT).build();
	}
	
}
