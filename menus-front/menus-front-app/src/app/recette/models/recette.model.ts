import { RecetteType } from './recette-type.enum';

export class Recette {
    /**
	 * Identifiant de la recette
	 */
    id: number;

    /**
	 * Nom de la recette
	 */
    nom: string;

    /**
	 * Temps de pr�paration
	 * En min
	 */
    tempsPreparation: number;

    /**
	 * Temps de cuisson
	 * En min et peut �tre null
	 */
    tempsCuisson: number;

    /**
	 * Nombre de personnes pour la recette
	 */
    nbPersonnes: number;

    /**
	 * Type de recette
	 */
	type: RecetteType;	

	constructor(iNom: string, iTempsPreparation: number, iTempsCuisson: number, iNbPersonnes: number, iType: RecetteType) {
		this.id = null;
		this.nom = iNom;
		this.tempsPreparation = iTempsPreparation;
		this.tempsCuisson = iTempsCuisson;
		this.nbPersonnes = iNbPersonnes;
		this.type = iType;
	}
}
