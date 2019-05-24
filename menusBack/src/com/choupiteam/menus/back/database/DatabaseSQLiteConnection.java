package com.choupiteam.menus.back.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseSQLiteConnection {
private static DatabaseSQLiteConnection instance = null;
	
	private Connection currentConnection;

	public static DatabaseSQLiteConnection getInstance() {
		if (instance == null) {
			instance = new DatabaseSQLiteConnection();	
			instance.connect();
		}

		return DatabaseSQLiteConnection.instance;
	}

	public void connect() {	
		try {
			// db parameters
			Class.forName("org.sqlite.JDBC");
			String url = "jdbc:sqlite:C:/work/menus/databaseSQLite/menus.db";
			// create a connection to the database
			this.setCurrentConnection(DriverManager.getConnection(url));

			System.out.println("Connection to SQLite has been established.");

		} catch (SQLException | ClassNotFoundException e) {
			System.out.println(e.getMessage());
		}
	}

	public Connection getCurrentConnection() {
		return currentConnection;
	}

	public void setCurrentConnection(Connection currentConnection) {
		this.currentConnection = currentConnection;
	}
	
	public void disconnect() {
		try {
			this.getCurrentConnection().close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
