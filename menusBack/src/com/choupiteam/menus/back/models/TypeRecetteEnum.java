package com.choupiteam.menus.back.models;

import java.util.Arrays;
import java.util.Optional;

public enum TypeRecetteEnum {
	ENTREE(0),
	PLAT(1),
	DESSERT(2);
	
	private int value;
	
    TypeRecetteEnum(int iValue) {  
        this.value = iValue;  
   }  
    
    public int getValue() {
    	return this.value;
    }
    
    
    public static Optional<TypeRecetteEnum> valueOf(int value) {
        return Arrays.stream(values())
            .filter(iType -> iType.value == value)
            .findFirst();
    }

}
